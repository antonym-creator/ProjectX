(() => {
  const preview = document.getElementById('gutscheinPreview');
  const betragDisplay = document.getElementById('betragDisplay');
  const betragInput = document.getElementById('betragInput');
  const betragWrapper = document.getElementById('betragWrapper');

  // Load last saved text or image
  const savedText = localStorage.getItem('gutschein_text');
  const savedBild = localStorage.getItem('gutschein_bild');

  if (savedBild) {
    preview.innerHTML = '<img src="' + savedBild + '" alt="Gutschein">';
  } else if (savedText) {
    preview.innerHTML = '<span class="preview-text">' + escapeHtml(savedText) + '</span>';
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Betrag input logic
  let rawValue = '';

  betragWrapper.addEventListener('click', () => {
    betragInput.focus();
  });

  betragInput.addEventListener('input', (e) => {
    // Only allow digits and one dot
    let val = e.target.value.replace(/[^0-9.]/g, '');

    // Only allow one dot
    const parts = val.split('.');
    if (parts.length > 2) {
      val = parts[0] + '.' + parts.slice(1).join('');
    }

    // Limit decimal places to 2
    if (parts.length === 2 && parts[1].length > 2) {
      val = parts[0] + '.' + parts[1].substring(0, 2);
    }

    rawValue = val;
    betragInput.value = val;
    updateDisplay();
  });

  betragInput.addEventListener('blur', () => {
    formatFinal();
  });

  function updateDisplay() {
    if (rawValue === '' || rawValue === '0') {
      betragDisplay.textContent = 'CHF 0.00';
      betragDisplay.classList.remove('has-value');
    } else {
      betragDisplay.textContent = 'CHF ' + rawValue;
      betragDisplay.classList.add('has-value');
    }
  }

  function formatFinal() {
    if (rawValue === '' || rawValue === '0') {
      rawValue = '';
      betragDisplay.textContent = 'CHF 0.00';
      betragDisplay.classList.remove('has-value');
      betragInput.value = '';
      return;
    }

    let num = parseFloat(rawValue);
    if (isNaN(num)) {
      rawValue = '';
      betragDisplay.textContent = 'CHF 0.00';
      betragDisplay.classList.remove('has-value');
      betragInput.value = '';
      return;
    }

    rawValue = num.toFixed(2);
    betragInput.value = rawValue;
    betragDisplay.textContent = 'CHF ' + rawValue;
    betragDisplay.classList.add('has-value');
  }
})();
