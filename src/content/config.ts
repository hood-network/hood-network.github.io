import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "blog" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        authors: z.array(reference("authors")),
        updatedDate: z.coerce.date().optional(),
        banner: z.string().optional(),
    }),
});

const authors = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "authors" }),
    schema: z.object({
        name: z.string(),
        avatar: z.string(),
        url: z.string(),
    }),
});

export const collections = { blog, authors };
