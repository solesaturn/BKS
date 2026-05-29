import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import OrderSuccess from './pages/OrderSuccess'
import ProductPage from './pages/ProductPage'

/** ScrollRestoration требует data router; для BrowserRouter — скролл наверх при смене пути. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="page page--narrow">
      <h1 className="page-title">Страница не найдена</h1>
      <p className="page-subtitle">Проверьте адрес или вернитесь на главную.</p>
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:productId" element={<ProductPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order-success" element={<OrderSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
