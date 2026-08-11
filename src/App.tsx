import { useState } from 'react'
import './App.css'
import { CustomerWorkspace } from './features/customers/CustomerWorkspace'
import { QuoteWorkspace } from './features/quotations/QuoteWorkspace'
import { RateCardWorkspace } from './features/rate-cards/RateCardWorkspace'
import { SettingsWorkspace } from './features/settings/SettingsWorkspace'

type Workspace = 'quotes' | 'customers' | 'rate-cards' | 'settings'

const navigation: Array<{ id: Workspace; tamil: string; english: string }> = [
  { id: 'quotes', tamil: 'மேற்கோள்கள்', english: 'Quotes' },
  { id: 'customers', tamil: 'வாடிக்கையாளர்கள்', english: 'Customers' },
  { id: 'rate-cards', tamil: 'விலை அட்டைகள்', english: 'Rate cards' },
  { id: 'settings', tamil: 'அமைப்புகள்', english: 'Settings' },
]

function App() {
  const [workspace, setWorkspace] = useState<Workspace>('quotes')
  const [isTamil, setIsTamil] = useState(true)

  const copy = isTamil
    ? {
        eyebrow: 'V.R.S. Electrical Works',
        title: 'புதிய மேற்கோளைத் தொடங்குங்கள்',
        description:
          'அங்கீகரிக்கப்பட்ட விலை அட்டையிலிருந்து பொருட்களைத் தேர்ந்தெடுத்து, உங்கள் வாடிக்கையாளருக்கான மேற்கோளை உருவாக்குங்கள்.',
        newQuote: 'புதிய மேற்கோள்',
        draft: 'வரைவு',
        customer: 'வாடிக்கையாளர்',
        customerHint: 'முதலில் வாடிக்கையாளரைத் தேர்ந்தெடுக்கவும்',
        items: 'பணிகள் மற்றும் பொருட்கள்',
        itemsHint: 'விலை அட்டையை இணைத்த பின் பொருட்களைச் சேர்க்கலாம்.',
        pricing: 'விலை பாதுகாப்பு',
        pricingText:
          'இந்த மேற்கோளில் விலை எதுவும் இன்னும் சேர்க்கப்படவில்லை. விலைகள் அங்கீகரிக்கப்பட்ட தரவு மூலத்திலிருந்து மட்டுமே வரும்.',
        connectRates: 'விலை அட்டையை அமைக்கவும்',
        recent: 'சமீபத்திய மேற்கோள்கள்',
        recentHint: 'உங்கள் முதல் மேற்கோளை உருவாக்கியவுடன் அது இங்கே தோன்றும்.',
        total: 'மொத்தம்',
        unavailable: 'விலை அட்டை தேவை',
        language: 'English',
        nav: 'முதன்மை வழிசெலுத்தல்',
      }
    : {
        eyebrow: 'V.R.S. Electrical Works',
        title: 'Start a new quotation',
        description:
          'Choose approved items from a rate card and prepare a quote for your customer.',
        newQuote: 'New quotation',
        draft: 'Draft',
        customer: 'Customer',
        customerHint: 'Choose a customer to begin',
        items: 'Works and materials',
        itemsHint: 'Items can be added after a rate card is connected.',
        pricing: 'Pricing protection',
        pricingText:
          'This quotation has no prices yet. Prices will only come from an approved application data source.',
        connectRates: 'Set up rate card',
        recent: 'Recent quotations',
        recentHint: 'Your first quotation will appear here once it is created.',
        total: 'Total',
        unavailable: 'Rate card required',
        language: 'தமிழ்',
        nav: 'Primary navigation',
      }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#workspace" aria-label="V.R.S. SmartQuote home">
          <span className="brand-mark">VRS</span>
          <span>
            <strong>SmartQuote</strong>
            <small>Electrical Works</small>
          </span>
        </a>

        <nav aria-label={copy.nav}>
          {navigation.map((item) => (
            <button
              className={workspace === item.id ? 'nav-item active' : 'nav-item'}
              key={item.id}
              onClick={() => setWorkspace(item.id)}
              type="button"
            >
              <span aria-hidden="true">{item.id === 'quotes' ? '▣' : item.id === 'customers' ? '◉' : item.id === 'rate-cards' ? '▤' : '⚙'}</span>
              <span>{isTamil ? item.tamil : item.english}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="status-dot" />
          <span>{isTamil ? 'தரவு இணைப்பு தயாராகிறது' : 'Data connection pending'}</span>
        </div>
      </aside>

      <main id="workspace" className="workspace">
        <header className="topbar">
          <div className="mobile-brand">VRS <span>SmartQuote</span></div>
          <button className="language-button" onClick={() => setIsTamil((value) => !value)} type="button">
            {copy.language}
          </button>
          <button className="profile-button" type="button" aria-label="Account menu">RV</button>
        </header>

        {workspace === 'quotes' ? <QuoteWorkspace tamil={isTamil} /> : workspace === 'rate-cards' ? <RateCardWorkspace tamil={isTamil} /> : workspace === 'customers' ? <CustomerWorkspace tamil={isTamil} /> : workspace === 'settings' ? <SettingsWorkspace tamil={isTamil} /> : <div className="content">
          <section className="welcome">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1>{copy.title}</h1>
              <p className="lede">{copy.description}</p>
            </div>
            <button className="primary-button" type="button">
              <span aria-hidden="true">+</span> {copy.newQuote}
            </button>
          </section>

          <section className="quote-grid" aria-label={copy.newQuote}>
            <article className="quote-card form-card">
              <div className="card-heading">
                <div>
                  <p className="label">SQ-NEW</p>
                  <h2>{copy.draft}</h2>
                </div>
                <span className="draft-pill">{copy.draft}</span>
              </div>

              <button className="field-button" type="button">
                <span>
                  <strong>{copy.customer}</strong>
                  <small>{copy.customerHint}</small>
                </span>
                <span aria-hidden="true">›</span>
              </button>

              <div className="line-items">
                <div className="section-heading">
                  <div>
                    <strong>{copy.items}</strong>
                    <small>{copy.itemsHint}</small>
                  </div>
                  <button className="text-button" type="button" disabled>+ {isTamil ? 'சேர்க்கவும்' : 'Add'}</button>
                </div>
                <div className="empty-items">{copy.unavailable}</div>
              </div>

              <div className="quote-total">
                <span>{copy.total}</span>
                <strong>—</strong>
              </div>
            </article>

            <aside className="pricing-card">
              <div className="shield" aria-hidden="true">✓</div>
              <p className="label">{copy.pricing}</p>
              <h2>{isTamil ? 'விலை என்பது தரவு' : 'Pricing is data'}</h2>
              <p>{copy.pricingText}</p>
              <button className="secondary-button" type="button">{copy.connectRates} <span aria-hidden="true">→</span></button>
            </aside>
          </section>

          <section className="recent-section">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">{copy.recent}</p>
                <h2>{isTamil ? 'உங்கள் பணிப்பகுதி' : 'Your workspace'}</h2>
              </div>
              <button className="text-button" type="button">{isTamil ? 'அனைத்தையும் பார்க்கவும்' : 'View all'} →</button>
            </div>
            <div className="recent-empty">
              <div className="empty-icon" aria-hidden="true">▤</div>
              <p>{copy.recentHint}</p>
            </div>
          </section>
        </div>}
      </main>
    </div>
  )
}

export default App
