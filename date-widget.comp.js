(function () {

    let template = `
    <style>
        @import url(http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700);
    .container {
        background-color: #4D148C;
        /*border-radius: 5px;*/
        /*box-shadow: 0 0 5px #dadada;*/
         
        /*min-height: 50px;*/
        font-family: 'Roboto Condensed', sans-serif;
        /*margin: 10px 0;*/
		width:170px;
		height:30px;
       
    }
    .container .left {
        /*position: absolute;
        right: 0;
        top: 0;
        bottom: 0;*/
        width: 20%;
        color: #FFF;
        /*border-radius: 5px 0 0 5px;*/
        text-align: center;
         padding: 18px 0 0 0; 
		 
    }
    .container .left .month {
		font-size: 18px;
        /*line-height: 20px;*/
        font-weight: normal;
    }
    .container .left .day {
        font-size: 18px;
		font-weight: normal;
		line-height: 25px;
		
    }
    .container .right {
        margin-left: 30%;
         padding: 10px 10px 10px 13px; 
        color: white;
    }
    .container .right .day-long {
        font-weight: normal;
        font-size: 18px;
         /*border-radius: 5px 0 0 5px;*/
    }
    .container .right .time {
        font-weight: bold;
        font-size: 18px;
        line-height: 40px;
    }
    /* THEME CODE */
	.container.purple .left {
        background-color: #4D148C;
    }
    .container.purple .day-long {
        color: white;
    }
	
    .container.green .left {
        background-color: #37bc9b;
    }
    .container.green .day-long {
        color: #278b70;
    }
    .container.red .left {
        background-color: #bc2751;
    }
    .container.red .day-long {
        color: #922146;
    }
    .container.blue .left {
        background-color: #356dbc;
    }
    .container.blue .day-long {
        color: #2d5ea3;
    }
    .container.gold .left {
        background-color: #bc9600;
    }
    .container.gold .day-long {
        color: #9a7b00;
    }
    </style>
	
	
    <div class="container">
		<div class="right">
			<div class="day-long"></div>
			<div class="time" style = "width:100px;height: 35px;font-size:18px;font-weight:bold;background-color:#4D148C;"></div>
        </div>
	</div>`;

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    class DateWidget extends HTMLElement {

        // Fires when an instance of the element is created.
        createdCallback() {
            this.createShadowRoot().innerHTML = template;

            //Grab the elements from the shadow root
            this.$container = this.shadowRoot.querySelector('.container');
            this.$month = this.shadowRoot.querySelector('.month');
            this.$day = this.shadowRoot.querySelector('.day');
            this.$dayLong = this.shadowRoot.querySelector('.day-long');
            this.$time = this.shadowRoot.querySelector('.time');

            this.updateTheme(this.getAttribute('theme'));
            

            //Call the draw function initially
            this.draw();
            //Call the draw function every section to update the time
            setInterval(() => {
                this.draw();
            }, 1000);
        }
        
		
		// Fires when an instance was inserted into the document.
        attachedCallback() {}
        
		
		// Fires when an attribute was added, removed, or updated.
        attributeChangedCallback(attrName, oldVal, newVal) {
            switch (attrName) {
                case "theme":
                    this.updateTheme(newVal);
                    break;
            }
        }
		
		
		draw() {
			//my modification getting UTCMinutes and adding a 0 if time is less than 10
            this.date = new Date();
             
			var newtime;
			if (this.date.getUTCMinutes() < 10)
			{
			newtime = "0" + this.date.getUTCMinutes();
			}
		
			if (this.date.getUTCMinutes() > 10)
			{
			newtime = this.date.getUTCMinutes();
			} 
   
            this.$time.innerHTML = this.date.getUTCHours() + ":" + newtime + " GMT";
        }
		
		
        updateTheme(theme) {
            var val = "purple";
            if (["purple", "green", "red", "blue", "gold"].indexOf(theme) > -1) {
                val = theme;
            }
            this.$container.className = "container " + val;
            
        }
    }
    
	
	document.registerElement('date-widget', DateWidget);
})();