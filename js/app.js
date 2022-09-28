'use strict';


//********************GLOBAL VARIABLES********************
let voteCount = 25;
let productArray = [];
let imgQueueArray = [];

//********************DOM MANIPULATION********************
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

//***********************CONSTRUCTOR**********************
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
}

//***********************FUNCTIONS************************
//Called whenever we need a random entry in the product array.
function randomIndex() {
  let randomVal = Math.floor(Math.random() * productArray.length);
  return randomVal;
}
//Called whenever we need to render 3 more images for our product review.
function renderImgs() {


  //Does our imgQueue contain 6 index values? if not, push in more until it does, while checking each to make sure that the pushed number doesn't match any existing.
  while (imgQueueArray.length < 6) {

    let randomNum = randomIndex();
    if (!imgQueueArray.includes(randomNum)) {
      imgQueueArray.push(randomNum);
    }
  }
  console.log(imgQueueArray);
  //Put the current first 3 items in our queue into the 3 image index sockets
  let imgOneIndex = imgQueueArray[0];
  let imgTwoIndex = imgQueueArray[1];
  let imgThreeIndex = imgQueueArray[2];

  //Load the image sources from our image names, using the index vars we've got.
  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;
  imgOne.alt = productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;

  //Increment each of the views counts on our 3 displayed items
  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

  //Now that our front 3 indexes have been used, destroy them, and move the queue forward.
  imgQueueArray.shift();
  imgQueueArray.shift();
  imgQueueArray.shift();
  console.log(imgQueueArray);

}

//********************EVENT LISTENERS*********************
//Listen for clicks on one of our three images.
imgContainer.addEventListener('click', handleClick);


//********************EVENT HANDLERS**********************
//To be run every time a click on an image occurs.
function handleClick(event) {
  console.dir(event.target);

  let imgClicked = event.target.alt;


  for (let i = 0; i < productArray.length; i++) {

    if (productArray[i].name === imgClicked) {
      productArray[i].clicks++;
    }

  }

  voteCount--;

  //after we run out of vote count, render our chart, and remove event listeners for images.
  renderImgs();
  if (voteCount === 0) {
    renderChart();
    imgContainer.removeEventListener('click', handleClick);

    //**!CREATE LOCAL STORAGE **/
    //Now that voting is concluded, JSON stringify the product array, and save to a local storage cookie.
    let stringifiedProductArray = JSON.stringify(productArray);
    localStorage.setItem('myProducts', stringifiedProductArray);

  }


}




//!LOCAL STORAGE CODE
//Retrieve and parse the local storage data.
let savedProductArray = localStorage.getItem('myProducts');
let parsedProductArray = JSON.parse(savedProductArray);


//Check if we have a savedProductArray local storage cookie. If we do, load it...
if (savedProductArray) {
  productArray = parsedProductArray;
}
//If not, make one.
else {
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
}

//Now that we've defined and linked the url directory for our product-objects, render them, and prepare them for click handling.
renderImgs();
imgContainer.addEventListener('click', handleClick);




//! CHARTJS LIBRARY RELATED CODE BELOW.
function renderChart() {

  // To be run only when out of votes. get all click, view, and name data, in preparation to...
  let viewsArray = [];
  let clicksArray = [];
  let namesArray = [];
  for (let i = 0; i < productArray.length; i++) {
    viewsArray.push(productArray[i].views);
    clicksArray.push(productArray[i].clicks);
    namesArray.push(productArray[i].name);
  }



  //...Define the chart, and provide all of it's data as established above.
  let chartObj = {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of views',
        data: viewsArray,
        backgroundColor: ['red'],
      },
      {
        label: '# of clicks',
        data: clicksArray,
        backgroundColor: ['green'],
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };


  //Finally, render the chart to the HTML.
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, chartObj);
}
