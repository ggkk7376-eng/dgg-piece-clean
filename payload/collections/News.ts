import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
    slug: 'news',
    labels: {
        singular: 'Artykuł',
        plural: 'Baza wiedzy',
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'date', 'isPublished'],
        group: 'Content',
    },
    defaultSort: '-date',
    access: {
        read: () => true, // Everyone can read
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Tytuł Artykułu',
        },
        {
            name: 'date',
            type: 'date',
            required: true,
            defaultValue: () => new Date().toISOString(),
            label: 'Data Publikacji',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'isPublished',
            type: 'checkbox',
            label: 'Opublikowany',
            defaultValue: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'excerpt',
            type: 'textarea',
            label: 'Krótki opis (na listę)',
            required: true,
        },
        {
            name: 'cardImage',
            type: 'upload',
            relationTo: 'media',
            label: 'Zdjęcie główne (Miniaturka)',
            required: true,
        },
        {
            name: 'content',
            type: 'blocks',
            label: 'Treść Artykułu',
            blocks: [
                {
                    slug: 'richText',
                    fields: [
                        {
                            name: 'content',
                            type: 'textarea',
                            label: 'Treść (Użyj **tekst** aby pogrubić)',
                            required: true,
                        }
                    ]
                },
                {
                    slug: 'imageAndText',
                    labels: {
                        singular: 'Tekst ze Zdjęciem',
                        plural: 'Tekst ze Zdjęciem',
                    },
                    fields: [
                        {
                            name: 'layout',
                            type: 'select',
                            defaultValue: 'imageLeft',
                            options: [
                                { label: 'Zdjęcie po lewej', value: 'imageLeft' },
                                { label: 'Zdjęcie po prawej', value: 'imageRight' },
                            ],
                            required: true,
                        },
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            required: true,
                            label: 'Zdjęcie',
                        },
                        {
                            name: 'content',
                            type: 'textarea',
                            label: 'Treść obok zdjęcia',
                            required: true,
                        },
                    ]
                },
                // We will add Gallery later if needed, avoiding too many manual table creations for now
            ],
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            label: 'Slug (Adres URL)',
            admin: {
                position: 'sidebar',
                description: 'Automatycznie generowany z tytułu, ale można zmienić (np. nowy-piec-2026)',
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.title) {
                            return data.title
                                .toLowerCase()
                                .replace(/ /g, '-')
                                .replace(/[^\w-]+/g, '')
                        }
                        return value
                    },
                ],
            },
        },
    ],
}
