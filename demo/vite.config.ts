import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser'
import { join } from 'path'

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production'

    return {
        build: {
            target: 'modules',
            cssCodeSplit: true,
            sourcemap: false,
            rollupOptions: {
                plugins: [
                    terser({
                        compress: {
                            drop_console: isProduction
                        }
                    })
                ]
            }
        },
        plugins: [
            vue({ reactivityTransform: true })
        ],
        resolve: {
            alias: {
                '@': join(__dirname, 'src')
            }
        }
    }
})
