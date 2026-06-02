// =============================================================================
// SANITY STUDIO CONFIG — TBF WEB 2026
// =============================================================================

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemas } from './src/schemas'

export default defineConfig({
  name: 'tbf-web-2026',
  title: '.THE BRAZILIAN FACTORY. — Studio',

  projectId: '8iarmh40',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('TBF Content')
          .items([
            S.listItem()
              .title('Configurações do Site')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.listItem()
              .title('Editorial (.TBF.)')
              .child(
                S.documentTypeList('editorialPost')
                  .title('Artigos Editoriais')
              ),
            S.listItem()
              .title('Tags')
              .child(S.documentTypeList('tag').title('Tags')),
            S.divider(),
            S.listItem()
              .title('Programas (.TGF.)')
              .child(
                S.documentTypeList('tgfProgram')
                  .title('Programas TGF')
              ),
            S.divider(),
            S.listItem()
              .title('The Fiore Daily (.MELFIORE.)')
              .child(
                S.documentTypeList('melfioreEntry')
                  .title('Entradas Fiore Daily')
              ),
            S.divider(),
            S.listItem()
              .title('Fashion Films (.RUC.)')
              .child(
                S.documentTypeList('fashionFilm')
                  .title('Fashion Films')
              ),
            S.divider(),
            S.listItem()
              .title('Coletivo')
              .child(
                S.documentTypeList('collectiveMember')
                  .title('Membros do Coletivo')
              ),
          ]),
    }),
  ],

  schema: {
    types: schemas,
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => templateItem.templateId !== 'siteSettings'
        )
      }
      return prev
    },
  },
})
