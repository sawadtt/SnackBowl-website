<script setup>
import { TicketPercent } from '@lucide/vue'
</script>

<template>
  <section id="offers" class="section shell" aria-labelledby="offers-title">
    <div class="offer-panel">
      <div>
        <h2 id="offers-title">Offers</h2>
        <p>Check back here for future offers.</p>
      </div>
      <TicketPercent class="offer-icon" :size="84" :stroke-width="1.25" aria-hidden="true" />
    </div>
  </section>
</template>
