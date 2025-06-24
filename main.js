class Wallpaper {
  constructor(text, textColor, imageUrl, textPositionY, textPositionX) {
    this.text = text;
    this.textColor = textColor;
    this.imageUrl = imageUrl;
    this.textPositionY = textPositionY;
    this.textPositionX = textPositionX;
  } 

  createWallpaper() {
    const container = document.createElement('div');
    container.classList.add('container', 'd-flex', 'justify-content-center');

    const innerBox = document.createElement('div');
    innerBox.classList.add('vh-75','p-md-5', 'p-3', 'my-5','col-md-8', 'col-12', 'image-Background', 'd-flex', `justify-content-${this.textPositionX}`, `align-items-${this.textPositionY}`);
    innerBox.style.backgroundImage = `url(${this.imageUrl})`; 

    const textBox = document.createElement('div');
    textBox.classList.add('col-8');
    const text = document.createElement('h3');
    text.classList.add('paperText');
    text.textContent = this.text;
    text.style.color = `#${this.textColor}`;
    textBox.append(text);

    innerBox.append(textBox);
    container.append(innerBox);
    
    return container;
  }
}

const mainElement = document.getElementById('main-wrapper');
const wallpapers = [
    new Wallpaper(
    "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away. - Antoine de Saint", 
    "1B4F72", 
    "https://cdn.pixabay.com/photo/2020/06/12/03/06/magnifying-glass-5288877__340.jpg", 
    "start",
    "end"
  ),
  new Wallpaper(
    "The scientist discovers a new type of material or energy and the engineer discovers a new use for it. - Gordon Lindsay Glegg",
    "007bff",
    "https://cdn.pixabay.com/photo/2018/02/23/04/38/laptop-3174729_1280.jpg", 
    "center", 
    "start"
  ),
  new Wallpaper(
    "Scientists study the world as it is, engineers create the world that never has been. - Theodore von Karman", 
    "ecf0f1", 
    "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg", 
    "center", 
    "center"
  )
] 

wallpapers.forEach(wallpaper => {
  mainElement.append(wallpaper.createWallpaper());
});