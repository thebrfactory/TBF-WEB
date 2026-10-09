'use client'

// Sombra fixa na base da viewport com a linha "BASED IN ...". Presente
// durante toda a rolagem; some (fade) quando a seção #contact entra na tela
// ou quando um modal (role dialog, aria-modal) está aberto: o overlay do story
// é translúcido e a frase vazava por cima da barra de setas e pontinhos.

import { useEffect, useState } from 'react'
import styles from '@/app/(en)/creators/tavaristico/tavaristico.module.css'

export function BasedInShadow({ text }: { text: string }) {
  const [hidden, setHidden] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const check = () => setModalOpen(!!document.querySelector('[aria-modal="true"]'))
    check()
    const mo = new MutationObserver(check)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [])

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
      className={`${styles.basedInShadow} ${hidden || modalOpen ? styles.basedInShadowHidden : ''}`}
    >
      <p className={styles.basedInText}>{text}</p>
    </div>
  )
}
