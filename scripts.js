let latitude = "";
let longitude = "";
let photoArray = [];
let photoIndex = 0;
let lat = 43.038902;
let long = -87.906471;

function photoSearch() {
  fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=8e16775ffc10541cd4de42f32f141bf0&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${latitude}&lon=${longitude}&text=buildings`)
    .then(res => res.json())
    .then(data => {
      for (let index = 0; index < data.photos.photo.length; index++) {
        photoArray.push(data.photos.photo[index]);
      }
      displayPhoto();
    });

}

function searchPhoto() {

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    photoSearch();
  }

  function error() {
    latitude = 43.038902;
    longitude = -87.906471;
    photoSearch();
  }

  if (!navigator.geolocation) {
    latitude = 43.038902;
    longitude = -87.906471;
    photoSearch();
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

function nextPhoto() {
  if (photoIndex < 4) {
    photoIndex++;
  } else {
    photoIndex = 0;
  }
  displayPhoto();
}

function displayPhoto() {
  document.querySelector("#displayPhoto").innerHTML = "";
  const image = document.createElement('img');
  const imgUrl = `https://farm${photoArray[photoIndex].farm}.staticflickr.com/${photoArray[photoIndex].server}/${photoArray[photoIndex].id}_${photoArray[photoIndex].secret}.jpg`;
  image.src = imgUrl;
  document.querySelector("#displayPhoto").appendChild(image);
}

searchPhoto();