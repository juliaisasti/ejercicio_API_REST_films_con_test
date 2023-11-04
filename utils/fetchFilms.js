require('dotenv').config();
// const apikey = process.env.API_KEY;
    
async function fetchFilm(title) {
    let response = await fetch (`http://www.omdbapi.com/?t=${title}&apikey=${process.env.API_KEY}`)
    let data = await response.json();
    if (data.Response == 'False') {
        return null;
    } else {
        return data;
    }
}



module.exports = fetchFilm;