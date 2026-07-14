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
          className="stepper-button"
          onClick={onRemove}
          aria-label={`Decrease ${label}`}
        >
          -
        </button>

        <strong className="counter-value">{value}</strong>

        <button
          type="button"
          className="stepper-button"
          onClick={onAdd}
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  )
}

const classOptions = [
  { id: 'hunter', label: 'Hunter' },
  { id: 'titan', label: 'Titan' },
  { id: 'warlock', label: 'Warlock' }
]

export default function ExoticsPage({ nav, exotics, setExotics }) {
  const [selectedClass, setSelectedClass] = useState('hunter')

  const armorItems = useMemo(() => {
    switch (selectedClass) {
      case 'titan':
        return exoticArmorTitan
      case 'warlock':
        return exoticArmorWarlock
      case 'hunter':
      default:
        return exoticArmorHunter
    }
  }, [selectedClass])

  const armorTitle = useMemo(() => {
    switch (selectedClass) {
      case 'titan':
        return 'Titan Armor Wheel'
      case 'warlock':
        return 'Warlock Armor Wheel'
      case 'hunter':
      default:
        return 'Hunter Armor Wheel'
    }
  }, [selectedClass])

  const updateExotics = (updater) => {
    setExotics((prev) => {
      const current = prev || {
        weaponCount: 0,
        armorCount: 0,
        dismantledCount: 0,
        dualDestinyCount: 0
      }

      return typeof updater === 'function' ? updater(current) : updater
    })
  }

  const adjustCount = (key, delta) => {
    updateExotics((prev) => ({
      ...prev,
      [key]: Math.max(0, Number(prev?.[key] || 0) + delta)
    }))
  }

  return (
    <Layout
      nav={nav}
      eyebrow="Exotics"
      title="Exotic Tracking"
      intro="Spin for a random exotic weapon, then choose a class to spin for matching exotic armor."
    >
      <section className="panel activity-panel">
        <div className="section-header wheel-section-header">
          <div>
            <h2>Animated Wheels</h2>
            <p className="section-text">
              The weapon wheel is shared. The armor wheel changes based on the selected class.
            </p>
          </div>

          <fieldset className="class-selector">
            <legend className="class-selector-label">Armor Class</legend>

            <div className="class-selector-options">
              {classOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`class-chip ${selectedClass === option.id ? 'is-selected' : ''}`}
                  onClick={() => setSelectedClass(option.id)}
                  aria-pressed={selectedClass === option.id}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="wheel-grid--interactive">
          <div className="wheel-card">
            <div className="wheel-card-head">
              <span className="wheel-kicker">Shared pool</span>
              <h3>Weapon Wheel</h3>
            </div>

            <ExoticSpinWheel
              title="Weapon Wheel"
              items={exoticWeapons}
            />
          </div>

          <div className="wheel-card">
            <div className="wheel-card-head">
              <span className="wheel-kicker">Class-specific pool</span>
              <h3>{armorTitle}</h3>
            </div>

            <ExoticSpinWheel
              title={armorTitle}
              items={armorItems}
            />
          </div>
        </div>
      </section>

      <section className="panel activity-panel">
        <div className="section-header">
          <h2>Exotic Costs</h2>
          <p className="section-text">
            Track purchased exotics, dismantled refunds, and Dual Destiny class item unlocks.
          </p>
        </div>

        <div className="counter-stack">
          <CounterRow
            label="Weapon Exotics Purchased"
            value={Number(exotics?.weaponCount || 0)}
            note="Costs 5 Marks each"
            onAdd={() => adjustCount('weaponCount', 1)}
            onRemove={() => adjustCount('weaponCount', -1)}
          />

          <CounterRow
            label="Armor Exotics Purchased"
            value={Number(exotics?.armorCount || 0)}
            note="Costs 5 Marks each"
            onAdd={() => adjustCount('armorCount', 1)}
            onRemove={() => adjustCount('armorCount', -1)}
          />

          <CounterRow
            label="Dismantled Exotics"
            value={Number(exotics?.dismantledCount || 0)}
            note="Refunds 1 Mark each"
            onAdd={() => adjustCount('dismantledCount', 1)}
            onRemove={() => adjustCount('dismantledCount', -1)}
          />

          <CounterRow
            label="Dual Destiny Class Items"
            value={Number(exotics?.dualDestinyCount || 0)}
            note="Costs 5 Marks each"
            onAdd={() => adjustCount('dualDestinyCount', 1)}
            onRemove={() => adjustCount('dualDestinyCount', -1)}
          />
        </div>
      </section>
    </Layout>
  )
}