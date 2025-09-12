 //Performance monitoring integration
export const setupProductionMonitoring = () => {
  if (import.meta.env.PROD) {
    
    // Web Vitals monitoring
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
    
    // Service worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
    
    // Error reporting (replace with your service)
    window.addEventListener('error', (event) => {
      // Send to error reporting service
      console.error('Global error:', event.error);
    });
    
    // Performance monitoring
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      
      // Send performance metrics to analytics
      if (perfData) {
        console.log('Performance metrics:', {
          loadTime: perfData.loadEventEnd - perfData.fetchStart,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
          firstContentfulPaint: perfData.responseEnd - perfData.fetchStart
        });
      }
    });
  }
}

// Export configurations
export {
  packageScripts,
  setupProductionMonitoring
}