'use strict';


// global vars
let voteCount = 25;
let productArray = [];


//dom manipulation
let imgContainer = document.getElementById('img-container');
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
}


//functions

function randomIndex() {
  Math.floor(Math.random() * productArray.length);
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
  imgOne.src = productArray[0].img;
  imgTwo.src = productArray[1].img;
  imgThree.src = productArray[2].img;


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

  renderImgs();
  if (voteCount === 0) {
    imgContainer.removeEventListener('click', handleClick);

  }


}


function handleShowResults() {

  if (voteCount === 0) {
    for (let i = 0; i < productArray.length; i++); {
      let liElem = document.createElement('li');

      liElem.textContent `${productArray[i].name} was viewed ${productArray[i].views} times, and clicked ${productArray[i].clicks} times.`;
      
      resultsContainer.appendChild(liElem);
    }

  }
}

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
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


renderImgs();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);
