import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/CreditCard.model';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
  public title = 'New Credit Card';
  public form: FormGroup;
  public loading = false;
  public id: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private _creditCardService: CreditCardService,
    private toastr: ToastrService
  ) { 
    this.form = this.formBuilder.group({
      owner: ['', Validators.required],
      creditCardNumber: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(16)]],
      expirationDate: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]]
    });
  }

  ngOnInit() {
    this._creditCardService.getCreditCardToEdit().subscribe(data => {
      this.id = data.id;
      this.title = 'Edit Credit Card';
      this.form.patchValue({
        owner: data.owner,
        creditCardNumber: data.creditCardNumber,
        expirationDate: data.expirationDate,
        cvv: data.cvv
      });
    });
  }

  public saveCard(){
    if (this.id === undefined){
      // On Creation
      this.createCard();
    } else {
      // On Edition
      this.editCard(this.id);
    }
  }

  private createCard(){
    this.loading = true;
    this.form.disable();
    const CARD: CreditCard = {
      owner: this.form.value.owner,
      creditCardNumber: this.form.value.creditCardNumber,
      expirationDate: this.form.value.expirationDate,
      cvv: this.form.value.cvv,
      creationDate: new Date(),
      updateDate: new Date()
    }
    this._creditCardService.saveCreditCard(CARD).then(() => {
      this.form.reset();
      this.form.enable();
      this.toastr.success('The credit card has been registered.', 'Done!');
      this.loading = false;
    }, error => {
      this.toastr.error('An error occurred.', 'Oops...');
      this.loading = false;
      console.log(error);
    });
  }

  private editCard(id: string){
    this.loading = true;
    this.form.disable();
    const CARD = {
      owner: this.form.value.owner,
      creditCardNumber: this.form.value.creditCardNumber,
      expirationDate: this.form.value.expirationDate,
      cvv: this.form.value.cvv,
      updateDate: new Date()
    }

    this._creditCardService.editCreditCard(id, CARD).then(() => {
      this.title = 'New Credit Card';
      this.form.reset();
      this.form.enable();
      this.id = undefined;
      this.toastr.info('The credit card has been updated.', 'Done!');
      this.loading = false;
    }, error => {
      this.toastr.error('An error occurred.', 'Oops...');
      this.loading = false;
      console.log(error);
    });
  }

}
