import { useUser } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom' // Navigate is used to redirect
import Sidebar from './shared/Sidebar'
import Header from './shared/Header'
import LoginPage from './shared/LoginPage'

const App = () => {
  const { isLoaded, user } = useUser() // Get authentication state

  if (!isLoaded) {
    return <div>Loading...</div> // Show loading state while Clerk is loading
  }

  if (!user) {
    return <LoginPage /> // If the user is not authenticated, show the login page
  }

  return (
    <div className="flex bg-gray-900 text-gray-200">
      {/* Sidebar - Fixed */}
      <div className="w-64 h-screen fixed shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex flex-col w-full ml-60 py-5 px-5 overflow-auto h-screen">
        <Header />
        <div className="flex-1">
          {/* Protected content goes here */}
          <Outlet /> {/* Render nested routes */}
        </div>
      </div>
    </div>
  )
}

export default App
