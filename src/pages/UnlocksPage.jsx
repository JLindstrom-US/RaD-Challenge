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

  const totalChecked = Object.values(subclassUnlocks || {}).filter(Boolean).length

  const toggleSubclass = (name) => {
    const isUnlocked = Boolean(subclassUnlocks[name])

    setSubclassState((prev) => {
      const currentUnlocks = prev.subclassUnlocks || {
        Solar: false,
        Arc: false,
        Void: false,
        Stasis: false,
        Strand: false,
        Prismatic: false
      }
      const activeCount = Object.values(currentUnlocks).filter(Boolean).length
      const turningOn = !currentUnlocks[name]

      if (!turningOn) {
        return {
          subclassUnlocks: {
            ...currentUnlocks,
            [name]: false
          },
          freeSubclassUsed: activeCount - 1 > 0 ? prev.freeSubclassUsed : false
        }
      }

      const isFreeEligible = freeEligible.includes(name)
      const shouldBeFree = isFreeEligible && activeCount === 0 && !prev.freeSubclassUsed

      return {
        subclassUnlocks: {
          ...currentUnlocks,
          [name]: true
        },
        freeSubclassUsed: prev.freeSubclassUsed || shouldBeFree
      }
    })
  }

  const getCostLabel = (name) => {
    if (name === 'Prismatic') return '10 Marks'
    if (subclassUnlocks[name]) return freeSubclassUsed ? '5 Marks' : 'Free'
    if (totalChecked === 0 && freeEligible.includes(name)) return 'Free first unlock'
    return '5 Marks'
  }

  return (
    <section className="panel activity-panel">
      <h2>Subclasses</h2>
      <p className="section-text">
        Unlock all 6 if you want. If none are checked, the first Solar, Arc, Void, Stasis, or Strand choice is free. Prismatic always costs 10 Marks.
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
      intro="Check an unlock to remove its points. Subclasses can all be unlocked, and if none are checked, the first free-eligible one is free again."
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