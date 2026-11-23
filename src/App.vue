<script setup>
import { computed, ref } from 'vue'
import { ShoppingBag } from '@lucide/vue'
import Navbar from './components/Navbar.vue'
// Uncomment this import and the HeroSection below to restore the homepage hero.
// import HeroSection from './components/HeroSection.vue'
import MenuSection from './components/MenuSection.vue'
import OffersSection from './components/OffersSection.vue'
import HowToOrderSection from './components/HowToOrderSection.vue'
import FooterSection from './components/FooterSection.vue'
import CartDrawer from './components/CartDrawer.vue'
import { useCart } from './composables/useCart.js'
import { formatPrice } from './data/menu.js'

const menuSection = ref(null)
const drawer = ref(null)
const cartStatus = ref('')
const { items, count, subtotal, change, remove, maxQuantity } = useCart()
const quantities = computed(() => Object.fromEntries(items.value.map(({ product, quantity }) => [product.id, quantity])))

function changeMenuQuantity(product, delta) {
  change(product.id, delta)
  const quantity = quantities.value[product.id] ?? 0
  cartStatus.value = quantity
    ? `${product.name}, quantity ${quantity}. ${count.value} in your cart.`
    : `Removed ${product.name}. ${count.value} in your cart.`
}
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div id="home" :class="{ 'has-mobile-cart': count }">
    <Navbar :count="count" @open-cart="drawer.open()" @browse="menuSection.reset()" />
    <main id="main" tabindex="-1">
      <!-- <HeroSection @browse="menuSection.reset()" /> -->
      <MenuSection ref="menuSection" :quantities="quantities" :max-quantity="maxQuantity" @change="changeMenuQuantity" />
      <OffersSection @browse="menuSection.reset()" />
      <HowToOrderSection />
    </main>
    <FooterSection @browse="menuSection.reset()" />
    <div v-if="count" class="mobile-cart-bar">
      <button class="button mobile-cart-button" type="button" @click="drawer.open()">
        <ShoppingBag :size="20" aria-hidden="true" />
        <span>View cart <span class="mobile-cart-count">· {{ count }} {{ count === 1 ? 'item' : 'items' }}</span></span>
        <strong v-if="subtotal !== null">{{ formatPrice(subtotal) }}</strong>
      </button>
    </div>
  </div>
  <p role="status" class="sr-only">{{ cartStatus }}</p>
  <CartDrawer ref="drawer" :items="items" :subtotal="subtotal" :max-quantity="maxQuantity" @change="change" @remove="remove" />
</template>
