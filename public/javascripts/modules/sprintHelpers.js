export function submitForm() {
  const form = document.querySelector('#burst');
  form.submit();
}

export function validate() {
  const genreBtns = [...document.querySelectorAll('[name="genre"]')];
  const genreChecked = genreBtns.filter(btn => btn.checked).length > 0;
  const title = document.querySelector('#burst-title').value.length > 0;
  return title && genreChecked;
}
