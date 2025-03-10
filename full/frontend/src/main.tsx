import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProgressBar from './components/progress-bar/index.tsx'
import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react'
// @ts-ignore
import worker from './mock'
import App from './App.tsx'

import 'virtual:svg-icons-register'

import './index.css'
import './theme/theme.css'

import './locales/i18n'

// 修复 antd 5 的兼容性问题
import '@ant-design/v5-patch-for-react-19'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Suspense>
        <ProgressBar />
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
)
