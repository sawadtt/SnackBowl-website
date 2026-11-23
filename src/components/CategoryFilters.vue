<script setup>
import { nextTick, ref, watch } from 'vue'
import { Beef, CupSoda, Drumstick, Flame, LayoutGrid, Milk, Package, Sandwich, Utensils } from '@lucide/vue'
import { categories } from '../data/menu.js'
const props = defineProps({ selected: { type: String, required: true } })
defineEmits(['select'])

const icons = {
  'All items': LayoutGrid,
  'Loaded Fries': Utensils,
  'French Fries': Flame,
  'Rolls & Wraps': Sandwich,
  Burgers: Beef,
  'Snacks & Platters': Drumstick,
  Shakes: Milk,
  Drinks: CupSoda,
  Combos: Package,
}

const rail = ref(null)
watch(() => props.selected, async () => {
  await nextTick()
  const viewport = rail.value
  const active = viewport?.querySelector('[aria-pressed="true"]')
  if (!active) return
  const bounds = viewport.getBoundingClientRect()
  const item = active.getBoundingClientRect()
  if (item.left < bounds.left + 4 || item.right > bounds.right - 4) {
    viewport.scrollLeft += item.left - bounds.left - 4
  }
})
</script>

<template>
  <div ref="rail" class="filters" role="group" aria-label="Filter menu by category">
    <button v-for="category in ['All items', ...categories]" :key="category" class="filter" type="button" :aria-pressed="selected === category" @click="$emit('select', category)">
      <component :is="icons[category]" :size="17" aria-hidden="true" />
      {{ category }}
    </button>
  </div>
</template>
