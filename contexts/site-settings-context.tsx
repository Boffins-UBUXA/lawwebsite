"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getLawSiteSettings, type LawSiteSettings } from '@/lib/api/law-site-settings'

interface SiteSettingsContextType {
  settings: LawSiteSettings | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined)

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<LawSiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getLawSiteSettings()
      if (data) {
        setSettings(data)
      } else {
        setError('Failed to load site settings')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  return (
    <SiteSettingsContext.Provider 
      value={{ 
        settings, 
        loading, 
        error, 
        refetch: fetchSettings 
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider')
  }
  return context
}