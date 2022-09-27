'use strict';


// global vars
let voteCount = 25;
let productArray = [];
let productNamesArray = [];


//dom manipulation
let imgContainer = document.getElementById('img-container');
console.log(imgContainer);
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');

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
  console.log(randomVal);
  return randomVal;
}

function renderImgs() {
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgOneIndex = randomIndex();
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;


  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

  imgOne.alt = productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;
}

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

  // TODO To be run only when out of votes. get all click and view data, and parse them into arrays alongside our already made name array.





  //Define the chart, and provide all of it's data as established above
  let chartObj = {
    type: 'bar',
    data: {
      labels: productNamesArray,
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
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
