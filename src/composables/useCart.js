import { computed, ref, watch } from 'vue'
import { menu } from '../data/menu.js'

const storageKey = 'snack-bowl-cart'
const maxQuantity = 99
const products = new Map(menu.filter(product => product.available).map(product => [product.id, product]))

function restoreCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey))
    return Object.fromEntries(Object.entries(saved ?? {}).filter(([id, quantity]) =>
      products.has(id) && Number.isInteger(quantity) && quantity > 0 && quantity <= maxQuantity,
    ))
  } catch {
    return {}
  }
}

export function useCart() {
  const quantities = ref(restoreCart())
  const items = computed(() => Object.entries(quantities.value).map(([id, quantity]) => ({
    product: products.get(id),
    quantity,
  })))
  const count = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
  const subtotal = computed(() => {
    if (items.value.some(({ product }) => product.price === null)) return null
    return items.value.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)
  })

  watch(quantities, value => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value))
    } catch {
      // Keep the in-memory cart available when storage is disabled or full.
    }
  }, { deep: true, flush: 'sync' })

  function remove(id) {
    delete quantities.value[id]
  }

  function change(id, delta) {
    if (!products.has(id)) return
    const next = (quantities.value[id] ?? 0) + delta
    if (next <= 0) remove(id)
    else quantities.value[id] = Math.min(next, maxQuantity)
  }

  return { items, count, subtotal, change, remove, maxQuantity }
}
