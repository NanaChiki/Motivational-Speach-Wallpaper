class Wallpaper {
  constructor(text, textColor, imageUrl, textPositionY, textPositionX) {
    this.text = text;
    this.textColor = textColor;
    this.imageUrl = imageUrl;
    this.textPositionY = textPositionY;
    this.textPositionX = textPositionX;
  } 

  createWallpaper() {
    // Create the main container for the wallpaper
    const container = document.createElement('div');
    container.classList.add('container', 'd-flex','justify-content-center', 'flex-column', 'align-items-center');

    // Create a container and append a download button to it
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('d-flex', 'justify-content-center', 'pt-3', 'col-12');
    const downloadButton = document.createElement('button');
    downloadButton.type = "button";
    downloadButton.classList.add('btn', 'btn-danger', 'w-25');
    downloadButton.textContent = 'Download Wallpaper';
    downloadButton.addEventListener('click', () => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = this.imageUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width  = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Create a temporary <a> element
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg');
        link.download = 'motivational-wallpaper.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      img.onerror = () => {
        // Fallback: open image in new tab
        window.open(this.imageUrl, '_blank');
      };

      // show the image URL below the button
      urlDisplay.textContent = `Image URL: ${this.imageUrl}`;
    });
    buttonContainer.append(downloadButton);

    // Create the inner box with the background image and text
    const innerBox = document.createElement('div');
    innerBox.classList.add('vh-75', 'p-md-5', 'p-3', 'my-5','col-md-8', 'image-Background', 'd-flex', `justify-content-${this.textPositionX}`, `align-items-${this.textPositionY}`);
    innerBox.style.backgroundImage = `url(${this.imageUrl})`; 

    const textBox = document.createElement('div');
    textBox.classList.add('col-8', 'p-3');
    const text = document.createElement('h3');
    text.classList.add('paperText');
    text.textContent = this.text;
    text.style.color = `#${this.textColor}`;
    textBox.append(text);

    // Append the text box to the inner box
    innerBox.append(textBox);

    // Append the inner box and button container to the main container
    container.append(buttonContainer, innerBox);
    
    return container;
  }
}

class WallpaperManager {
  constructor(wallpapers) {
    this.wallpapers = wallpapers; // Array of Wallpaper instances
  }
  showWallpaper(index) {
    mainElement.innerHTML = ''; // Clear the main wrapper
    mainElement.append(this.wallpapers[index].createWallpaper()); // Append the wallpaper at the given index
  }

  // Function to generate a random text position
  randomTextPosition() {
    const textPositions = ['start', 'center', 'end'];
    return textPositions[Math.floor(Math.random() * textPositions.length)];
  }
}

const mainElement = document.getElementById('main-wrapper');
if (!mainElement) {
  throw new Error('main-wrapper element not found in the DOM.');
}
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
];

const wallpaperManager = new WallpaperManager(wallpapers);
const nextBtn = document.getElementById('next-wallpaper');
const preBtn = document.getElementById('previous-wallpaper');
const form = document.getElementById('submit-new-quote');
if (!nextBtn || !preBtn || !form) {
  throw new Error("Navigation buttons or form not found in the DOM");
}

///////////// Functionality to navigate through wallpapers using next and previous buttons ////////////////
let currentIndex = 0;
wallpaperManager.showWallpaper(currentIndex); // Show the initial Wallpaper

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % wallpapers.length; // Increment index and wrap around
  wallpaperManager.showWallpaper(currentIndex); // Show the next wallpaper
});

preBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + wallpapers.length) % wallpapers.length; // Decrement index and wrap around
  wallpaperManager.showWallpaper(currentIndex); // Show the previous Wallpaper
});

//////////////////////// Functionality to submit a new wallpaper ////////////////////////
form.addEventListener('submit', (event)=> {
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
  wallpapers.push(newWallpaper);

  // 3. Update the current index showWallpaper(currentIndex)
  currentIndex = wallpapers.length - 1; // Set to the last added wallpaper
  wallpaperManager.showWallpaper(currentIndex); // Show the newly added wallpaper

  // 4. Clear the form inputs
  textInput.value = '';
  bgUrlInput.value = '';
  textColorInput.value = '';
});


