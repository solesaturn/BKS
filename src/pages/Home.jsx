import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { formatPrice } from '../lib/formatPrice'
import heroLeather from '../assets/leather.jpg'
import './Pages.css'

const firstBag = products.find((p) => p.category === 'Сумки')
const firstWallet = products.find((p) => p.category === 'Кошельки')
const firstBelt = products.find((p) => p.category === 'Аксессуары')
const splitImage = products.find((p) => p.name.includes('Исход')) || firstBag

const heroImage = heroLeather

const showcase = [
  {
    title: 'Сумки',
    subtitle: 'От дорожных до городских',
    image: firstBag?.image,
    to: '/catalog',
  },
  {
    title: 'Кошельки',
    subtitle: 'Портмоне и компактные модели',
    image: firstWallet?.image,
    to: '/catalog',
  },
  {
    title: 'Ремни',
    subtitle: 'Классика и акцентные модели',
    image: firstBelt?.image,
    to: '/catalog',
  },
]

const stats = [
  { value: '12+', label: 'лет на рынке' },
  { value: '4.9', label: 'средняя оценка' },
  { value: 'РФ', label: 'доставка по стране' },
  { value: '100%', label: 'натуральная кожа' },
]

const steps = [
  {
    n: '01',
    title: 'Выберите в каталоге',
    text: 'Сумки, кошельки и ремни — фото и описания соответствуют реальным изделиям БКС.',
  },
  {
    n: '02',
    title: 'Оформите заказ',
    text: 'Оставьте телефон в корзине — консультант уточнит детали и способ оплаты.',
  },
  {
    n: '03',
    title: 'Получите посылку',
    text: 'Аккуратная упаковка и отслеживание — чтобы изделие доехало в идеальном виде.',
  },
]

const featured = products.slice(0, 4)

export default function Home() {
  return (
    <>
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-hidden
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">БКС · Натуральная кожа · Ручная работа</p>
          <h1 className="hero-title">Сумки и аксессуары, которые служат годами</h1>
          <p className="hero-lead">
            Подбираем кожу и фурнитуру так, чтобы вещь носилась долго и выглядела дорого. В каталоге —
            сумки, кошельки и ремни в едином стиле БКС.
          </p>
          <div className="hero-actions">
            <Link to="/catalog" className="btn btn--primary">
              Смотреть каталог
            </Link>
            <Link to="/cart" className="btn btn--ghost">
              Перейти в корзину
            </Link>
          </div>
          <p className="hero-trust">
            Шоурум в центре Санкт-Петербурга · консультация и примерка по записи
          </p>
        </div>
      </section>

      <section className="home-stats" aria-label="Коротко о нас">
        <div className="section-inner home-stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="home-stat">
              <span className="home-stat-value">{s.value}</span>
              <span className="home-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <h2 className="section-title">Коллекции</h2>
          <p className="section-intro">
            Три направления — выберите, что ближе, и перейдите в каталог за полным ассортиментом.
          </p>
          <div className="showcase-grid">
            {showcase.map((item) => (
              <Link key={item.title} to={item.to} className="showcase-card">
                <div
                  className="showcase-card-bg"
                  style={
                    item.image ? { backgroundImage: `url(${item.image})` } : undefined
                  }
                  aria-hidden
                />
                <div className="showcase-card-overlay" />
                <div className="showcase-card-text">
                  <h3 className="showcase-card-title">{item.title}</h3>
                  <p className="showcase-card-sub">{item.subtitle}</p>
                  <span className="showcase-card-cta">Смотреть →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="section-inner">
          <h2 className="section-title">Хиты сезона</h2>
          <p className="section-intro">Популярные позиции — добавьте в корзину в пару кликов.</p>
          <div className="home-featured-grid">
            {featured.map((p) => (
              <article key={p.id} className="home-featured-card">
                <Link to={`/catalog/${p.id}`} className="home-featured-link">
                  <div className="home-featured-img-wrap">
                    <img src={p.image} alt="" loading="lazy" width={280} height={210} />
                  </div>
                  <h3 className="home-featured-name">{p.name}</h3>
                  <p className="home-featured-price">{formatPrice(p.price)}</p>
                </Link>
              </article>
            ))}
          </div>
          <div className="home-featured-more">
            <Link to="/catalog" className="btn btn--primary">
              Весь каталог
            </Link>
          </div>
        </div>
      </section>

      <section className="section split-section">
        <div className="section-inner split-inner">
          <div
            className="split-visual"
            style={
              splitImage?.image
                ? {
                    backgroundImage: `url(${splitImage.image})`,
                  }
                : undefined
            }
            role="img"
            aria-label=""
          />
          <div className="split-content">
            <h2 className="split-title">Материал, который чувствуется</h2>
            <p className="split-text">
              Мы работаем с плотной кожей с ровной фактурой: она не «ломается» на сгибах и со временем
              приобретает благородную патину. Фурнитура — с защитой от коррозии, швы прошиваем
              усиленной нитью.
            </p>
            <ul className="split-list">
              <li>Контроль партий перед раскроем</li>
              <li>Рекомендации по уходу с каждой покупкой</li>
              <li>Возможность индивидуального заказа — уточняйте у консультанта</li>
            </ul>
            <Link to="/about" className="btn btn--ghost">
              Подробнее о БКС
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <h2 className="section-title">Почему выбирают нас</h2>
          <div className="features">
            <article className="feature">
              <h3>Качество кожи</h3>
              <p>
                Работаем только с проверенными поставщиками. Кожа проходит контроль на толщину,
                однородность и устойчивость к износу.
              </p>
            </article>
            <article className="feature">
              <h3>Срок службы</h3>
              <p>
                Правильный уход продлевает жизнь изделия. Мы даём рекомендации по хранению и
                обработке кожаных вещей.
              </p>
            </article>
            <article className="feature">
              <h3>Доставка</h3>
              <p>
                Отправляем заказы по всей России. Упаковка защищает изделие при транспортировке.
                Сроки уточняйте при оформлении.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="section-inner">
          <h2 className="section-title">Как это работает</h2>
          <div className="steps-grid">
            {steps.map((step) => (
              <div key={step.n} className="step-card">
                <span className="step-num">{step.n}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <div className="section-inner">
          <blockquote className="home-quote">
            <p>
              «Заказывала сумку БКС в подарок — упаковка аккуратная, кожа на ощупь просто супер.
              Консультант помог с размером, всё приехало в срок.»
            </p>
            <footer>— Анна, Санкт-Петербург</footer>
          </blockquote>
        </div>
      </section>

      <section className="section section--alt">
        <div className="section-inner cta-block">
          <div>
            <h2 className="section-title section-title--left">Готовы подобрать модель?</h2>
            <p className="cta-text">
              Загляните в каталог или соберите корзину — мы перезвоним, ответим на вопросы и поможем с
              размером и цветом.
            </p>
          </div>
          <div className="cta-buttons">
            <Link to="/catalog" className="btn btn--primary btn--large">
              Перейти в каталог
            </Link>
            <Link to="/contact" className="btn btn--ghost btn--large">
              Задать вопрос
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
