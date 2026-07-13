import { useState } from 'react'
import Layout from '../components/Layout'

const resetState = {
  completions: {},
  unlocks: {},
  subclassUnlocks: {
    Solar: false,
    Arc: false,
    Void: false,
    Stasis: false,
    Strand: false,
    Prismatic: false
  },
  freeSubclassName: null,
  exotics: {
    weaponCount: 0,
    armorCount: 0,
    dismantledCount: 0,
    dualDestinyCount: 0,
    weaponWheelUrl: 'https://example.com/exotic-weapon-wheel',
    armorWheelUrl: 'https://example.com/exotic-armor-wheel'
  },
  pointOverrideEnabled: false,
  pointOverrideValue: 0,
  selectedDifficulty: 'Easy',
  selectedRuleset: 'default'
}

export default function DebugPage({
  nav,
  pointOverrideEnabled,
  pointOverrideValue,
  setPointOverride,
  setProgress,
  completions,
  setCompletions,
  activities
}) {
  const [value, setValue] = useState(String(pointOverrideValue))

  const applyOverride = () => {
    const parsed = Number(value)
    if (!Number.isFinite(parsed)) return
    setPointOverride({ enabled: true, value: parsed })
  }

  const disableOverride = () => {
    setPointOverride({ enabled: false, value: 0 })
    setValue('0')
  }

  const resetEverything = () => {
    const ok = window.confirm(
      'Are you sure you want to reset everything? This will clear all progress and return the app to a first-time state.'
    )
    if (!ok) return
    localStorage.removeItem('rad-progress-v1')
    setProgress(resetState)
    setValue('0')
  }

  const adjustCompletion = (name, delta) => {
  setCompletions((prev) => {
    const current = Number(prev?.[name] || 0)
    const next = Math.max(0, current + delta)

    if (next === 0) {
      const updated = { ...(prev || {}) }
      delete updated[name]
      return updated
    }

    return {
      ...(prev || {}),
      [name]: next
    }
  })
  }

  return (
    <Layout
      nav={nav}
      eyebrow="Debug"
      title="Point Controls"
      intro="Use this page to override total points or fully reset the tracker."
    >
      <section className="panel activity-panel">
        <h2>Manual Point Override</h2>
        <p className="section-text">
          Override Status: <strong>{pointOverrideEnabled ? 'Enabled' : 'Disabled'}</strong>
        </p>
        <div className="debug-actions">
          <label className="field">
            <span>Total Points</span>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter total points"
            />
          </label>
          <button className="primary-button" type="button" onClick={applyOverride}>
            Set Total Points
          </button>
          <button className="secondary-button" type="button" onClick={disableOverride}>
            Return to Calculated Total
          </button>
          <button className="danger-button" type="button" onClick={resetEverything}>
            Reset Everything
          </button>
        </div>
      </section>
    </Layout>
  )

  <section className="panel activity-panel">
  <h2>Adjust Activity Completions</h2>
  <p className="section-text">
    Adjust The Completion Counts Below.
  </p>

  <div className="debug-counter-list">
    {[...activities]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((activity) => {
        const count = Number(completions?.[activity.name] || 0)

        return (
          <div className="debug-counter-row" key={activity.name}>
            <div className="debug-counter-copy">
              <span className="debug-counter-name">{activity.name}</span>
              <span className="debug-counter-meta">{activity.marks} Marks</span>
            </div>

            <div className="debug-stepper">
              <button
                type="button"
                className="stepper-button"
                onClick={() => adjustCompletion(activity.name, -1)}
                aria-label={`Decrease completions for ${activity.name}`}
              >
                -
              </button>

              <input
                className="stepper-value"
                type="number"
                value={count}
                readOnly
                aria-label={`Completions for ${activity.name}`}
              />

              <button
                type="button"
                className="stepper-button"
                onClick={() => adjustCompletion(activity.name, 1)}
                aria-label={`Increase completions for ${activity.name}`}
              >
                +
              </button>
            </div>
          </div>
        )
      })}
  </div>
</section>
}