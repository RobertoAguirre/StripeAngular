import { Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';

export const routes: Routes = [
    { path: '', redirectTo: '/payment', pathMatch: 'full' },
    { path: 'payment', component: PaymentComponent }
];
