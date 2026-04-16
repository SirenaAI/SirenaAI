import { createContext, useEffect, useMemo, useState } from 'react'
import translations from '../utils/translations'

const LanguageContext = createContext(null)

const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
}

const applyParams = (value, params = {}) => {
  if (typeof value !== 'string') {
    return value
  }

  return value.replace(/\{\{(.*?)\}\}/g, (_, paramName) => {
    const normalized = paramName.trim()
    return params[normalized] ?? ''
  })
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('sirena-language') || 'es')

  useEffect(() => {
    localStorage.setItem('sirena-language', language)
  }, [language])

  const t = (key, params) => {
    const selectedText = getNestedValue(translations[language], key)
    const fallbackText = getNestedValue(translations.es, key)
    const value = selectedText ?? fallbackText ?? key
    return applyParams(value, params)
  }

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'))
  }

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage,
    t
  }), [language])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageContext
