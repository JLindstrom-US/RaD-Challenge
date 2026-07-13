import Layout from '../components/Layout'
import { unlocks } from '../data'

function UnlockGroup({ title, items }) {
  return (
    <section className="panel activity-panel">
      <h2>{title}</h2>
      <div className="activity-list">
        {items.map((item, index) => (
          <article className="activity-row" key={`${title}-${item.name}-${index}`}>
            <span>{item.name}</span>
            <strong>{item.cost} marks</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function UnlocksPage({ nav }) {
  return (
    <Layout
      nav={nav}
      eyebrow="Unlocks"
      title="Relics and Subclasses"
      intro="Unlock slots, costs, and progression paths arranged as a compact control board."
    >
      <section className="unlock-grid">
        <UnlockGroup title="Relics" items={unlocks.relics} />
        <UnlockGroup title="Subclasses" items={unlocks.subclasses} />
        <UnlockGroup title="Aspects" items={unlocks.aspects} />
        <UnlockGroup title="Fragments" items={unlocks.fragments} />
      </section>
    </Layout>
  )
}