import { useMemo } from 'react'
import Layout from '../components/Layout'
import { rules, goals } from '../data'
import { faqs } from '../data/faqs'

const rulesetOptions = [
  {
    id: 'default',
    label: 'Default Ruleset',
    description: 'Basic fresh-character rules.'
  },
  {
    id: 'expert',
    label: 'Expert Ruleset',
    description: 'Adds subclass, relic, and exotic restrictions.'
  }
]

export default function RulesPage({
  nav,
  selectedDifficulty,
  selectedRuleset,
  setSelectedDifficulty,
  setSelectedRuleset
}) {
  const activeRules = useMemo(() => {
    return rules[selectedRuleset] || rules.default
  }, [selectedRuleset])

  return (
    <Layout
      nav={nav}
      eyebrow="Rules"
      title="Challenge Rules"
      intro="Choose your goal and ruleset, then review the active rules before you start tracking progress."
    >
      <section className="panel activity-panel">
        <div className="section-header">
          <h2>Select Your Goal</h2>
          <p className="section-text">
            Pick the challenge tier you want to run.
          </p>
        </div>

        <div className="choice-grid">
          {goals.map((option) => (
            <button
              key={option.tier}
              type="button"
              className={`choice-card ${selectedDifficulty === option.tier ? 'selected' : ''}`}
              onClick={() => setSelectedDifficulty(option.tier)}
              aria-pressed={selectedDifficulty === option.tier}
            >
              <span className="choice-label">{option.tier}</span>
              <strong>{option.title}</strong>
              <span className="choice-description">{option.description}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="panel activity-panel">
        <div className="section-header">
          <h2>Ruleset</h2>
          <p className="section-text">
            Switch between the standard and restricted challenge formats.
          </p>
        </div>

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
        <div className="section-header">
          <h2>Selected Rules</h2>
          <p className="section-text">
            Goal: {selectedDifficulty} · Ruleset: {selectedRuleset}
          </p>
        </div>

        <div>
          {activeRules.map((rule, index) => (
            <div key={rule} className="rule-row">
              <span className="rule-index">{index + 1}</span>
              <p>{rule}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel activity-panel">
        <div className="section-header">
          <h2>FAQ</h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={`${item.question}-${index}`} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </Layout>
  )
}