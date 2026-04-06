import { PaymentStrategy } from './payment.strategy';

export class CashOnDeliveryStrategy implements PaymentStrategy {

  pay(amount: number): string {
    return `Pago contraentrega confirmado por $${amount}`;
  }

}