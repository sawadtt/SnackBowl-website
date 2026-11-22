<script setup>
import { categories } from '../data/menu.js'
defineProps({ selected: { type: String, required: true } })
defineEmits(['select'])
</script>

<template>
  <div class="filters" role="group" aria-label="Filter menu by category">
    <button v-for="category in ['All items', ...categories]" :key="category" class="filter" type="button" :aria-pressed="selected === category" @click="$emit('select', category)">
      {{ category }}
    </button>
  </div>
</template>
