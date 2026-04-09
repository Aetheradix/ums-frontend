import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import pluginChecker from 'vite-plugin-checker';
import mkcert from 'vite-plugin-mkcert';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: true,
  },
  plugins: [
    react(),
    tsConfigPaths(),
    pluginChecker({
      eslint: {
        lintCommand: 'eslint .',
        useFlatConfig: true,
      },
      overlay: true,
    }),
    mkcert(),
  ],
});
