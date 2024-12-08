import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
    plugins: [
        react(),
        vitePluginRequire(),
    ],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.indexOf('node_modules') !== -1) {
                        return 'vendor';
                    }
                    if (id.indexOf('src/config/') !== -1) {
                        return 'config';
                    }
                },
            }
        }
    }
});
