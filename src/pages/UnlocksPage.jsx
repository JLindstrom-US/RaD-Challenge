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
                <span className="unlock-cost">{item.cost} Marks</span>
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(index)}
                aria-label={`${item.name} unlock`}
              />
            </label>
          )
        })}
      </div>
    </section>
  )
}

function SubclassGroup({ subclassUnlocks, freeSubclassUsed, setSubclassState }) {
  const freeEligible = ['Solar', 'Arc', 'Void', 'Stasis', 'Strand']

  const toggleSubclass = (name) => {
    const isUnlocked = Boolean(subclassUnlocks[name])

    if (isUnlocked) {
      setSubclassState((prev) => ({
        subclassUnlocks: {
          ...prev.subclassUnlocks,
          [name]: false
        },
        freeSubclassUsed: prev.freeSubclassUsed
      }))
      return
    }

    setSubclassState((prev) => {
      const isFreeEligible = freeEligible.includes(name)
      const shouldConsumeFree = isFreeEligible && !prev.freeSubclassUsed

      return {
        subclassUnlocks: {
          ...prev.subclassUnlocks,
          [name]: true
        },
        freeSubclassUsed: prev.freeSubclassUsed || shouldConsumeFree
      }
    })
  }

  const getCostLabel = (name) => {
    if (name === 'Prismatic') return '10 Marks'
    if (!freeSubclassUsed) return 'Free first unlock, then 5 Marks'
    return '5 Marks'
  }

  return (
    <section className="panel activity-panel">
      <h2>Subclasses</h2>
      <p className="section-text">
        Unlock all 6 if you want. Your first Solar, Arc, Void, Stasis, or Strand unlock is free. Every later one costs 5 Marks. Prismatic always costs 10 Marks.
      </p>
      <div className="unlock-list">
        {unlockGroups.subclasses.map((item) => {
          const checked = Boolean(subclassUnlocks[item.name])

          return (
            <label className="unlock-row" key={item.name}>
              <span className="unlock-copy">
                <span className="unlock-name">{item.name}</span>
                <span className="unlock-cost">{getCostLabel(item.name)}</span>
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleSubclass(item.name)}
                aria-label={`${item.name} subclass unlock`}
              />
            </label>
          )
        })}
      </div>
    </section>
  )
}

export default function UnlocksPage({
  nav,
  unlocks,
  setUnlocks,
  subclassUnlocks,
  freeSubclassUsed,
  setSubclassState
}) {
  return (
    <Layout
      nav={nav}
      eyebrow="Unlocks"
      title="Relics and Subclasses"
      intro="Check an unlock to remove its points. Subclasses can all be unlocked, but only the first non-Prismatic subclass is free."
    >
      <section className="unlock-grid">
        <UnlockGroup
          title="Relics"
          groupKey="relics"
          items={unlockGroups.relics}
          unlocks={unlocks}
          setUnlocks={setUnlocks}
        />
        <SubclassGroup
          subclassUnlocks={subclassUnlocks}
          freeSubclassUsed={freeSubclassUsed}
          setSubclassState={setSubclassState}
        />
        <UnlockGroup
          title="Aspects"
          groupKey="aspects"
          items={unlockGroups.aspects}
          unlocks={unlocks}
          setUnlocks={setUnlocks}
        />
        <UnlockGroup
          title="Fragments"
          groupKey="fragments"
          items={unlockGroups.fragments}
          unlocks={unlocks}
          setUnlocks={setUnlocks}
        />
      </section>
    </Layout>
  )
}