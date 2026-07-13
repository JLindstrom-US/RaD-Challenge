import Layout from '../components/Layout'
import { unlockGroups } from '../data'

function UnlockGroup({ title, groupKey, items, unlocks, setUnlocks }) {
  const toggle = (index) => {
    const key = `${groupKey}:${index}`
    setUnlocks((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <section className="panel activity-panel">
      <h2>{title}</h2>
      <div className="unlock-list">
        {items.map((item, index) => {
          const key = `${groupKey}:${index}`
          const checked = Boolean(unlocks[key])
          const isFree = item.free && item.name !== 'Prismatic'
          const costText = isFree ? 'Free' : `${item.name === 'Prismatic' ? 10 : item.cost} Marks`
          return (
            <label className="unlock-row" key={key}>
              <span className="unlock-copy">
                <span className="unlock-name">{item.name}</span>
                <span className="unlock-cost">{costText}</span>
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(index)}
                aria-label={`${item.name} ${checked ? 'remove' : 'add'} marks`}
              />
            </label>
          )
        })}
      </div>
    </section>
  )
}

function SubclassGroup({ subclass, setSubclass, availableMarks }) {
  const options = unlockGroups.subclasses

  const selectSubclass = (name) => {
    const isPrismatic = name === 'Prismatic'
    const freeEligible = ['Solar', 'Arc', 'Void', 'Stasis', 'Strand'].includes(name)

    setSubclass((prev) => {
      const selected = prev?.selected || ''
      const freeUsed = Boolean(prev?.freeUsed)

      if (isPrismatic) {
        return { selected: name, freeUsed }
      }

      if (!freeUsed) {
        return { selected: name, freeUsed: true }
      }

      return { selected: name, freeUsed: true }
    })
  }

  const currentCost = (name) => {
    if (name === 'Prismatic') return 10
    if (subclass.selected === name && !subclass.freeUsed && ['Solar', 'Arc', 'Void', 'Stasis', 'Strand'].includes(name)) return 0
    if (['Solar', 'Arc', 'Void', 'Stasis', 'Strand'].includes(name)) return 5
    return 5
  }

  return (
    <section className="panel activity-panel">
      <h2>Subclass</h2>
      <div className="choice-grid">
        {options.map((item) => {
          const selected = subclass.selected === item.name
          const cost = currentCost(item.name)
          const freeEligible = ['Solar', 'Arc', 'Void', 'Stasis', 'Strand'].includes(item.name)
          const label = item.name === 'Prismatic' ? '10 Marks' : freeEligible && !subclass.freeUsed && !selected ? 'Free' : `${cost} Marks`

          return (
            <button
              key={item.name}
              type="button"
              className={`choice-card ${selected ? 'selected' : ''}`}
              onClick={() => selectSubclass(item.name)}
              aria-pressed={selected}
            >
              <span className="choice-label">{item.name}</span>
              <span className="choice-description">
                {item.name === 'Prismatic'
                  ? 'Always costs 10 marks.'
                  : freeEligible
                    ? 'First pick is free, later picks cost 5 marks.'
                    : 'Costs 5 marks.'}
              </span>
              <span className="choice-note">{label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default function UnlocksPage({ nav, unlocks, setUnlocks, subclass, setSubclass, availableMarks }) {
  return (
    <Layout
      nav={nav}
      eyebrow="Unlocks"
      title="Relics and Subclasses"
      intro="Check an unlock to remove its points. Pick one subclass, with the first Solar/Arc/Void/Stasis/Strand choice free."
    >
      <section className="unlock-grid">
        <UnlockGroup title="Relics" groupKey="relics" items={unlockGroups.relics} unlocks={unlocks} setUnlocks={setUnlocks} />
        <SubclassGroup subclass={subclass} setSubclass={setSubclass} availableMarks={availableMarks} />
        <UnlockGroup title="Aspects" groupKey="aspects" items={unlockGroups.aspects} unlocks={unlocks} setUnlocks={setUnlocks} />
        <UnlockGroup title="Fragments" groupKey="fragments" items={unlockGroups.fragments} unlocks={unlocks} setUnlocks={setUnlocks} />
      </section>
    </Layout>
  )
}