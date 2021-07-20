import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { CreditCard } from '../models/CreditCard.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private $creditCard = new Subject<any>();

  constructor(
    private firestore: AngularFirestore
  ) { }

  saveCreditCard(creditCard: CreditCard): Promise<any>{
    return this.firestore.collection('creditCards').add(creditCard);
  }

  getCreditCards(): Observable<any>{
    return this.firestore.collection('creditCards', ref => ref.orderBy('creationDate', 'asc')).snapshotChanges();
  }

  deleteCreditCard(id: string): Promise<any>{
    return this.firestore.collection('creditCards').doc(id).delete();
  }

  sendCreditCardToEdit(creditCard: CreditCard){
    this.$creditCard.next(creditCard);
  }

  getCreditCardToEdit(): Observable<CreditCard>{
    return this.$creditCard.asObservable();
  }

  editCreditCard(id: string, creditCard: any): Promise<any>{
    return this.firestore.collection('creditCards').doc(id).update(creditCard);
  }
}
