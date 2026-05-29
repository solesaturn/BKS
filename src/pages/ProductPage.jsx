import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../lib/formatPrice'
import './Pages.css'

export default function ProductPage() {
  const { productId } = useParams()
  const product = getProductById(productId)
  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="page page--narrow">
        <h1 className="page-title">Товар не найден</h1>
        <p className="page-subtitle">Проверьте ссылку или вернитесь в каталог.</p>
        <Link to="/catalog" className="btn btn--primary">
          В каталог
        </Link>
      </div>
    )
  }

  return (
    <article className="product-detail">
      <nav className="product-breadcrumb" aria-label="Навигация">
        <Link to="/">Главная</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/catalog">Каталог</Link>
        <span aria-hidden="true"> / </span>
        <span className="product-breadcrumb-current">{product.name}</span>
      </nav>

      <div className="product-detail-grid">
        <div className="product-detail-gallery">
          <div className="product-detail-main-image">
            <img
              src={product.image}
              alt={product.name}
              width={720}
              height={540}
              loading="eager"
            />
          </div>
        </div>

        <div className="product-detail-info">
          <p className="product-detail-cat">{product.category}</p>
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">{formatPrice(product.price)}</p>
          <p className="product-detail-lead">{product.description}</p>

          <div className="product-detail-actions">
            <button
              type="button"
              className="btn btn--primary btn--large"
              onClick={() => addItem(product.id, 1)}
            >
              В корзину
            </button>
            <Link to="/cart" className="btn btn--ghost btn--large">
              Перейти в корзину
            </Link>
          </div>

          {product.highlights?.length > 0 && (
            <ul className="product-detail-highlights">
              {product.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="product-detail-body section-inner">
        <section className="product-detail-section">
          <h2 className="product-detail-h2">О модели</h2>
          <p className="product-detail-prose">{product.story}</p>
          {product.details?.map((para, idx) => (
            <p key={idx} className="product-detail-prose">
              {para}
            </p>
          ))}
        </section>

        <section className="product-detail-section">
          <h2 className="product-detail-h2">Характеристики</h2>
          <dl className="product-spec-table">
            {product.specs?.map((row) => (
              <div key={row.label} className="product-spec-row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="product-detail-section product-detail-note">
          <p>
            Нужен другой цвет или размер — напишите в{' '}
            <Link to="/contact" className="inline-link">
              контакты
            </Link>{' '}
            или оставьте комментарий при оформлении заказа: консультант уточнит наличие и срок.
          </p>
        </section>
      </div>

      <div className="product-detail-footer-nav">
        <Link to="/catalog" className="btn btn--ghost">
          ← Все товары
        </Link>
      </div>
    </article>
  )
}
