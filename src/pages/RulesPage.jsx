import Layout from '../components/Layout'
import { rules, goals, markRules } from '../data'

function List({ items }) {
  return <ul className="simple-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>
}

export default function RulesPage({ nav }) {
  return (
    <Layout
      nav={nav}
      eyebrow="Rules"
      title="Challenge Rules"
      intro="The workbook’s baseline and expert rule sets, plus the challenge ladder that defines each run tier."
    >
      <section className="grid-two">
        <article className="panel content-panel">
          <h2>Default rules</h2>
          <List items={rules.default} />
        </article>
        <article className="panel content-panel">
          <h2>Expert rules</h2>
          <List items={rules.expert} />
        </article>
      </section>

      <section className="panel content-panel">
        <div className="section-header">
          <p className="eyebrow">Goals</p>
          <h2>Challenge ladder</h2>
          <p className="section-text">
            Four progressively harder objectives, from solo dungeon clears to full deathless mastery.
          </p>
        </div>
        <div className="goal-grid">
          {goals.map((goal) => (
            <article className="goal-card" key={goal.tier}>
              <span className="goal-tier">{goal.tier}</span>
              <h3>{goal.title}</h3>
              <p>{goal.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel content-panel">
        <div className="section-header">
          <p className="eyebrow">Marks</p>
          <h2>Mark economy</h2>
        </div>
        <List items={markRules} />
      </section>
    </Layout>
  )
}