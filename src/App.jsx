import { goals, raids, dungeons, rules, unlocks, exoticRules, markRules } from './data'
import './styles.css'

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="section-header">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p className="section-text">{text}</p> : null}
    </div>
  )
}

function SimpleList({ items }) {
  return (
    <ul className="simple-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function ActivityList({ title, items }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
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

function UnlockGroup({ title, items }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
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

export default function App() {
  return (
    <main className="app-shell">
      <section className="hero panel hero-panel">
        <p className="eyebrow">Destiny 2 tracker</p>
        <h1>RaD Challenge</h1>
        <p className="hero-copy">
          A simple, responsive tracker built from your workbook for rules, goals, completions,
          unlocks, and exotic progression.
        </p>

        <div className="hero-meta">
          <div>
            <span className="meta-label">Style</span>
            <strong>Simple Destiny UI</strong>
          </div>
          <div>
            <span className="meta-label">Mode</span>
            <strong>Static site, local-first</strong>
          </div>
          <div>
            <span className="meta-label">Next</span>
            <strong>Interactive progress tracking</strong>
          </div>
        </div>
      </section>

      <section className="grid-two">
        <div className="panel">
          <SectionHeader
            eyebrow="Rules"
            title="Default rules"
            text="Base challenge requirements from the workbook."
          />
          <SimpleList items={rules.default} />
        </div>

        <div className="panel">
          <SectionHeader
            eyebrow="Rules"
            title="Expert rules"
            text="The harder ruleset for the full challenge run."
          />
          <SimpleList items={rules.expert} />
        </div>
      </section>

      <section className="panel">
        <SectionHeader
          eyebrow="Goals"
          title="Challenge ladders"
          text="The workbook defines four escalating challenge goals."
        />
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

      <section className="panel">
        <SectionHeader
          eyebrow="Marks"
          title="Mark economy"
          text="How completions convert into progression."
        />
        <SimpleList items={markRules} />
      </section>

      <section className="grid-two">
        <ActivityList title="Raids" items={raids} />
        <ActivityList title="Dungeons" items={dungeons} />
      </section>

      <section className="panel">
        <SectionHeader
          eyebrow="Unlocks"
          title="Relics and subclasses"
          text="Unlock costs pulled from the workbook."
        />
        <div className="grid-two">
          <UnlockGroup title="Relics" items={unlocks.relics} />
          <UnlockGroup title="Subclasses" items={unlocks.subclasses} />
          <UnlockGroup title="Aspects" items={unlocks.aspects} />
          <UnlockGroup title="Fragments" items={unlocks.fragments} />
        </div>
      </section>

      <section className="panel">
        <SectionHeader
          eyebrow="Exotics"
          title="Exotic rules"
          text="Exotic access, spins, and Dual Destiny costs."
        />
        <SimpleList items={exoticRules} />
      </section>
    </main>
  )
}