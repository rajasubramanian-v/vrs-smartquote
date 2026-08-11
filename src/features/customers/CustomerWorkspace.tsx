import { useEffect, useState } from 'react'
import './CustomerWorkspace.css'

type Customer = { id: string; name: string; phone: string; site: string }
const storageKey = 'vrs-smartquote.customers.v1'

function loadCustomers(): Customer[] {
  try { return JSON.parse(localStorage.getItem(storageKey) ?? '[]') as Customer[] } catch { return [] }
}

export function CustomerWorkspace({ tamil }: { tamil: boolean }) {
  const [customers, setCustomers] = useState<Customer[]>(loadCustomers)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [site, setSite] = useState('')
  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(customers)) }, [customers])

  const text = tamil
    ? { eyebrow: 'வாடிக்கையாளர் தரவு', title: 'வாடிக்கையாளர்கள்', intro: 'வாடிக்கையாளர் மற்றும் பணி இட விவரங்களை ஒருமுறை சேமித்து, ஒவ்வொரு மேற்கோளிலும் பயன்படுத்துங்கள்.', add: 'புதிய வாடிக்கையாளர்', none: 'வாடிக்கையாளர்கள் இன்னும் இல்லை', noneInfo: 'உங்கள் முதல் மேற்கோளுக்காக ஒரு வாடிக்கையாளரைச் சேர்க்கவும்.', name: 'வாடிக்கையாளர் பெயர்', phone: 'தொலைபேசி எண்', site: 'பணி இடம் / முகவரி', save: 'வாடிக்கையாளரைச் சேமிக்கவும்', cancel: 'ரத்துசெய்', saved: 'சேமிக்கப்பட்ட வாடிக்கையாளர்கள்', optional: 'விருப்பமானது' }
    : { eyebrow: 'Customer data', title: 'Customers', intro: 'Save customer and site details once, then use them across quotations.', add: 'New customer', none: 'No customers yet', noneInfo: 'Add a customer for your first quotation.', name: 'Customer name', phone: 'Phone number', site: 'Work site / address', save: 'Save customer', cancel: 'Cancel', saved: 'Saved customers', optional: 'Optional' }

  function saveCustomer() {
    if (!name.trim()) return
    setCustomers((current) => [...current, { id: crypto.randomUUID(), name: name.trim(), phone: phone.trim(), site: site.trim() }])
    setName(''); setPhone(''); setSite(''); setShowForm(false)
  }

  return <div className="customer-workspace">
    <section className="customer-header"><div><p className="eyebrow">{text.eyebrow}</p><h1>{text.title}</h1><p>{text.intro}</p></div><button className="primary-button" type="button" onClick={() => setShowForm(true)}><span aria-hidden="true">+</span> {text.add}</button></section>
    {showForm && <section className="customer-form customer-surface"><div className="customer-fields"><label>{text.name}<input autoFocus value={name} onChange={(event) => setName(event.target.value)} /></label><label>{text.phone} <small>{text.optional}</small><input inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} /></label><label className="site-field">{text.site} <small>{text.optional}</small><input value={site} onChange={(event) => setSite(event.target.value)} /></label></div><div className="customer-actions"><button type="button" className="text-button" onClick={() => setShowForm(false)}>{text.cancel}</button><button type="button" className="primary-button" disabled={!name.trim()} onClick={saveCustomer}>{text.save}</button></div></section>}
    <section className="customer-list customer-surface"><div className="customer-list-title"><p className="label">{text.saved}</p><span>{customers.length}</span></div>{customers.length === 0 ? <div className="customer-empty"><div aria-hidden="true">◉</div><h2>{text.none}</h2><p>{text.noneInfo}</p></div> : <div className="customer-grid">{customers.map((customer) => <article className="customer-card" key={customer.id}><div className="customer-avatar">{customer.name.slice(0, 1).toUpperCase()}</div><div><h2>{customer.name}</h2>{customer.phone && <p>{customer.phone}</p>}{customer.site && <p>{customer.site}</p>}</div></article>)}</div>}</section>
  </div>
}
