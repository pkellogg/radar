(function() {
	
const template = document.createElement('template');
template.innerHTML = `
    <style>
.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4CAF50;
  cursor: pointer;
}
</style>

<div class="slidecontainer">
  <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
  <p>Value: <span id="demo"></span></p>
</div>`

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

	class fxrangeslider extends HTMLElement {
	static get observedAttributes() {return ['width', 'height', 'c', 'layer', 'trans', 'size', 'textcolor', 'family', 'rad']; }	
	constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
	this.shadowRoot.appendChild(template.content.cloneNode(true));
	let style = document.createElement('style'); 
	shadowRoot.appendChild(style);
    }
	attributeChangedCallback(name, oldValue, newValue) {
	updateStyleDrop(this);
	}
}//extends

function updateStyleDrop(elem) { 
	 
	var shadow = elem.shadowRoot;
	var childNodes = shadow.childNodes;
	
	for(var i = 0; i < childNodes.length; i++) {
    if(childNodes[i].nodeName === 'STYLE') {    
      childNodes[i].textContent = '.button{' +
						  ' width: ' + elem.getAttribute('width') + 'px;' +     
                          ' height: ' + elem.getAttribute('height') + 'px;' +
                          ' background-color: ' + elem.getAttribute('c') + ';' +  
						  ' z-index: ' + elem.getAttribute('layer') + ';' +  
						  ' opacity: ' + elem.getAttribute('trans') + ';' +
						  ' font-size: ' + elem.getAttribute('size') + 'px;' +  
						  ' color: ' + elem.getAttribute('textcolor') + ';' + 
						  ' font-family: ' + elem.getAttribute('family') + ';' +
						  ' border-radius: ' + elem.getAttribute('rad') + '%' + ';' + '}'  
						  
						  
	}
  }
} 
window.customElements.define('fx-rangeslider', fxrangeslider);
})();