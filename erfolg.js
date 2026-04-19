(() => {
  // Load betrag
  const savedBetrag = localStorage.getItem('bezahlen_betrag');
  if (savedBetrag) {
    document.getElementById('betragValue').textContent = 'CHF ' + savedBetrag;
    document.getElementById('betragValue').style.fontSize = '2.4rem';
  }

  // Datum / Zeit
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('datumValue').innerHTML =
    day + '.' + month + '.' + year + ' | <span style="font-weight:500">' + hours + ':' + minutes + '</span>';

  // Load empfänger
  const empfaengerPreview = document.getElementById('empfaengerPreview');
  const savedBild = localStorage.getItem('gutschein_bild');
  const savedText = localStorage.getItem('gutschein_text');

  if (savedBild) {
    empfaengerPreview.innerHTML = '<img src="' + savedBild + '" alt="Empfänger">';
  } else if (savedText) {
    const span = document.createElement('span');
    span.className = 'saved-text';
    span.textContent = savedText;
    empfaengerPreview.appendChild(span);
  }

  // Send notification
  if ('Notification' in window && Notification.permission === 'granted') {
    const betragText = savedBetrag ? 'CHF ' + savedBetrag : '';
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification('Zahlung erfolgreich', {
        body: 'Die Zahlung von ' + betragText + ' war erfolgreich',
        icon: 'assets/appicon/icon.png',
        badge: 'assets/appicon/icon.png',
        tag: 'zahlung-erfolg'
      });
    });
  }
})();
