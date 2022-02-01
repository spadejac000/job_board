import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {Routes, Route, Navigate} from 'react-router-dom'
import {useLocation} from 'react-router'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostJob from './components/PostJob';
import Messages from './components/Messages';
import Settings from './components/Settings';
import UserJobs from './components/UserJobs';
import NotFound from './components/NotFound';
import DynamicRoutes from './components/DynamicRoutes';
import FavoriteJobs from './components/FavoriteJobs';
import ForgotPassword from './components/ForgotPassword';
import {ThemeProvider} from 'styled-components'
import {lightTheme, darkTheme, GlobalStyles} from './themes.js'
import {useSelector} from 'react-redux'
import './App.css'


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
        <Header isAuthenticated={isAuthenticated} setAuth={setAuth}/>
        <Routes>
          <Route exact path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/"/>}/>
          <Route exact path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login"/>}/>
          <Route exact path="/" element={<Dashboard  isAuthenticated={isAuthenticated}/>}/>
          <Route exact path="/post-job" element={<PostJob isAuthenticated={isAuthenticated}/>}/>
          <Route exact path="/jobs-created" element={<UserJobs isAuthenticated={isAuthenticated}/>}/>
          <Route exact path="/messages" element={<Messages isAuthenticated={isAuthenticated}/>}/>
          <Route exact path="/forgot-password" element={<ForgotPassword isAuthenticated={isAuthenticated}/>}/>
          <Route exact path="/settings" element={<Settings setAuth={setAuth} isAuthenticated={isAuthenticated}/>}/>
          <Route exact path="/favorite-jobs" element={<FavoriteJobs isAuthenticated={isAuthenticated}/>}/>
          <Route path="/search/:keyword" element={<Dashboard/>}/>
          <Route path="/page/:pageNumber" element={<Dashboard/>}/>
          <Route path="/search/:keyword/page/:pageNumber" element={<Dashboard/>}/>
          <Route path="/dynamic/:id" element={<DynamicRoutes/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
