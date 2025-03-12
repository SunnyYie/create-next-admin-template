import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProgressBar from './components/progress-bar/index.tsx'
import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react'

import * as Sentry from "@sentry/react";

import App from './App.tsx'

import 'virtual:svg-icons-register'

import './index.css'
import './theme/theme.css'

import './locales/i18n'

// 修复 antd 5 的兼容性问题
import '@ant-design/v5-patch-for-react-19'

Sentry.init({
  dsn: "https://bd8ea971ff5606d280ac7ebf54e9ed29@o4508963640508416.ingest.us.sentry.io/4508963642212352"
});

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
