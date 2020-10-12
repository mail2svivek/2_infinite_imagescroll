console.log('testing:')
const count = 3
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

const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let photosArray=[]

let ready=false;
let imagesLoaded = 0;
let totalImages = 0;


// Unsplash allows us 50 images an hour per account. This is will break the fetch after 50 images download. so i have made 13 accounts and randomly selecting an account when the page loads
function setRandomAccount(){
  let randNum=Math.floor(Math.random()*API_ARRAY.length)
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${API_ARRAY[randNum]}&count=${count}`
  console.log(`random number picked = ${randNum}`)
  console.log(`key: ${apiUrl}`)
}

function imageLoaded(){
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready=true
    console.log('ready now image loaded = ${imagesLoaded}')
    let loaderEle = document.getElementById('loader')
    loaderEle.style.display='none'
    // imagesLoaded = 0
  }
}

//helper function to setAttributes. attributes is a dictionary object with key as the property of the element and vale as the value of the property to set
// Helper Function to Set Attributes on DOM Elements

function setElementAttributes(element, attributes) {
  for (let key in attributes){
    element.setAttribute(key,attributes[key])
  }
}


function displayPhotos(){
  imagesLoaded=0
  totalImages=photosArray.length
  console.log(`totalImages = ${totalImages}`)
  photosArray.forEach((photo)=>{
  console.log(`length:${photosArray.length}: displaying: ${photo.alt_description}`)

   // create an a tag to link an image to its href. Within the a tag you create an img tag. set the target property to _blank so that image opens on a new page 
   const item = document.createElement('a')
   setElementAttributes(item,{'href':photo.links.html,
                              'target':'_blank'})

   // create an image element. set arc alt and title properties from the received data.
   const img = document.createElement('img')
   setElementAttributes(img,{
          'src':photo.urls.regular,
          'alt':photo.alt_description,
          'title':photo.alt_description})   

  // Event Listerner check when each image has been loaded
    img.addEventListener('load', imageLoaded)
  // Put image img element inside the anchor Element
   item.appendChild(img)
   // Put anchor element inside the image container Element
   imageContainer.appendChild(item)
  })
 }
 


async function getPhotos(){
 try {
   let response = await fetch(apiUrl)
   photosArray = await response.json()
   displayPhotos()
   console.log(photosArray)
 } catch(error){
 }
}

// Implement Infinite scrolling.. 
// window.innerHelight = height of the window 'windowHeight'
// window.scrollY = pixels which the user has scrolled 'scrolledHeight'
// document.body.offsetHeight = pixels of the height of the document loaded in the browser 'documentTotalLoadHeight'
// if (windowHeight + scrolledHeight >= documentTotalLoadHeight -1000 )

window.addEventListener('scroll',()=>{
  let windowHeight= window.innerHeight
  let scrolledHeight= window.scrollY
  let documentTotalLoadHeight= document.body.offsetHeight
  if (windowHeight + scrolledHeight >= documentTotalLoadHeight -1000 && ready){
    ready=false
    console.log('Loadmore')
    getPhotos()

  } else {

  }

})

setRandomAccount()
getPhotos()