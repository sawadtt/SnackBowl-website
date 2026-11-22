<script setup>
import { ref } from 'vue'
import { MessageCircle, Minus, Plus, ShoppingBag, X } from '@lucide/vue'
import { contactNumber, formatPrice } from '../data/menu.js'

const props = defineProps({
  items: { type: Array, required: true },
  subtotal: { type: Number, default: null },
  maxQuantity: { type: Number, required: true },
})
defineEmits(['change', 'remove'])

const dialog = ref(null)
const customerName = ref('')
const orderType = ref('Pickup')
const address = ref('')
const notes = ref('')
const preparing = ref(false)

function open() {
  if (dialog.value.open) return
  dialog.value.showModal()
}

function checkout(event) {
  const form = event.currentTarget
  customerName.value = customerName.value.trim()
  address.value = address.value.trim()
  form.elements.customerName.value = customerName.value
  if (orderType.value === 'Delivery') form.elements.deliveryAddress.value = address.value
  if (!form.reportValidity() || !props.items.length) return

  const message = [
    'Hi Snack Bowl! I’d like to place an order.',
    '',
    ...props.items.map(({ product, quantity }) => {
      const linePrice = product.price === null ? '' : ` (${formatPrice(product.price * quantity)})`
      return `• ${quantity} × ${product.name}${linePrice}`
    }),
    '',
    `Subtotal: ${props.subtotal === null ? 'Please confirm prices' : formatPrice(props.subtotal)}`,
    `Name: ${customerName.value}`,
    `Order type: ${orderType.value}`,
  ]
  if (orderType.value === 'Delivery') message.push(`Delivery address: ${address.value}`)
  if (notes.value.trim()) message.push(`Notes: ${notes.value.trim()}`)

  window.open(`https://wa.me/${contactNumber}?text=${encodeURIComponent(message.join('\n'))}`, '_blank', 'noopener,noreferrer')
  preparing.value = true
}

defineExpose({ open })
</script>

<template>
  <dialog ref="dialog" class="cart-drawer" aria-labelledby="cart-title" @click.self="dialog.close()" @close="preparing = false">
    <div class="drawer-panel">
      <div class="drawer-heading">
        <h2 id="cart-title">Your cart</h2>
        <button class="icon-button" type="button" aria-label="Close cart" autofocus @click="dialog.close()"><X :size="22" aria-hidden="true" /></button>
      </div>
      <div v-if="!items.length" class="drawer-empty">
        <ShoppingBag :size="36" aria-hidden="true" />
        <p>Your cart is empty.</p>
        <a class="button button-gold" href="#menu" @click="dialog.close()">Explore Menu</a>
      </div>
      <template v-else>
        <ul class="cart-lines">
          <li v-for="{ product, quantity } in items" :key="product.id" class="cart-line">
            <div>
              <strong>{{ product.name }}</strong>
              <p>{{ product.price === null ? 'Price on WhatsApp' : formatPrice(product.price * quantity) }}</p>
              <button class="remove-button" type="button" :aria-label="`Remove ${product.name}`" @click="$emit('remove', product.id)">Remove</button>
            </div>
            <div class="quantity-control">
              <button class="icon-button" type="button" :aria-label="`Decrease ${product.name}`" @click="$emit('change', product.id, -1)"><Minus :size="16" aria-hidden="true" /></button>
              <span>{{ quantity }}</span>
              <button class="icon-button" type="button" :disabled="quantity >= maxQuantity" :aria-label="`Increase ${product.name}`" @click="$emit('change', product.id, 1)"><Plus :size="16" aria-hidden="true" /></button>
            </div>
          </li>
        </ul>
        <div class="subtotal"><strong>Subtotal</strong><span>{{ subtotal === null ? 'To be confirmed' : formatPrice(subtotal) }}</span></div>
        <form class="checkout-form" @submit.prevent="checkout">
          <label>Your name<input v-model="customerName" name="customerName" autocomplete="name" maxlength="80" required /></label>
          <label>Order type
            <select v-model="orderType" name="orderType"><option>Pickup</option><option>Delivery</option></select>
          </label>
          <label v-if="orderType === 'Delivery'">Delivery address
            <textarea v-model="address" name="deliveryAddress" autocomplete="street-address" rows="2" maxlength="350" required></textarea>
          </label>
          <label>Order notes <span class="optional">(optional)</span>
            <textarea v-model="notes" name="notes" rows="2" maxlength="300"></textarea>
          </label>
          <p class="checkout-note">Your order will be confirmed by our team on WhatsApp.</p>
          <button class="button button-gold checkout-button" type="submit"><MessageCircle :size="19" aria-hidden="true" /> Continue to WhatsApp</button>
          <p v-if="preparing" class="checkout-note" role="status">Tap Send in WhatsApp to share your order with our team.</p>
        </form>
      </template>
    </div>
  </dialog>
</template>
