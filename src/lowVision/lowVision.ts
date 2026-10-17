import { useCallback, useEffect, useState } from 'react'

export type LowVisionSettings = {
  enabled: boolean
  size: 'normal' | 'large' | 'xlarge'
  scheme: 'bw' | 'wb' | 'blue'
  images: boolean
}

export const DEFAULT_LV: LowVisionSettings = { enabled: false, size: 'normal', scheme: 'bw', images: true }

export const LV_STORAGE_KEY = 'umc-low-vision'

const SIZES = ['normal', 'large', 'xlarge']
const SCHEMES = ['bw', 'wb', 'blue']

export function parseSettings(raw: string | null): LowVisionSettings {
  if (!raw) return { ...DEFAULT_LV }
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return { ...DEFAULT_LV }
  }
  if (!data || typeof data !== 'object') return { ...DEFAULT_LV }
  const d = data as Record<string, unknown>
  return {
    enabled: d.enabled === true,
    size: SIZES.includes(d.size as string) ? (d.size as LowVisionSettings['size']) : DEFAULT_LV.size,
    scheme: SCHEMES.includes(d.scheme as string) ? (d.scheme as LowVisionSettings['scheme']) : DEFAULT_LV.scheme,
    images: typeof d.images === 'boolean' ? d.images : DEFAULT_LV.images,
  }
}

export function applySettings(s: LowVisionSettings, root: HTMLElement = document.documentElement): void {
  root.removeAttribute('data-lv')
  root.removeAttribute('data-lv-size')
  root.removeAttribute('data-lv-scheme')
  root.removeAttribute('data-lv-images')
  if (!s.enabled) return
  root.setAttribute('data-lv', 'on')
  root.setAttribute('data-lv-size', s.size)
  root.setAttribute('data-lv-scheme', s.scheme)
  if (!s.images) root.setAttribute('data-lv-images', 'off')
}

function readStored(): LowVisionSettings {
  try {
    return parseSettings(window.localStorage.getItem(LV_STORAGE_KEY))
  } catch {
    return { ...DEFAULT_LV }
  }
}

function writeStored(s: LowVisionSettings): void {
  try {
    window.localStorage.setItem(LV_STORAGE_KEY, JSON.stringify(s))
  } catch {
    /* localStorage недоступен: настройки живут до закрытия страницы */
  }
}

// Общее состояние на сессию: работает и без localStorage
let current: LowVisionSettings | null = null
const listeners = new Set<(s: LowVisionSettings) => void>()

function getCurrent(): LowVisionSettings {
  if (!current) current = readStored()
  return current
}

function update(patch: Partial<LowVisionSettings>): void {
  current = { ...getCurrent(), ...patch }
  applySettings(current)
  writeStored(current)
  listeners.forEach((l) => l(current as LowVisionSettings))
}

// При выключенных изображениях вместо <img> показываем его alt-текст
let altObserver: MutationObserver | null = null

function placeAlts(): void {
  document.querySelectorAll('img[alt]').forEach((img) => {
    const alt = img.getAttribute('alt')?.trim()
    const next = img.nextElementSibling
    if (!alt || (next && next.classList.contains('lv-alt'))) return
    const span = document.createElement('span')
    span.className = 'lv-alt'
    span.textContent = alt
    img.after(span)
  })
}

export function syncImageAlts(on: boolean): void {
  altObserver?.disconnect()
  altObserver = null
  if (!on) {
    document.querySelectorAll('.lv-alt').forEach((n) => n.remove())
    return
  }
  placeAlts()
  altObserver = new MutationObserver(placeAlts)
  altObserver.observe(document.body, { childList: true, subtree: true })
}

export function useLowVision(): [LowVisionSettings, (patch: Partial<LowVisionSettings>) => void] {
  const [settings, setSettings] = useState<LowVisionSettings>(getCurrent)

  useEffect(() => {
    listeners.add(setSettings)
    applySettings(getCurrent())
    return () => {
      listeners.delete(setSettings)
    }
  }, [])

  const change = useCallback((patch: Partial<LowVisionSettings>) => update(patch), [])
  return [settings, change]
}

export function openLowVision(): void {
  update({ enabled: true })
}
