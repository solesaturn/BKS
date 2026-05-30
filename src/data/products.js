import { productDescriptions } from './productDescriptions.js'

const imageModules = import.meta.glob('../assets/products/*.{jpg,jpeg,JPG}', {
  eager: true,
  import: 'default',
})

function leadingNumber(path) {
  const name = path.split('/').pop() || ''
  const m = name.match(/^(\d+)/)
  return m ? parseInt(m[1], 10) : 9999
}

/** Имя для витрины: убираем номер в начале файла и расширение. */
export function displayNameFromFilename(filename) {
  const base = filename.replace(/\.(jpe?g|png|webp)$/i, '')
  let s = base.replace(/^\d+\.?\s*/, '').trim()
  s = s.replace(/\.{2,}/g, '.')
  s = s.replace(/\.+$/g, '')
  // Орфографическая нормализация для витрины: "кожаный" пишется с одной "н".
  s = s.replace(/\bКожанн/g, 'Кожан')
  s = s.replace(/\bкожанн/g, 'кожан')
  if (s.length) {
    s = s.charAt(0).toUpperCase() + s.slice(1)
  }
  s = s.replace(/^Кошелек\b/i, 'Кошелёк')
  return s
}

function categoryFromFilename(filename) {
  const lower = filename.toLowerCase()
  if (lower.includes('сумка')) return 'Сумки'
  if (lower.includes('кошелек')) return 'Кошельки'
  if (lower.includes('ремень')) return 'Аксессуары'
  return 'Аксессуары'
}

const sortedPaths = Object.keys(imageModules).sort((a, b) => leadingNumber(a) - leadingNumber(b))

if (sortedPaths.length !== productDescriptions.length) {
  console.warn(
    `[products] Файлов: ${sortedPaths.length}, описаний: ${productDescriptions.length}. Проверьте productDescriptions.js.`,
  )
}

export const products = sortedPaths.map((path, index) => {
  const filename = path.split('/').pop()
  const id = String(index + 1)
  const name = displayNameFromFilename(filename)
  const category = categoryFromFilename(filename)
  const image = imageModules[path]
  const copy = productDescriptions[index] || {
    price: 5000,
    description: 'Изделие из натуральной кожи.',
    story: 'Описание уточняется.',
    details: [],
    highlights: [],
    specs: [{ label: 'Материал', value: 'натуральная кожа' }],
  }

  return {
    id,
    name,
    category,
    image,
    ...copy,
    details: copy.details || [],
    highlights: copy.highlights || [],
    specs: copy.specs || [],
  }
})

export const categories = ['Все', 'Сумки', 'Кошельки', 'Аксессуары']

export function getProductById(id) {
  return products.find((p) => p.id === id)
}
