import { useMemo, useState } from 'react'
import Layout from '../components/Layout'
import { rules, goals } from '../data'

const rulesetOptions = [
  { id: 'default', label: 'Default Ruleset', description: 'Basic fresh-character rules.' },
  { id: 'expert', label: 'Expert Ruleset', description: 'Adds subclass, relic, and exotic gates.' }
]

export default function RulesPage({
  nav,
  selectedDifficulty,
  selectedRuleset,
  setSelectedDifficulty,
  setSelectedRuleset,
  faqs,
  setFaqs
}) {
  const [faqQuestion, setFaqQuestion] = useState('')
  const [faqAnswer, setFaqAnswer] = useState('')

  const activeRules = useMemo(() => rules[selectedRuleset] || rules.default, [selectedRuleset])

  const addFaq = () => {
    const q = faqQuestion.trim()
    const a = faqAnswer.trim()
    if (!q || !a) return
    setFaqs((prev) => [...prev, { question: q, answer: a }])
    setFaqQuestion('')
    setFaqAnswer('')
  }

  return (
    <Layout
      nav={nav}
      eyebrow="Rules"
      title="Choose your challenge"
      intro="Pick a goal and ruleset. Your selection is saved automatically and restored when you return."
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
        <h2>Selected rules</h2>
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

        <div className="faq-form">
          <label className="field">
            <span>Question</span>
            <input
              value={faqQuestion}
              onChange={(e) => setFaqQuestion(e.target.value)}
              placeholder="Add a new FAQ question"
            />
          </label>
          <label className="field">
            <span>Answer</span>
            <textarea
              value={faqAnswer}
              onChange={(e) => setFaqAnswer(e.target.value)}
              placeholder="Add the answer"
              rows={4}
            />
          </label>
          <button type="button" className="primary-button" onClick={addFaq}>
            Add FAQ
          </button>
        </div>
      </section>
    </Layout>
  )
}