import Layout from '../components/Layout'
import { unlockGroups } from '../data'

const freeEligible = ['Solar', 'Arc', 'Void', 'Stasis', 'Strand']

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

function SubclassGroup({ subclassUnlocks, freeSubclassName, setSubclassState }) {
  const checkedCount = Object.values(subclassUnlocks || {}).filter(Boolean).length

  const toggleSubclass = (name) => {
    setSubclassState((prev) => {
      const currentUnlocks = prev.subclassUnlocks || {
        Solar: false,
        Arc: false,
        Void: false,
        Stasis: false,
        Strand: false,
        Prismatic: false
      }
      const currentlyChecked = Boolean(currentUnlocks[name])
      const nextUnlocks = {
        ...currentUnlocks,
        [name]: !currentlyChecked
      }

      if (currentlyChecked) {
        const anyStillChecked = Object.values(nextUnlocks).some(Boolean)
        return {
          subclassUnlocks: nextUnlocks,
          freeSubclassName: anyStillChecked ? prev.freeSubclassName : null
        }
      }

      const noSubclassesWereChecked = !Object.values(currentUnlocks).some(Boolean)
      const shouldBecomeFree = noSubclassesWereChecked && freeEligible.includes(name)

      return {
        subclassUnlocks: nextUnlocks,
        freeSubclassName: shouldBecomeFree ? name : prev.freeSubclassName
      }
    })
  }

  const getCostLabel = (name) => {
    const checked = Boolean(subclassUnlocks[name])

    if (name === 'Prismatic') return '10 Marks'
    if (checked && freeSubclassName === name) return 'Free'
    if (!checked && checkedCount === 0 && freeEligible.includes(name)) return 'Free First Unlock'
    return '5 Marks'
  }

  return (
    <section className="panel activity-panel">
      <h2>Subclasses</h2>
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
  freeSubclassName,
  setSubclassState
}) {
  return (
    <Layout
      nav={nav}
      eyebrow="Unlocks"
      title="Unlockables"
      intro="Spend Marks to Unlock Relic Slots, Subclasses, Aspect Slots, and Fragment Slots"
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
          freeSubclassName={freeSubclassName}
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