'use client'

// Sombra fixa na base da viewport com a linha "BASED IN ...". Presente
// durante toda a rolagem; some (fade) quando a seção #contact entra na tela.

import { useEffect, useState } from 'react'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'

export function BasedInShadow({ text }: { text: string }) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const target = document.getElementById('contact')
    if (!target) return
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0,
    })
    io.observe(target)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`${styles.basedInShadow} ${hidden ? styles.basedInShadowHidden : ''}`}
    >
      <p className={styles.basedInText}>{text}</p>
    </div>
  )
}
