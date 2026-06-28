import { glob } from "astro/loaders";
import { z } from "astro/zod";
import mmh from "murmurhash";

import { defineCollection, reference } from "astro:content";

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

const formatter = new Intl.DateTimeFormat("en-US", {
	month: "long",
	day: "2-digit",
	year: "numeric",
	timeZone: "UTC",
});

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "blog" }),
	schema: z
		.object({
			banner: z.string().optional(),
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			revised: z.coerce.date().optional(),
			authors: z.array(reference("authors")).nonempty(),
			tags: z.array(z.string()),
		})
		.transform(post => ({
			...post,
			banner: post.banner ?? PLACEHOLDER_BANNERS[mmh.v3(post.title) & 7],
			_date: post.date,
			date: formatter.format(post.date),
			revised: formatter.format(post.revised),
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
