//створюємо клас пошуку краін

class CountriesSearch {
    constructor() {
        this.form ='';    
    }

    fetchCountries() {
        const url = `https://restcountries.com/v3.1/name/${this.form}?fields=name,capital,languages,population,flags`;
        return fetch(url).then(resp => {
            if (!resp.ok) {
                throw new Error(resp.status);
            }
            return resp.json();
        })
    }
}

export { CountriesSearch };

