// =============================================================================
// SANITY SCHEMAS — TBF WEB 2026
// 7 schemas definidos em F02: content model completo
// =============================================================================

import { defineType, defineField, defineArrayMember } from 'sanity'

// ─── Tag Schema ──────────────────────────────────────────────────────────────

export const tagSchema = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label (PT)',
      type: 'string',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'labelEn',
      title: 'Label (EN)',
      type: 'string',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'labelEn', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scope',
      title: 'Escopo',
      type: 'string',
      options: {
        list: [
          { title: '.TBF.', value: 'tbf' },
          { title: '.MELFIORE.', value: 'melfiore' },
          { title: '.RUC.', value: 'ruc' },
          { title: 'Todos', value: 'all' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'scope' },
  },
})

// ─── Collective Member Schema ─────────────────────────────────────────────────

export const collectiveMemberSchema = defineType({
  name: 'collectiveMember',
  title: 'Membro do Coletivo',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Função',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bu',
      title: 'Business Unit',
      type: 'string',
      options: {
        list: [
          { title: '.TBF.', value: 'tbf' },
          { title: '.MELFIORE.', value: 'melfiore' },
          { title: '.RUC.', value: 'ruc' },
          { title: '.TGF.', value: 'tgf' },
        ],
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio (PT)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'bioEn',
      title: 'Bio (EN)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'portrait',
      title: 'Retrato',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'memberSince',
      title: 'Membro desde',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ativo', value: 'active' },
          { title: 'Colaborador', value: 'collaborator' },
          { title: 'Alumni', value: 'alumni' },
        ],
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'portrait' },
  },
})

// ─── Editorial Post Schema ───────────────────────────────────────────────────

export const editorialPostSchema = defineType({
  name: 'editorialPost',
  title: 'Artigo Editorial',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título (PT)',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'titleEn',
      title: 'Título (EN)',
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'titleEn', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deck',
      title: 'Deck/Subtítulo (PT)',
      type: 'string',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'deckEn',
      title: 'Deck/Subtítulo (EN)',
      type: 'string',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Fashion Film', value: 'fashion-film' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Manifesto', value: 'manifesto' },
          { title: 'Coolhunting', value: 'coolhunting' },
          { title: 'Colaboração', value: 'collaboration' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bu',
      title: 'Business Unit',
      type: 'string',
      options: {
        list: [
          { title: '.TBF.', value: 'tbf' },
          { title: '.MELFIORE.', value: 'melfiore' },
          { title: '.RUC.', value: 'ruc' },
          { title: '.TGF.', value: 'tgf' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem Hero',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'caption', type: 'string', title: 'Caption' }),
        defineField({ name: 'credit', type: 'string', title: 'Crédito fotográfico' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardRatio',
      title: 'Formato do card (galeria)',
      type: 'string',
      description:
        'Proporção da capa na galeria masonry (home). Escolha o formato que melhor enquadra a foto — evita corte no chute. Padrão: Paisagem (3:2).',
      options: {
        list: [
          { title: 'Retrato (3:4)', value: '3/4' },
          { title: 'Retrato alto (2:3)', value: '2/3' },
          { title: 'Quadrado (1:1)', value: '1/1' },
          { title: 'Paisagem (4:3)', value: '4/3' },
          { title: 'Paisagem larga (3:2)', value: '3/2' },
        ],
        layout: 'radio',
      },
      initialValue: '3/2',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Cloudflare Stream ID (vídeo hero)',
      type: 'string',
      description: 'ID do Cloudflare Stream — nunca URL YouTube',
    }),
    defineField({
      name: 'body',
      title: 'Corpo do artigo (PT)',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        }),
        defineArrayMember({
          name: 'pullquote',
          type: 'object',
          title: 'Pullquote',
          fields: [
            defineField({ name: 'text', type: 'string', title: 'Texto' }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bodyEn',
      title: 'Corpo do artigo (EN)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
    }),
    defineField({
      name: 'credits',
      title: 'Créditos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'role', type: 'string', title: 'Função', validation: (Rule) => Rule.required() }),
            defineField({ name: 'name', type: 'string', title: 'Nome', validation: (Rule) => Rule.required() }),
            defineField({ name: 'handle', type: 'string', title: 'Handle Instagram' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'collectiveMember' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'tag' }] })],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Artigos relacionados',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'editorialPost' }] })],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Rascunho', value: 'draft' },
          { title: 'Em revisão', value: 'review' },
          { title: 'Publicado', value: 'published' },
          { title: 'Arquivado', value: 'archived' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'heroImage',
    },
  },
})

// ─── Melfiore Entry Schema ───────────────────────────────────────────────────

export const melfioreEntrySchema = defineType({
  name: 'melfioreEntry',
  title: 'The Fiore Daily',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'entryType',
      title: 'Tipo de entrada',
      type: 'string',
      options: {
        list: [
          { title: 'Fragmento', value: 'fragment' },
          { title: 'Curadoria', value: 'curation' },
          { title: 'Coleção', value: 'collection' },
          { title: 'Ritual', value: 'ritual' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Corpo',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagem',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
    defineField({
      name: 'productName',
      title: 'Nome do produto',
      type: 'string',
    }),
    defineField({
      name: 'productStatus',
      title: 'Status do produto',
      type: 'string',
      options: {
        list: [
          { title: 'Disponível', value: 'available' },
          { title: 'Em breve', value: 'coming-soon' },
          { title: 'Esgotado', value: 'sold-out' },
          { title: 'Exclusivo', value: 'exclusive' },
        ],
      },
    }),
    defineField({
      name: 'productLink',
      title: 'Link do produto',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'tag' }] })],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'entryType', media: 'heroImage' },
  },
})

