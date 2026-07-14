import TopNav from './TopNav'

export default function Layout({ nav, title, eyebrow, intro, children }) {
  return (
    <>
      <TopNav nav={nav} />

      <main className="app-shell">
        <section className="panel hero-panel page-hero">
          <div className="hero-mark" aria-hidden="true" />
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-copy">{intro}</p>
        </section>

        {children}
      </main>
    </>
  )
}