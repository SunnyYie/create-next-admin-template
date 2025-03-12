import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config'
import CircleLoading from '@/components/circle-loading'
import { useSettings } from '@/store/theme-setting'
import { ThemeLayout } from '@/types/layout/type'
import Nav from './components/nav'
import Header from './header'
import Main from './main'

import { Suspense, useMemo } from 'react'
import { Layout } from 'antd'
import { cn } from '@/utils'

export default function DashboardLayout() {
  const { themeLayout } = useSettings()

  const layoutClassName = useMemo(() => {
    return cn('flex h-screen overflow-hidden', themeLayout === ThemeLayout.Horizontal ? 'flex-col' : 'flex-row')
  }, [themeLayout])

  return (
    <Layout className={layoutClassName}>
      <Suspense fallback={<CircleLoading />}>
        <Layout
          className={cn(
            'flex flex-col transition-all duration-200 ease-in-out',
            themeLayout === ThemeLayout.Horizontal
              ? 'pl-0'
              : themeLayout === ThemeLayout.Mini
              ? `pl-[${NAV_COLLAPSED_WIDTH}px]`
              : `pl-[${NAV_WIDTH}px]`,
          )}
        >
          <Header />
          <Nav />
          <Main />
        </Layout>
      </Suspense>
    </Layout>
  )
}
