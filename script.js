function scaleSlides() {
  const slides = document.querySelectorAll('.reveal .slides section');
  slides.forEach(slide => {
      const parent = slide.parentElement;
      const scaleX = parent.clientWidth / slide.scrollWidth;
      const scaleY = parent.clientHeight / slide.scrollHeight;
      const scale = Math.min(scaleX, scaleY);
      slide.style.transform = `scale(${scale})`;
  });
}

function applyScaling() {
  scaleSlides();
  window.dispatchEvent(new Event('resize'));
}

// Function to handle when all images are loaded
function onImagesLoaded(callback) {
  const images = document.querySelectorAll('img');
  let loadedCount = 0;
  images.forEach(img => {
      if (img.complete) {
          loadedCount++;
      } else {
          img.addEventListener('load', () => {
              loadedCount++;
              if (loadedCount === images.length) {
                  callback();
              }
          });
      }
  });

  if (loadedCount === images.length) {
      callback();
  }
}

window.addEventListener('resize', scaleSlides);

document.addEventListener('DOMContentLoaded', function() {
  Reveal.initialize({
      disableLayout: true,  // Disable automatic layout management
      hash: true,  // Enable navigation with URL hash
      slideNumber: false,  // Disable slide numbers
      controls: true,  // Show navigation controls
      progress: true,  // Show progress bar
      center: true,  // Center the content vertically and horizontally
      keyboard: true,  // Enable keyboard navigation
      touch: true,  // Enable touch navigation
      plugins: [RevealMarkdown, RevealNotes, RevealHighlight]  // Load the necessary plugins
  });

  // Apply scaling after images are loaded, with a 0.5-second delay
  onImagesLoaded(function() {
      setTimeout(applyScaling, 500);  // 500 ms = 0.5 seconds
  });

  // Apply scaling on each slide change
  Reveal.on('slidechanged', function(event) {
      applyScaling();
  });
});