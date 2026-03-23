// This function runs immediately on every page load
(function() {
  const savedMode = localStorage.getItem('theme-mode') || 'light';
  
  // Wait for the UI library to be ready, then apply the theme
  window.addEventListener('load', () => {
    if (typeof ui === 'function') {
      ui('mode', savedMode);
    }
  });
})();

// This function is what your button clicks
function toggleTheme() {
  const currentMode = localStorage.getItem('theme-mode') === 'dark' ? 'light' : 'dark';
  ui('mode', currentMode);
  localStorage.setItem('theme-mode', currentMode);
}
