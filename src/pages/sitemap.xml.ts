import { StagesTable } from "@db/stages";
import { TripsTable } from "@db/trips";
import type { APIRoute } from "astro";
import { drizzle } from "drizzle-orm/d1";
import { and, eq, sql } from "drizzle-orm/sql";

export const GET: APIRoute = async ({ locals }) => {
    const tripsQuery = drizzle(locals.runtime.env.DB)
        .select({
            loc: sql<string>`CONCAT(${locals.runtime.env.HOST}, '/', ${TripsTable.id})`,
            lastmod: sql`COALESCE(${TripsTable.updatedAt}, ${TripsTable.createdAt})`.mapWith(
                TripsTable.createdAt
            ),
            priority: sql<number>`0.8`
        })
        .from(TripsTable)
        .where(eq(TripsTable.published, true));
    const stagesQuery = drizzle(locals.runtime.env.DB)
        .select({
            loc: sql<string>`CONCAT(${locals.runtime.env.HOST}, '/', ${StagesTable.tripId}, '/', ${StagesTable.id})`,
            lastmod: sql`COALESCE(${StagesTable.updatedAt}, ${StagesTable.createdAt})`.mapWith(
                StagesTable.createdAt
            ),
            priority: sql<number>`0.6`
        })
        .from(TripsTable)
        .innerJoin(StagesTable, eq(TripsTable.id, StagesTable.tripId))
        .where(and(eq(TripsTable.published, true), eq(StagesTable.published, true)));
    const posts = await Promise.all([tripsQuery, stagesQuery]).then(([trips, stages]) => [
        ...trips,
        ...stages
    ]);

    const staticPages = `
        <url>
        <loc>${locals.runtime.env.HOST}/</loc>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>`;
    const dynamicPages = posts
        .map(
            ({ loc, lastmod, priority }) => `
                <url>
                    <loc>${loc}</loc>
                    <lastmod>${lastmod.toISOString()}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>${priority}</priority>
                </url>`
        )
        .join("");

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${staticPages}
            ${dynamicPages}
        </urlset>`.trim(),
        {
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=3600"
            }
        }
    );
};
