import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { User } from '../models/user.model';
import { Firestore, collection } from '@angular/fire/firestore';
import { CollectionReference, addDoc } from '@firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: Auth,public firestore:Firestore) {

  }
  initAuthListener() {
    this.auth.onAuthStateChanged((user) => {
      console.log(user?.uid);
    });
  }
  crearUser(nombre: string, correo: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, correo, password).then(
      ({user}) => {
        const newUser= new User(nombre,user.email,user.uid);
        const refUser=collection(this.firestore,'users');
        console.log(newUser);
        let data={
          ...newUser
        }
        return addDoc(refUser,data)
      }
    )
  }
  login(correo: string, password: string) {
    return signInWithEmailAndPassword(this.auth, correo, password);
  }
  logout() {
    return this.auth.signOut();
  }
  isAuth() {
    return authState(this.auth).pipe(
      map((fbUser:any)=>fbUser!=null)
    );

  }
}
