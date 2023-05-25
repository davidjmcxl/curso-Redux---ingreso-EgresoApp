import { AppState } from 'src/app/app.reducer';
import { Observable, map, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Auth,
  Unsubscribe,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Firestore, collection, collectionData, doc, getDoc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { CollectionReference, addDoc } from '@firebase/firestore';
import { Store } from '@ngrx/store';
import { setUser, unSetUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSub!:Unsubscribe;
  constructor(private auth: Auth, public firestore: Firestore
    ,private store:Store<AppState>) {}
  initAuthListener() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user.uid);

        this.userSub= onSnapshot(doc(this.firestore, 'users',`${user.uid}`), (user) => {
          const newUser = new User(user.data()?.["nombre"], user.data()?.["email"], user.data()?.["uid"]);
          this.store.dispatch(setUser({user:newUser}));

      });


      } else {
        this.userSub?.();
        this.store.dispatch(unSetUser());
      }
    });
  }
  crearUser(nombre: string, correo: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, correo, password).then(
      ({ user }) => {
        const newUser = new User(nombre, user.email, user.uid);
        const refUser = collection(this.firestore, 'users');
        console.log(newUser);
        let data = {
          ...newUser,
        };
        return setDoc(doc(this.firestore,"users" ,`${user.uid}`),data);
      }
    );
  }
  login(correo: string, password: string) {
    return signInWithEmailAndPassword(this.auth, correo, password);
  }
  logout() {
    return this.auth.signOut();
  }
  isAuth() {
    return authState(this.auth).pipe(map((fbUser: any) => fbUser != null));
  }
}
