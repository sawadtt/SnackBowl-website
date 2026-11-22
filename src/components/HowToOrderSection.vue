<script setup>
import { BookOpen, MessageCircle, ShoppingBag } from '@lucide/vue'

const steps = [
  { icon: BookOpen, title: 'Explore the menu', detail: 'Pick what you’re craving.' },
  { icon: ShoppingBag, title: 'Add to your cart', detail: 'Choose your quantities and select pickup or delivery.' },
  { icon: MessageCircle, title: 'Send on WhatsApp', detail: 'Send the prepared message to our team for confirmation.' },
]
</script>

<template>
  <section id="how-to-order" class="section order-section shell" aria-labelledby="order-title">
    <h2 id="order-title">How to order</h2>
    <ol class="order-steps">
      <li v-for="(step, index) in steps" :key="step.title">
        <span class="step-icon" aria-hidden="true"><component :is="step.icon" :size="23" :stroke-width="1.8" /></span>
        <h3>{{ index + 1 }}. {{ step.title }}</h3>
        <p>{{ step.detail }}</p>
      </li>
    </ol>
  </section>
</template>
