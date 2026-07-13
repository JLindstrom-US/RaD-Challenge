import Layout from '../components/Layout'
import { exoticRules } from '../data'

export default function ExoticsPage({ nav }) {
  return (
    <Layout
      nav={nav}
      eyebrow="Exotics"
      title="Exotic Access"
      intro="The exotic section keeps the same visual language: dark panels, gold accents, and restrained sci-fi detail."
    >
      <section className="panel content-panel">
        <h2>Exotic rules</h2>
        <ul className="simple-list">
          {exoticRules.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </Layout>
  )
}