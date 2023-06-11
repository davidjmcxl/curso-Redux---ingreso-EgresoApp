import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(private firestore: Firestore, private authService: AuthService) {}
  async crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid as string;

    const collectionInstance = collection(
      this.firestore,
      `${uid}/ingresos-egresos/Items`
    );
    const docReference = await addDoc(collectionInstance, {
      ...ingresoEgreso,
      uid: null,
    });
    return await updateDoc(docReference, 'uid', docReference.id);
  }

  initIngresoEgresoListener(uid: string) {
    const collectionInstance = collection(this.firestore, `${uid}/ingresos-egresos/Items`);

    const resp=collectionData(collectionInstance);

    return resp;
  }
  borrarItem(uid:string){
    const collectionInstance = collection(this.firestore, `${this.authService.user.uid}/ingresos-egresos/Items`);
    return deleteDoc(doc(collectionInstance,uid));
  }

}
