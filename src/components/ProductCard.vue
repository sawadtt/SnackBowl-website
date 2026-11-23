<script setup>
import { nextTick, ref } from 'vue'
import { Minus, Plus } from '@lucide/vue'
import logo from '../assets/images/SB_POSITIVE.png'
import { formatPrice } from '../data/menu.js'
const props = defineProps({
  product: { type: Object, required: true },
  quantity: { type: Number, required: true },
  maxQuantity: { type: Number, required: true },
})
const emit = defineEmits(['change'])
const imageUnavailable = ref(false)
const addButton = ref(null)
const decreaseButton = ref(null)

async function changeQuantity(event, delta) {
  const focused = event.currentTarget === document.activeElement
  const nextQuantity = props.quantity + delta
  emit('change', delta)
  if (!focused) return
  await nextTick()
  if (nextQuantity === 0) addButton.value?.focus()
  if (nextQuantity === 1 && delta === 1) decreaseButton.value?.focus()
  if (nextQuantity === props.maxQuantity) decreaseButton.value?.focus()
}
</script>

<template>
  <article class="product-card" :data-product="product.id">
    <div class="product-media">
      <img v-if="product.image && !imageUnavailable" class="product-photo" :src="product.image" alt="" loading="lazy" decoding="async" @error="imageUnavailable = true" />
      <div v-else class="product-placeholder">
        <img :src="logo" alt="" width="320" height="309" loading="lazy" decoding="async" />
        <span>Photo coming soon</span>
      </div>
      <span v-if="product.offerLabel" class="product-offer">{{ product.offerLabel }}</span>
    </div>
    <div class="product-body">
      <p v-if="product.featured" class="product-kicker">Bestseller</p>
      <h4>{{ product.name }}</h4>
      <ul v-if="product.contents" class="product-contents" aria-label="Combo includes">
        <li v-for="item in product.contents.split(' + ')" :key="item">{{ item }}</li>
      </ul>
      <p v-else-if="product.description" class="product-description">{{ product.description }}</p>
      <div class="product-bottom">
        <div class="product-prices">
          <span class="product-price">{{ product.price === null ? 'Price on WhatsApp' : formatPrice(product.price) }}</span>
          <del v-if="product.originalPrice != null" class="product-original-price"><span class="sr-only">Original price </span>{{ formatPrice(product.originalPrice) }}</del>
        </div>
        <button v-if="!product.available" type="button" class="add-button" disabled>Unavailable</button>
        <div v-else-if="quantity" class="product-quantity" role="group" :aria-label="`${product.name} quantity`">
          <button ref="decreaseButton" type="button" :aria-label="`Decrease ${product.name} quantity`" @click="changeQuantity($event, -1)"><Minus :size="17" aria-hidden="true" /></button>
          <span>{{ quantity }}</span>
          <button type="button" :aria-label="`Increase ${product.name} quantity`" :disabled="quantity >= maxQuantity" @click="changeQuantity($event, 1)"><Plus :size="17" aria-hidden="true" /></button>
        </div>
        <button v-else ref="addButton" type="button" class="add-button" :aria-label="`Add ${product.name} to cart`" @click="changeQuantity($event, 1)">
          <Plus :size="17" aria-hidden="true" /> Add to Cart
        </button>
      </div>
    </div>
  </article>
</template>
