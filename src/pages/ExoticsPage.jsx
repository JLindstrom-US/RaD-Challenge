import { useMemo, useState } from 'react'
import Layout from '../components/Layout'
import ExoticSpinWheel from '../components/ExoticSpinWheel'
import {
  exoticWeapons,
  exoticArmorHunter,
  exoticArmorWarlock,
  exoticArmorTitan
} from '../data/exoticWheels'

function CounterRow({ label, value, onAdd, onRemove, note }) {
  return (
    <div className="exotic-row">
      <div className="exotic-copy">
        <span className="unlock-name">{label}</span>
        {note ? <span className="unlock-cost">{note}</span> : null}
      </div>
      <div className="counter-controls">
        <button
          type="button"
          className="secondary-button"
          onClick={onRemove}
          aria-label={`Remove one ${label}`}
        >
          -
        </button>
        <strong className="counter-value">{value}</strong>
        <button
          type="button"
          className="secondary-button"
          onClick={onAdd}
          aria-label={`Add one ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

function ClassSelector({ value, onChange }) {
  const options = ['Hunter', 'Warlock', 'Titan']

  return (
    <fieldset className="class-selector">
      <legend className="class-selector-label">Armor Class</legend>
      <div className="class-selector-options" role="radiogroup" aria-label="Armor class">
        {options.map((option) => {
          const checked = value === option

          return (
            <label
              key={option}
              className={`class-chip ${checked ? 'is-selected' : ''}`}
            >
              <input
                className="sr-only"
                type="radio"
                name="armor-class"
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
              />
              <span>{option}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function ExoticsPage({ nav, exotics, setExotics }) {
  const weaponCount = Number(exotics.weaponCount || 0)
  const armorCount = Number(exotics.armorCount || 0)
  const dismantledCount = Number(exotics.dismantledCount || 0)
  const dualDestinyCount = Number(exotics.dualDestinyCount || 0)

  const [selectedClass, setSelectedClass] = useState('Hunter')

  const update = (patch) => setExotics((prev) => ({ ...prev, ...patch }))

  const armorItems = useMemo(() => {
    if (selectedClass === 'Titan') return exoticArmorTitan
    if (selectedClass === 'Warlock') return exoticArmorWarlock
    return exoticArmorHunter
  }, [selectedClass])

  return (
    <Layout
      nav={nav}
      eyebrow="Exotics"
      title="Exotic Redemptions"
      intro="Spend Marks to unlock Exotics, and earn Marks for dismantling them."
    >
      <section className="panel activity-panel">
        <div className="wheel-section-header">
          <div>
            <h2>Exotic Wheels</h2>
            <p className="section-text">
              Spin for a random Exotic weapon, then choose your class to spin for matching Exotic armor.
            </p>
          </div>

          <ClassSelector value={selectedClass} onChange={setSelectedClass} />
        </div>

        <div className="wheel-grid wheel-grid--interactive">
          <ExoticSpinWheel
            title="Exotic Weapon Wheel"
            items={exoticWeapons}
            storageKey="weapon-wheel"
          />

          <ExoticSpinWheel
            key={selectedClass}
            title={`${selectedClass} Exotic Armor Wheel`}
            items={armorItems}
            storageKey={`armor-wheel-${selectedClass.toLowerCase()}`}
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