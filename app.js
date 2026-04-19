(() => {
  const PIN_LENGTH = 6;
  let pin = '';

  const dots = document.querySelectorAll('.dot');
  const pinDotsContainer = document.querySelector('.pin-dots');
  const deleteKey = document.querySelector('.key[data-value="delete"]');

  // Hide dots and delete button initially
  pinDotsContainer.style.opacity = '0';
  deleteKey.style.visibility = 'hidden';

  function updateUI() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('filled', i < pin.length);
    });

    // Show/hide dots and delete button based on input
    pinDotsContainer.style.opacity = pin.length > 0 ? '1' : '0';
    deleteKey.style.visibility = pin.length > 0 ? 'visible' : 'hidden';
  }

  function handleKey(value) {
    if (value === 'delete') {
      if (pin.length > 0) {
        pin = pin.slice(0, -1);
        updateUI();
      }
      return;
    }

    if (pin.length < PIN_LENGTH) {
      pin += value;
      updateUI();

      if (pin.length === PIN_LENGTH) {
        if (pin === '306512') {
          // Correct PIN – navigate to startpage
          setTimeout(() => {
            window.location.href = 'startpage.html';
          }, 300);
        } else {
          // Wrong PIN – shake and reset
          pinDotsContainer.classList.add('shake');
          setTimeout(() => {
            pin = '';
            updateUI();
            pinDotsContainer.classList.remove('shake');
          }, 600);
        }
      }
    }
  }

  document.querySelectorAll('.key').forEach((key) => {
    key.addEventListener('click', () => {
      handleKey(key.dataset.value);
    });
  });

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
})();
