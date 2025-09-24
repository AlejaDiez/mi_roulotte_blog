// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://miroulotte.es",
    trailingSlash: "ignore",
    outDir: "build",
    compressHTML: true,
    scopedStyleStrategy: "where",
    vite: {
        build: {
            cssMinify: true,
            minify: true
        },
        css: { transformer: "lightningcss" }
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
