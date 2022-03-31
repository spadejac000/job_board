import {useState, useEffect, lazy, Suspense} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import {useLocation} from 'react-router'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ThemeProvider} from 'styled-components'
import {lightTheme, darkTheme, GlobalStyles} from './themes.js'
import {useSelector} from 'react-redux'
import './App.css'
import Loader from './components/Loader';
const Header = lazy(() => import('./components/Header'))
const Footer = lazy(() => import('./components/Footer'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const PostJob = lazy(() => import('./components/PostJob'))
const Messages = lazy(() => import('./components/Messages'))
const Settings = lazy(() => import('./components/Settings'))
const UserJobs = lazy(() => import('./components/UserJobs'))
const NotFound = lazy(() => import('./components/NotFound'))
const DynamicRoutes = lazy(() => import('./components/DynamicRoutes'))
const FavoriteJobs = lazy(() => import('./components/FavoriteJobs'))
const ForgotPassword = lazy(() => import('./components/ForgotPassword'))
const Applicants = lazy(() => import('./components/Applicants'))


const App = () => {

  const location = useLocation()

  toast.configure()

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  const theme = useSelector(state => 
    state.theme
  )

  const isAuth = async () => {
    try {
      const response = await fetch('/api/users/is-verify', {
        method: "GET",
        headers: {token: localStorage.token}
      })
      const parseResponse = await response.json()
      parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false)

    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    isAuth()
  }, [isAuthenticated])

  return (
    <div className={location.pathname === '/login' ? "app-root" : location.pathname === '/register' ? 'app-root' : ""}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles/>
        <Suspense fallback={<Loader/>}>
          <Header isAuthenticated={isAuthenticated} setAuth={setAuth}/>
          <Routes>
            <Route exact path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/"/>}/>
            <Route exact path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login"/>}/>
            <Route exact path="/" element={<Dashboard  isAuthenticated={isAuthenticated}/>}/>
            <Route exact path="/post-job" element={<PostJob isAuthenticated={isAuthenticated}/>}/>
            <Route exact path="/jobs-created" element={<UserJobs isAuthenticated={isAuthenticated}/>}/>
            <Route exact path="/messages" element={<Messages isAuthenticated={isAuthenticated}/>}/>
            <Route exact path="/applicants/:id" element={<Applicants isAuthenticated={isAuthenticated}/>}/>
            <Route exact path="/forgot-password" element={<ForgotPassword isAuthenticated={isAuthenticated}/>}/>
            <Route exact path="/settings" element={<Settings setAuth={setAuth} isAuthenticated={isAuthenticated}/>}/>
            <Route exact path="/favorite-jobs" element={<FavoriteJobs isAuthenticated={isAuthenticated}/>}/>
            <Route path="/search/what/:whatKeyword" element={<Dashboard/>}/>
            <Route path="/search/where/:whereKeyword" element={<Dashboard/>}/>
            <Route path="/search/:whatKeyword/:whereKeyword" element={<Dashboard/>}/>
            <Route path="/page/:pageNumber" element={<Dashboard/>}/>
            <Route path="/search/:whatKeyword/:whereKeyword/page/:pageNumber" element={<Dashboard/>}/>
            <Route path="/dynamic/:id" element={<DynamicRoutes/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
          <Footer/>
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;
