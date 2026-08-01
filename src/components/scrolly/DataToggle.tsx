'use client'

// =============================================================================
// DataToggle — client (SPEC §2.1)
// Pills acessíveis (role="tablist") trocam o dataset renderizado. Dormente no
// piloto (não há dois conjuntos de dados — 05_PILOTO-CENAS.md §7).
// =============================================================================

import type { ReactNode } from 'react'
import { useState } from 'react'

export interface DataToggleOption<T> {
  id: string
  label: string
  data: T
}

interface DataToggleProps<T> {
  options: DataToggleOption<T>[]
  renderPanel: (data: T, activeId: string) => ReactNode
  onChange?: (id: string) => void
}

export function DataToggle<T>({ options, renderPanel, onChange }: DataToggleProps<T>) {
  const [activeId, setActiveId] = useState(options[0]?.id)
  const active = options.find((o) => o.id === activeId) ?? options[0]

  function handleSelect(id: string) {
    setActiveId(id)
    onChange?.(id)
  }

  return (
    <div className="scrolly-toggle">
      <div className="scrolly-toggle__pills" role="tablist" aria-label="Alternar dataset">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={opt.id === activeId}
            className={`scrolly-toggle__pill${opt.id === activeId ? ' scrolly-toggle__pill--active' : ''}`}
            onClick={() => handleSelect(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="scrolly-toggle__panel" role="tabpanel">
        {active ? renderPanel(active.data, active.id) : null}
      </div>
    </div>
  )
}
