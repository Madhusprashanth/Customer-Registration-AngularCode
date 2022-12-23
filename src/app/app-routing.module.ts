import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CustomerComponent } from './customer/customer.component'

const routes: Routes = [];

const appRoutes: Routes = [
    { path: '', component: HeaderComponent  },
    { path: 'customer', component: CustomerComponent},]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: false})],
    exports: [RouterModule]
  })  

  export class AppRoutingModule { }