import { useMemo, useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { allActivities, raids, dungeons } from '../data'

function ActivityList({ title, items, completions }) {
  return (
    <section className="panel activity-panel">
      <h2>{title}</h2>
      <div className="activity-list">
        {items.map((item) => {
          const count = completions[item.name] || 0
          return (
            <article className="activity-row" key={item.name}>
              <span>{item.name}</span>
              <div className="activity-meta">
                <strong>{item.marks} marks</strong>
                <span className="completion-count">{count} Completions</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default function ActivitiesPage({ nav, completions, setCompletions }) {
  const [selected, setSelected] = useState('')
  const [pulse, setPulse] = useState(false)

  const selectedActivity = useMemo(
    () => allActivities.find((a) => a.name === selected) || null,
    [selected]
  )

  useEffect(() => {
    if (!selected && allActivities.length) setSelected(allActivities[0].name)
  }, [selected])

  const addCompletion = () => {
    if (!selectedActivity) return
    setCompletions((prev) => {
      const next = { ...prev }
      next[selectedActivity.name] = (next[selectedActivity.name] || 0) + 1
      return next
    })
    setPulse(true)
    window.setTimeout(() => setPulse(false), 180)
  }

  return (
    <Layout
      nav={nav}
      eyebrow="Activities"
      title="Raids and Dungeons"
      intro="Select an Activity, then Add Completions. First Clears are Full Value and Repeats are Worth Half."
    >
      <section className="panel activity-panel">
        <h2>Completion Tracker</h2>
        <div className="tracker-grid tracker-grid-simple">
          <label className="field">
            <span>Select Activity</span>
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
              {allActivities.map((activity) => (
                <option key={activity.name} value={activity.name}>
                  {activity.name} ({activity.marks} marks)
                </option>
              ))}
            </select>
          </label>

          <div className="tracker-actions">
            <button className={`primary-button ${pulse ? 'pulse' : ''}`} onClick={addCompletion} type="button">
              Add Completion
            </button>
            <div className="tracker-stat">
              <span>Selected Value</span>
              <strong>{selectedActivity ? `${selectedActivity.marks} Marks` : '—'}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="grid-two">
        <ActivityList title="Raids" items={raids} completions={completions} />
        <ActivityList title="Dungeons" items={dungeons} completions={completions} />
      </section>
    </Layout>
  )
}