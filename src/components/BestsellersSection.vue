<script setup>
import { computed } from 'vue'
import { menu } from '../data/menu.js'
import CategoryFilters from './CategoryFilters.vue'
import ProductCard from './ProductCard.vue'

const props = defineProps({ selected: { type: String, required: true } })
defineEmits(['select', 'add'])

const bestsellers = menu.filter(product => product.featured)
const products = computed(() => props.selected === 'All items'
  ? menu.filter(product => !product.featured)
  : menu.filter(product => product.category === props.selected),
)
</script>

<template>
  <section id="menu" class="section menu-section shell" aria-labelledby="menu-title">
    <div class="section-heading">
      <h2 id="menu-title">{{ selected === 'All items' ? 'Menu' : selected }}</h2>
      <p class="menu-price-note">Prices and offers as listed on the Swiggy and Zomato menu.</p>
    </div>
    <CategoryFilters :selected="selected" @select="$emit('select', $event)" />
    <template v-if="selected === 'All items' && bestsellers.length">
      <h3 class="menu-group-title">Bestsellers</h3>
      <div class="product-grid">
        <ProductCard v-for="product in bestsellers" :key="product.id" :product="product" @add="$emit('add', $event)" />
      </div>
      <h3 v-if="products.length" class="menu-group-title">More from the menu</h3>
    </template>
    <div v-if="products.length" class="product-grid">
      <ProductCard v-for="product in products" :key="product.id" :product="product" @add="$emit('add', $event)" />
    </div>
    <p v-else class="empty-menu" role="status">There are no {{ selected.toLowerCase() }} listed yet.</p>
  </section>
</template>
