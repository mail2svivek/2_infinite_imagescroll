console.log('testing:')
const count = 1
const API_KEY1='BXncE4RH7-J5r325eT8i_Qpi5hCsi8oVl38XKwSV6Rc'
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

const API_ARRAY = [API_KEY1,API_KEY2,API_KEY3,API_KEY4,API_KEY5,API_KEY6,API_KEY7,API_KEY8,API_KEY9,API_KEY10,API_KEY11,API_KEY12]
let imageUrl = ``
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let photosArray=[]


function setRandomAccount(){
  let randNum=Math.floor(Math.random()*API_ARRAY.length)
  imageUrl = `https://api.unsplash.com/photos/random/?client_id=${API_ARRAY[randNum]}&count=${count}`
  console.log(`random number picked = ${randNum}`)
  console.log(`key: ${imageUrl}`)
}

function displayPhotos(){
 
 photosArray.forEach((photo)=>{

  // create an a tag to link an image to its href. Within the a tag you create an img tag. set the target property to _blank so that image opens on a new page 
  const item = document.createElement('a')
  item.setAttribute('href',photo.links.html)
  item.setAttribute('target','_blank')
  // create an image element. set arc alt and title properties from the received data.

  const img = document.createElement('img')
  img.setAttribute('src',photo.urls.regular)
  img.setAttribute('alt',photo.alt_description)
  img.setAttribute('title',photo.alt_description)
  
  // Put image img element inside the anchor Element
  item.appendChild(img)
  // Put anchor element inside the image container Element
  imageContainer.appendChild(item)
 })
}

async function getImage(){
 try {
   //let apiResponse = await fetch(imageUrl)
   photosArray = await apiResponse.json()
   displayPhotos()
   console.log(photosArray)

 } catch(error){

 }
  
}


setRandomAccount()
getImage()
