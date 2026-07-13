import { useMemo } from 'react'
import Layout from '../components/Layout'
import { rules, goals } from '../data'
import { faqs } from '../data/faqs'

const rulesetOptions = [
  { id: 'default', label: 'Default Ruleset', description: 'Basic Fresh-Character Rules.' },
  { id: 'expert', label: 'Expert Ruleset', description: 'Adds Subclass, Relic, and Exotic Restrictions.' }
]

export default function RulesPage({
  nav,
  selectedDifficulty,
  selectedRuleset,
  setSelectedDifficulty,
  setSelectedRuleset
}) {
  const activeRules = useMemo(() => rules[selectedRuleset] || rules.default, [selectedRuleset])

  return (
    <Layout
      nav={nav}
      eyebrow="Rules"
      title="Choose Your Challenge"
      intro="Pick a Goal and Ruleset."
    >
      <section className="panel activity-panel">
        <h2>Select Your Goal</h2>
        <div className="choice-grid">
          {goals.map((option) => (
            <button
              key={option.title}
              type="button"
              className={`choice-card ${selectedDifficulty === option.tier ? 'selected' : ''}`}
              onClick={() => setSelectedDifficulty(option.tier)}
              aria-pressed={selectedDifficulty === option.tier}
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
              className={`choice-card ${selectedRuleset === option.id ? 'selected' : ''}`}
              onClick={() => setSelectedRuleset(option.id)}
              aria-pressed={selectedRuleset === option.id}
            >
              <span className="choice-label">{option.label}</span>
              <span className="choice-description">{option.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel activity-panel">
        <h2>Selected Rules</h2>
        <p className="section-text">
          Goal: <strong>{selectedDifficulty}</strong> · Ruleset: <strong>{selectedRuleset}</strong>
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

      <section className="panel activity-panel">
        <h2>FAQ</h2>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details className="faq-item" key={`${item.question}-${index}`}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </Layout>
  )
}