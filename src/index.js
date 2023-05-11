//імпортуємо бібліотекі
import './css/styles.css';
import {CountriesSearch} from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

//отримуємо доступ до елементів форми
const form = document.querySelector("#search-box");
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// створюємо екземпляр класу CountriesSearch
const countriesSearch = new CountriesSearch();

//додаємо слухача на форму введення
form.addEventListener('input', debounce (onSearch, DEBOUNCE_DELAY));

//створюємо функцію пошуку даних
function onSearch(evt) {
    evt.preventDefault();
    if (evt.target.value.trim() === '') {
        clearPage();
        return
    };
    countriesSearch.form = evt.target.value.trim();
    countriesSearch.fetchCountries().then(data => renderMarkup(data)).catch(handleError);
};

//створюємо функцію сповіщення про помилку
function handleError() {
    Notify.failure('Oops, there is no country with that name')
};

//створюємо функцію для розмітки інформації про одну країну
function markupOneCountry(data) {
    return data.map(country => {
        return `<img src="${country.flags.svg}" alt="Flag" width="40" height="40"></img>
                <h2 class="country-info-title">${country.name.official}</h2>
            <p>Capital: <span>${country.capital}</span></p><p>Population: <span>${country.population }</span></p><p>Languages: <span>${Object.values(country.languages)}</span></p>`
    }).join('');
};

//створюємо функцію для розмітки інформациї про кілька країн
function markupMoreCountries(data) {
    return data.map(country => {
        return `<li class="country-list-item"><img src="${country.flags.svg}" alt="Flag" width="30" height="30"></img>${country.name.official}</li>`
    }).join('');
};

//створюємо функцию рендеру розмітки
function renderMarkup(data) {
    clearPage();
    if (data.length === 1) {
        countryInfo.insertAdjacentHTML('beforeend', markupOneCountry(data)) 
    } else if (data.length > 1 && data.length <= 10) {
        countryList.insertAdjacentHTML('beforeend', markupMoreCountries(data))
    } else if (data.length > 10){
        Notify.info('Too many matches found. Please enter a more specific name.')
    }
};

//створюємо функцію очищення полів
function clearPage() {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
}