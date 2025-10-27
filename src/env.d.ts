type Runtime = import("@astrojs/cloudflare").Runtime<Bindings>;

declare namespace App {
    interface Locals extends Runtime {}
}
