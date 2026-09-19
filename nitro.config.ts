import { defineConfig } from "nitro";

export default defineConfig({
	compatibilityDate: "2026-08-13",
	preset: "cloudflare_module",
	cloudflare: {
		deployConfig: false,
		nodeCompat: true,
	},
});
