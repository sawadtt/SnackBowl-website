<script setup>
import { Plus } from '@lucide/vue'
import logo from '../assets/images/SB_POSITIVE.png'
import { formatPrice } from '../data/menu.js'
defineProps({ product: { type: Object, required: true } })
defineEmits(['add'])
</script>

<template>
  <article class="product-card">
    <div class="product-media">
      <img v-if="product.image" :src="product.image" alt="" loading="lazy" decoding="async" width="560" height="501" />
      <div v-else class="product-placeholder">
        <img :src="logo" alt="" loading="lazy" decoding="async" />
        <span>Photo unavailable</span>
      </div>
    </div>
    <div class="product-body">
      <h3>{{ product.name }}</h3>
      <p v-if="product.contents"><strong>Includes</strong> {{ product.contents }}</p>
      <p v-else-if="product.description">{{ product.description }}</p>
      <div class="product-bottom">
        <div class="product-pricing">
          <span v-if="product.offerLabel" class="product-offer">{{ product.offerLabel }}</span>
          <div class="product-prices">
            <del v-if="product.originalPrice != null" class="product-original-price"><span class="sr-only">Original price </span>{{ formatPrice(product.originalPrice) }}</del>
            <span class="product-price">{{ product.price === null ? 'Price on WhatsApp' : formatPrice(product.price) }}</span>
          </div>
        </div>
        <button class="add-button" type="button" :disabled="!product.available" :aria-label="`Add ${product.name} to cart`" @click="$emit('add', product)">
          <Plus :size="18" aria-hidden="true" /> <span>{{ product.available ? 'Add to Cart' : 'Unavailable' }}</span>
        </button>
      </div>
    </div>
  </article>
</template>
