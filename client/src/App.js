import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostJob from './components/PostJob';
import Messages from './components/Messages';
import Settings from './components/Settings';
import UserJobs from './components/UserJobs';
import styled, {ThemeProvider} from 'styled-components'
import {lightTheme, darkTheme, GlobalStyles} from './themes.js'
import {useDispatch, useSelector} from 'react-redux'

const App = () => {

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
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles/>
      <Router>
        <Header isAuthenticated={isAuthenticated} setAuth={setAuth}/>
        <Routes>
          <Route exact path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/"/>}/>
          <Route exact path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login"/>}/>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route exact path="/post-job" element={isAuthenticated ? <PostJob/> : <Navigate to="/login"/>}/>
          <Route exact path="/jobs-created" element={isAuthenticated ? <UserJobs/> : <Navigate to="/login"/>}/>
          <Route exact path="/messages" element={isAuthenticated ? <Messages/> : <Navigate to="/login"/>}/>
          <Route exact path="/settings" element={isAuthenticated ? <Settings/> : <Navigate to="/login"/>}/>
        </Routes>
        <Footer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;
