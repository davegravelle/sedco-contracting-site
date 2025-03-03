import { defineCollection, z } from 'astro:content';

const servicesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    images: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })),
    order: z.number(),
  }),
});

const productsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categories: z.array(z.object({
      title: z.string(),
      products: z.array(z.object({
        description: z.string(),
        image: z.string(),
        rating: z.number().min(1).max(3),
      })),
    })),
  }),
});

export const collections = {
  'services': servicesCollection,
  'products': productsCollection,
};