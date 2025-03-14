import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import { LocalEnum } from '../components/locale-picker'
import { getStringItem } from '../utils/storage'
import { StorageEnum } from '@/types/store/type'
import en_US from './lang/en_US'
import zh_CN from './lang/zh_CN'

// 获取语言配置
const defaultLng = getStringItem(StorageEnum.I18N) || (LocalEnum.en_US as string)
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: defaultLng, // localstorage -> i18nextLng: en_US
    fallbackLng: LocalEnum.en_US,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en_US: { translation: en_US },
      zh_CN: { translation: zh_CN },
    },
  })

export default i18n
export const { t } = i18n
