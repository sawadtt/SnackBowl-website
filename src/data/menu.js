import classicLoadedFries from '../assets/images/classic-loaded-fries.webp'
import spicyLoadedFries from '../assets/images/spicy-loaded-fries.webp'
import friedChickenShawarmaRoll from '../assets/images/fried-chicken-shawarma-roll.webp'
import zingerBurger from '../assets/images/zinger-burger.webp'
import { snackbowlMenu } from './snackbowl-menu.js'

export { categories } from './snackbowl-menu.js'
export { default as heroImage } from '../assets/images/loaded-fries-hero.webp'

const productImages = {
  'classic-loaded-fries': classicLoadedFries,
  'spicy-loaded-fries': spicyLoadedFries,
  'fried-chicken-shawarma-roll': friedChickenShawarmaRoll,
  'zinger-burger': zingerBurger,
}

const featuredIds = new Set([
  'classic-loaded-fries',
  'spicy-loaded-fries',
  'fried-chicken-shawarma-roll',
  'zinger-burger',
])

export const menu = snackbowlMenu.map(product => ({
  ...product,
  image: productImages[product.id],
  featured: featuredIds.has(product.id),
}))

export const contactNumber = '919495279061'
export const formatPrice = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
}).format
