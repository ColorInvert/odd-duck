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


//Utilities

function randomIndex(){
  Math.floor(Math.random() * productArray.length);
}

function renderImgs(){
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();
  imgOne.src = productArray[0].img;
  imgTwo.src = productArray[1].img;
  imgThree.src = productArray[2].img;
}

//Event handlers


//Executable code

renderImgs();



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
