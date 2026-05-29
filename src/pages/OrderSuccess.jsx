import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ORDER_SUCCESS_FLAG } from '../lib/orderConstants'
import { site } from '../data/siteInfo'
import './Pages.css'

export default function OrderSuccess() {
  const navigate = useNavigate()
  const [allowed] = useState(() => sessionStorage.getItem(ORDER_SUCCESS_FLAG) === '1')

  useEffect(() => {
    if (!allowed) {
      navigate('/', { replace: true })
      return
    }
    return () => {
      sessionStorage.removeItem(ORDER_SUCCESS_FLAG)
    }
  }, [allowed, navigate])

  if (!allowed) {
    return null
  }

  return (
    <div className="page page--narrow order-success">
      <div className="order-success-icon" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" opacity="0.35" />
          <path
            d="M20 32l8 8 16-16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 className="page-title order-success-title">Заказ оформлен</h1>
      <p className="order-success-text">
        Спасибо за покупку! Мы получили вашу заявку —{' '}
        <strong>наш консультант свяжется с вами в ближайшее время</strong>, чтобы подтвердить детали
        заказа, доставку и оплату.
      </p>
      <p className="order-success-hint">
        Срочный вопрос:{' '}
        <a href={`tel:${site.phoneTel}`} className="inline-link">
          {site.phone}
        </a>
        {' '}
        ({site.city}) ·{' '}
        <a href={`mailto:${site.emailOrders}`} className="inline-link">
          {site.emailOrders}
        </a>
        <br />
        Режим работы: {site.hours}
      </p>
      <Link to="/" className="btn btn--primary btn--large order-success-btn">
        На главную
      </Link>
    </div>
  )
}
