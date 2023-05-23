// https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=FJkYOq9tW
const keyHeader = 'x-api-key';
const apiKeyValue =
  'live_AoSMygcvOuSfuaPRxJ3fVnZU6z3RRWgOC31qcwWgOvSkt12dFwHOIt9XK1qtyttu';

const header = { keyHeader: apiKeyValue };

// https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=gpN-ReBkp
const breeds = 'https://api.thecatapi.com/v1/breeds';

// Fetching data from the API and returning it. The returned value of this function can be stored in a variable.
function fetchCats() {
  return $.get(breeds).then(function (data) {
    const allCatData = data;
    console.log('-----All Cat Data Below-----');
    console.log(allCatData);
    return allCatData;
  });
}

fetchCats();

// Query selectors
const dropdown = document.querySelector('.dropdown');
const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
const dropdownMenu = dropdown.querySelector('.dropdown-menu');
const catContent = document.querySelector('.cat-content')
const catName = document.querySelector('.cat-name');
const description = document.querySelector('.description')
const pic = document.querySelector('.pic');
const origin = document.querySelector('.origin');

// Populate all of the cat data into the drop down menu
const populateCats = (breeds) => {
  breeds.forEach((breed) => {
    const listItem = document.createElement('li');
    listItem.textContent = breed.name;
    dropdownMenu.appendChild(listItem);
  });
};

// Call the fetchCats function and then run it through populateCats with that data that the API gave me
const catData = fetchCats().then((data) => {
  populateCats(data);
});

// Compare what the user selected to the array of cat objects
function compareUserInputToData(selectedCat) {
  fetchCats().then(function (data) {
    const matchedCat = data.find((cat) => cat.name === selectedCat.name);
    if (matchedCat) {
      console.log('-----Matched Cat below-----')  
      console.log(matchedCat);
      catContent.classList.remove('hide-me')
      catName.innerHTML = matchedCat.name;
      // origin.innerHTML = 'Origin: ' + matchedCat.origin
      description.innerHTML = matchedCat.description
      const imageUrl = 'http://cdn2.thecatapi.com/images/' + matchedCat.reference_image_id + '.jpg';
      pic.setAttribute('src', imageUrl)

      return matchedCat;
    }
  });
}



dropdown.addEventListener('change', function (eventOnChild) {
  const selectedCat = eventOnChild.target.value;
  compareUserInputToData({ name: selectedCat });
  // onBlur()
});

dropdownToggle.addEventListener('click', function () {
  dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});

dropdownMenu.addEventListener('click', function (event) {
  const selectedCat = event.target.textContent;
  compareUserInputToData({ name: selectedCat });
  dropdownMenu.style.display = 'none';
});




