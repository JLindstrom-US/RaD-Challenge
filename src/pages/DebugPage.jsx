import { useState } from 'react'
import Layout from '../components/Layout'

export default function DebugPage({ nav, manualAdjust, setManualAdjust, setProgress }) {
  const [customValue, setCustomValue] = useState('')

  const applyCustom = () => {
    const n = Number(customValue)
    if (!Number.isFinite(n)) return
    setManualAdjust(n)
  }

  const resetEverything = () => {
    const ok = window.confirm('Are you sure you want to reset everything? This will clear all progress and return the app to first-time defaults.')
    if (!ok) return

    localStorage.removeItem('rad-progress-v1')
    setProgress({
      completions: {},
      unlocks: {},
      exotics: {
        weaponCount: 0,
        armorCount: 0,
        dismantledCount: 0,
        dualDestinyCount: 0,
        weaponWheelUrl: 'https://example.com/exotic-weapon-wheel',
        armorWheelUrl: 'https://example.com/exotic-armor-wheel'
      },
      manualAdjust: 0
    })
    setCustomValue('')
  }

  return (
    <Layout
      nav={nav}
      eyebrow="Debug"
      title="Point Controls"
      intro="Use this page to repair point totals if something was added by mistake."
    >
      <section className="panel activity-panel">
        <h2>Manual point override</h2>
        <p className="section-text">Current manual adjustment: {manualAdjust}</p>
        <div className="debug-actions">
          <label className="field">
            <span>Override amount</span>
            <input
              type="number"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="Enter a point adjustment"
            />
          </label>
          <button className="primary-button" type="button" onClick={applyCustom}>
            Apply Override
          </button>
          <button className="danger-button" type="button" onClick={resetEverything}>
            Reset Everything
          </button>
        </div>
      </section>
    </Layout>
  )
}