<script setup>
import { Beef, CupSoda, Drumstick, Sandwich, Utensils } from '@lucide/vue'
import { categories } from '../data/menu.js'

defineEmits(['select'])
const icons = [Utensils, Sandwich, Beef, Drumstick, CupSoda]
</script>

<template>
  <section class="category-band section" aria-labelledby="category-title">
    <div class="shell">
      <h2 id="category-title">Browse by category</h2>
      <div class="category-grid">
        <a v-for="(category, index) in categories" :key="category" class="category-link" href="#menu" @click="$emit('select', category)">
          <component :is="icons[index]" :size="24" :stroke-width="1.7" aria-hidden="true" />
          {{ category }}
        </a>
      </div>
    </div>
  </section>
</template>
