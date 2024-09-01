let scannerDiv = document.querySelector('.scanner');

let camera = scannerDiv.querySelector('.fa-camera');
let stopCam = scannerDiv.querySelector('.fa-circle-stop');

let form = scannerDiv.querySelector('.scanner-form');
let fileInput = form.querySelector('input');
let content = form.querySelector('.content');
let p = form.querySelector('.content p');
let img = form.querySelector('img');
let video = form.querySelector('video');

let textarea = scannerDiv.querySelector('.scanner-details textarea');
let copyBtn = scannerDiv.querySelector('.scanner-details .copy');
let closeBtn = scannerDiv.querySelector('.scanner-details .close');

form.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    let file = e.target.files[0];

    if (!file) return;

    fetchRequest(file);
});

function fetchRequest(file) {
    let formData = new FormData();

    formData.append('file', file);

    fetch(`http://api.qrserver.com/v1/read-qr-code/`, {
        method: 'POST',
        body: formData,
    })
        .then((res) => res.json())
        .then((result) => {
            let text = result[0].symbol[0].data;

            if (!text) {
                return (p.innerText = 'Nincs értelmezhető QR-kód!');
            }

            scannerDiv.classList.add('active');
            form.classList.add('active-img');

            img.src = URL.createObjectURL(file);
            textarea.innerText = text;
        });
}

// Kamera
let scanner_one;

camera.addEventListener('click', () => {
    camera.style.display = 'none';
    form.classList.add('pointerEvents');

    scanner_one = new Instascan.Scanner({ video: video });
    Instascan.Camera.getCameras()
        .then((cameras) => {
            if (cameras.length > 0) {
                scanner_one.start(cameras[0]).then(() => {
                    form.classList.add('active-video');
                    stopCam.style.display = 'inline-block';
                });
            } else {
                console.log('Nincs kamera!');
            }
        })
        .catch((err) => console.error(err));

    scanner_one.addListener('scan', (c) => {
        scannerDiv.classList.add('active');
        textarea.innerText = c;
    });
});

copyBtn.addEventListener('click', () => {
    let text = textarea.textContent;
    navigator.clipboard.writeText(text);
});

closeBtn.addEventListener('click', () => stopScan());
stopCam.addEventListener('click', () => stopScan());

function stopScan() {
    camera.style.display = 'inline-block';

    form.classList.remove('active-video', 'active-img', 'pointerEvents');
    stopCam.style.display = 'none';

    scannerDiv.classList.remove('active');

    if (scanner_one) scanner_one.stop();
}
