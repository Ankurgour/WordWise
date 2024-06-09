import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'


export const theme  = createTheme({
  palette:{
     primary:{
      main:"#0f0f0f"
     },
     secondary:{
      main:"#1F51FF"
      // #00308F"
     }
  }

})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
    <App />
    </Provider>

    </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>,
)
