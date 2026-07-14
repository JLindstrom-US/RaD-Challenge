import Layout from '../components/Layout'
import { unlockGroups, defaultSubclassUnlocks } from '../data'

const freeEligible = ['Solar', 'Arc', 'Void', 'Stasis', 'Strand']

function UnlockGroup({ title, groupKey, items, unlocks, setUnlocks }) {
  const toggle = (index) => {
    const key = `${groupKey}:${index}`

    setUnlocks((prev) => ({
      ...(prev || {}),
      [key]: !prev?.[key]
    }))
  }

  return (
    <section className="unlock-group">
      <h3>{title}</h3>

      <div className="unlock-list">
        {items.map((item, index) => {
          const key = `${groupKey}:${index}`
          const checked = Boolean(unlocks?.[key])

          return (
            <label key={key} className="unlock-row">
              <div className="unlock-copy">
                <span className="unlock-name">{item.name}</span>
                {typeof item.cost === 'number' ? (
                  <span className="unlock-cost">{item.cost} Marks</span>
                ) : null}
              </div>

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
      const currentUnlocks = prev?.subclassUnlocks || defaultSubclassUnlocks
      const currentlyChecked = Boolean(currentUnlocks[name])

      const nextUnlocks = {
        ...currentUnlocks,
        [name]: !currentlyChecked
      }

      if (currentlyChecked) {
        const anyStillChecked = Object.values(nextUnlocks).some(Boolean)
        return {
          subclassUnlocks: nextUnlocks,
          freeSubclassName: anyStillChecked ? prev?.freeSubclassName ?? null : null
        }
      }

      const noSubclassesWereChecked = !Object.values(currentUnlocks).some(Boolean)
      const shouldBecomeFree = noSubclassesWereChecked && freeEligible.includes(name)

      return {
        subclassUnlocks: nextUnlocks,
        freeSubclassName: shouldBecomeFree ? name : prev?.freeSubclassName ?? null
      }
    })
  }

  const getCostLabel = (name) => {
    const checked = Boolean(subclassUnlocks?.[name])

    if (name === 'Prismatic') return '10 Marks'
    if (checked && freeSubclassName === name) return 'Free'
    if (!checked && checkedCount === 0 && freeEligible.includes(name)) return 'Free'
    return '5 Marks'
  }

  return (
    <section className="unlock-group">
      <h3>Subclasses</h3>

      <div className="unlock-list">
        {unlockGroups.subclasses.map((item) => {
          const checked = Boolean(subclassUnlocks?.[item.name])

          return (
            <label key={item.name} className="unlock-row">
              <div className="unlock-copy">
                <span className="unlock-name">{item.name}</span>
                <span className="unlock-cost">{getCostLabel(item.name)}</span>
              </div>

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
      title="Unlock Tracking"
      intro="Track relics, subclasses, aspects, and fragments as you progress through the challenge."
    >
      <section className="panel activity-panel">
        <div className="section-header">
          <h2>Relics</h2>
        </div>

        <UnlockGroup
          title="Relics"
          groupKey="relics"
          items={unlockGroups.relics}
          unlocks={unlocks}
          setUnlocks={setUnlocks}
        />
      </section>

      <section className="panel activity-panel">
        <SubclassGroup
          subclassUnlocks={subclassUnlocks}
          freeSubclassName={freeSubclassName}
          setSubclassState={setSubclassState}
        />
      </section>

      <section className="panel activity-panel">
        <div className="section-header">
          <h2>Aspects</h2>
        </div>

        <UnlockGroup
          title="Aspects"
          groupKey="aspects"
          items={unlockGroups.aspects}
          unlocks={unlocks}
          setUnlocks={setUnlocks}
        />
      </section>

      <section className="panel activity-panel">
        <div className="section-header">
          <h2>Fragments</h2>
        </div>

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