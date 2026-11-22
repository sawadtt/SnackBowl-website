<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import BestsellersSection from './components/BestsellersSection.vue'
import CategoriesSection from './components/CategoriesSection.vue'
import OffersSection from './components/OffersSection.vue'
import HowToOrderSection from './components/HowToOrderSection.vue'
import FooterSection from './components/FooterSection.vue'
import CartDrawer from './components/CartDrawer.vue'
import { useCart } from './composables/useCart.js'

const selected = ref('All items')
const drawer = ref(null)
const cartStatus = ref('')
const { items, count, subtotal, change, remove, maxQuantity } = useCart()

function add(product) {
  const previousCount = count.value
  change(product.id, 1)
  cartStatus.value = count.value === previousCount
    ? `The cart already contains ${maxQuantity} of this item.`
    : `Added ${product.name} to your cart. ${count.value} items in cart.`
}
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div id="home">
    <Navbar :count="count" @open-cart="drawer.open()" @browse="selected = 'All items'" />
    <main id="main" tabindex="-1">
      <HeroSection @browse="selected = 'All items'" />
      <BestsellersSection :selected="selected" @select="selected = $event" @add="add" />
      <CategoriesSection @select="selected = $event" />
      <OffersSection />
      <HowToOrderSection />
    </main>
    <FooterSection @browse="selected = 'All items'" />
  </div>
  <p role="status" class="sr-only">{{ cartStatus }}</p>
  <CartDrawer ref="drawer" :items="items" :subtotal="subtotal" :max-quantity="maxQuantity" @change="change" @remove="remove" />
</template>
