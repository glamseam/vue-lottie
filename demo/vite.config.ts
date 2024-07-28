import vue from '@vitejs/plugin-vue'
import { join } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig(() => {
    return {
        build: {
            target: 'modules',
            cssCodeSplit: true,
            sourcemap: false
        },
        plugins: [vue()],
        resolve: {
            alias: {
                '@': join(__dirname, 'src')
            }
        }
    }
})
