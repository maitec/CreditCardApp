export class CreditCard {
    id?: string;
    owner: string;
    creditCardNumber: string;
    expirationDate: string;
    cvv: number;
    creationDate: Date;
    updateDate: Date;

    constructor(owner: string, creditCardNumber: string, expirationDate: string, cvv: number) {
        this.owner = owner;
        this.creditCardNumber = creditCardNumber;
        this.expirationDate = expirationDate;
        this.cvv = cvv;
        this.creationDate = new Date();
        this.updateDate = new Date();
    }
}