// ─── Fashion Film Schema ──────────────────────────────────────────────────────

export const fashionFilmSchema = defineType({
  name: 'fashionFilm',
  title: 'Fashion Film (RUC)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'contentType',
      title: 'Tipo de conteúdo',
      type: 'string',
      options: {
        list: [
          { title: 'Fashion Film', value: 'fashion-film' },
          { title: 'Backstage', value: 'backstage' },
          { title: 'Colaboração', value: 'collaboration' },
          { title: 'SPFW', value: 'spfw' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cloudflareStreamId',
      title: 'Cloudflare Stream ID',
      type: 'string',
      description: 'ID do Cloudflare Stream — NUNCA YouTube',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text', validation: (Rule) => Rule.required() }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deck',
      title: 'Deck',
      type: 'string',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'credits',
      title: 'Créditos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'role', type: 'string', title: 'Função', validation: (Rule) => Rule.required() }),
            defineField({ name: 'name', type: 'string', title: 'Nome', validation: (Rule) => Rule.required() }),
            defineField({ name: 'handle', type: 'string', title: 'Handle' }),
            defineField({ name: 'brand', type: 'string', title: 'Marca' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'season',
      title: 'Temporada/Edição',
      type: 'string',
    }),
    defineField({
      name: 'collaboratingBrands',
      title: 'Marcas colaboradoras',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Destaque',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'contentType', media: 'thumbnailImage' },
  },
})

// ─── TGF Program Schema ───────────────────────────────────────────────────────

export const tgfProgramSchema = defineType({
  name: 'tgfProgram',
  title: 'Programa TGF',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do programa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetAudience',
      title: 'Público-alvo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deliverables',
      title: 'O que está incluído',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (Rule) => Rule.required().max(5),
    }),
    defineField({
      name: 'pricing',
      title: 'Informação de preço',
      type: 'string',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Label do CTA',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaUrl',
      title: 'URL do CTA (Calendly)',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de exibição',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
    defineField({
      name: 'active',
      title: 'Ativo',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' },
  },
  orderings: [{ title: 'Ordem', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})

// ─── Site Settings Schema (singleton) ────────────────────────────────────────

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Título do site',
      type: 'string',
      initialValue: '.THE BRAZILIAN FACTORY.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Meta Description padrão',
      type: 'string',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image padrão',
      type: 'image',
    }),
    defineField({
      name: 'tickerText',
      title: 'Texto do ticker',
      type: 'string',
      initialValue: '.THE BRAZILIAN FACTORY. · COLLECTIVE HOTEL CASINO · ONLY FOR ARTISTS & CHANGEMAKERS · EST. 2025 ·',
    }),
    defineField({
      name: 'instagramHandles',
      title: 'Instagram Handles',
      type: 'object',
      fields: [
        defineField({ name: 'tbf', type: 'string', title: '@thebrfactory' }),
        defineField({ name: 'melfiore', type: 'string', title: '@thefioredaily' }),
        defineField({ name: 'ruc', type: 'string', title: '@runwayunited' }),
        defineField({ name: 'tgf', type: 'string', title: '@factoryofgrowth' }),
      ],
    }),
    defineField({
      name: 'collectiveApplicationOpen',
      title: 'Candidaturas ao Coletivo abertas?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'siteTitle' },
  },
})

// ─── Schema Export ────────────────────────────────────────────────────────────

export const schemas = [
  tagSchema,
  collectiveMemberSchema,
  editorialPostSchema,
  melfioreEntrySchema,
  fashionFilmSchema,
  tgfProgramSchema,
  siteSettingsSchema,
]
