import Layout from '../components/Layout'
import { unlockGroups } from '../data'

function UnlockGroup({ title, groupKey, items, unlocks, setUnlocks }) {
  const toggle = (index) => {
    const key = `${groupKey}:${index}`
    setUnlocks((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <section className="panel activity-panel">
      <h2>{title}</h2>
      <div className="unlock-list">
        {items.map((item, index) => {
          const key = `${groupKey}:${index}`
          const checked = Boolean(unlocks[key])
          return (
            <label className="unlock-row" key={key}>
              <span className="unlock-copy">
                <span className="unlock-name">{item.name}</span>
                <span className="unlock-cost">{checked ? `-${item.cost} marks` : `+${item.cost} marks`}</span>
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(index)}
                aria-label={`${item.name} ${checked ? 'remove' : 'add'} ${item.cost} marks`}
              />
            </label>
          )
        })}
      </div>
    </section>
  )
}

export default function UnlocksPage({ nav, unlocks, setUnlocks }) {
  return (
    <Layout
      nav={nav}
      eyebrow="Unlocks"
      title="Relics and Subclasses"
      intro="Check an unlock to remove its points. Uncheck it to add the points back."
    >
      <section className="unlock-grid">
        <UnlockGroup title="Relics" groupKey="relics" items={unlockGroups.relics} unlocks={unlocks} setUnlocks={setUnlocks} />
        <UnlockGroup title="Subclasses" groupKey="subclasses" items={unlockGroups.subclasses} unlocks={unlocks} setUnlocks={setUnlocks} />
        <UnlockGroup title="Aspects" groupKey="aspects" items={unlockGroups.aspects} unlocks={unlocks} setUnlocks={setUnlocks} />
        <UnlockGroup title="Fragments" groupKey="fragments" items={unlockGroups.fragments} unlocks={unlocks} setUnlocks={setUnlocks} />
      </section>
    </Layout>
  )
}