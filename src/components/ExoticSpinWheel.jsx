import { useMemo, useState } from 'react'

const sliceColors = [
  '#7c3aed',
  '#2563eb',
  '#0891b2',
  '#059669',
  '#ca8a04',
  '#ea580c',
  '#dc2626',
  '#db2777'
]

function buildWheelGradient(count) {
  if (!count) return 'transparent'

  const step = 360 / count
  const stops = Array.from({ length: count }, (_, index) => {
    const start = index * step
    const end = start + step
    const color = sliceColors[index % sliceColors.length]
    return `${color} ${start}deg ${end}deg`
  })

  return `conic-gradient(from -90deg, ${stops.join(', ')})`
}

export default function ExoticSpinWheel({ title, items = [] }) {
  const [rotation, setRotation] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)

  const safeItems = Array.isArray(items) ? items.filter(Boolean) : []
  const count = safeItems.length
  const sliceAngle = count ? 360 / count : 0

  const background = useMemo(() => buildWheelGradient(count), [count])

  const handleSpin = () => {
    if (!count || isSpinning) return

    const selectedIndex = Math.floor(Math.random() * count)
    const fullSpins = 360 * 6
    const targetCenterAngle = selectedIndex * sliceAngle + sliceAngle / 2
    const nextRotation = rotation + fullSpins + (360 - targetCenterAngle)

    setIsSpinning(true)
    setSelectedItem(null)
    setRotation(nextRotation)

    window.setTimeout(() => {
      setSelectedItem(safeItems[selectedIndex])
      setIsSpinning(false)
    }, 5200)
  }

  return (
    <div className="wheel-card">
      <div className="wheel-card-head">
        <h3>{title}</h3>
        <p className="section-text">
          {count ? `${count} possible results` : 'No items loaded yet.'}
        </p>
      </div>

      <div className="wheel-stage">
        <div className="wheel-pointer" aria-hidden="true" />
        <div
          className={`spin-wheel ${isSpinning ? 'is-spinning' : ''}`}
          style={{
            background,
            transform: `rotate(${rotation}deg)`
          }}
          aria-label={title}
        >
          {safeItems.map((item, index) => {
            const angle = index * sliceAngle
            return (
              <div
                key={item}
                className="wheel-slice-label"
                style={{
                  transform: `rotate(${angle}deg)`
                }}
              >
                <span
                  style={{
                    transform: `translateX(-50%) rotate(${sliceAngle / 2}deg)`
                  }}
                >
                  {item}
                </span>
              </div>
            )
          })}

          <div className="wheel-center-cap" aria-hidden="true" />
        </div>
      </div>

      <div className="wheel-actions">
        <button
          type="button"
          className="primary-button"
          onClick={handleSpin}
          disabled={!count || isSpinning}
        >
          {isSpinning ? 'Spinning...' : 'Spin Wheel'}
        </button>
      </div>

      <div className="wheel-result" aria-live="polite">
        <span className="wheel-result-label">Selected Exotic</span>
        <strong className="wheel-result-value">
          {selectedItem || (isSpinning ? 'Rolling...' : 'Spin to reveal')}
        </strong>
      </div>
    </div>
  )
}