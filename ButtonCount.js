class ButtonCount extends HTMLElement {
    constructor() {
      super();
  
      let button = document.createElement('button');
      button.setAttribute("id", "btn");
      button.innerHTML = `Times Clicked: <span id="clickedTimes">0</span>`;      
  
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(button);
    }

    connectedCallback() {
      let button = this.shadowRoot.querySelector("#btn");      
      button.addEventListener("click", ()=>{
        let clickedTimes = this.shadowRoot.querySelector("#clickedTimes");              
        clickedTimes.textContent = (parseInt(clickedTimes.textContent) + 1).toString();
      });
    }
  }
  customElements.define('button-count', ButtonCount);
  