<script setup>
import { MapPin, ShoppingBag } from '@lucide/vue'
import LoadedFriesAnimation from './LoadedFriesAnimation.vue'
defineEmits(['browse'])
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="shell hero-layout">
      <div class="hero-copy">
        <p class="eyebrow hero-location"><MapPin :size="16" aria-hidden="true" /> Kottakkal, Kerala</p>
        <h1 id="hero-title">Loaded with <span>flavour.</span></h1>
        <p class="hero-subtitle">Made for Your Cravings.</p>
        <p class="hero-description">Golden fries, crispy chicken, and rich creamy sauces.</p>
      </div>
      <div class="hero-actions">
        <a class="button button-gold" href="#menu" @click="$emit('browse')"><ShoppingBag :size="19" aria-hidden="true" /> Order Now</a>
        <a class="button button-outline" href="#menu" @click="$emit('browse')">Explore Menu</a>
      </div>
      <figure class="hero-figure">
        <div class="hero-stage">
          <div class="hero-halo" aria-hidden="true"></div>
          <LoadedFriesAnimation />
        </div>
        <figcaption class="hero-caption">
          <strong>Classic Loaded Fries</strong>
          <span>Illustrative image</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>
