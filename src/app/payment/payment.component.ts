import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit, AfterViewInit {
  @ViewChild('cardElement') cardElement!: ElementRef;
  stripe!: Stripe;
  card!: StripeCardElement;
  stripeTest!: FormGroup;

  constructor(private fb: FormBuilder) {}

  async ngOnInit() {
    const stripe = await loadStripe('LLAVE PUBLICA AQUI'); // Reemplaza 'TU_LLAVE_PUBLICA_STRIPE' con tu llave pública de Stripe
    if (!stripe) {
      console.error('Stripe no se ha podido cargar.');
      return;
    }
    this.stripe = stripe;
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {
    if (!this.stripe) {
      console.error('Stripe no está inicializado.');
      return;
    }
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount(this.cardElement.nativeElement);
  }

  async createToken() {
    if (!this.stripe) {
      console.error('Stripe no está inicializado.');
      return;
    }
    const name = this.stripeTest.get('name')?.value;
    const { token, error } = await this.stripe.createToken(this.card, { name });
    if (token) {
      // Envía el token al servidor
      console.log(token);
    } else if (error) {
      // Maneja el error aquí
      console.log(error.message);
    }
  }


}
