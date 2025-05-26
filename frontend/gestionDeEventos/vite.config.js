import { defineConfig, loadEnv } from 'vite'

export default ({ mode }) => {
  // 1 traigo las var de .env
  const env = loadEnv(mode, process.cwd(), '')
  // creacion del proxy
  return defineConfig({
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        }
      }
    }
  })
}
