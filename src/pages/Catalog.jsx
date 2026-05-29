import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../lib/formatPrice'
import './Pages.css'

export default function Catalog() {
  const [filter, setFilter] = useState('Все')
  const { addItem } = useCart()

  const list = useMemo(() => {
    if (filter === 'Все') return products
    return products.filter((p) => p.category === filter)
  }, [filter])

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Каталог</h1>
        <p className="page-subtitle">
          Сумки, кошельки, одежда и аксессуары из кожи. Выберите позиции и оформите заказ — корзина
          сохранится, если вы вернётесь на сайт с этого устройства.
        </p>
      </header>

      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-btn${filter === c ? ' filter-btn--active' : ''}`}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="product-grid">
        {list.map((p) => (
          <li key={p.id} className="product-card">
            <Link to={`/catalog/${p.id}`} className="product-card-image-link" tabIndex={-1}>
              <div className="product-card-image-wrap">
                <img
                  src={p.image}
                  alt=""
                  className="product-card-image"
                  loading="lazy"
                  width={450}
                  height={340}
                />
              </div>
            </Link>
            <div className="product-card-body">
              <span className="product-card-cat">{p.category}</span>
              <h2 className="product-card-name">
                <Link to={`/catalog/${p.id}`} className="product-card-title-link">
                  {p.name}
                </Link>
              </h2>
              <p className="product-card-desc">{p.description}</p>
              <p className="product-card-price">{formatPrice(p.price)}</p>
              <div className="product-card-actions">
                <button
                  type="button"
                  className="btn btn--primary btn--small"
                  onClick={() => addItem(p.id, 1)}
                >
                  В корзину
                </button>
                <Link to={`/catalog/${p.id}`} className="btn btn--ghost btn--small">
                  Подробнее
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {list.length === 0 && (
        <p className="empty-msg">В этой категории сейчас нет позиций — выберите другой раздел.</p>
      )}
    </div>
  )
}
