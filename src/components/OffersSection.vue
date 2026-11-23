<script setup>
import { TicketPercent } from '@lucide/vue'

defineEmits(['browse'])
</script>

<template>
  <section id="offers" class="section shell" aria-labelledby="offers-title">
    <div class="offer-panel">
      <div>
        <h2 id="offers-title">Offers</h2>
        <p>Find the listed Swiggy and Zomato offers on menu items marked with an offer label.</p>
        <a class="button button-gold" href="#menu" @click="$emit('browse')">View Menu</a>
      </div>
      <TicketPercent class="offer-icon" :size="84" :stroke-width="1.25" aria-hidden="true" />
    </div>
  </section>
</template>
