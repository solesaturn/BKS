import { useState } from 'react'
import { site } from '../data/siteInfo'
import './Pages.css'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="page page--narrow">
      <header className="page-header">
        <h1 className="page-title">Контакты</h1>
        <p className="page-subtitle">
          Шоурум и офис в {site.city}. Звоните в рабочие часы или напишите — ответим в день обращения.
        </p>
      </header>

      <div className="contact-grid">
        <div className="contact-card">
          <h2 className="contact-card-title">Связь</h2>
          <p>
            Заказы и вопросы по ассортименту:{' '}
            <a href={`mailto:${site.emailOrders}`} className="inline-link">
              {site.emailOrders}
            </a>
          </p>
          <p>
            Общие вопросы:{' '}
            <a href={`mailto:${site.emailInfo}`} className="inline-link">
              {site.emailInfo}
            </a>
          </p>
          <p>
            Телефон:{' '}
            <a href={`tel:${site.phoneTel}`} className="inline-link">
              {site.phone}
            </a>
          </p>
          <p className="contact-muted">
            {site.hours}. Перед визитом в шоурум лучше договориться о времени — так мы сможем
            уделить вам внимание без очереди.
          </p>
        </div>

        <div className="contact-card">
          <h2 className="contact-card-title">Как нас найти</h2>
          <p>
            {site.postal}, г. {site.city}
            <br />
            {site.address}
          </p>
          <p className="contact-muted">{site.metro}</p>
          <p className="contact-muted">
            {site.legalName} · ИНН {site.inn}
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2 className="contact-card-title" style={{ marginTop: 0 }}>
            Написать нам
          </h2>
          <label className="field">
            <span className="field-label">Имя</span>
            <input type="text" name="name" placeholder="Иван Петров" required />
          </label>
          <label className="field">
            <span className="field-label">Email</span>
            <input type="email" name="email" placeholder="ivanov@mail.ru" required />
          </label>
          <label className="field">
            <span className="field-label">Сообщение</span>
            <textarea
              name="message"
              rows={5}
              placeholder="Вопрос по размеру, доставке в другой город или сотрудничеству"
              required
            />
          </label>
          <button type="submit" className="btn btn--primary">
            Отправить
          </button>
          {sent && (
            <p className="form-note" role="status">
              Спасибо! Сообщение получено — менеджер свяжется с вами в ближайшие рабочие часы.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
