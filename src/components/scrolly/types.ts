// =============================================================================
// SCROLLY — tipos compartilhados do motor
// ORD-01 · SPEC §2.1
// =============================================================================

/** Tema de uma seção do motor. Preto é o padrão; cinza e branco são eventos raros
 *  (PRD §1.2 / SPEC §2.3) — nunca cor fora da paleta do brandbook. */
export type ScrollyTheme = 'dark' | 'grey' | 'light'

/** Modo de tom do artigo (SPEC §3, 05_PILOTO-CENAS.md §1). Muda ritmo e densidade,
 *  nunca paleta nem tipografia. */
export type ArticleTone = 'manifesto' | 'narrativa' | 'jornalismo' | 'ensaio'
