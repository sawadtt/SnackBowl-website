<script setup>
import { computed, nextTick, ref } from 'vue'
import { MapPin, Search, X } from '@lucide/vue'
import { categories, menu } from '../data/menu.js'
import CategoryFilters from './CategoryFilters.vue'
import ProductCard from './ProductCard.vue'

defineProps({
  quantities: { type: Object, required: true },
  maxQuantity: { type: Number, required: true },
})
const emit = defineEmits(['change'])

const allItems = 'All items'
const selected = ref(allItems)
const query = ref('')
const searchInput = ref(null)
const filters = ref(null)
const results = ref(null)
const bannerImage = `${import.meta.env.BASE_URL}images/snack-bowl-menu-banner.webp`

const categoryGroups = categories.map(name => ({
  name,
  products: menu.filter(product => product.category === name),
}))
const searchTerms = computed(() => query.value.trim().toLowerCase().split(/\s+/).filter(Boolean))
const groups = computed(() => categoryGroups
  .filter(group => selected.value === allItems || group.name === selected.value)
  .map(group => ({
    name: group.name,
    total: group.products.length,
    products: group.products.filter(product => {
      const text = [product.name, product.category, product.contents].join(' ').toLowerCase()
      return searchTerms.value.every(term => text.includes(term))
    }),
  }))
  .filter(group => group.products.length))
const resultCount = computed(() => groups.value.reduce((sum, group) => sum + group.products.length, 0))

async function selectCategory(category) {
  const needsScroll = results.value.getBoundingClientRect().top < filters.value.getBoundingClientRect().bottom
  selected.value = category
  if (needsScroll) {
    await nextTick()
    results.value.scrollIntoView({ block: 'start', behavior: 'instant' })
  }
}

function clearSearch() {
  query.value = ''
  searchInput.value.focus()
}

function reset() {
  selected.value = allItems
  query.value = ''
}

defineExpose({ reset })
</script>

<template>
  <section id="menu" class="menu-section" aria-labelledby="menu-title">
    <div class="shell">
      <div class="menu-banner">
        <div class="menu-banner-copy">
          <p class="menu-location"><MapPin :size="16" aria-hidden="true" /> Kottakkal, Kerala</p>
          <h2 id="menu-title"><span class="menu-banner-brand">The Snack Bowl</span> <span class="menu-banner-title">Menu</span></h2>
          <p class="menu-banner-detail">Loaded fries, shawarma and more for pickup or delivery.</p>
        </div>
        <div class="menu-banner-media">
          <img :src="bannerImage" alt="" width="1040" height="1040" loading="lazy" decoding="async" />
        </div>
      </div>
      <div class="menu-tools">
        <div class="menu-search" role="search" aria-label="Menu search">
          <Search :size="21" aria-hidden="true" />
          <label for="menu-search" class="sr-only">Search menu</label>
          <input id="menu-search" ref="searchInput" v-model="query" type="search" placeholder="Search fries, burgers, shakes…" autocomplete="off" @keydown.esc.prevent="clearSearch" />
          <button v-if="query" class="icon-button" type="button" aria-label="Clear search" @click="clearSearch">
            <X :size="19" aria-hidden="true" />
          </button>
        </div>
        <div class="menu-summary">
          <p class="menu-result-count" role="status">{{ resultCount }} {{ resultCount === 1 ? 'item' : 'items' }}<span v-if="searchTerms.length"> found</span></p>
          <p class="menu-price-note">Prices and offers as listed on Swiggy and Zomato.</p>
        </div>
      </div>
    </div>

    <div ref="filters" class="menu-filter-bar">
      <div class="shell">
        <CategoryFilters :selected="selected" @select="selectCategory" />
      </div>
    </div>

    <div ref="results" class="shell menu-results">
      <section v-for="group in groups" :key="group.name" class="menu-category" :aria-label="group.name">
        <header class="menu-category-heading">
          <h3>{{ group.name }}</h3>
          <span>{{ searchTerms.length ? `${group.products.length} of ${group.total}` : group.total }} {{ group.total === 1 ? 'item' : 'items' }}</span>
        </header>
        <div class="product-grid">
          <ProductCard
            v-for="product in group.products"
            :key="product.id"
            :product="product"
            :quantity="quantities[product.id] ?? 0"
            :max-quantity="maxQuantity"
            @change="emit('change', product, $event)"
          />
        </div>
      </section>
      <div v-if="!resultCount" class="empty-menu">
        <Search :size="27" aria-hidden="true" />
        <h3>No items found</h3>
        <p>Try a different search or browse the full menu.</p>
        <button type="button" class="button button-outline" @click="reset(); searchInput.focus()">Clear filters</button>
      </div>
    </div>
  </section>
</template>
