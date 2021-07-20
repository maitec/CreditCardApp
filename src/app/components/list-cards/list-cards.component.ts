import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/CreditCard.model';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit {
  public creditCardList: CreditCard[] = [];

  constructor(
    private _creditCardService: CreditCardService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getCreditCards();
  }

  public getCreditCards(){
    this._creditCardService.getCreditCards().subscribe(doc => {
      this.creditCardList = [];
      doc.forEach(element => {
        this.creditCardList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    });
  }

  public deleteCreditCard(id: string){
    this._creditCardService.deleteCreditCard(id).then(() => {
      this.toastr.error('The credit card has been deleted.', 'Done!');
    }, error => {
      this.toastr.error('An error occurred.', 'Oops...');
      console.log(error);
    });
  }

  public editCreditCard(creditCard: CreditCard){
    this._creditCardService.sendCreditCardToEdit(creditCard);
  }

}
