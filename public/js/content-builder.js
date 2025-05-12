;(function () {
  // Prevent multiple injections
  if (window.contentBuilderLoaded) return
  window.contentBuilderLoaded = true

  // Function to load a resource (CSS or JS)
  const loadResource = (tag, url, type = 'text/javascript') => {
    return new Promise((resolve, reject) => {
      const element = document.createElement(tag)
      if (tag === 'link') {
        element.rel = 'stylesheet'
        element.href = url
      } else {
        element.type = type
        element.src = url
      }
      element.onload = resolve
      element.onerror = reject
      document.head.appendChild(element)
    })
  }

  // Function to initialize sliders and other features
  const initializeContent = () => {}

  // Load dependencies and initialize
  Promise.all([
    // Load CSS
    loadResource(
      'link',
      'https://spaandequipment.s3.us-west-1.amazonaws.com/content-builder/bundle.css',
    ),
    //   loadResource('script', 'https://unpkg.com/swiper@latest/swiper-bundle.min.js'),
    // Add more scripts
  ])
    .then(() => {
      initializeContent()
    })
    .catch((err) => {
      console.error('Failed to load resources:', err)
    })
})()
