let generatorTab = document.querySelector('.nav-gene');
let scannerTab = document.querySelector('.nav-scan');
let generator = document.querySelector('.generator');
let scanner = document.querySelector('.scanner');

generatorTab.addEventListener('click', () => {
    generatorTab.classList.add('active');
    scannerTab.classList.remove('active');
    generator.style.display = 'block';
    scanner.style.display = 'none';
});

scannerTab.addEventListener('click', () => {
    generatorTab.classList.remove('active');
    scannerTab.classList.add('active');
    generator.style.display = 'none';
    scanner.style.display = 'block';
});
