import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages는 저장소 이름을 경로에 붙이므로(https://<user>.github.io/careerlog/)
// 배포 빌드에서만 base를 맞춘다. 커스텀 도메인을 쓰게 되면 '/'로 되돌릴 것.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/careerlog/' : '/',
  plugins: [react(), tailwindcss()],
}))
