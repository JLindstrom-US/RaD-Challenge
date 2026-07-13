import { useMemo, useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { allActivities, raids, dungeons } from '../data'

function ActivityList({ title, items }) {
  return (
    <section className="panel activity-panel">
      <h2>{title}</h2>
      <div className="activity-list">
        {items.map((item) => (
          <article className="activity-row" key={item.name}>
            <span>{item.name}</span>
            <strong>{item.marks} marks</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function ActivitiesPage({ nav, completions, setCompletions, setAvailableMarks }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('')

  const filteredActivities = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? allActivities.filter((a) => a.name.toLowerCase().includes(q)) : allActivities
  }, [query])

  const selectedActivity = useMemo(
    () => allActivities.find((a) => a.name === selected) || null,
    [selected]
  )

  useEffect(() => {
    if (!selected && filteredActivities.length) setSelected(filteredActivities[0].name)
    if (selected && !filteredActivities.some((a) => a.name === selected)) {
      setSelected(filteredActivities[0]?.name || '')
    }
  }, [filteredActivities, selected])

  const addCompletion = () => {
    if (!selectedActivity) return

    setCompletions((prev) => {
      const next = { ...prev }
      const current = next[selectedActivity.name] || 0
      next[selectedActivity.name] = current + 1

      const total = Object.entries(next).reduce((sum, [name, count]) => {
        const activity = allActivities.find((a) => a.name === name)
        if (!activity) return sum
        return sum + activity.marks + Math.max(0, count - 1) * (activity.marks / 2)
      }, 0)

      setAvailableMarks(total)
      return next
    })
  }

  return (
    <Layout
      nav={nav}
      eyebrow="Activities"
      title="Raids and Dungeons"
      intro="Search an activity, select it, then add completions. First clears are full value and repeats are worth half."
    >
      <section className="panel activity-panel">
        <h2>Completion tracker</h2>
        <div className="tracker-grid">
          <label className="field">
            <span>Search activity</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search raids or dungeons"
            />
          </label>

          <label className="field">
            <span>Select activity</span>
            <select value={selected} onChange={(e) => setSelected(e.target.value)}>
              {filteredActivities.map((activity) => (
                <option key={activity.name} value={activity.name}>
                  {activity.name} ({activity.marks} marks)
                </option>
              ))}
            </select>
          </label>

          <div className="tracker-actions">
            <button className="primary-button" onClick={addCompletion} type="button">
              Add Completion
            </button>
            <div className="tracker-stat">
              <span>Selected value</span>
              <strong>{selectedActivity ? `${selectedActivity.marks} marks` : '—'}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="grid-two">
        <ActivityList title="Raids" items={raids} />
        <ActivityList title="Dungeons" items={dungeons} />
      </section>
    </Layout>
  )
}