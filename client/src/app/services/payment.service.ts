import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Property } from '../model/property.model';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: Http) { }

  createpaymentintent(property: Property) {
    const body = JSON.stringify(property);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("/create-payment-intent", body, { headers: headers }).pipe(map((response: Response) => response), catchError((error: Response) => {
      return throwError(error);
    })
    );
  }
}
