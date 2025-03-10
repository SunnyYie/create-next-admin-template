import { ThemeLayout } from '@/types/layout/type'
import { useSettings } from '@/store/theme-setting'

import NavHorizontal from './nav-horizontal'
import NavVertical from './nav-vertical'

export default function Nav() {
  const { themeLayout } = useSettings()
  if (themeLayout === ThemeLayout.Horizontal) return <NavHorizontal />
  return <NavVertical />
}
