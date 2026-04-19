(() => {
  const choiceScreen = document.getElementById('choiceScreen');
  const textScreen = document.getElementById('textScreen');
  const imageScreen = document.getElementById('imageScreen');
  const successScreen = document.getElementById('successScreen');

  const backBtn = document.getElementById('backBtn');
  const chooseText = document.getElementById('chooseText');
  const chooseImage = document.getElementById('chooseImage');
  const saveTextBtn = document.getElementById('saveText');
  const saveImageBtn = document.getElementById('saveImage');
  const fileInput = document.getElementById('fileInput');
  const previewContainer = document.getElementById('previewContainer');
  const previewImg = document.getElementById('previewImg');
  const gutscheinText = document.getElementById('gutscheinText');

  const currentItem = document.getElementById('currentItem');
  const currentItemPreview = document.getElementById('currentItemPreview');
  const deleteBtn = document.getElementById('deleteBtn');

  let currentScreen = 'choice';

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function loadCurrentItem() {
    const savedText = localStorage.getItem('gutschein_text');
    const savedBild = localStorage.getItem('gutschein_bild');

    if (savedBild) {
      currentItemPreview.innerHTML = '<img src="' + savedBild + '" alt="Gespeichertes Bild">';
      currentItem.classList.remove('hidden');
    } else if (savedText) {
      currentItemPreview.innerHTML = '<span class="saved-text">' + escapeHtml(savedText) + '</span>';
      currentItem.classList.remove('hidden');
    } else {
      currentItem.classList.add('hidden');
    }
  }

  // Load on start
  loadCurrentItem();

  // Delete current item
  deleteBtn.addEventListener('click', () => {
    localStorage.removeItem('gutschein_text');
    localStorage.removeItem('gutschein_bild');
    loadCurrentItem();
  });

  function showScreen(screen) {
    choiceScreen.classList.add('hidden');
    textScreen.classList.add('hidden');
    imageScreen.classList.add('hidden');
    successScreen.classList.add('hidden');

    if (screen === 'choice') choiceScreen.classList.remove('hidden');
    if (screen === 'text') textScreen.classList.remove('hidden');
    if (screen === 'image') imageScreen.classList.remove('hidden');
    if (screen === 'success') successScreen.classList.remove('hidden');

    currentScreen = screen;
  }

  // Back button
  backBtn.addEventListener('click', () => {
    if (currentScreen === 'text' || currentScreen === 'image') {
      showScreen('choice');
    } else {
      window.location.href = 'startpage.html';
    }
  });

  // Choose text
  chooseText.addEventListener('click', () => {
    showScreen('text');
  });

  // Choose image
  chooseImage.addEventListener('click', () => {
    showScreen('image');
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        previewImg.src = ev.target.result;
        previewContainer.classList.remove('hidden');
        saveImageBtn.classList.remove('hidden');
        // Store image data
        localStorage.setItem('gutschein_bild', ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // Save text
  saveTextBtn.addEventListener('click', () => {
    const text = gutscheinText.value.trim();
    if (text) {
      localStorage.removeItem('gutschein_bild');
      localStorage.setItem('gutschein_text', text);
      showScreen('success');
      setTimeout(() => {
        window.location.href = 'startpage.html';
      }, 1200);
    }
  });

  // Save image
  saveImageBtn.addEventListener('click', () => {
    localStorage.removeItem('gutschein_text');
    showScreen('success');
    setTimeout(() => {
      window.location.href = 'startpage.html';
    }, 1200);
  });
})();
