// @ts-check
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://miroulotte.es",
    trailingSlash: "ignore",
    integrations: [preact()],
    outDir: "build",
    compressHTML: true,
    scopedStyleStrategy: "where",
    vite: {
        build: {
            cssMinify: true,
            minify: true
        },
        css: { transformer: "lightningcss" },
        plugins: [tailwindcss()]
    },
    server: {
        host: true,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        port: 3000
    },
    devToolbar: { enabled: false },
    i18n: {
        locales: ["es"],
        defaultLocale: "es"
    }
});
