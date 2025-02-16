import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './appStore/store'
import { Toaster } from "@/components/ui/sonner"
import { useLoadUserQuery } from './features/authApi'
import LoadingSpinner from './components/student/LoadingSpinner'
import { ThemeProvider } from './components/ui/ThemeProvider'


const Custom = (children) => {
  const { isLoading } = useLoadUserQuery()
  return (
    <>
      {
        isLoading ? <LoadingSpinner /> : <></>
      }
    </>
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster />
          <Custom />
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
