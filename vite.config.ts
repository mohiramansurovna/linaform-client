import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    server: {
        host:'0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '/api'),
            },
        },
    },
});
