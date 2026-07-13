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

function calcUnlockMarks(unlocks) {
  return Object.entries(unlocks || {}).reduce((sum, [key, checked]) => {
    if (!checked) return sum
    const [group, ...rest] = key.split(':')
    const index = Number(rest.join(':'))
    if (group !== 'subclasses') return sum
    const item = unlockGroups.subclasses[index]
    return item ? sum - (item.name === 'Prismatic' ? 10 : item.cost) : sum
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
  const [progress, setProgress] = useLocalState(STORAGE_KEY, {
    completions: {},
    unlocks: {},
    subclass: {
      selected: '',
      freeUsed: false
    },
    exotics: {
      weaponCount: 0,
      armorCount: 0,
      dismantledCount: 0,
      dualDestinyCount: 0,
      weaponWheelUrl: 'https://example.com/exotic-weapon-wheel',
      armorWheelUrl: 'https://example.com/exotic-armor-wheel'
    },
    manualAdjust: 0
  })

  const completions = progress.completions || {}
  const unlocks = progress.unlocks || {}
  const subclass = progress.subclass || { selected: '', freeUsed: false }
  const exotics = progress.exotics || {}
  const manualAdjust = Number(progress.manualAdjust || 0)

  const activityMarks = calcActivityMarks(completions)
  const unlockMarks = calcUnlockMarks(unlocks)
  const exoticMarks = calcExoticMarks(exotics)
  const availableMarks = activityMarks + unlockMarks + exoticMarks + manualAdjust

  const setCompletions = (updater) => {
    setProgress((prev) => {
      const nextCompletions = typeof updater === 'function' ? updater(prev.completions || {}) : updater
      return { ...prev, completions: nextCompletions }
    })
  }

  const setUnlocks = (updater) => {
    setProgress((prev) => {
      const nextUnlocks = typeof updater === 'function' ? updater(prev.unlocks || {}) : updater
      return { ...prev, unlocks: nextUnlocks }
    })
  }

  const setSubclass = (updater) => {
    setProgress((prev) => {
      const nextSubclass = typeof updater === 'function' ? updater(prev.subclass || { selected: '', freeUsed: false }) : updater
      return { ...prev, subclass: nextSubclass }
    })
  }

  const setExotics = (updater) => {
    setProgress((prev) => {
      const nextExotics = typeof updater === 'function' ? updater(prev.exotics || {}) : updater
      return { ...prev, exotics: nextExotics }
    })
  }

  const setManualAdjust = (updater) => {
    setProgress((prev) => {
      const nextAdjust = typeof updater === 'function' ? updater(Number(prev.manualAdjust || 0)) : updater
      return { ...prev, manualAdjust: Number(nextAdjust || 0) }
    })
  }

  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/rules" element={<RulesPage nav={<TopNav availableMarks={availableMarks} />} />} />
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
            subclass={subclass}
            setSubclass={setSubclass}
            availableMarks={availableMarks}
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
            manualAdjust={manualAdjust}
            setManualAdjust={setManualAdjust}
            setProgress={setProgress}
          />
        }
      />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  )
}