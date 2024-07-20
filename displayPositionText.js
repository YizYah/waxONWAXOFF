function displayPositionText(position) {
  const textElement = document.createElement('div');
  textElement.classList.add('text-display');
  textElement.textContent = position;
  document.body.appendChild(textElement);

  // Show the text
  textElement.style.display = 'block';

  // Hide the text after 1 second
  setTimeout(() => {
    textElement.style.display = 'none';
    document.body.removeChild(textElement);
  }, 1000);
}
