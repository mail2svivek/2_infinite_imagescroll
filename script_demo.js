const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
const count = 2
const API_KEY1='d_gPW6dN42uOk1GwSJzMoww82l6jmkFw7rhxCL0JEpM'
const API_KEY2='mqo9AHg1LT939lNLC48mqrGpInJiGQpyN9tG9tg5WkM'
const API_KEY3='rFs_Bo9KLGvLLYgwFN7kvb01qMPpHPYqGOwibXlpqD8'
const API_KEY4='Ecf6n0NZaF7nXXmaP4Ht8DZKffKy4PYlOavXKFUMvww'
const API_KEY5='F2cWes57YdlUFIzPg_lveN0KMePOpKxVGezJzwpH6Bk'
const API_KEY6='K2UKzJ2C7O8TbwDRs9sH22IpujUxRwW_wzmm5XMyAbw'
const API_KEY7='E8Q1eroKgEDlwf9BkxfY4kiOXW_ArKXzitbetqObrM8'
const API_KEY8='YUh_aoWiVFH5wA2TFoJZSoyIgNTTslsSN1AqChc-bQg'
const API_KEY9='JC_sXZqMzX5U83BO-MNP3V5ygtr5a_TrYGDJR_TmsX8'
const API_KEY10='3P9kMQA3cOtquBqHDak0VzQF_jNtDTkVXGnWTc6jfuQ'
const API_KEY11='OMaKsnpoVVxNW4BPH16uC65fseBeKaCTEzbo7KkH_Nw'
const API_KEY12='DbnEIUy2xZ7-963e7mTJsf319nDtqsTu-KvbasnS5JQ'
const API_KEY13='BXncE4RH7-J5r325eT8i_Qpi5hCsi8oVl38XKwSV6Rc'

const API_ARRAY = [API_KEY1,API_KEY2,API_KEY3,API_KEY4,API_KEY5,API_KEY6,API_KEY7,API_KEY8,API_KEY9,API_KEY10,API_KEY11,API_KEY12,API_KEY13]
let apiUrl = ``

// Unsplash API
// const count = 10;
const apiKey='Ecf6n0NZaF7nXXmaP4Ht8DZKffKy4PYlOavXKFUMvww'

apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Unsplash allows us 50 images an hour per account. This is will break the fetch after 50 images download. so i have made 13 accounts and randomly selecting an account when the page loads
function setRandomAccount(){
  let randNum=Math.floor(Math.random()*API_ARRAY.length)
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_ARRAY[randNum]}&count=${count}`
  console.log(`random number picked = ${randNum}`)
  console.log(`key: ${apiUrl}`)
}



// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}


// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos();
    console.log('load more');
  }
});

// setRandomAccount()
// On Load
getPhotos();