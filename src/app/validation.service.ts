
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  error = new Subject<string>();
   mockApiUrl : String;
  constructor(private http: HttpClient) {
    this.mockApiUrl = 'http://localhost:8080/api/customerdetails'
   }

   validateAddress(address: any, lname: any, Details:any) {
    let searchparams = new HttpParams();
    searchparams = searchparams.append('HouseNo', address.HouseNo === null?'':address.HouseNo);
    searchparams = searchparams.append('area', address.area === null?'':address.area);
    searchparams = searchparams.append('pincode', address.pincode === null?'':address.pincode);
    searchparams = searchparams.append('district', address.district === null?'':address.district);
    this.http.get(`${this.mockApiUrl}/address`, {
      params: searchparams
    }).
    subscribe( (responseData: any) => {
            console.log('success', responseData );
            if(responseData?.key === 'address is valid'){
              {alert('address is valid')}
                 this.http.get(`${this.mockApiUrl}/creditcheck/${lname}`).subscribe((CredData: any) => {
                  if(CredData?.key === 'credit is valid'){
                     this.http.post(`${this.mockApiUrl}/Details`,Details)
                    .subscribe( (data:any)=> {  
                        if(data){
                           alert('Congratulations! Account created successfully')
                        }else {
                          alert('Account can not be created')

                        }
                    });  
                  }
                  else {
                      alert('Account cant be created beacuse username is invalid')
                      
                  }
                })   
            }
            else {
              alert('Address is not valid So, we can not create account for this user')
            }
            
    },
    error => {
      this.error.next('address is invalid');
    
    }
  );
   
  }
  
}