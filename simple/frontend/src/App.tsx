// import { ThemeProvider } from './theme/theme.provider'
import Toast from './components/toast'
import Router from './router/routes'

export default function App() {
  return (
    // <ThemeProvider>
    <>
      <Router />
      <Toast />
    </>
    // </ThemeProvider>
  )
}
