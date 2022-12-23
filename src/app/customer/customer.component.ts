import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from '../validation.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
 
  CustomerForm: FormGroup;
  creditScore : number;
  address: string;
  record: any;
  ValidatedAddress: any;
  genders = ['male', 'female', 'others'];

  constructor(private router: Router,
      private route: ActivatedRoute,
      private VService: ValidationService){}

  ngOnInit(){ 
   
   this.CustomerForm = new FormGroup({
      'userName': new FormControl(null,Validators.required),
      'Phnumber': new FormControl(null, [Validators.required,
                                          Validators.pattern('^[0-9]{10}$'),
                                          Validators.minLength(10),
                                          Validators.maxLength(10)]),
      'accountType': new FormControl('Savings', Validators.required),
        'Address': new FormGroup({
        'HouseNo': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{2}$')]),
        'area': new FormControl(null,Validators.required),
        'pincode': new FormControl(null,Validators.required),
        'district': new FormControl(null,Validators.required),
      })
  
    });
  }

  onSubmit(){
   let lname = this.CustomerForm.get('userName').value;
   this.VService.validateAddress(this.CustomerForm.get('Address').value, lname, this.CustomerForm.value);
   this.CustomerForm.reset();
  }

  onReset(){
    this.CustomerForm.reset();
  }

}
