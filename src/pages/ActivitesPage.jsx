import Layout from '../components/Layout'
import { raids, dungeons } from '../data'

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

export default function ActivitiesPage({ nav }) {
  return (
    <Layout
      nav={nav}
      eyebrow="Activities"
      title="Raids and Dungeons"
      intro="The completion list is separated here so you can track marks by activity in a clean, tactical layout."
    >
      <section className="grid-two">
        <ActivityList title="Raids" items={raids} />
        <ActivityList title="Dungeons" items={dungeons} />
      </section>
    </Layout>
  )
}