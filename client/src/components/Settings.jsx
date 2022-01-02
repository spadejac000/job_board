import React, {useState, useEffect} from 'react'
import {ThemeProvider} from 'styled-components'
import {lightTheme, darkTheme, GlobalStyles} from '../themes';
import '../css/settings.css'
import {useDispatch, useSelector} from 'react-redux'
import {updateTheme} from '../actions/themeActions'
import {Card} from 'react-bootstrap'

const Settings = () => {

  const [themeToggleChecked, setThemeToggleChecked] = useState(JSON.parse(localStorage.getItem('themeToggleChecked')))
  const dispatch = useDispatch();

  const theme = useSelector(state => 
    state.theme
  )

  useEffect(() => {
    localStorage.setItem('theme', theme)
    localStorage.setItem('themeToggleChecked', themeToggleChecked)
  })

  const themeToggler = () => {
    theme === 'light' ? dispatch(updateTheme('dark')) : dispatch(updateTheme('light'));
    themeToggleChecked === false ? setThemeToggleChecked(true) : setThemeToggleChecked(false);
  } 

  return (
    <div className="container">
      <h1>Settings</h1>
      <Card className="theme-mode-container">
        <h3 className="theme-mode-title">Light / Dark Mode</h3>
        <div className="toggle-container">
          <input className="toggle-theme-input" type="checkbox" id="switch" name="theme" checked={themeToggleChecked} onChange={() => themeToggler()}/><label className="theme-label" for="switch">Toggle</label>
        </div>
      </Card>
    </div>
  )
}

export default Settings
