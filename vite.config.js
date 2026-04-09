import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages'teki alt klasör adın (depo adın) buraya gelmeli
  base: '/fuel/', 
  
  build: {
    // Çıktı klasörü
    outDir: 'dist',
  },
  server: {
    // Yerel çalışırken kolaylık sağlar
    open: true,
  }
})
