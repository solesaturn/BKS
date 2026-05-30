import { site } from '../data/siteInfo'
import teamPhoto from '../assets/team.png'
import './Pages.css'

export default function About() {
  return (
    <div className="page about-page">
      <header className="page-header about-page-header">
        <h1 className="page-title">О нас</h1>
        <p className="page-subtitle about-page-lead">
          {site.brand} — {site.brandFull}. Мастерская и шоурум в Приморском районе {site.city}.
        </p>
      </header>

      <div className="about-intro-grid">
        <figure className="about-team">
          <img
            src={teamPhoto}
            alt="Команда БКС — мастера, технологи и менеджеры студии"
            className="about-team-img"
            width={960}
            height={540}
            loading="eager"
          />
          <figcaption className="about-team-caption">
            Наша команда: мастера, технологи и менеджеры, которые отвечают за качество кожи, крой и
            общение с клиентами.
          </figcaption>
        </figure>

        <div className="about-intro-text">
          <p>
            Мы начали в 2013 году с небольшой мастерской на Петроградской стороне: трое мастеров,
            один раскройный стол и идея делать вещи, которые не стыдно носить пять лет подряд.
            Сегодня в команде {site.brand} — шесть кожевенников, технолог и отдел контроля качества.
            Часть моделей мы шьём полностью в {site.city}, часть — по нашим лекалам на партнёрской
            фабрике в Тверской области с нашим надзором на каждом этапе.
          </p>
          <p>
            В каталоге — только натуральная кожа: краст, крейзи хорс, итальянская наппа для лёгких
            сумок. Фурнитура — литая латунь и нержавеющая сталь с антикоррозийным покрытием. Каждое
            изделие перед отправкой проходит осмотр: ровность шва, работа молнии, отсутствие царапин
            на коже.
          </p>
        </div>
      </div>

      <section className="about-work" aria-labelledby="about-work-heading">
        <h2 id="about-work-heading" className="about-work-title">
          Как мы работаем
        </h2>
        <ul className="about-work-grid">
          <li>
            Шоурум в Приморском районе — можно примерить сумку или ремень по предварительной
            записи.
          </li>
          <li>
            Доставка по России курьерскими службами и до пунктов выдачи — сроки согласуем при заказе.
          </li>
          <li>
            Обмен и возврат — в течение 14 дней, если изделие не использовалось и сохранена упаковка.
          </li>
        </ul>
      </section>

      <section className="about-legal">
        <p>
          Юридическое лицо: {site.legalName}. ИНН {site.inn}, ОГРН {site.ogrn}. Юридический адрес
          совпадает с адресом шоурума: {site.legalAddress}.
        </p>
      </section>
    </div>
  )
}
