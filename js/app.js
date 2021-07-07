'use strict';
// let attemptsEl = document.getElementById('attempts');
// let containarEl = document.getElementById('container');
let leftImgEl = document.getElementById('left');
let middleImgEl = document.getElementById('middle');
let rightImgEl = document.getElementById('right');
let ulEl = document.getElementById('results');
let attempts = 1;
let maxattempts = 25;
let proudcts = [];
let productsN = [];
let votes = [];
let views = [];
function ProudctsImages(productName) {
  this.productName = productName.split('.')[0];
  this.img = 'images/' + productName;
  this.votes = 0;
  this.views = 0;

  proudcts.push(this);
  productsN.push(this.productName);

}

let allProudctsImgs = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
for (let i = 0; i < allProudctsImgs.length; i++) {
  new ProudctsImages(allProudctsImgs[i]);
}
function gettingRandomNum() {
  return Math.floor(Math.random() * proudcts.length);
}

// let nums=[];
// for(let i = 0;i<allProudctsImgs.length;i++){
//   nums.push(i);
// }

// function shuffle(o) {
//   for (let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
//   return o;
// }
// let shuffled = shuffle(nums);

let leftElRandomNum;
let middleElRandomNum;
let rightElRandomNum;


function renderimages() {
  leftElRandomNum =gettingRandomNum();
  middleElRandomNum =gettingRandomNum();
  rightElRandomNum = gettingRandomNum();
  if(
    leftElRandomNum=== middleElRandomNum ||leftElRandomNum===rightElRandomNum||
    middleElRandomNum===rightElRandomNum
  ){
    renderimages();
    return;
  }




  leftImgEl.setAttribute('src', proudcts[leftElRandomNum].img);
  middleImgEl.setAttribute('src', proudcts[middleElRandomNum].img);
  rightImgEl.setAttribute('src', proudcts[rightElRandomNum].img);
  leftImgEl.setAttribute('title', proudcts[leftElRandomNum].productName);
  middleImgEl.setAttribute('title', proudcts[middleElRandomNum].productName);
  rightImgEl.setAttribute('title', proudcts[rightElRandomNum].productName);
  proudcts[leftElRandomNum].views++;
  proudcts[rightElRandomNum].views++;
  proudcts[middleElRandomNum].views++;


}
renderimages();

leftImgEl.addEventListener('click', dealWithClicks);
middleImgEl.addEventListener('click', dealWithClicks);
rightImgEl.addEventListener('click', dealWithClicks);

function dealWithClicks(event) {
  if (attempts <= maxattempts) {
    let clickedOne = event.target.id;
    if (clickedOne === 'left') {
      proudcts[leftElRandomNum].votes++;

    } else if (clickedOne === 'right') {
      proudcts[rightElRandomNum].votes++;
    } else if (clickedOne === 'middle') {
      proudcts[middleElRandomNum].votes++;
    }

    renderimages();
  } else {
    let btnEl = document.createElement('button');
    btnEl.innerHTML = 'show results';
    ulEl.appendChild(btnEl);
    btnEl.addEventListener('click', function () {
      // let ulEl = document.getElementById('results');
      for (let i = 0; i < proudcts.length; i++) {
        // let liEl = document.createElement('li');
        // liEl.textContent = `${proudcts[i].productName} had ${proudcts[i].votes} votes, was seen ${proudcts[i].views} times .`;
        // ulEl.appendChild(liEl);
        votes.push(proudcts[i].votes);
        // eslint-disable-next-line indent
        views.push(proudcts[i].views);
      }
      renderchart();

    });

    leftImgEl.removeEventListener('click', dealWithClicks);
    middleImgEl.removeEventListener('click', dealWithClicks);
    rightImgEl.removeEventListener('click', dealWithClicks);

  }
  attempts++;
}

function renderchart() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsN,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(0, 145, 23, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      },
      {
        label: '# of views',
        data: views,
        backgroundColor: [
          'rgba(255, 145, 23, 0.7)',
        ],
        borderColor: [
          'rgba(100, 99, 132, 1)',
        ],
        borderWidth: 1

      }]
    },
    options: {
      responsive:true,
      maintainAspectRatio: false,

      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
