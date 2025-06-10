const buttons = document.querySelectorAll('button');
const content = document.querySelector('.content');

buttons.forEach(button => {
    const name = button.getAttribute('name');
    button.addEventListener('click', () => {
        content.innerHTML = `<h1>Hello ${name}</h1>`;
    });
});