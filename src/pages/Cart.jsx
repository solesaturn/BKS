import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../lib/formatPrice'
import { ORDER_SUCCESS_FLAG } from '../lib/orderConstants'
import { site } from '../data/siteInfo'
import './Pages.css'

export default function Cart() {
  const navigate = useNavigate()
  const {
    items,
    totalPrice,
    increment,
    decrement,
    removeItem,
    clearCart,
  } = useCart()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()
    if (!trimmedName) {
      setError('Укажите имя.')
      return
    }
    if (!trimmedPhone) {
      setError('Укажите телефон для связи.')
      return
    }
    sessionStorage.setItem(ORDER_SUCCESS_FLAG, '1')
    clearCart()
    navigate('/order-success', { replace: true })
  }

  if (items.length === 0) {
    return (
      <div className="page page--narrow">
        <header className="page-header">
          <h1 className="page-title">Корзина</h1>
          <p className="page-subtitle">Пока пусто — добавьте товары из каталога.</p>
        </header>
        <Link to="/catalog" className="btn btn--primary">
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className="page cart-page">
      <header className="page-header cart-header">
        <div>
          <h1 className="page-title">Корзина</h1>
          <p className="page-subtitle">
            {items.length}{' '}
            {items.length === 1
              ? 'позиция'
              : items.length < 5
                ? 'позиции'
                : 'позиций'}
          </p>
        </div>
        <button type="button" className="btn btn--ghost btn--small" onClick={clearCart}>
          Очистить корзину
        </button>
      </header>

      <ul className="cart-lines">
        {items.map(({ product, quantity, lineTotal, productId }) => (
          <li key={productId} className="cart-line">
            <div className="cart-line-image-wrap">
              <img src={product.image} alt="" width={120} height={90} loading="lazy" />
            </div>
            <div className="cart-line-info">
              <h2 className="cart-line-name">
                <Link to={`/catalog/${productId}`} className="cart-line-title-link">
                  {product.name}
                </Link>
              </h2>
              <p className="cart-line-meta">
                {product.category} · {formatPrice(product.price)} за шт.
              </p>
              <div className="cart-line-actions">
                <div className="qty" role="group" aria-label="Количество">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => decrement(productId)}
                    aria-label="Уменьшить"
                  >
                    −
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => increment(productId)}
                    aria-label="Увеличить"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => removeItem(productId)}
                >
                  Удалить
                </button>
              </div>
            </div>
            <div className="cart-line-total">{formatPrice(lineTotal)}</div>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p className="cart-total-label">Итого</p>
        <p className="cart-total-value">{formatPrice(totalPrice)}</p>
      </div>

      <section className="checkout-block" aria-labelledby="checkout-heading">
        <h2 id="checkout-heading" className="checkout-heading">
          Оформление заказа
        </h2>
        <p className="checkout-lead">
          Оставьте контакты — менеджер {site.brand} перезвонит в рабочие часы, уточнит состав заказа,
          способ оплаты и доставку по {site.city} или в другой регион.
        </p>
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span className="field-label">Имя *</span>
            <input
              type="text"
              name="customerName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как к вам обращаться"
              autoComplete="name"
            />
          </label>
          <label className="field">
            <span className="field-label">Телефон *</span>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (812) 555-12-34"
              autoComplete="tel"
            />
          </label>
          <label className="field">
            <span className="field-label">Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Для чека и уведомлений"
              autoComplete="email"
            />
          </label>
          <label className="field">
            <span className="field-label">Комментарий к заказу</span>
            <textarea
              name="comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Адрес доставки, удобное время звонка и т.д."
            />
          </label>
          {error && (
            <p className="checkout-error" role="alert">
              {error}
            </p>
          )}
          <div className="cart-footer-actions cart-footer-actions--form">
            <Link to="/catalog" className="btn btn--ghost">
              ← К каталогу
            </Link>
            <button type="submit" className="btn btn--primary btn--large">
              Подтвердить заказ
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
