import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import pluginChecker from 'vite-plugin-checker';
import mkcert from 'vite-plugin-mkcert';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    server: {
      https: true,
      port: 5200,
      proxy: {
        '/api/career': {
          target: 'https://localhost:5223',
          changeOrigin: true,
          secure: false,
        },
        '/api/student': {
          target: 'https://localhost:5221',
          changeOrigin: true,
          secure: false,
        },
        '/api': {
          target: 'https://localhost:7031',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [
      tailwindcss(),
      react(),
      tsConfigPaths(),
      mkcert(),
      pluginChecker({
        eslint: {
          lintCommand: 'eslint .',
          useFlatConfig: true,
        },
        overlay: true,
      }),
    ],
  };
});
