/*import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL} from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    host: true
  }
})*/

// vite.config.js - Production Optimized Configuration
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  // Path aliases
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },

  // Build configuration
  build: {
    // Output directory
    outDir: 'dist',
    
    // Generate source maps for debugging (disable in production if needed)
    sourcemap: true,
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true
      }
    },
    
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk
          vendor: ['vue', 'vue-router', 'pinia'],
          
          // UI components chunk
          ui: ['@headlessui/vue', '@heroicons/vue'],
          
          // Utils chunk
          utils: ['axios']
        },
        
        // Asset file naming
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    },
    
    // Asset optimization
    assetsInlineLimit: 4096, // 4kb
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Report bundle size
    reportCompressedSize: true,
    
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000
  },

  // Development server
  server: {
    port: 5173,
    host: true,
    open: true,
    cors: true,
    
    // Proxy configuration for backend
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  // Preview server (for production build testing)
  preview: {
    port: 4173,
    host: true,
    open: true
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      '@headlessui/vue',
      '@heroicons/vue'
    ]
  },

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})
