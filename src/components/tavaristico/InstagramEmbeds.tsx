'use client'

// Embeds oficiais do Instagram (blockquote instagram-media + embed.js).
// Leve: o script so carrega quando a secao chega perto da tela (lazyOnload) e
// nada e baixado antes disso. Mobile-first: a coluna e 100% da largura, com
// teto de 540px, e o iframe do Instagram nunca passa do container (390px ok).
import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import styles from './InstagramEmbeds.module.css'

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } }
  }
}

export function InstagramEmbeds({ urls, label }: { urls: string[]; label: string }) {
  const ref = useRef<HTMLElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (near) window.instgrm?.Embeds.process()
  }, [near])

  return (
    <section ref={ref} className={styles.section} aria-label={label}>
      <span className={styles.label}>{label}</span>
      <div className={styles.grid}>
        {urls.map((u) => (
          <div key={u} className={styles.item}>
            {near ? (
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={`${u}?utm_source=ig_embed`}
                data-instgrm-version="14"
                style={{ width: '100%', minWidth: 0, maxWidth: '100%', margin: 0 }}
              >
                <a href={u} target="_blank" rel="noopener noreferrer">
                  {u}
                </a>
              </blockquote>
            ) : null}
          </div>
        ))}
      </div>
      {near ? (
        <Script
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={() => window.instgrm?.Embeds.process()}
        />
      ) : null}
    </section>
  )
}
