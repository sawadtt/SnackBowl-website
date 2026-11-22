const images = import.meta.glob('../assets/images/*.webp', {
  eager: true,
  import: 'default',
  query: '?url',
})

export const heroImage = images['../assets/images/loaded-fries-hero.webp']

// Leave unconfirmed prices as null. Add verified prices in rupees here.
export const menu = [
  {
    id: 'classic-loaded-fries',
    name: 'Classic Loaded Fries',
    category: 'Loaded Fries',
    description: 'Golden fries, crispy chicken and a double drizzle of creamy sauces.',
    price: null,
    image: images['../assets/images/classic-loaded-fries.webp'],
    available: true,
    featured: true,
  },
  {
    id: 'spicy-loaded-fries',
    name: 'Spicy Loaded Fries',
    category: 'Loaded Fries',
    description: 'Crispy chicken and golden fries with a kick of spicy sauce.',
    price: null,
    image: images['../assets/images/spicy-loaded-fries.webp'],
    available: true,
    featured: true,
  },
  {
    id: 'fried-chicken-shawarma-roll',
    name: 'Fried Chicken Shawarma Roll',
    category: 'Rolls & Wraps',
    description: 'Crispy fried chicken wrapped in soft flatbread.',
    price: null,
    image: images['../assets/images/fried-chicken-shawarma-roll.webp'],
    available: true,
    featured: true,
  },
  {
    id: 'zinger-burger',
    name: 'Zinger Burger',
    category: 'Burgers',
    description: 'Crunchy fried chicken tucked into a soft toasted bun.',
    price: null,
    image: images['../assets/images/zinger-burger.webp'],
    available: true,
    featured: true,
  },
]

export const categories = ['Loaded Fries', 'Rolls & Wraps', 'Burgers', 'Snacks', 'Drinks']
export const contactNumber = '919495279061'
export const formatPrice = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
}).format
