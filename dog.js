const BREED_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');
const dogNameh2 = document.querySelector('.dog-name');
const spinner = document.querySelector('.spinner');
const img = document.querySelector('img');

// get dog breed list
fetch(BREED_URL)
    .then(response => {
        return response.json();
    })
    .then(data => {

        // ? getting breed object and trun to array
        const breedObj =data.message;
        const breedArray = Object.keys(breedObj);

        // ? create drop down
        breedArray.forEach( breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.innerText = breed;
            select.appendChild(option);
        });
    });

// get dog image
select.addEventListener('change', getDoggy);

// wating to finish loading image
img.addEventListener('load', () => {
    spinner.classList.remove('show');
    dogNameh2.innerText = dogNameCapitalized; 
});

// fuction for get doggy    
function getDoggy(e) {

    // spinner
    dogNameh2.innerText = " "; 
    img.src = "";   
    spinner.classList.add('show');

    const dogName = e.target.value;
    dogNameCapitalized = dogName.charAt(0).toUpperCase() + dogName.slice(1);
    const imgByBreed = `https://dog.ceo/api/breed/${dogName}/images/random`;
    fetch(imgByBreed)
        .then(response => {
            return response.json();
        })    
        .then(data => {
            img.src = data.message;
            
        });
}

