<script setup>
import { Image, Plus } from '@lucide/vue'
import { formatPrice } from '../data/menu.js'
defineProps({ product: { type: Object, required: true } })
defineEmits(['add'])
</script>

<template>
  <article class="product-card">
    <div class="product-media">
      <img v-if="product.image" :src="product.image" alt="" loading="lazy" decoding="async" width="560" height="501" />
      <div v-else class="product-placeholder"><Image :size="24" aria-hidden="true" /> Photo coming soon</div>
    </div>
    <div class="product-body">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="product-bottom">
        <span class="product-price">{{ product.price === null ? 'Price on WhatsApp' : formatPrice(product.price) }}</span>
        <button class="add-button" type="button" :disabled="!product.available" :aria-label="`Add ${product.name} to cart`" @click="$emit('add', product)">
          <Plus :size="18" aria-hidden="true" /> <span>{{ product.available ? 'Add to Cart' : 'Unavailable' }}</span>
        </button>
      </div>
    </div>
  </article>
</template>
