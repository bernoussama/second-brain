import path from "path"
import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite'
// See https://wxt.dev/api/config.html
export default defineConfig({
  // @ts-ignore
  vite: () => ({
    plugins: [tailwindcss()],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  }),
  manifest: {
    permissions: ["contextMenus", "activeTab"],
    host_permissions: ["<all_urls>"]
  },
  modules: ['@wxt-dev/module-react'],
});
