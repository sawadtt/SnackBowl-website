<script setup>
import { MapPin, ShoppingBag } from '@lucide/vue'
import { heroImage } from '../data/menu.js'
defineEmits(['browse'])
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="shell hero-layout">
      <div class="hero-copy">
        <p class="eyebrow hero-location"><MapPin :size="16" aria-hidden="true" /> Kottakkal, Kerala</p>
        <h1 id="hero-title">Loaded with <span>flavour.</span></h1>
        <p class="hero-subtitle">Made for Your Cravings.</p>
        <p class="hero-description">Golden fries, crispy chicken, and rich creamy sauces. Discover your next favourite bite at Snack Bowl.</p>
      </div>
      <div class="hero-actions">
        <a class="button button-gold" href="#menu" @click="$emit('browse')"><ShoppingBag :size="19" aria-hidden="true" /> Order Now</a>
        <a class="button button-outline" href="#menu" @click="$emit('browse')">Explore Menu</a>
      </div>
      <figure class="hero-figure">
        <div class="hero-disc" aria-hidden="true"></div>
        <div class="hero-image-wrap">
          <img v-if="heroImage" class="hero-image" :src="heroImage" alt="A bowl of golden fries and crispy chicken drizzled with light-orange sauce and white mayonnaise" width="1100" height="733" fetchpriority="high" />
          <div v-else class="hero-image-placeholder">Product image placeholder</div>
        </div>
        <figcaption class="hero-caption">
          <strong>Classic Loaded Fries</strong>
          <span>{{ heroImage ? 'Illustrative image' : 'Photo coming soon' }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
