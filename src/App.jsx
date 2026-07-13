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
  return <ul className="simple-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>
}

function ActivityList({ title, items }) {
  return (
    <section className="panel activity-panel">
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
    <section className="panel activity-panel">
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
      <section className="panel hero-panel">
        <div className="hero-mark" aria-hidden="true" />
        <p className="eyebrow">Destiny-inspired tracker</p>
        <h1>RaD Challenge</h1>
        <p className="hero-copy">
          A clean, dark sci-fi interface for your workbook rules, completions, unlocks, and
          exotic progression — inspired by Destiny’s atmosphere, but designed as an original UI.
        </p>

        <div className="hero-meta">
          <div>
            <span className="meta-label">Mode</span>
            <strong>Static, responsive</strong>
          </div>
          <div>
            <span className="meta-label">Theme</span>
            <strong>Minimal space ops</strong>
          </div>
          <div>
            <span className="meta-label">Status</span>
            <strong>Cloudflare live</strong>
          </div>
        </div>
      </section>

      <section className="grid-two">
        <div className="panel content-panel">
          <SectionHeader
            eyebrow="Rules"
            title="Default rules"
            text="Base challenge requirements from the workbook."
          />
          <SimpleList items={rules.default} />
        </div>

        <div className="panel content-panel">
          <SectionHeader
            eyebrow="Rules"
            title="Expert rules"
            text="The harder ruleset for the full challenge run."
          />
          <SimpleList items={rules.expert} />
        </div>
      </section>

      <section className="panel content-panel">
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

      <section className="grid-two">
        <ActivityList title="Raids" items={raids} />
        <ActivityList title="Dungeons" items={dungeons} />
      </section>

      <section className="panel content-panel">
        <SectionHeader
          eyebrow="Marks"
          title="Mark economy"
          text="How completions convert into progression."
        />
        <SimpleList items={markRules} />
      </section>

      <section className="panel content-panel">
        <SectionHeader
          eyebrow="Unlocks"
          title="Relics, subclasses, and exotics"
          text="Tiered unlocks, class paths, and wheel spins are shown as a clean tactical control panel rather than a flashy game HUD."
        />
        <div className="unlock-grid">
          <UnlockGroup title="Relics" items={unlocks.relics} />
          <UnlockGroup title="Subclasses" items={unlocks.subclasses} />
          <UnlockGroup title="Aspects" items={unlocks.aspects} />
          <UnlockGroup title="Fragments" items={unlocks.fragments} />
        </div>
      </section>

      <section className="panel content-panel">
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