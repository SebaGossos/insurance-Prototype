
// constructores 
function Sure( brand, year, type ) {
    this.brand = brand;
    this.year = year;
    this.type= type;
}
// make the quote with the data
Sure.prototype.sureQuote = function() {
    // 1 = American 1.10
    // 2 = Asiatico 1.05
    // 2 = Europeao 1.30

    let amount;
    const base = 2000;

    switch( this.brand ) {

        case '1':
            amount = base * 1.15
            break;
        case '2':
            amount = base * 1.05  
            break;
        case '3':
            amount = base * 1.35  
            break;

        default:
            break;
    }

    // read year
    const diference = new Date().getFullYear() - this.year;
    
    // Every year the difference is greater, the cost will be reduced by 3%
    amount -= ( (diference * 3) * amount ) / 100;

    if( this.type === 'basico') {
        return amount *= 1.3;
    }
    return amount *= 1.5;
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

UI.prototype.showResult = ( sure, total ) => {

    const { brand, year, type } = sure;

    let brandText;

    switch( brand ) {

        case '1':
            brandText = 'Americano';
            break
        case '2':
            brandText = 'Asiatico';
            break
        case '3':
            brandText = 'Europeo';
            break
        
        default:
            break;
    }

    // create result
    const div = document.createElement('div');
    div.classList.add('mt-10')

    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${ brandText }</span></p>
        <p class="font-bold">Año: <span class="font-normal">${ year }</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${ type }</span></p>
        <p class="font-bold">Total: <span class="font-normal">$ ${ total }</span></p>
    `;

    const divResult = document.querySelector('#resultado');
    
    // Show Spiner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block'
    setTimeout(() => {
        spinner.style.display = 'none' // disapear spinner
        divResult.appendChild( div ); // showed result
    }, 3000)
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

    const divResult = document.querySelector('#resultado div');

    if( divResult !== null ) {
        divResult.remove();
    }

    // Sure instance
    const sure = new Sure(brand, year, type);
    const total = Math.round(sure.sureQuote());
    
    // Use the prototype that will be quoted
    ui.showResult( sure, total )
}