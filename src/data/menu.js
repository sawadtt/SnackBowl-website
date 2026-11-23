import { snackbowlMenu } from './snackbowl-menu.js'

export { categories } from './snackbowl-menu.js'
export { default as heroImage } from '../assets/images/loaded-fries-hero.webp'

const productImages = {
  'classic-loaded-fries': 'classic-loaded-fries-bowl.webp',
  'spicy-loaded-fries': 'special-spicy-loaded-fries-bowl.webp',
  'salted-fries-bowl': 'salted-fries-bowl.webp',
  'peri-peri-fries-bowl': 'peri-peri-fries-bowl.webp',
  'fried-chicken-shawarma-roll': 'fried-chicken-shawarma-roll-medium.webp',
  'zinger-burger': 'zinger-burger.webp',
  'cheesy-zinger-burger': 'cheesy-zinger-burger.webp',
  'tender-coconut-shake': 'tender-coconut-shake.webp',
  'mango-shake': 'mango-shake.webp',
  'chikku-shake': 'chikku-shake.webp',
  'blue-curacao-mojito': 'blue-curacao-mojito.webp',
  'mint-mojito': 'mint-mojito.webp',
  'green-apple-mojito': 'green-apple-mojito.webp',
}

const featuredIds = new Set([
  'classic-loaded-fries',
  'spicy-loaded-fries',
  'fried-chicken-shawarma-roll',
  'zinger-burger',
])

export const menu = snackbowlMenu.map(product => {
  const filename = productImages[product.id]
  return {
    ...product,
    image: filename ? `${import.meta.env.BASE_URL}images/products/${filename}` : undefined,
    featured: featuredIds.has(product.id),
  }
})

export const contactNumber = '919495279061'
export const formatPrice = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
}).format
