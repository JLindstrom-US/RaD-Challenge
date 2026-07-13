import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocalState } from './hooks/useLocalState'
import TopNav from './components/TopNav'
import RulesPage from './pages/RulesPage'
import ActivitiesPage from './pages/ActivitiesPage'
import UnlocksPage from './pages/UnlocksPage'
import ExoticsPage from './pages/ExoticsPage'
import DebugPage from './pages/DebugPage'
import { STORAGE_KEY, allActivities, unlockGroups } from './data'

function HomeRedirect() {
  return <Navigate to="/rules" replace />
}

function calcActivityMarks(completions) {
  return Object.entries(completions || {}).reduce((sum, [name, count]) => {
    const activity = allActivities.find((a) => a.name === name)
    if (!activity) return sum
    return sum + activity.marks + Math.max(0, count - 1) * (activity.marks / 2)
  }, 0)
}

function calcBaseUnlockMarks(unlocks) {
  return Object.entries(unlocks || {}).reduce((sum, [key, checked]) => {
    if (!checked) return sum
    const [group, indexString] = key.split(':')
    if (group === 'subclasses') return sum
    const index = Number(indexString)
    const item = unlockGroups[group]?.[index]
    return item ? sum - item.cost : sum
  }, 0)
}

function calcSubclassMarks(subclassUnlocks, freeSubclassUsed) {
  const freeEligible = ['Solar', 'Arc', 'Void', 'Stasis', 'Strand']
  let total = 0

  for (const name of ['Solar', 'Arc', 'Void', 'Stasis', 'Strand', 'Prismatic']) {
    if (!subclassUnlocks?.[name]) continue
    if (name === 'Prismatic') {
      total -= 10
    } else if (freeEligible.includes(name)) {
      total -= freeSubclassUsed && subclassUnlocks[name] === true ? 5 : 0
    }
  }

  return total
}

function calcExoticMarks(exotics) {
  const weaponCount = Number(exotics?.weaponCount || 0)
  const armorCount = Number(exotics?.armorCount || 0)
  const dismantledCount = Number(exotics?.dismantledCount || 0)
  const dualDestinyCount = Number(exotics?.dualDestinyCount || 0)
  return -(weaponCount * 5) - (armorCount * 5) + dismantledCount - (dualDestinyCount * 5)
}

const defaults = {
  completions: {},
  unlocks: {},
  subclassUnlocks: {
    Solar: false,
    Arc: false,
    Void: false,
    Stasis: false,
    Strand: false,
    Prismatic: false
  },
  freeSubclassUsed: false,
  exotics: {
    weaponCount: 0,
    armorCount: 0,
    dismantledCount: 0,
    dualDestinyCount: 0,
    weaponWheelUrl: 'https://example.com/exotic-weapon-wheel',
    armorWheelUrl: 'https://example.com/exotic-armor-wheel'
  },
  pointOverrideEnabled: false,
  pointOverrideValue: 0,
  selectedDifficulty: 'standard',
  selectedRuleset: 'default',
  faqs: []
}

export default function App() {
  const [progress, setProgress] = useLocalState(STORAGE_KEY, defaults)

  const completions = progress.completions || {}
  const unlocks = progress.unlocks || {}
  const subclassUnlocks = progress.subclassUnlocks || defaults.subclassUnlocks
  const freeSubclassUsed = Boolean(progress.freeSubclassUsed)
  const exotics = progress.exotics || defaults.exotics
  const pointOverrideEnabled = Boolean(progress.pointOverrideEnabled)
  const pointOverrideValue = Number(progress.pointOverrideValue || 0)
  const selectedDifficulty = progress.selectedDifficulty || defaults.selectedDifficulty
  const selectedRuleset = progress.selectedRuleset || defaults.selectedRuleset
  const faqs = progress.faqs || defaults.faqs

  const activityMarks = calcActivityMarks(completions)
  const baseUnlockMarks = calcBaseUnlockMarks(unlocks)
  const subclassMarks = calcSubclassMarks(subclassUnlocks, freeSubclassUsed)
  const exoticMarks = calcExoticMarks(exotics)
  const computedMarks = activityMarks + baseUnlockMarks + subclassMarks + exoticMarks
  const availableMarks = pointOverrideEnabled ? pointOverrideValue : computedMarks

  const setCompletions = (updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev.completions || {}) : updater
      return { ...prev, completions: next }
    })
  }

  const setUnlocks = (updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev.unlocks || {}) : updater
      return { ...prev, unlocks: next }
    })
  }

  const setSubclassState = (updater) => {
    setProgress((prev) => {
      const current = {
        subclassUnlocks: prev.subclassUnlocks || defaults.subclassUnlocks,
        freeSubclassUsed: Boolean(prev.freeSubclassUsed)
      }
      const next = typeof updater === 'function' ? updater(current) : updater
      return {
        ...prev,
        subclassUnlocks: next.subclassUnlocks,
        freeSubclassUsed: next.freeSubclassUsed
      }
    })
  }

  const setExotics = (updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev.exotics || defaults.exotics) : updater
      return { ...prev, exotics: next }
    })
  }

  const setPointOverride = ({ enabled, value }) => {
    setProgress((prev) => ({
      ...prev,
      pointOverrideEnabled: enabled,
      pointOverrideValue: Number(value || 0)
    }))
  }

  const setSelectedDifficulty = (selectedDifficulty) => {
    setProgress((prev) => ({ ...prev, selectedDifficulty }))
  }

  const setSelectedRuleset = (selectedRuleset) => {
    setProgress((prev) => ({ ...prev, selectedRuleset }))
  }

  const setFaqs = (updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev.faqs || []) : updater
      return { ...prev, faqs: next }
    })
  }

  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route
        path="/rules"
        element={
          <RulesPage
            nav={<TopNav availableMarks={availableMarks} />}
            selectedDifficulty={selectedDifficulty}
            selectedRuleset={selectedRuleset}
            setSelectedDifficulty={setSelectedDifficulty}
            setSelectedRuleset={setSelectedRuleset}
            faqs={faqs}
            setFaqs={setFaqs}
          />
        }
      />
      <Route
        path="/activities"
        element={
          <ActivitiesPage
            nav={<TopNav availableMarks={availableMarks} />}
            completions={completions}
            setCompletions={setCompletions}
          />
        }
      />
      <Route
        path="/unlocks"
        element={
          <UnlocksPage
            nav={<TopNav availableMarks={availableMarks} />}
            unlocks={unlocks}
            setUnlocks={setUnlocks}
            subclassUnlocks={subclassUnlocks}
            freeSubclassUsed={freeSubclassUsed}
            setSubclassState={setSubclassState}
          />
        }
      />
      <Route
        path="/exotics"
        element={
          <ExoticsPage
            nav={<TopNav availableMarks={availableMarks} />}
            exotics={exotics}
            setExotics={setExotics}
          />
        }
      />
      <Route
        path="/debug"
        element={
          <DebugPage
            nav={<TopNav availableMarks={availableMarks} />}
            pointOverrideEnabled={pointOverrideEnabled}
            pointOverrideValue={pointOverrideValue}
            setPointOverride={setPointOverride}
            setProgress={setProgress}
          />
        }
      />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  )
}