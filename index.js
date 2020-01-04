// http://www.omdbapi.com/?apikey=[yourkey]& - data requests
// http://img.omdbapi.com/?apikey=[yourkey]& - poster requests

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '5b7ffe64',
            s: searchTerm
        }
    });
    // console.log(response.data);
    if(response.data.Error){
        return [];
    }
    else{
        return response.data.Search;
    }
}
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input" type="text">
    <div class="dropdown">
        <div class="dropdown-menu"> 
            <div class="dropdown-content results"></div>
        </div>
    </div> 
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const onInput = debounce (async (event) => { 
    const movies = await fetchData(event.target.value);
    
    if(!movies.length){
        dropdown.classList.remove('is-active');
        return;
    }

    resultsWrapper.innerHTML='';
    dropdown.classList.add('is-active');
    
    for (let movie of movies){
        const choice = document.createElement('a');
        const src = movie.Poster === 'N/A' ? '' : movie.Poster;
        choice.classList.add('dropdown-item');
        choice.innerHTML = `
        <img src= "${src}" />
        ${movie.Title} 
        `;

        choice.addEventListener('click', () => {
            dropdown.classList.remove('is-active');
            input.value =`${movie.Title}`;
        })

        resultsWrapper.appendChild(choice);
    }
}, 500);

input.addEventListener('input', onInput);

document.addEventListener('click', (event) => {
    if (!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
});