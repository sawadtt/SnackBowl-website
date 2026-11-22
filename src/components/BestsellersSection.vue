<script setup>
import { computed } from 'vue'
import { menu } from '../data/menu.js'
import CategoryFilters from './CategoryFilters.vue'
import ProductCard from './ProductCard.vue'

const props = defineProps({ selected: { type: String, required: true } })
defineEmits(['select', 'add'])

const products = computed(() => props.selected === 'All items'
  ? [...menu.filter(product => product.featured), ...menu.filter(product => !product.featured)]
  : menu.filter(product => product.category === props.selected),
)
</script>

<template>
  <section id="menu" class="section menu-section shell" aria-labelledby="menu-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">The Snack Bowl menu</p>
        <h2 id="menu-title">{{ selected === 'All items' ? 'Bestsellers' : selected }}</h2>
      </div>
      <p v-if="products.some(product => product.image)" class="image-note">Illustrative product images</p>
    </div>
    <CategoryFilters :selected="selected" @select="$emit('select', $event)" />
    <div v-if="products.length" class="product-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @add="$emit('add', $event)" />
    </div>
    <p v-else class="empty-menu" role="status">There are no {{ selected.toLowerCase() }} listed yet.</p>
  </section>
</template>
