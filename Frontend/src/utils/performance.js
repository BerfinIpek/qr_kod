// src/utils/performance.js - Performance Monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoads: [],
      apiCalls: [],
      userActions: [],
      errors: []
    }
    this.isEnabled = import.meta.env.PROD
  }

  // Page load time tracking
  trackPageLoad(pageName) {
    if (!this.isEnabled) return

    const navigationTiming = performance.getEntriesByType('navigation')[0]
    if (navigationTiming) {
      const loadTime = navigationTiming.loadEventEnd - navigationTiming.fetchStart
      
      this.metrics.pageLoads.push({
        page: pageName,
        loadTime: Math.round(loadTime),
        timestamp: new Date().toISOString(),
        url: window.location.href
      })

      // Send to analytics if load time > 3 seconds
      if (loadTime > 3000) {
        this.reportSlowLoad(pageName, loadTime)
      }
    }
  }

  // API call performance
  trackApiCall(endpoint, duration, status) {
    if (!this.isEnabled) return

    this.metrics.apiCalls.push({
      endpoint,
      duration: Math.round(duration),
      status,
      timestamp: new Date().toISOString()
    })

    // Alert for slow API calls
    if (duration > 2000) {
      console.warn(`Slow API call detected: ${endpoint} took ${duration}ms`)
    }
  }

  // User interaction tracking
  trackUserAction(action, element, data = {}) {
    if (!this.isEnabled) return

    this.metrics.userActions.push({
      action,
      element,
      data,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    })
  }

  // Error tracking
  trackError(error, context = {}) {
    this.metrics.errors.push({
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent
    })

    // Send critical errors immediately
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      this.reportChunkLoadError(error)
    }
  }

  // Memory usage monitoring
  getMemoryUsage() {
    if ('memory' in performance) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      }
    }
    return null
  }

  // Network speed estimation
  estimateConnectionSpeed() {
    if ('connection' in navigator) {
      return {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      }
    }
    return null
  }

  // Generate performance report
  getPerformanceReport() {
    const memory = this.getMemoryUsage()
    const connection = this.estimateConnectionSpeed()
    
    return {
      timestamp: new Date().toISOString(),
      metrics: this.metrics,
      memory,
      connection,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      summary: {
        avgPageLoad: this.calculateAverage(this.metrics.pageLoads, 'loadTime'),
        avgApiCall: this.calculateAverage(this.metrics.apiCalls, 'duration'),
        errorCount: this.metrics.errors.length,
        totalUserActions: this.metrics.userActions.length
      }
    }
  }

  // Helper methods
  calculateAverage(array, key) {
    if (array.length === 0) return 0
    const sum = array.reduce((acc, item) => acc + item[key], 0)
    return Math.round(sum / array.length)
  }

  reportSlowLoad(pageName, loadTime) {
    console.warn(`Slow page load: ${pageName} took ${loadTime}ms`)
    // Here you can send to analytics service
  }

  reportChunkLoadError(error) {
    console.error('Chunk load error detected:', error)
    // Auto-retry or show user-friendly message
    this.showChunkErrorNotification()
  }

  showChunkErrorNotification() {
    const notification = document.createElement('div')
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f56565;
        color: white;
        padding: 16px;
        border-radius: 8px;
        z-index: 10000;
        max-width: 300px;
      ">
        <strong>Güncelleme Gerekli</strong>
        <p style="margin: 8px 0 12px 0; font-size: 14px;">
          Uygulama güncellemesi mevcut. Lütfen sayfayı yenileyin.
        </p>
        <button onclick="window.location.reload()" style="
          background: white;
          color: #f56565;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        ">
          Yenile
        </button>
      </div>
    `
    document.body.appendChild(notification)
    
    // Auto remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 10000)
  }

  // Clear old metrics to prevent memory leaks
  cleanup() {
    const maxEntries = 100
    
    if (this.metrics.pageLoads.length > maxEntries) {
      this.metrics.pageLoads = this.metrics.pageLoads.slice(-maxEntries)
    }
    if (this.metrics.apiCalls.length > maxEntries) {
      this.metrics.apiCalls = this.metrics.apiCalls.slice(-maxEntries)
    }
    if (this.metrics.userActions.length > maxEntries) {
      this.metrics.userActions = this.metrics.userActions.slice(-maxEntries)
    }
    if (this.metrics.errors.length > maxEntries) {
      this.metrics.errors = this.metrics.errors.slice(-maxEntries)
    }
  }

  // Start monitoring
  start() {
    if (!this.isEnabled) return

    // Global error handler
    window.addEventListener('error', (event) => {
      this.trackError(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      })
    })

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(new Error(event.reason), {
        type: 'unhandledPromiseRejection'
      })
    })

    // Cleanup interval
    setInterval(() => {
      this.cleanup()
    }, 300000) // Every 5 minutes

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackUserAction('visibilitychange', 'document', {
        hidden: document.hidden
      })
    })

    console.log('Performance monitoring started')
  }

  // Export metrics for debugging
  exportMetrics() {
    const report = this.getPerformanceReport()
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `performance-report-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

// Create global instance
const performanceMonitor = new PerformanceMonitor()

// Auto-start in production
if (import.meta.env.PROD) {
  performanceMonitor.start()
}

// Development tools
if (import.meta.env.DEV) {
  window.performanceMonitor = performanceMonitor
  window.exportPerformanceReport = () => performanceMonitor.exportMetrics()
  
  console.log('🔧 Performance monitoring available:')
  console.log('📊 window.exportPerformanceReport() - Export performance data')
  console.log('🔍 window.performanceMonitor - Access monitor instance')
}

export default performanceMonitor

// API interceptor for automatic API tracking
export const createApiInterceptor = (apiClient) => {
  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      config.metadata = { startTime: performance.now() }
      return config
    },
    (error) => {
      performanceMonitor.trackError(error, { type: 'apiRequestError' })
      return Promise.reject(error)
    }
  )

  // Response interceptor
  apiClient.interceptors.response.use(
    (response) => {
      const duration = performance.now() - response.config.metadata.startTime
      performanceMonitor.trackApiCall(
        response.config.url, 
        duration, 
        response.status
      )
      return response
    },
    (error) => {
      if (error.config && error.config.metadata) {
        const duration = performance.now() - error.config.metadata.startTime
        performanceMonitor.trackApiCall(
          error.config.url, 
          duration, 
          error.response?.status || 0
        )
      }
      
      performanceMonitor.trackError(error, { 
        type: 'apiResponseError',
        url: error.config?.url,
        status: error.response?.status
      })
      
      return Promise.reject(error)
    }
  )

  return apiClient
}