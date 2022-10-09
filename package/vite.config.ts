import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { move, remove } from 'fs-extra'

const cleanFiles = (): Plugin => {
    return {
        name: 'clean-files',
        async buildEnd() {
            await move(
                resolve(__dirname, 'dist/src/Lottie.vue.d.ts'),
                resolve(__dirname, 'dist/index.d.ts')
            ).catch((error) => console.error(error))
            await remove(resolve(__dirname, 'dist/src')).catch((error) => console.error(error))
            await remove(resolve(__dirname, 'dist/vite.config.d.ts')).catch((error) => console.error(error))
        }
    }
}

export default defineConfig(({ mode }) => {
    return {
        build: {
            cssCodeSplit: false,
            emptyOutDir: false,
            lib: {
                entry: resolve(__dirname, 'src/Lottie.vue'),
                formats: ['es', 'cjs'],
                name: 'vue-lottie',
                fileName: (format) => (format == 'es' ? 'index.mjs' : 'index.cjs')
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    globals: {
                        vue: 'Vue'
                    },
                    exports: 'named'
                }
            }
        },
        plugins: [
            vue(),
            cleanFiles()
        ]
    }
})
