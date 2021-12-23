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

const App = () => {

  toast.configure()

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

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
  })

  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/"/>}/>
          <Route exact path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login"/>}/>
          <Route exact path="/" element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login"/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
