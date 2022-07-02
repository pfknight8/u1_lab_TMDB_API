////////////////////////
// Global Declaration //
////////////////////////

const API_KEY = 'afd09d42337c11ce507632007964174f';
const DOMAIN = 'https://api.themoviedb.org/3';
const IMAGE_BASE_PATH = 'https://image.tmdb.org/t/p/original';
const INPUT_SEARCH = document.querySelector('#search-input');

///////////////
// Functions //
///////////////

// const testCall = async () => {
//   let res = await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`);
//   console.log(res);
// }
// testCall();

const renderList = async (mySearch) => {
  let res1 = await axios.get(`${DOMAIN}/search/movie?query=${mySearch}&api_key=${API_KEY}`);
  let movieArr = res1.data.results;
  movieArr.forEach(element => {
    let posterDiv = document.createElement('div');
    posterDiv.classList.add("posterSet")
    let posterTitle = document.createElement('h3');
    let posterImage = document.createElement('div');
    if (element.poster_path === null) {
      posterImage.innerHTML = "No poster found.";
    } else {
      posterImage.innerHTML = (`<img src="${IMAGE_BASE_PATH + element.poster_path}" />`);
    }
    if (element.title === null) {
      posterTitle.innerText = "Untitled";
    } else {
      posterTitle.innerText = element.title;
    }
    const detailBtn = document.createElement('button');
    detailBtn.classList.add('forDetails');
    detailBtn.innerText = "View Details";
    detailBtn.addEventListener('click', async () => {
      alert(`${element.title}\nRealeased: ${element.release_date}\n\nOverview:\n${element.overview}`);
    });
    posterDiv.appendChild(posterImage);
    posterDiv.appendChild(posterTitle);
    posterDiv.appendChild(detailBtn);
    document.querySelector('.poster').appendChild(posterDiv);
  });
  console.log(movieArr);
}

/////////////////////
// Event Listeners //
/////////////////////

document.querySelector('#search').addEventListener('click', () => {
  document.querySelector('.poster').innerHTML = "";
  let inputSearch = INPUT_SEARCH.value;
  // console.log(inputSearch);
  renderList(inputSearch);
  document.getElementById('search-input').value = "";
})

///////////
// Notes //
///////////

