import { Injectable, inject } from '@angular/core';
import { TarjetaCredito } from '../models/tarjetaCredito';
import { Firestore,updateDoc, collection, collectionData, CollectionReference, addDoc, doc, deleteDoc} from '@angular/fire/firestore'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TarjetaService {
  private tarjeta$ = new Subject<any>();
  constructor(private firestore: Firestore){
  }

   guardarTarjeta(tarjeta: TarjetaCredito): Promise<any>{
    const tarjetasRef = collection(this.firestore, 'tarjetas');
    return addDoc(tarjetasRef, tarjeta)
   }

   obtenerTarjetas(): Observable<any>{
    const tarjetasRef = collection(this.firestore, 'tarjetas');
    return collectionData(tarjetasRef,{idField: 'id'}) as Observable<any>;
   }

   eliminarTarjeta(id?: string): Promise<any>{
    const tarjetaDocRef = doc(this.firestore, `tarjetas/${id}`);
    return deleteDoc(tarjetaDocRef)
   }
   editarTarjeta(id: string, tarjeta: any): Promise<any>{
    const tarjetaDocRef = doc(this.firestore, `tarjetas/${id}`);
    return updateDoc(tarjetaDocRef,tarjeta)
   }

    addTarjetaEdit(tarjeta: TarjetaCredito){
      this.tarjeta$.next(tarjeta);
    }

    getTarjetaEdit(): Observable<TarjetaCredito>{
      return this.tarjeta$.asObservable()
    }
  
}
