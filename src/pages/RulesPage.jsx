import { useMemo, useState } from 'react'
import Layout from '../components/Layout'
import { rules } from '../data'

const difficultyOptions = [
  { id: 'casual', label: 'Casual', description: 'Baseline rules for a lighter run.' },
  { id: 'standard', label: 'Standard', description: 'Balanced default challenge.' },
  { id: 'expert', label: 'Expert', description: 'Full restrictions and harder unlock rules.' }
]

const rulesetOptions = [
  { id: 'default', label: 'Default Ruleset', description: 'Basic fresh-character rules.' },
  { id: 'expert', label: 'Expert Ruleset', description: 'Adds subclass, relic, and exotic gates.' }
]

export default function RulesPage({ nav }) {
  const [difficulty, setDifficulty] = useState('standard')
  const [ruleset, setRuleset] = useState('default')

  const activeRules = useMemo(() => rules[ruleset] || rules.default, [ruleset])

  return (
    <Layout
      nav={nav}
      eyebrow="Rules"
      title="Choose your challenge"
      intro="Pick a difficulty and ruleset. The selected cards will stand out so the current setup is always obvious."
    >
      <section className="panel activity-panel">
        <h2>Difficulty</h2>
        <div className="choice-grid">
          {difficultyOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`choice-card ${difficulty === option.id ? 'selected' : ''}`}
              onClick={() => setDifficulty(option.id)}
              aria-pressed={difficulty === option.id}
            >
              <span className="choice-label">{option.label}</span>
              <span className="choice-description">{option.description}</span>
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
          Difficulty: <strong>{difficulty}</strong> · Ruleset: <strong>{ruleset}</strong>
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