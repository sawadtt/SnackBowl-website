<script setup>
import { ref } from 'vue'
import { Menu, ShoppingBag, X } from '@lucide/vue'
import logo from '../assets/images/SB_POSITIVE.png'

defineProps({ count: { type: Number, required: true } })
defineEmits(['open-cart', 'browse'])
const expanded = ref(false)
const toggle = ref(null)

function closeOnEscape() {
  if (!expanded.value) return
  expanded.value = false
  toggle.value.focus()
}
</script>

<template>
  <header class="site-header" @keydown.esc="closeOnEscape">
    <div class="shell header-inner">
      <a class="brand-mark" href="#home" @click="expanded = false">
        <img :src="logo" alt="Snack Bowl home" width="320" height="309" />
      </a>
      <nav id="main-navigation" class="main-nav" :class="{ 'is-open': expanded }" aria-label="Main navigation">
        <a href="#home" @click="expanded = false">Home</a>
        <a href="#menu" @click="expanded = false; $emit('browse')">Menu</a>
        <a href="#offers" @click="expanded = false">Offers</a>
        <a href="#how-to-order" @click="expanded = false">How to Order</a>
      </nav>
      <div class="header-actions">
        <button class="button cart-trigger" type="button" :aria-label="`Open cart, ${count} items`" @click="expanded = false; $emit('open-cart')">
          <ShoppingBag :size="18" aria-hidden="true" />
          <span class="cart-label">Cart</span>
          <span class="cart-count" aria-hidden="true">{{ count }}</span>
        </button>
        <button ref="toggle" class="icon-button nav-toggle" type="button" :aria-expanded="expanded" aria-controls="main-navigation" :aria-label="expanded ? 'Close navigation' : 'Open navigation'" @click="expanded = !expanded">
          <X v-if="expanded" :size="21" aria-hidden="true" />
          <Menu v-else :size="21" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
</template>
