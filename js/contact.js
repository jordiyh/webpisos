window.addEventListener('load', () => {
  const contactForm = document.getElementById('contact-form');
  contactForm.onsubmit = onSubmitContactForm;
});

function onSubmitContactForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById('inputName');
  const emailInput = document.getElementById('inputEmail');
  const phoneInput = document.getElementById('inputPhone');
  const messageInput = document.getElementById('inputMessage');

  const formData = new FormData();
  formData.append('name', nameInput.value)
  formData.append('email', emailInput.value)
  formData.append('phone', phoneInput.value)
  formData.append('comment', messageInput.value)

  fetch('http://localhost:8000/api/v1/contact', {
    method: 'POST',
    body: formData,
  }).then(response => response.json().then(jsonResponse => {
    if (jsonResponse.success) {
      Swal.fire({
        title: 'Fet!',
        text: 'Formulari enviat.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        messageInput.value = '';
      });
    }
  }));

  return false;
}
