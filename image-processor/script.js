let img = new Image()
let overlay = new Image()
let logoURL = "https://api.dlrg.net/logo/v1/stammverband/png?size=200&line1=ImageProcessing&stacked=true"

imgInput = (inputElement) => {
    let fr = new FileReader()
    fr.onload = () => {img.src = fr.result}
    fr.readAsDataURL(inputElement.files[0])
}

renderOutput = async () => {
    logoURL = logoURL + "&farbe=" + document.getElementById("logo").value

    let blob = await fetch(logoURL).then(r => r.blob());
    overlay.src = await new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    let canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height)
    canvas.getContext('2d').drawImage(overlay, img.width - overlay.width - 25, img.height - overlay.height - 25)
    document.getElementById("preview").src = canvas.toDataURL("image/png");
}