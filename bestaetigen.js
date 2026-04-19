(() => {
  const betragValue = document.getElementById('betragValue');
  const empfaengerPreview = document.getElementById('empfaengerPreview');

  // Load betrag from localStorage
  const savedBetrag = localStorage.getItem('bezahlen_betrag');
  if (savedBetrag) {
    betragValue.textContent = 'CHF ' + savedBetrag;
  }

  // Load empfänger (text or image)
  const savedBild = localStorage.getItem('gutschein_bild');
  const savedText = localStorage.getItem('gutschein_text');

  if (savedBild) {
    empfaengerPreview.innerHTML = '<img src="' + savedBild + '" alt="Empfänger">';
  } else if (savedText) {
    const div = document.createElement('div');
    div.textContent = savedText;
    const span = document.createElement('span');
    span.className = 'saved-text';
    span.textContent = savedText;
    empfaengerPreview.appendChild(span);
  }

  // Okay button goes to erfolg page
  document.getElementById('okayBtn').addEventListener('click', () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(() => {
        window.location.href = 'erfolg.html';
      });
    } else {
      window.location.href = 'erfolg.html';
    }
  });
})();
