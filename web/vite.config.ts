import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [svgr(), react(), tsconfigPaths()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          // target: 'http://120.78.83.29/api',

          target: 'http://localhost/api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    esbuild: {
      // drop: ['console', 'debugger'],
    },
  })
}
