import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocalState } from './hooks/useLocalState'
import TopNav from './components/TopNav'
import RulesPage from './pages/RulesPage'
import ActivitiesPage from './pages/ActivitiesPage'
import UnlocksPage from './pages/UnlocksPage'
import ExoticsPage from './pages/ExoticsPage'
import { STORAGE_KEY } from './data'

function HomeRedirect() {
  return <Navigate to="/rules" replace />
}

export default function App() {
  const [progress, setProgress] = useLocalState(STORAGE_KEY, { completions: {}, availableMarks: 0 })

  const setCompletions = (updater) => {
    setProgress((prev) => {
      const completions = typeof updater === 'function' ? updater(prev.completions || {}) : updater
      return { ...prev, completions }
    })
  }

  const setAvailableMarks = (value) => {
    setProgress((prev) => ({ ...prev, availableMarks: value }))
  }

  const availableMarks = Number(progress.availableMarks || 0)

  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/rules" element={<RulesPage nav={<TopNav availableMarks={availableMarks} />} />} />
      <Route
        path="/activities"
        element={
          <ActivitiesPage
            nav={<TopNav availableMarks={availableMarks} />}
            completions={progress.completions || {}}
            setCompletions={setCompletions}
            setAvailableMarks={setAvailableMarks}
          />
        }
      />
      <Route path="/unlocks" element={<UnlocksPage nav={<TopNav availableMarks={availableMarks} />} />} />
      <Route path="/exotics" element={<ExoticsPage nav={<TopNav availableMarks={availableMarks} />} />} />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  )
}