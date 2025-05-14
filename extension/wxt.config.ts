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
  modules: ['@wxt-dev/module-react'],
});
