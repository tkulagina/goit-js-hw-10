import './css/styles.css';
import Notiflix from 'notiflix';
console.log(Notiflix);


const DEBOUNCE_DELAY = 300;

fetch(`https://restcountries.com/v3.1/name/eesti`)
.then(response =>{
    //console.log(response.json());
    return response.json();
})
.then(country =>{
    console.log(country);
})
.catch (error =>{
    console.log(error);
})
