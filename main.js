class Wallpaper {
  constructor(mainElement, text, textColor, imageUrl, verticalAlign, horizontalAlign) {
    this.mainElement = mainElement;
    this.text = text;
    this.textColor = textColor;
    this.imageUrl = imageUrl;
    this.verticalAlign = verticalAlign;
    this.horizontalAlign = horizontalAlign;
  } 

  createWallpaper() {
    const innerBox = document.createElement('div');
    innerBox.classList.add('inner-box', 'col-10');

    const imageElement = document.createElement('div');
    imageElement.classList.add('p-5');
    imageElement.style.backgroundImage = `Url(${this.imageUrl})`;
    imageElement.style.backgroundSize = 'cover';
    imageElement.style.backgroundPosition = 'center';
    imageElement.style.verticalAlign = this.verticalAlign;
    imageElement.style.horizontalAlign = this.horizontalAlign;


    const textElement = document.createElement('h3');
    textElement.textContent = this.text;
    textElement.style.color = this.textColor;

    imageElement.append(textElement);
    innerBox.append(imageElement);
    this.mainElement.append(innerBox);
  }
}

const mainElement = document.getElementById('main-wrapper');
const wallpaper1 = new Wallpaper(
  mainElement,
  "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. - Antoine de Saint", 
  "1B4F72", 
  "https://cdn.pixabay.com/photo/2020/06/12/03/06/magnifying-glass-5288877__340.jpg", 
  "top", 
  "right"
);

wallpaper1.createWallpaper();