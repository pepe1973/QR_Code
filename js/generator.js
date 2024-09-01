let generatorDiv = document.querySelector('.generator');

let generateBtn = generatorDiv.querySelector('.generator-form button');
let qrInput = generatorDiv.querySelector('.generator-form input');
let qrImg = generatorDiv.querySelector('.generator-img img');
let downloadBtn = generatorDiv.querySelector('.generator-btn .btn-link');

let imgUrl = '';

generateBtn.addEventListener('click', () => {
    let qrValue = qrInput.value;

    if (!qrValue.trim()) return;

    imgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    console.log(imgUrl);

    qrImg.src = imgUrl;

    qrImg.addEventListener('load', () => {
        generatorDiv.classList.add('active');
    });
});

downloadBtn.addEventListener('click', () => {
    if (!imgUrl) return;

    fetchImage(imgUrl);
});

function fetchImage(url) {
    fetch(url)
        .then((res) => res.blob())
        .then((file) => {
            let tempFile = URL.createObjectURL(file);
            let file_name = url.split('=')[2];
            let extension = file.type.split('/')[1];

            download(tempFile, file_name, extension);
        })
        .catch(() => (imgUrl = ''));
}

function download(tempFile, file_name, extension) {
    let a = document.createElement('a');
    a.href = tempFile;
    a.download = `${file_name}.${extension}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
}

qrInput.addEventListener('input', () => {
    if (!qrInput.value.trim()) {
        return generatorDiv.classList.remove('active');
    }
});
