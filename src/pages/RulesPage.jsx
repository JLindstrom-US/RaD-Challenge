import { useMemo, useState } from 'react'
import Layout from '../components/Layout'
import { rules, goals } from '../data'

const rulesetOptions = [
  { id: 'default', label: 'Default Ruleset', description: 'Basic fresh-character rules.' },
  { id: 'expert', label: 'Expert Ruleset', description: 'Adds subclass, relic, and exotic gates.' }
]

export default function RulesPage({ nav }) {
  const [goal, setGoal] = useState(goals[0].title)
  const [ruleset, setRuleset] = useState('default')

  const activeRules = useMemo(() => rules[ruleset] || rules.default, [ruleset])

  return (
    <Layout
      nav={nav}
      eyebrow="Rules"
      title="Choose your challenge"
      intro="Pick a goal and ruleset. The selected cards will stand out so the current setup is always obvious."
    >
      <section className="panel activity-panel">
        <h2>Select Your Goal</h2>
        <div className="choice-grid">
          {goals.map((option) => (
            <button
              key={option.title}
              type="button"
              className={`choice-card ${goal === option.title ? 'selected' : ''}`}
              onClick={() => setGoal(option.title)}
              aria-pressed={goal === option.title}
            >
              <span className="choice-label">{option.tier}</span>
              <span className="choice-description">{option.title}</span>
              <span className="choice-note">{option.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel activity-panel">
        <h2>Ruleset</h2>
        <div className="choice-grid">
          {rulesetOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`choice-card ${ruleset === option.id ? 'selected' : ''}`}
              onClick={() => setRuleset(option.id)}
              aria-pressed={ruleset === option.id}
            >
              <span className="choice-label">{option.label}</span>
              <span className="choice-description">{option.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel activity-panel">
        <h2>Selected rules</h2>
        <p className="section-text">
          Goal: <strong>{goal}</strong> · Ruleset: <strong>{ruleset}</strong>
        </p>
        <div className="rules-list">
          {activeRules.map((rule, index) => (
            <article className="rule-row" key={index}>
              <span className="rule-index">{index + 1}</span>
              <p>{rule}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}