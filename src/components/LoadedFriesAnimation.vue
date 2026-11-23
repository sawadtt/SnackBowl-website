<script setup>
import { onMounted, ref } from 'vue'
import fallbackImage from '../assets/images/loaded-fries-hero.webp'

// Export the four frames on the same transparent canvas, with an identical
// bowl position and crop. A complete, decodable set enables the assembly.
const assets = import.meta.glob('../assets/images/loaded-fries-{empty,fries,chicken,complete}.{webp,png}', {
  eager: true,
  import: 'default',
  query: '?url',
})
const stages = ['empty', 'fries', 'chicken', 'complete']
const frames = stages.map(stage => assets[`../assets/images/loaded-fries-${stage}.webp`]
  ?? assets[`../assets/images/loaded-fries-${stage}.png`])
const state = ref(frames.every(Boolean) ? 'loading' : 'fallback')

onMounted(async () => {
  if (state.value !== 'loading') return

  try {
    const sizes = await Promise.all(frames.map(async source => {
      const image = new Image()
      image.src = source
      await image.decode()
      return `${image.naturalWidth}x${image.naturalHeight}`
    }))
    state.value = sizes.every(size => size === sizes[0]) ? 'staged' : 'fallback'
  } catch {
    state.value = 'fallback'
  }
})
</script>

<template>
  <div class="fries-art" :class="`is-${state}`" role="img" aria-label="Classic Loaded Fries with crispy chicken, light-orange sauce and white mayonnaise">
    <img v-if="state !== 'staged'" class="fries-fallback" :src="fallbackImage" alt="" width="1100" height="733" fetchpriority="high" />
    <img v-if="state === 'loading'" class="fries-preview" :src="frames[0]" alt="" @error="state = 'fallback'" />
    <template v-if="state === 'staged'">
      <img v-for="(stage, index) in stages" :key="stage" class="fries-frame" :class="`fries-frame--${stage}`" :src="frames[index]" alt="" />
    </template>
  </div>
</template>

<style scoped>
.fries-art {
  position: relative;
  width: 100%;
  aspect-ratio: 1100 / 733;
  filter: drop-shadow(0 14px 12px #140a0770);
}

.fries-art img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.is-loading .fries-fallback { visibility: hidden; }
.is-fallback { animation: bowl-arrive 850ms cubic-bezier(.17,.72,.25,1) both; }

.is-staged { animation: bowl-settle 3s both; }
.fries-frame--empty { animation: empty-frame 3s both; }
.fries-frame--fries { animation: fries-frame 3s both; }
.fries-frame--chicken { animation: chicken-frame 3s both; }
.fries-frame--complete { animation: complete-frame 3s both; }

@keyframes bowl-arrive {
  from { opacity: .55; transform: translateY(.6rem) scale(.975); }
  to { opacity: 1; transform: none; }
}
@keyframes bowl-settle {
  0%, 80% { transform: translateY(.35rem) scale(.98); }
  100% { transform: none; }
}
@keyframes empty-frame {
  0%, 28% { opacity: 1; }
  29%, 100% { opacity: 0; }
}
@keyframes fries-frame {
  0%, 19% { opacity: 0; }
  28%, 52% { opacity: 1; }
  53%, 100% { opacity: 0; }
}
@keyframes chicken-frame {
  0%, 42% { opacity: 0; }
  52%, 77% { opacity: 1; }
  78%, 100% { opacity: 0; }
}
@keyframes complete-frame {
  0%, 65% { opacity: 0; }
  77%, 100% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .is-loading .fries-fallback { visibility: visible; }
  .fries-preview, .fries-frame:not(.fries-frame--complete) { display: none; }
}
</style>
