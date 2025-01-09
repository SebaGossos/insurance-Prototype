
// constructores 
function Sure( brand, year, type ) {
    this.brand = brand;
    this.year = year;
    this.type= type;
}

function UI() {}

// fill the options of the years
UI.prototype.fillOptions = () => {
    const max = new Date().getFullYear(),
                min = max - 20;

    const selectYear = document.querySelector('#year');
    

    let option = document.createElement('option')
    option.value = '';
    option.textContent = '--SELECT--'
    selectYear.appendChild( option );

    for( let i = max; i >= min; i--  ) {
        let option = document.createElement('option')


        option.value = i;
        option.textContent = i;
        selectYear.appendChild( option );
    }
}

// show alerts in screen
UI.prototype.showMesaje = ( message, type='' ) => {

    const div = document.createElement('div');

    if( type === 'error' ) {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');
    div.textContent = message;

    // insert in HTML
    const form = document.querySelector('#cotizar-seguro');
    form.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove();
    },3000)
}





// instance UI
const ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    ui.fillOptions(); // fill select with years...
})

eventListener()
function eventListener() {
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit', quoteInsurance);
}

function quoteInsurance( e ) {
    e.preventDefault();

    // read selected brand
    const brand = document.querySelector('#marca').value;
    
    // read selected year
    const year = document.querySelector('#year').value;
    
    // read type of coverage
    const type = document.querySelector('input[name="tipo"]:checked').value;
    
    if( brand === '' || year === '' || type === '') {
        ui.showMesaje('all fields are required', 'error')
        return;
    }
    
    ui.showMesaje('Quoting...', 'exito')

}