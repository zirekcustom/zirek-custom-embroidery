document.addEventListener('DOMContentLoaded', () => {
  
  // 1. URL Parametresinden Ürün Otomatik Seçimi (Örn: custom.html?product=Barber%20Uniforms)
  const urlParams = new URLSearchParams(window.location.search);
  const selectedProduct = urlParams.get('product');
  const productSelect = document.querySelector('select[name="product"]');

  if (selectedProduct && productSelect) {
    const targetValue = selectedProduct.toLowerCase().trim();
    
    Array.from(productSelect.options).forEach(option => {
      const optionText = option.text.toLowerCase().trim();
      const optionValue = option.value.toLowerCase().trim();

      if (optionText === targetValue || optionValue === targetValue || optionText.includes(targetValue)) {
        option.selected = true;
      }
    });
  }

  // 2. Teklif Formu Yönetimi (Quote Form Handling)
  const quoteForm = document.getElementById('quoteForm');
  const statusBox = document.getElementById('status');

  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Form elemanları ve submit butonu
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : 'SEND REQUEST';

      // Yüklenme Durumu (Loading State)
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'SENDING...';
      }

      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.style.color = '#efd38b'; // Gold2 rengi
        statusBox.textContent = 'Processing your custom embroidery request...';
      }

      // Demo/Backend Simülasyonu
      setTimeout(() => {
        if (statusBox) {
          statusBox.style.color = '#55d588'; // Başarı yeşili / Altın tonu
          statusBox.innerHTML = `
            <strong>Thank you!</strong> Your quote request has been recorded.<br>
            <small style="color: #999;">Our team will review your logo design and garment specs shortly.</small>
          `;
        }

        quoteForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }, 1200);
    });
  }

  // 3. Dosya Yükleme Önizleme / Boyut Kontrolü (Opsiyonel Dosya Inputu Varsa)
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        // 10MB Limit Kontrolü
        if (file.size > 10 * 1024 * 1024) {
          alert('File size exceeds 10MB. Please upload a smaller logo/design file.');
          fileInput.value = '';
        }
      }
    });
  }

});
