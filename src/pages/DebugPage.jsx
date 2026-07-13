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
  setProgress
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

  return (
    <Layout
      nav={nav}
      eyebrow="Debug"
      title="Point Controls"
      intro="Use this page to override total points or fully reset the tracker."
    >
      <section className="panel activity-panel">
        <h2>Manual point override</h2>
        <p className="section-text">
          Override status: <strong>{pointOverrideEnabled ? 'Enabled' : 'Disabled'}</strong>
        </p>
        <div className="debug-actions">
          <label className="field">
            <span>Total points</span>
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
}