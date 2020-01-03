// http://www.omdbapi.com/?apikey=[yourkey]& - data requests
// http://img.omdbapi.com/?apikey=[yourkey]& - poster requests

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '5b7ffe64',
            s: searchTerm
        }
    });
    console.log(response.data);
}

const input = document.querySelector('input');


const onInput = debounce ( event => {
   fetchData(event.target.value);
}, 500);

input.addEventListener('input', onInput);