import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { ClerkProvider, SignIn, useUser } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ActiveAlerts from './pages/ActiveAlerts.jsx'
import NewAlerts from './pages/NewAlerts.jsx'
import PreDefinedAlert from './components/preDefinedAlert/PreDefinedAlert.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} >
        <Route path='' element={<Dashboard />} />
        <Route path='active-alerts' element={<ActiveAlerts/>} />
        <Route path='new-alerts'>
          <Route path='' element={<NewAlerts/>} />
          <Route path='predefined' element={<PreDefinedAlert/>} />
        </Route>
      </Route>
    </>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
