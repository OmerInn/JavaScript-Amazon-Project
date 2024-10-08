import cart from '../../data/cart-oop.js';
import {getProduct} from '../../data/products.js';
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import {formatCurrency} from '../utils/money.js';



export function renderPaymentSummary() {

  
  let productPriceCents = 0;
  let shippingPriceCents = 0;


  let cartQuantity = 0;
  cart.cartItems.forEach(cartItem => {
    const product = getProduct(cartItem.productId); // Sepet ürününü alıyoruz
    if (!product) {
      console.error(`Product with ID ${cartItem.productId} not found.`);
      return; // Ürün bulunamazsa işlemi atla
    }

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId); // Teslimat seçeneğini alıyoruz
    if (!deliveryOption) {
      console.error(`Delivery option with ID ${cartItem.deliveryOptionId} not found.`);
      return; // Teslimat seçeneği bulunamazsa işlemi atla
    }

    // Ürün fiyatı ve miktarını toplamaya devam et

    productPriceCents += product.priceCents * cartItem.quantity;

    shippingPriceCents += deliveryOption.priceCents;

    cartQuantity += cartItem.quantity;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  
  const paymentSummaryHTML = `

     <div class="payment-summary-title">
            Order Summary
          </div>
          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
            </div>
          </div>
          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
              $${formatCurrency(shippingPriceCents)}
            </div>
          </div>
          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
              $${formatCurrency(totalBeforeTaxCents)}
            </div>
          </div>
          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
              $${formatCurrency(taxCents)}
            </div>
          </div>
          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
              $${formatCurrency(totalCents)}
            </div>
          </div>
          <button class="place-order-button button-primary">
            Place your order
          </button>
  
  `;
  document.querySelector('.js-payment-summary')
    .innerHTML=paymentSummaryHTML;

  console.log(`Total product price: $${formatCurrency(productPriceCents)}`);
  console.log(`Total shipping price: $${formatCurrency(shippingPriceCents)}`);
  console.log(`Grand total: $${formatCurrency(totalCents)}`);
}
