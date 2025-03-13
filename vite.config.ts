import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'index',
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [dts({ rollupTypes: true, insertTypesEntry: true }), tailwindcss()],
})
