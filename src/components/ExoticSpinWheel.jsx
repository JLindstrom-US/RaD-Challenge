import { useEffect, useMemo, useRef, useState } from 'react'

const ROW_HEIGHT = 64
const VISIBLE_ROWS = 3
const CENTER_INDEX = Math.floor(VISIBLE_ROWS / 2)
const SPIN_LOOPS = 6
const SPIN_DURATION_MS = 5200
const SPIN_EASING = 'cubic-bezier(0.12, 0.8, 0.2, 1)'

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

  const trackRef = useRef(null)
  const animationRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    setIsSpinning(false)
    setSelectedItem(null)

    if (animationRef.current) {
      animationRef.current.cancel()
      animationRef.current = null
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (trackRef.current) {
      trackRef.current.style.transform = 'translateY(0px)'
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.cancel()
        animationRef.current = null
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [title, safeItems])

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.cancel()
        animationRef.current = null
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [])

  const handleSpin = () => {
    if (!safeItems.length || isSpinning || !trackRef.current) return

    const randomIndex = Math.floor(Math.random() * safeItems.length)
    const winner = safeItems[randomIndex]

    const baseIndex = safeItems.length * SPIN_LOOPS
    const targetIndex = baseIndex + randomIndex
    const targetOffset = (targetIndex - CENTER_INDEX) * ROW_HEIGHT

    if (animationRef.current) {
      animationRef.current.cancel()
      animationRef.current = null
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    const track = trackRef.current
    setIsSpinning(true)
    setSelectedItem(null)
    track.style.transform = 'translateY(0px)'

    const animation = track.animate(
      [
        { transform: 'translateY(0px)' },
        { transform: `translateY(${-targetOffset}px)` }
      ],
      {
        duration: SPIN_DURATION_MS,
        easing: SPIN_EASING,
        fill: 'forwards'
      }
    )

    animationRef.current = animation

    animation.onfinish = () => {
      track.style.transform = `translateY(${-targetOffset}px)`
      animationRef.current = null
      setSelectedItem(winner)
      setIsSpinning(false)
    }

    animation.oncancel = () => {
      animationRef.current = null
    }
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

          <div ref={trackRef} className="reel-track">
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