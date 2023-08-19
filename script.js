const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplah API
let count = 5;
const apiKey = 'd3tQ8UeTw3YMU5S5IpPilO_cNpzwwM08_ZmvdpgBp2A';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if(imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

// helper function for seAttribute method
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
// Create Elements for links & photos, ADD to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each obj in photoArray
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href : photo.links.html,
      target : '_blank',
    });
    const image = document.createElement('img');
    setAttributes(image, {
      src : photo.urls.regular,
      alt : photo.alt_description,
      title : photo.alt_description,
    })
    // Check when it`s finish loading
    image.addEventListener('load', imageLoaded);
    // Put the image inside de link(item), then both insaide the image container
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}

// Get random photos from Unsplash API
async function getPhotos() {
  try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch(error){

  }
}

// Check to see if the scroll hits the bottom of the page,load more photos
window.addEventListener('scroll',  () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})


// On load
getPhotos();