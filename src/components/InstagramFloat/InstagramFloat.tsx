// =============================================================================
// INSTAGRAM FLOAT: botao flutuante (FAB) do Instagram, SO na home
// =============================================================================
// Pedido do fundador (bloco "AJUSTES NA HOMEPAGE"): padrao bolha de WhatsApp
// de e-commerce. Circular, preenchido, fixo num canto inferior da tela, sobre
// o conteudo, com sombra. Isto NAO e o icone discreto do rodape (Footer.tsx):
// aquele ficou onde esta, este e um componente novo, so montado na HomeView.
//
// Sem hook de cliente: link puro com hover em CSS, entao continua seguro
// dentro de arvore de servidor.

import { FlatIcon } from '@/components/icons/FlatIcon'
import styles from './InstagramFloat.module.css'

export function InstagramFloat() {
  return (
    <a
      href="https://instagram.com/thebrfactory"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Abrir o Instagram da .TBF. em uma nova aba"
    >
      <FlatIcon name="instagram" size={24} className={styles.icon} />
    </a>
  )
}
