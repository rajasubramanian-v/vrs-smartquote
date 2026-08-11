import { useEffect, useMemo, useState } from 'react'
import './RateCardWorkspace.css'

type RateItem = {
  id: string
  name: string
  unit: string
  amount: string
}

type RateCard = {
  id: string
  name: string
  effectiveFrom: string
  items: RateItem[]
}

const storageKey = 'vrs-smartquote.rate-cards.v1'

function readCards(): RateCard[] {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved ? (JSON.parse(saved) as RateCard[]) : []
  } catch {
    return []
  }
}

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`
}

export function RateCardWorkspace({ tamil }: { tamil: boolean }) {
  const [cards, setCards] = useState<RateCard[]>(readCards)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [isCreatingCard, setIsCreatingCard] = useState(false)
  const [cardName, setCardName] = useState('')
  const [effectiveFrom, setEffectiveFrom] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemUnit, setItemUnit] = useState('')
  const [itemAmount, setItemAmount] = useState('')

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cards))
  }, [cards])

  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedCardId) ?? null,
    [cards, selectedCardId],
  )

  const text = tamil
    ? {
        eyebrow: 'விலை தரவு', title: 'அங்கீகரிக்கப்பட்ட விலை அட்டைகள்', newCard: 'புதிய விலை அட்டை',
        intro: 'மேற்கோள்களில் பயன்படுத்தப்படும் விலைகளை இங்கே நிர்வகிக்கவும். மேற்கோள் உருவாக்கும்போது விலைகள் இந்த அட்டைகளிலிருந்து மட்டுமே பெறப்படும்.',
        none: 'இன்னும் விலை அட்டை இல்லை', noneInfo: 'முதல் அட்டையை உருவாக்கி உங்கள் அங்கீகரிக்கப்பட்ட விலைத் தரவைச் சேர்க்கவும்.',
        name: 'அட்டை பெயர்', date: 'செயல்படும் தேதி', save: 'விலை அட்டையைச் சேமிக்கவும்', cancel: 'ரத்துசெய்',
        items: 'அங்கீகரிக்கப்பட்ட உருப்படிகள்', addItem: 'உருப்படியைச் சேர்க்கவும்', itemName: 'உருப்படி / பணி பெயர்', unit: 'அலகு', rate: 'அங்கீகரிக்கப்பட்ட விலை (₹)', rateInfo: 'இங்கு சேமிக்கப்பட்ட விலைகள் மட்டுமே மேற்கோள் கணக்கீட்டில் பயன்படுத்தப்படும்.',
        emptyItems: 'இந்த விலை அட்டையில் இன்னும் உருப்படிகள் இல்லை.', rateCards: 'விலை அட்டைகள்', effective: 'செயல்படும்',
      }
    : {
        eyebrow: 'Pricing data', title: 'Approved rate cards', newCard: 'New rate card',
        intro: 'Manage the approved prices used in quotations. Quote prices will only be selected from these cards.',
        none: 'No rate cards yet', noneInfo: 'Create your first card to enter approved pricing data.',
        name: 'Rate card name', date: 'Effective from', save: 'Save rate card', cancel: 'Cancel',
        items: 'Approved items', addItem: 'Add item', itemName: 'Item / work name', unit: 'Unit', rate: 'Approved rate (₹)', rateInfo: 'Only prices saved here can be used in quote calculations.',
        emptyItems: 'This rate card has no items yet.', rateCards: 'Rate cards', effective: 'Effective',
      }

  function saveCard() {
    if (!cardName.trim()) return
    const card: RateCard = { id: createId('card'), name: cardName.trim(), effectiveFrom, items: [] }
    setCards((current) => [...current, card])
    setSelectedCardId(card.id)
    setCardName('')
    setEffectiveFrom('')
    setIsCreatingCard(false)
  }

  function addItem() {
    if (!selectedCard || !itemName.trim() || !itemUnit.trim() || !itemAmount.trim()) return
    const amount = Number(itemAmount)
    if (!Number.isFinite(amount) || amount < 0) return
    const item: RateItem = { id: createId('rate'), name: itemName.trim(), unit: itemUnit.trim(), amount: amount.toFixed(2) }
    setCards((current) => current.map((card) => card.id === selectedCard.id ? { ...card, items: [...card.items, item] } : card))
    setItemName('')
    setItemUnit('')
    setItemAmount('')
  }

  return (
    <div className="rate-workspace">
      <section className="rate-header">
        <div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h1>{text.title}</h1>
          <p>{text.intro}</p>
        </div>
        <button className="primary-button" onClick={() => setIsCreatingCard(true)} type="button"><span aria-hidden="true">+</span> {text.newCard}</button>
      </section>

      {isCreatingCard && (
        <section className="rate-form card-surface" aria-label={text.newCard}>
          <div className="form-grid">
            <label>{text.name}<input value={cardName} onChange={(event) => setCardName(event.target.value)} autoFocus /></label>
            <label>{text.date}<input type="date" value={effectiveFrom} onChange={(event) => setEffectiveFrom(event.target.value)} /></label>
          </div>
          <div className="form-actions"><button className="text-button" type="button" onClick={() => setIsCreatingCard(false)}>{text.cancel}</button><button className="primary-button" type="button" onClick={saveCard} disabled={!cardName.trim()}>{text.save}</button></div>
        </section>
      )}

      <div className="rate-layout">
        <aside className="rate-list card-surface">
          <p className="list-label">{text.rateCards}</p>
          {cards.length === 0 ? <div className="rate-empty-small">{text.none}</div> : cards.map((card) => (
            <button className={card.id === selectedCardId ? 'rate-list-item selected' : 'rate-list-item'} key={card.id} type="button" onClick={() => setSelectedCardId(card.id)}>
              <strong>{card.name}</strong><small>{card.items.length} {tamil ? 'உருப்படிகள்' : 'items'}</small>
            </button>
          ))}
        </aside>

        <section className="rate-detail card-surface">
          {!selectedCard ? (
            <div className="rate-empty"><div aria-hidden="true">▤</div><h2>{text.none}</h2><p>{text.noneInfo}</p></div>
          ) : (
            <>
              <div className="rate-detail-heading"><div><p className="label">{text.effective} {selectedCard.effectiveFrom || '—'}</p><h2>{selectedCard.name}</h2></div><span>{selectedCard.items.length} {tamil ? 'உருப்படிகள்' : 'items'}</span></div>
              <div className="approved-note"><span aria-hidden="true">✓</span>{text.rateInfo}</div>
              <div className="item-entry">
                <label>{text.itemName}<input value={itemName} onChange={(event) => setItemName(event.target.value)} /></label>
                <label>{text.unit}<input value={itemUnit} onChange={(event) => setItemUnit(event.target.value)} placeholder={tamil ? 'எ.கா. எண்' : 'e.g. Nos'} /></label>
                <label>{text.rate}<input type="number" min="0" step="0.01" value={itemAmount} onChange={(event) => setItemAmount(event.target.value)} inputMode="decimal" /></label>
                <button className="secondary-add" type="button" onClick={addItem}>{text.addItem}</button>
              </div>
              {selectedCard.items.length === 0 ? <p className="empty-items">{text.emptyItems}</p> : <div className="rate-table"><div className="rate-table-heading"><span>{text.itemName}</span><span>{text.unit}</span><span>{text.rate}</span></div>{selectedCard.items.map((item) => <div className="rate-table-row" key={item.id}><strong>{item.name}</strong><span>{item.unit}</span><strong>₹{item.amount}</strong></div>)}</div>}
            </>
          )}
        </section>
      </div>
    </div>
  )
}
