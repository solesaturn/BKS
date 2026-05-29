import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { site } from '../data/siteInfo'
import './Layout.css'

const nav = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/cart', label: 'Корзина', cart: true },
  { to: '/about', label: 'О нас' },
  { to: '/contact', label: 'Контакты' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { totalItems } = useCart()
  const { pathname } = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
            БКС
          </NavLink>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`nav ${open ? 'nav--open' : ''}`}>
            {nav.map(({ to, label, cart }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => {
                  const active =
                    to === '/catalog' ? pathname.startsWith('/catalog') : isActive
                  return `nav-link${active ? ' nav-link--active' : ''}${cart ? ' nav-link--cart' : ''}`
                }}
                onClick={() => setOpen(false)}
                end={to === '/'}
              >
                {label}
                {cart && totalItems > 0 && (
                  <span className="cart-badge" aria-label={`Товаров в корзине: ${totalItems}`}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <strong>БКС</strong>
            <p className="footer-muted">
              Сумки, кошельки и одежда из натуральной кожи. Доставка по России.
            </p>
          </div>
          <div>
            <strong>Контакты</strong>
            <p className="footer-muted">
              <a href={`mailto:${site.emailOrders}`} className="footer-link">
                {site.emailOrders}
              </a>
              <br />
              <a href={`tel:${site.phoneTel}`} className="footer-link">
                {site.phone}
              </a>
            </p>
          </div>
          <div>
            <strong>Шоурум</strong>
            <p className="footer-muted">
              г. {site.city}
              <br />
              {site.address}
              <br />
              {site.hours}
            </p>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} {site.legalName}. ИНН {site.inn}, ОГРН {site.ogrn}
        </p>
      </footer>
    </div>
  )
}
