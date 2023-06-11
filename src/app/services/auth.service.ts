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
import { Firestore, collection, collectionData, doc, getDoc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { CollectionReference, addDoc } from '@firebase/firestore';
import { Store } from '@ngrx/store';
import { setUser, unSetUser } from '../auth/auth.actions';
import { unSetItem } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSub!:Unsubscribe;
  private _user!:User |null;
  get user(){

    return {...this._user}

  }
  constructor(private auth: Auth, public firestore: Firestore
    ,private store:Store<AppState>) {}
  initAuthListener() {
    this.auth.onAuthStateChanged(async (user) => {
      if (user) {


        this.userSub= onSnapshot(doc(this.firestore, `${user.uid}`,'users'), (user) => {
          const newUser = new User(user.data()?.["nombre"], user.data()?.["email"], user.data()?.["uid"]);
          this._user=newUser;
          this.store.dispatch(setUser({user:newUser}));





      });


      } else {
        this._user=null;
        this.userSub?.();
        this.store.dispatch(unSetUser());
        this.store.dispatch(unSetItem());
      }
    });
  }
  crearUser(nombre: string, correo: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, correo, password).then(
      async ({ user }) => {
        const newUser = new User(nombre, user.email as string, user.uid);
         const refUser = collection(this.firestore, `${user.uid}`);
        console.log(newUser);
        let data = {
          ...newUser}
        return setDoc(doc(refUser,`users`),data);
       /*  const collectionInstance = collection(
          this.firestore,
          `${user.uid}/users`
        );
        let data = {
          ...newUser,
          uid: null
        };
       const docReference = await setDoc(doc(collectionInstance) ,data
        );
        return docReference */

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
