import { Navigate, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import Notification from './pages/Notification'
import Call from './pages/Call'
import Chat from './pages/Chat'
import Onbaording from './pages/Onbaording'
import { Toaster } from 'react-hot-toast'
import useAuthUser from './hooks/useAuthUser'
import Layout from './component/Layout'
import { useThemeStore } from './store/useThemeStore'

function App() {
  const { authUser } = useAuthUser()
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded
  const { theme } = useThemeStore

  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Home />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />
        <Route
          path='/signup'
          element={
            !isAuthenticated ? <Signup /> : <Navigate to={isOnboarded ? '/' : '/onboarding'} />
          }
        />
        <Route
          path='/login'
          element={
            !isAuthenticated ? <Login /> : <Navigate to={isOnboarded ? '/' : '/onboarding'} />
          }
        />
        <Route
          path='/notifications'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Notification />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />
        <Route path='/call/:id' element={<Call />} />
        <Route
          path='/chat/:id'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <Chat />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />
            )
          }
        />
        <Route
          path='/onboarding'
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <Onbaording />
              ) : (
                <Navigate to='/' />
              )
            ) : (
              <Navigate to='/login' />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
