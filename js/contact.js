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
  formData.append('subject', phoneInput.value)
  formData.append('message', messageInput.value)

  formData.forEach((value, key)=> {
    console.log(key + ' -> ' + value);
  });

  return false;
}
