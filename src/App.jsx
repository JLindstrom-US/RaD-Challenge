import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocalState } from './hooks/useLocalState'
import TopNav from './components/TopNav'
import RulesPage from './pages/RulesPage'
import ActivitiesPage from './pages/ActivitiesPage'
import UnlocksPage from './pages/UnlocksPage'
import ExoticsPage from './pages/ExoticsPage'
import DebugPage from './pages/DebugPage'
import {
  STORAGE_KEY,
  allActivities,
  unlockGroups,
  defaultSubclassUnlocks,
  defaultExotics,
  defaultProgress
} from './data'

function HomeRedirect() {
  return <Navigate to="/rules" replace />
}

function calcActivityMarks(completions) {
  return Object.entries(completions || {}).reduce((sum, [name, count]) => {
    const activity = allActivities.find((item) => item.name === name)
    if (!activity) return sum

    const normalizedCount = Math.max(0, Number(count || 0))
    if (normalizedCount === 0) return sum

    return sum + activity.marks + Math.max(0, normalizedCount - 1) * (activity.marks / 2)
  }, 0)
}

function calcBaseUnlockMarks(unlocks) {
  return Object.entries(unlocks || {}).reduce((sum, [key, checked]) => {
    if (!checked) return sum

    const [group, indexString] = key.split(':')
    if (group === 'subclasses') return sum

    const index = Number(indexString)
    const item = unlockGroups[group]?.[index]

    return item ? sum - Number(item.cost || 0) : sum
  }, 0)
}

function calcSubclassMarks(subclassUnlocks, freeSubclassName) {
  const freeEligible = ['Solar', 'Arc', 'Void', 'Stasis', 'Strand']

  return Object.entries(subclassUnlocks || {}).reduce((sum, [name, unlocked]) => {
    if (!unlocked) return sum
    if (name === 'Prismatic') return sum - 10
    if (freeEligible.includes(name)) {
      return name === freeSubclassName ? sum : sum - 5
    }
    return sum
  }, 0)
}

function calcExoticMarks(exotics) {
  const weaponCount = Number(exotics?.weaponCount || 0)
  const armorCount = Number(exotics?.armorCount || 0)
  const dismantledCount = Number(exotics?.dismantledCount || 0)
  const dualDestinyCount = Number(exotics?.dualDestinyCount || 0)

  return -(weaponCount * 5) - (armorCount * 5) + dismantledCount - (dualDestinyCount * 5)
}

export default function App() {
  const [progress, setProgress] = useLocalState(STORAGE_KEY, defaultProgress)

  const completions = progress?.completions || {}
  const unlocks = progress?.unlocks || {}
  const subclassUnlocks = progress?.subclassUnlocks || defaultSubclassUnlocks
  const freeSubclassName = progress?.freeSubclassName ?? null
  const exotics = progress?.exotics || defaultExotics
  const pointOverrideEnabled = Boolean(progress?.pointOverrideEnabled)
  const pointOverrideValue = Number(progress?.pointOverrideValue || 0)
  const selectedDifficulty = progress?.selectedDifficulty || 'Easy'
  const selectedRuleset = progress?.selectedRuleset || 'default'

  const activityMarks = calcActivityMarks(completions)
  const baseUnlockMarks = calcBaseUnlockMarks(unlocks)
  const subclassMarks = calcSubclassMarks(subclassUnlocks, freeSubclassName)
  const exoticMarks = calcExoticMarks(exotics)
  const computedMarks = activityMarks + baseUnlockMarks + subclassMarks + exoticMarks
  const availableMarks = pointOverrideEnabled ? pointOverrideValue : computedMarks

  const setCompletions = (updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev?.completions || {}) : updater
      return { ...prev, completions: next }
    })
  }

  const setUnlocks = (updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev?.unlocks || {}) : updater
      return { ...prev, unlocks: next }
    })
  }

  const setSubclassState = (updater) => {
    setProgress((prev) => {
      const current = {
        subclassUnlocks: prev?.subclassUnlocks || defaultSubclassUnlocks,
        freeSubclassName: prev?.freeSubclassName ?? null
      }

      const next = typeof updater === 'function' ? updater(current) : updater

      return {
        ...prev,
        subclassUnlocks: next.subclassUnlocks,
        freeSubclassName: next.freeSubclassName
      }
    })
  }

  const setExotics = (updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev?.exotics || defaultExotics) : updater
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

  const setSelectedDifficulty = (value) => {
    setProgress((prev) => ({
      ...prev,
      selectedDifficulty: value
    }))
  }

  const setSelectedRuleset = (value) => {
    setProgress((prev) => ({
      ...prev,
      selectedRuleset: value
    }))
  }

  return (
    <>
      <TopNav nav={{ marks: availableMarks }} />

      <Routes>
        <Route path="/" element={<HomeRedirect />} />

        <Route
          path="/rules"
          element={
            <RulesPage
              nav={{ marks: availableMarks }}
              selectedDifficulty={selectedDifficulty}
              selectedRuleset={selectedRuleset}
              setSelectedDifficulty={setSelectedDifficulty}
              setSelectedRuleset={setSelectedRuleset}
            />
          }
        />

        <Route
          path="/activities"
          element={
            <ActivitiesPage
              nav={{ marks: availableMarks }}
              completions={completions}
              setCompletions={setCompletions}
            />
          }
        />

        <Route
          path="/unlocks"
          element={
            <UnlocksPage
              nav={{ marks: availableMarks }}
              unlocks={unlocks}
              setUnlocks={setUnlocks}
              subclassUnlocks={subclassUnlocks}
              freeSubclassName={freeSubclassName}
              setSubclassState={setSubclassState}
            />
          }
        />

        <Route
          path="/exotics"
          element={
            <ExoticsPage
              nav={{ marks: availableMarks }}
              exotics={exotics}
              setExotics={setExotics}
            />
          }
        />

        <Route
          path="/debug"
          element={
            <DebugPage
              nav={{ marks: availableMarks }}
              pointOverrideEnabled={pointOverrideEnabled}
              pointOverrideValue={pointOverrideValue}
              setPointOverride={setPointOverride}
              setProgress={setProgress}
              completions={completions}
              setCompletions={setCompletions}
              activities={allActivities}
            />
          }
        />

        <Route path="*" element={<Navigate to="/rules" replace />} />
      </Routes>
    </>
  )
}