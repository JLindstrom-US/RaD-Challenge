import Layout from '../components/Layout'

export default function DebugPage({ nav, manualAdjust, setManualAdjust, setProgress }) {
  return (
    <Layout
      nav={nav}
      eyebrow="Debug"
      title="Point Controls"
      intro="Use this page to repair point totals if something was added by mistake."
    >
      <section className="panel activity-panel">
        <h2>Manual adjustment</h2>
        <p className="section-text">Current manual adjustment: {manualAdjust}</p>
        <div className="debug-actions">
          <button className="secondary-button" type="button" onClick={() => setManualAdjust((v) => v - 1)}>
            Remove 1 Point
          </button>
          <button className="secondary-button" type="button" onClick={() => setManualAdjust((v) => v + 1)}>
            Add 1 Point
          </button>
          <button className="danger-button" type="button" onClick={() => setProgress({ completions: {}, unlocks: {}, manualAdjust: 0 })}>
            Reset Everything
          </button>
        </div>
      </section>
    </Layout>
  )
}