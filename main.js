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

class WallpaperManager {
  constructor(wallpapers) {
    this.wallpapers = wallpapers; // Array of Wallpaper instances
  }
  showWallpaper(index) {
    mainElement.innerHTML = ''; // Clear the main wrapper
    mainElement.append(wallpapers[index]); // Append the wallpaper at the given index
  }

  // Function to generate a random text position
  randomTextPosition() {
    const textPositions = ['start', 'center', 'end'];
    return textPositions[Math.floor(Math.random() * textPositions.length)];
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
    ).createWallpaper(),
    new Wallpaper(
      "The scientist discovers a new type of material or energy and the engineer discovers a new use for it. - Gordon Lindsay Glegg",
      "007bff",
      "https://cdn.pixabay.com/photo/2018/02/23/04/38/laptop-3174729_1280.jpg", 
      "center", 
      "start"
    ).createWallpaper(),
    new Wallpaper(
      "Scientists study the world as it is, engineers create the world that never has been. - Theodore von Karman", 
    "ecf0f1", 
    "https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg", 
    "center", 
    "center"
  ).createWallpaper()
];

const wallpaperManager = new WallpaperManager(wallpapers);

// Change to a random wallpaper when the button is clicked
// document.getElementById('change-wallpaper').addEventListener('click', () => {
//   mainElement.innerHTML = ''; // Clear the main wrapper when the button is clicked
//   const randomIndex = Math.floor(Math.random() * wallpapers.length);
//   mainElement.append(wallpapers[randomIndex]); // Append a random wallpaper
// });

///////////// Functionality to navigate through wallpapers using next and previous buttons ////////////////
let currentIndex = 0;
wallpaperManager.showWallpaper(currentIndex); // Show the initial Wallpaper

document.getElementById('next-wallpaper').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % wallpapers.length; // Increment index and wrap around
  wallpaperManager.showWallpaper(currentIndex); // Show the next wallpaper
});

document.getElementById('previous-wallpaper').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + wallpapers.length) % wallpapers.length; // Decrement index and wrap around
  wallpaperManager.showWallpaper(currentIndex); // Show the previous Wallpaper
});

//////////////////////// Functionality to submit a new wallpaper ////////////////////////
document.getElementById('submit-new-quote').addEventListener('submit', (event)=> {
  event.preventDefault(); // Prevent the default form submission
  // 1. Get values from the form
  const textInput = document.getElementById('quote-input');
  const bgUrlInput = document.getElementById('background-image-input');
  const textColorInput = document.getElementById('text-color-input');
  const textPositionX = wallpaperManager.randomTextPosition(); // Randomly choose text position X
  const textPositionY = wallpaperManager.randomTextPosition(); // Randomly choose text position Y

  const text = textInput.value.trim();
  const bgUrl = bgUrlInput.value.trim();
  const textColor = textColorInput.value.trim() || '000000'; // Default to black if no color is provided

  // 2. Create a new wallpaper instance and push to wallpapers array
  const newWallpaper = new Wallpaper(text, textColor, bgUrl, textPositionY, textPositionX);
  wallpapers.push(newWallpaper.createWallpaper());

  // 3. Update the current index showWallpaper(currentIndex)
  currentIndex = wallpapers.length - 1; // Set to the last added wallpaper
  wallpaperManager.showWallpaper(currentIndex); // Show the newly added wallpaper

  // 4. Clear the form inputs
  textInput.value = '';
  bgUrlInput.value = '';
  textColorInput.value = '';
});


