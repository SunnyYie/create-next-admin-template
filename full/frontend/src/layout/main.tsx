import { useSettings } from '@/store/theme-setting'
import { ThemeLayout } from '@/types/layout/type'
import { themeVars } from '@/theme/theme.css'
import { MULTI_TABS_HEIGHT } from './config'
import type { CSSProperties } from 'react'
import { Outlet } from 'react-router'
import { cn } from '@/utils'

import { MultiTabsProvider } from './components/multi-tabs/providers/multi-tabs-provider'
import MultiTabs from './components/multi-tabs'
import { Content } from 'antd/es/layout/layout'

const Main = () => {
  const { themeStretch, themeLayout, multiTab } = useSettings()

  const mainStyle: CSSProperties = {
    paddingTop: multiTab ? MULTI_TABS_HEIGHT : 0,
    background: themeVars.colors.background.default,
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%',
  }

  return (
    <Content style={mainStyle} className="flex">
      <div className="flex-grow overflow-auto size-full">
        <div
          className={cn(
            'm-auto size-full flex-grow sm:p-2',
            themeStretch ? '' : 'xl:max-w-screen-xl',
            themeLayout === ThemeLayout.Horizontal ? 'flex-col' : 'flex-row',
          )}
        >
          {multiTab ? (
            <MultiTabsProvider>
              <MultiTabs />
            </MultiTabsProvider>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </Content>
  )
}

export default Main
