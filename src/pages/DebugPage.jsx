import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { STORAGE_KEY, defaultProgress } from '../data'

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

  useEffect(() => {
    setValue(String(pointOverrideValue))
  }, [pointOverrideValue])

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

    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore storage access failures.
    }

    setProgress(defaultProgress)
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

  const sortedActivities = [...activities].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <Layout
      nav={nav}
      eyebrow="Debug"
      title="Debug Controls"
      intro="Use these tools to override marks, adjust completions, or fully reset progress."
    >
      <section className="panel activity-panel">
        <h2>Manual Point Override</h2>

        <div className="debug-actions">
          <label className="field">
            <span>Total Points</span>
            <input
              type="number"
              inputMode="numeric"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Enter total points"
            />
          </label>

          <button
            type="button"
            className="primary-button"
            onClick={applyOverride}
          >
            Set Total Points
          </button>

          <button
            type="button"
            className="secondary-button"
            onClick={disableOverride}
          >
            Return to Calculated Total
          </button>
        </div>

        <p className="section-text">
          Override Status: {pointOverrideEnabled ? 'Enabled' : 'Disabled'}
        </p>
      </section>

      <section className="panel activity-panel danger-panel">
        <h2>Reset Progress</h2>
        <p className="section-text">
          This clears saved progress and restores the app to its default first-load state.
        </p>

        <div className="danger-actions">
          <button
            type="button"
            className="danger-button"
            onClick={resetEverything}
          >
            Reset Everything
          </button>
        </div>
      </section>

      <section className="panel activity-panel">
        <h2>Adjust Activity Completions</h2>
        <p className="section-text">
          Adjust the completion counts below.
        </p>

        <div className="debug-counter-list">
          {sortedActivities.map((activity) => {
            const count = Number(completions?.[activity.name] || 0)

            return (
              <div key={activity.name} className="debug-counter-row">
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

                  <strong className="stepper-value">{count}</strong>

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
    </Layout>
  )
}