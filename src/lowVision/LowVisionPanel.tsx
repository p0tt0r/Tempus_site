import { useEffect } from 'react'
import { syncImageAlts, useLowVision, type LowVisionSettings } from './lowVision'

type Option<T extends string | boolean> = { value: T; label: string; title?: string }

function Group<K extends keyof LowVisionSettings>({
  label,
  field,
  options,
  settings,
  onChange,
}: {
  label: string
  field: K
  options: Option<LowVisionSettings[K] & (string | boolean)>[]
  settings: LowVisionSettings
  onChange: (patch: Partial<LowVisionSettings>) => void
}) {
  return (
    <div className="lv-group" role="group" aria-label={label}>
      <span className="lv-group-label">{label}</span>
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          className="lv-option"
          aria-pressed={settings[field] === o.value}
          title={o.title}
          onClick={() => onChange({ [field]: o.value } as Partial<LowVisionSettings>)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export default function LowVisionPanel() {
  const [settings, change] = useLowVision()
  const altMode = settings.enabled && !settings.images
  useEffect(() => {
    syncImageAlts(altMode)
    return () => syncImageAlts(false)
  }, [altMode])
  if (!settings.enabled) return null

  return (
    <section className="lv-panel" aria-label="Версия для слабовидящих">
      <div className="container lv-panel-inner">
        <Group
          label="Размер текста:"
          field="size"
          settings={settings}
          onChange={change}
          options={[
            { value: 'normal', label: 'А', title: 'Обычный' },
            { value: 'large', label: 'А+', title: 'Крупный' },
            { value: 'xlarge', label: 'А++', title: 'Очень крупный' },
          ]}
        />
        <Group
          label="Цвет:"
          field="scheme"
          settings={settings}
          onChange={change}
          options={[
            { value: 'bw', label: 'Ч/Б', title: 'Чёрным по белому' },
            { value: 'wb', label: 'Б/Ч', title: 'Белым по чёрному' },
            { value: 'blue', label: 'Синий', title: 'Тёмно-синим по голубому' },
          ]}
        />
        <Group
          label="Изображения:"
          field="images"
          settings={settings}
          onChange={change}
          options={[
            { value: true, label: 'вкл' },
            { value: false, label: 'выкл' },
          ]}
        />
        <button type="button" className="lv-reset" onClick={() => change({ enabled: false })}>
          Обычная версия
        </button>
      </div>
    </section>
  )
}
