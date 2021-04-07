import React from 'react'
import ReactDOM from 'react-dom'
import SnackbarProvider from 'react-simple-snackbar'
import {
  BrowserRouter as Router
} from "react-router-dom"
import App from './components/App'
import './index.css'

ReactDOM.render(
  <Router>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </Router>,
  document.getElementById('root')
)
