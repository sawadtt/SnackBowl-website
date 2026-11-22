<script setup>
import { contactNumber } from '../data/menu.js'
defineEmits(['browse'])
</script>

<template>
  <footer class="site-footer">
    <div class="shell footer-inner">
      <div>
        <a class="wordmark" href="#home">Snack <span>Bowl</span></a>
        <p>Kottakkal, Kerala</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="#menu" @click="$emit('browse')">Menu</a>
        <a href="#offers">Offers</a>
        <a href="#how-to-order">How to Order</a>
      </nav>
      <div class="footer-contact">
        <a :href="`https://wa.me/${contactNumber}`">WhatsApp +91 94952 79061</a>
        <a href="https://snackbold.in">snackbold.in</a>
      </div>
    </div>
  </footer>
</template>
