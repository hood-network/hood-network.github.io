import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import mmh from "murmurhash";

const PLACEHOLDER_BANNERS = [
    "/static/blog_banner_1.webp",
    "/static/blog_banner_2.webp",
    "/static/blog_banner_3.webp",
    "/static/blog_banner_4.webp",
    "/static/blog_banner_5.webp",
    // TODO: make the remaining 3 banners
    "/static/blog_banner_1.webp",
    "/static/blog_banner_2.webp",
    "/static/blog_banner_3.webp",
];

const blog = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "blog" }),
    schema: z
        .object({
            title: z.string(),
            description: z.string(),
            date: z.coerce.date(),
            authors: z.array(reference("authors")).nonempty(),
            updatedDate: z.coerce.date().optional(),
            banner: z.string().optional(),
        })
        .transform(post => ({
            ...post,
            banner: post.banner ?? PLACEHOLDER_BANNERS[mmh.v3(post.title) & 7],
        })),
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
