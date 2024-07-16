// Clase Tabs
export default class Tabs {
    // Constructor
    constructor(idElemento) {
        // Se obtiene la tab deseada por id
        this.tabs = document.getElementById(idElemento);
        // Se obtiene la pestaña de la tab
        this.nav = this.tabs.querySelector('.tabs'); 

        // Eveneto de click en la tab
        this.nav.addEventListener('click', (e) => {
            // Se comprueba que el elemento tenga la clase tabs__button
            if([...e.target.classList].includes('tabs__button')){
                // Se obtiene la tab de la ventana (o sea el encabeza de la ventana)
                const tab = e.target.dataset.tab;

                // Se busca la ventana activa
                if(this.tabs.querySelector('.tab--active')) {
                    // Se le quita la clase activa a la ventana encontrada
                    this.tabs.querySelector('.tab--active').classList.remove('tab--active');
                }

                // Se busca el botón de la ventana activa
                if(this.tabs.querySelector('.tabs__button--active')) {
                    // Se le quita la clase activa al botón encontrado
                    this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
                }

                // Se busca dentro de tabs (ventanas) a cuál se le dio click y se activa
                this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

                // Se agraga la clase activa al botón
                e.target.classList.add('tabs__button--active');
            }
        });
    }
}