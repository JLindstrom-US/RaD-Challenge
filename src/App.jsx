import { Routes, Route, Navigate } from 'react-router-dom'
import TopNav from './components/TopNav'
import RulesPage from './pages/RulesPage'
import ActivitiesPage from './pages/ActivitiesPage'
import UnlocksPage from './pages/UnlocksPage'
import ExoticsPage from './pages/ExoticsPage'

function HomeRedirect() {
  return <Navigate to="/rules" replace />
}

export default function App() {
  const nav = <TopNav />

  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/rules" element={<RulesPage nav={nav} />} />
      <Route path="/activities" element={<ActivitiesPage nav={nav} />} />
      <Route path="/unlocks" element={<UnlocksPage nav={nav} />} />
      <Route path="/exotics" element={<ExoticsPage nav={nav} />} />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  )
}