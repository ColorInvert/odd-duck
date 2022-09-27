'use strict';


// global vars
let voteCount = 25;
let productArray = [];
let productNamesArray = [];
let imgQueueArray = [];

//dom manipulation
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

// let resultsBtn = document.getElementById('show-results-btn');
// let resultsContainer = document.getElementById('results-container');

//constructor function

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.img = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;

  productArray.push(this);
  productNamesArray.push(this.name);
}


//functions

function randomIndex() {
  let randomVal = Math.floor(Math.random() * productArray.length);
  return randomVal;
}



//TODO Create new renderImgs() that doesn't duplicate images from previous offering.


function renderImgs() {


  //does our imgQueue contain 6 index values? if not, push in more until it does, while checking each to make sure that the pushed number doesn't match any existing.
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

  //load the image sources from our image names, using the index vars we've got.
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

// function renderImgs() {
//   let imgOneIndex = randomIndex();
//   let imgTwoIndex = randomIndex();
//   let imgThreeIndex = randomIndex();

//   while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
//     imgOneIndex = randomIndex();
//     imgTwoIndex = randomIndex();
//     imgThreeIndex = randomIndex();
//   }

//   imgOne.src = productArray[imgOneIndex].img;
//   imgTwo.src = productArray[imgTwoIndex].img;
//   imgThree.src = productArray[imgThreeIndex].img;


//   productArray[imgOneIndex].views++;
//   productArray[imgTwoIndex].views++;
//   productArray[imgThreeIndex].views++;

//   imgOne.alt = productArray[imgOneIndex].name;
//   imgTwo.alt = productArray[imgTwoIndex].name;
//   imgThree.alt = productArray[imgThreeIndex].name;
// }



imgContainer.addEventListener('click', handleClick);

//Event handlers

function handleClick(event) {
  console.dir(event.target);

  let imgClicked = event.target.alt;


  for (let i = 0; i < productArray.length; i++) {

    if (productArray[i].name === imgClicked) {
      productArray[i].clicks++;
    }

  }

  voteCount--;

  //after we run out of vote count, render chart, and remove event listeners for images.
  renderImgs();
  if (voteCount === 0) {
    renderChart();
    imgContainer.removeEventListener('click', handleClick);

  }


}

// ?Former view results button.
// function handleShowResults() {
//   console.log('You clicked the results button!');
//   if (voteCount === 0) {
//     for (let i = 0; i < productArray.length; i++) {
//       let liElem = document.createElement('li');

//       liElem.textContent = `${productArray[i].name} was viewed ${productArray[i].views} times, and clicked ${productArray[i].clicks} times.`;

//       resultsContainer.appendChild(liElem);
//     }

//   }
// }
// resultsBtn.addEventListener('click', handleShowResults);
//Executable code




//Object creation
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


renderImgs();

imgContainer.addEventListener('click', handleClick);
//?more commented out results button
//resultsBtn.addEventListener('click', handleShowResults);




//! CHARTJS LIBRARY RELATED CODE BELOW.
function renderChart() {

  // To be run only when out of votes. get all click and view data, and parse them into arrays alongside our already made name array.
  let viewsArray = [];
  let clicksArray = [];
  for (let i = 0; i < productArray.length; i++) {
    viewsArray.push(productArray[i].views);
    clicksArray.push(productArray[i].clicks);
  }



  //Define the chart, and provide all of it's data as established above
  let chartObj = {
    type: 'bar',
    data: {
      labels: productNamesArray,
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
