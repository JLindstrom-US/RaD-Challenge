import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'
import { allActivities } from '../data'

function normalizeType(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
}

function getActivityType(activity) {
  const explicitType = normalizeType(activity?.type)

  if (explicitType === 'raid' || explicitType === 'raids') return 'raid'
  if (explicitType === 'dungeon' || explicitType === 'dungeons') return 'dungeon'

  return activity?.marks >= 2 ? 'raid' : 'dungeon'
}

function ActivityList({ title, items, completions }) {
  return (
    <section className="activity-list" aria-label={title}>
      <h3>{title}</h3>

      <div className="grid-two">
        {items.map((item) => {
          const count = completions?.[item.name] || 0

          return (
            <article key={item.name} className="activity-row">
              <div>
                <strong>{item.name}</strong>
              </div>

              <div className="activity-meta">
                <span>{item.marks} marks</span>
                <span className="completion-count">{count} completions</span>
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

  const groupedActivities = useMemo(() => {
    const raids = []
    const dungeons = []

    for (const activity of allActivities) {
      if (getActivityType(activity) === 'raid') {
        raids.push(activity)
      } else {
        dungeons.push(activity)
      }
    }

    return { raids, dungeons }
  }, [])

  const orderedActivities = useMemo(() => {
    return [...groupedActivities.raids, ...groupedActivities.dungeons]
  }, [groupedActivities])

  const selectedActivity = useMemo(() => {
    return orderedActivities.find((activity) => activity.name === selected) || null
  }, [orderedActivities, selected])

  useEffect(() => {
    if (!selected && orderedActivities.length) {
      setSelected(orderedActivities[0].name)
    }
  }, [selected, orderedActivities])

  useEffect(() => {
    if (!pulse) return

    const timeoutId = window.setTimeout(() => setPulse(false), 180)
    return () => window.clearTimeout(timeoutId)
  }, [pulse])

  const addCompletion = () => {
    if (!selectedActivity) return

    setCompletions((prev) => {
      const next = { ...(prev || {}) }
      next[selectedActivity.name] = (next[selectedActivity.name] || 0) + 1
      return next
    })

    setPulse(true)
  }

  return (
    <Layout
      nav={nav}
      eyebrow="Activities"
      title="Completion Tracker"
      intro="Track raid and dungeon completions, then add runs as you clear them."
    >
      <section className="panel activity-panel">
        <div className="section-header">
          <h2>Select Activity</h2>
          <p className="section-text">
            Pick the activity you want to increment.
          </p>
        </div>

        <div className="tracker-grid">
          <label className="field">
            <span>Activity</span>
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
              <optgroup label="Raids">
                {groupedActivities.raids.map((activity) => (
                  <option key={activity.name} value={activity.name}>
                    {activity.name} ({activity.marks} Marks)
                  </option>
                ))}
              </optgroup>

              <optgroup label="Dungeons">
                {groupedActivities.dungeons.map((activity) => (
                  <option key={activity.name} value={activity.name}>
                    {activity.name} ({activity.marks} Marks)
                  </option>
                ))}
              </optgroup>
            </select>
          </label>

          <div className="tracker-stat">
            <span>Selected Value</span>
            <strong>{selectedActivity ? `${selectedActivity.marks} Marks` : '—'}</strong>
          </div>

          <button
            type="button"
            className={`primary-button ${pulse ? 'pulse' : ''}`}
            onClick={addCompletion}
            disabled={!selectedActivity}
          >
            Add Completion
          </button>
        </div>
      </section>

      <section className="panel activity-panel">
        <ActivityList
          title="Raids"
          items={groupedActivities.raids}
          completions={completions}
        />
      </section>

      <section className="panel activity-panel">
        <ActivityList
          title="Dungeons"
          items={groupedActivities.dungeons}
          completions={completions}
        />
      </section>
    </Layout>
  )
}