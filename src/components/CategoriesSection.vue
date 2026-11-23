<script setup>
import { Beef, CupSoda, Drumstick, Flame, Milk, Package, Sandwich, Utensils } from '@lucide/vue'
import { categories } from '../data/menu.js'

defineEmits(['select'])
const icons = {
  'Loaded Fries': Utensils,
  'French Fries': Flame,
  'Rolls & Wraps': Sandwich,
  Burgers: Beef,
  'Snacks & Platters': Drumstick,
  Shakes: Milk,
  Drinks: CupSoda,
  Combos: Package,
}
</script>

<template>
  <section class="category-band section" aria-labelledby="category-title">
    <div class="shell">
      <h2 id="category-title">Browse by category</h2>
      <div class="category-grid">
        <a v-for="category in categories" :key="category" class="category-link" href="#menu" @click="$emit('select', category)">
          <component :is="icons[category]" :size="24" :stroke-width="1.7" aria-hidden="true" />
          {{ category }}
        </a>
      </div>
    </div>
  </section>
</template>
