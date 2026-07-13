import Layout from '../components/Layout'

function CounterRow({ label, value, onAdd, onRemove, note }) {
  return (
    <div className="exotic-row">
      <div className="exotic-copy">
        <span className="unlock-name">{label}</span>
        {note ? <span className="unlock-cost">{note}</span> : null}
      </div>
      <div className="counter-controls">
        <button type="button" className="secondary-button" onClick={onRemove} aria-label={`Remove one ${label}`}>
          -
        </button>
        <strong className="counter-value">{value}</strong>
        <button type="button" className="secondary-button" onClick={onAdd} aria-label={`Add one ${label}`}>
          +
        </button>
      </div>
    </div>
  )
}

function WheelTile({ title, url, description }) {
  return (
    <a className="wheel-tile" href={url} target="_blank" rel="noopener noreferrer">
      <span className="wheel-kicker">External Link</span>
      <strong>{title}</strong>
      <span>{description}</span>
      <span className="wheel-url">{url}</span>
    </a>
  )
}

export default function ExoticsPage({ nav, exotics, setExotics }) {
  const weaponCount = Number(exotics.weaponCount || 0)
  const armorCount = Number(exotics.armorCount || 0)
  const dismantledCount = Number(exotics.dismantledCount || 0)
  const dualDestinyCount = Number(exotics.dualDestinyCount || 0)

  const update = (patch) => setExotics((prev) => ({ ...prev, ...patch }))

  return (
    <Layout
      nav={nav}
      eyebrow="Exotics"
      title="Exotic Redemptions"
      intro="Spend Marks to Unlock Exotics, Earn Marks for Dismantling Exotics"
    >
      <section className="panel activity-panel">
        <h2>Wheels</h2>
        <div className="wheel-grid">
          <WheelTile
            title="Exotic Weapon Wheel"
            url={exotics.weaponWheelUrl || 'https://example.com/exotic-weapon-wheel'}
            description="Placeholder link for the weapon wheel."
          />
          <WheelTile
            title="Exotic Armor Wheel"
            url={exotics.armorWheelUrl || 'https://example.com/exotic-armor-wheel'}
            description="Placeholder link for the armor wheel."
          />
        </div>
      </section>

      <section className="panel activity-panel">
        <h2>Exotic Tracking</h2>
        <div className="counter-stack">
          <CounterRow
            label="Exotic Weapons"
            value={weaponCount}
            note="5 Marks Each"
            onAdd={() => update({ weaponCount: weaponCount + 1 })}
            onRemove={() => update({ weaponCount: Math.max(0, weaponCount - 1) })}
          />
          <CounterRow
            label="Exotic Armor"
            value={armorCount}
            note="5 Marks Each"
            onAdd={() => update({ armorCount: armorCount + 1 })}
            onRemove={() => update({ armorCount: Math.max(0, armorCount - 1) })}
          />
        </div>
      </section>

      <section className="panel activity-panel">
        <h2>Extra Redemptions</h2>
        <div className="counter-stack">
          <CounterRow
            label="Dismantled Exotics"
            value={dismantledCount}
            note="Adds 1 Mark Each"
            onAdd={() => update({ dismantledCount: dismantledCount + 1 })}
            onRemove={() => update({ dismantledCount: Math.max(0, dismantledCount - 1) })}
          />
          <CounterRow
            label="Dual Destiny"
            value={dualDestinyCount}
            note="5 Marks Each"
            onAdd={() => update({ dualDestinyCount: dualDestinyCount + 1 })}
            onRemove={() => update({ dualDestinyCount: Math.max(0, dualDestinyCount - 1) })}
          />
        </div>
      </section>
    </Layout>
  )
}