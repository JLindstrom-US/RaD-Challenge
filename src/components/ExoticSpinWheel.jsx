import { useEffect, useMemo, useRef, useState } from 'react'

const ROW_HEIGHT = 64
const VISIBLE_ROWS = 3
const CENTER_INDEX = Math.floor(VISIBLE_ROWS / 2)
const SPIN_LOOPS = 6
const SPIN_DURATION_MS = 5200

function normalizeItems(items) {
  return Array.isArray(items) ? items.filter(Boolean) : []
}

function buildReelItems(items) {
  if (!items.length) return []

  const before = Array.from({ length: SPIN_LOOPS }, () => items).flat()
  const after = Array.from({ length: 2 }, () => items).flat()

  return [...before, ...items, ...after]
}

export default function ExoticSpinWheel({ title, items = [] }) {
  const safeItems = useMemo(() => normalizeItems(items), [items])
  const reelItems = useMemo(() => buildReelItems(safeItems), [safeItems])

  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [translateY, setTranslateY] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(false)

  const timeoutRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    setSelectedItem(null)
    setIsSpinning(false)
    setTransitionEnabled(false)
    setTranslateY(0)

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [title, safeItems])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSpin = () => {
    if (!safeItems.length || isSpinning) return

    const randomIndex = Math.floor(Math.random() * safeItems.length)
    const winner = safeItems[randomIndex]

    const baseIndex = safeItems.length * SPIN_LOOPS
    const targetIndex = baseIndex + randomIndex
    const targetOffset = (targetIndex - CENTER_INDEX) * ROW_HEIGHT

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    setIsSpinning(true)
    setSelectedItem(null)
    setTransitionEnabled(false)
    setTranslateY(0)

    window.requestAnimationFrame(() => {
      if (trackRef.current) {
        void trackRef.current.offsetHeight
      }

      window.requestAnimationFrame(() => {
        setTransitionEnabled(true)
        setTranslateY(-targetOffset)
      })
    })

    timeoutRef.current = window.setTimeout(() => {
      setSelectedItem(winner)
      setIsSpinning(false)
    }, SPIN_DURATION_MS)
  }

  return (
    <div className="wheel-shell">
      <div className="wheel-card-head">
        <span className="wheel-kicker">
          {safeItems.length ? `${safeItems.length} possible results` : 'No items loaded yet'}
        </span>
      </div>

      <div className="reel-shell" aria-live="polite">
        <div className="reel-window">
          <div className="reel-fade reel-fade--top" />
          <div className="reel-center-highlight" />
          <div className="reel-fade reel-fade--bottom" />

          <div
            ref={trackRef}
            className={`reel-track ${transitionEnabled ? 'is-animated' : ''}`}
            style={{ transform: `translateY(${translateY}px)` }}
          >
            {reelItems.map((item, index) => (
              <div key={`${title}-${item}-${index}`} className="reel-row">
                <span className="reel-row-label">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wheel-actions">
        <button
          type="button"
          className="primary-button"
          onClick={handleSpin}
          disabled={!safeItems.length || isSpinning}
        >
          {isSpinning ? 'Spinning…' : `Spin ${title}`}
        </button>
      </div>

      <div className="wheel-result">
        <span className="wheel-result-label">Selected Exotic</span>
        <strong className="wheel-result-value">
          {selectedItem || 'Spin the wheel to reveal a result.'}
        </strong>
      </div>
    </div>
  )
}