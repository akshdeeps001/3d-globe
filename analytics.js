/**
 * Vercel Web Analytics Initialization
 * 
 * This script initializes Vercel Web Analytics for the 3D Globe project.
 * Analytics will track page views and provide insights into visitor behavior.
 */

(function() {
  'use strict';
  
  // Initialize the analytics queue
  window.va = window.va || function() {
    (window.vaq = window.vaq || []).push(arguments);
  };
  
  // Detect if running in development or production
  const isDev = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  
  // Create and inject the analytics script
  const script = document.createElement('script');
  script.defer = true;
  
  // Use debug version in development, production version otherwise
  if (isDev) {
    script.src = 'https://cdn.vercel-insights.com/v1/script.debug.js';
    console.log('[Vercel Analytics] Running in debug mode');
  } else {
    script.src = 'https://cdn.vercel-insights.com/v1/script.js';
  }
  
  // Error handling
  script.onerror = function() {
    console.warn('[Vercel Analytics] Failed to load analytics script. This is expected in local development without Vercel deployment.');
  };
  
  // Inject the script into the document head
  if (document.head) {
    document.head.appendChild(script);
  } else {
    // If head is not yet available, wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
      document.head.appendChild(script);
    });
  }
})();
