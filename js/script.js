/*Marika Whaley
Kinetic Spinners JavaScript file
8 February 2015

This program uses the Kinetic library to draw shapes to the HTML5 Canvas that spin when clicked.

*/

(function() {       //Create namespace inside an anonymous function

    var kineticSpinObj = {
        canvasWidth: 500,
        canvasHeight: 500,
        spacing: 50,
        spinners: new Array(),            //Create array to hold spinner objects
//        shapeRotating: false,
        stage: new Kinetic.Stage({
            width: 500,
            height: 500,
            container: "canvasarea"
        }),

        init: function() {
	    //Set up background and static lines on canvas
            var bgLayer = new Kinetic.Layer();

            //Draw background
            var background = new Kinetic.Rect({
                x: 0,
                y: 0,
                width: kineticSpinObj.canvasWidth,
                height: kineticSpinObj.canvasHeight,
                fill: "hsl(236, 68%, 56%)"
            });
            bgLayer.add(background);

            //Draw vertical lines
            for (lineX = 25; lineX < kineticSpinObj.canvasWidth; lineX += kineticSpinObj.spacing) {
                bgLayer.add(new Kinetic.Line({
                    points: [lineX, 0, lineX, kineticSpinObj.canvasHeight],
                    stroke: "black",
                    strokeWidth: 1
                }));
            }

            kineticSpinObj.stage.add(bgLayer);

	    //Fill array with spinner objects
            for (var y = 25; y < kineticSpinObj.canvasHeight; y += kineticSpinObj.spacing) {
                for (var x = 25; x < kineticSpinObj.canvasWidth; x += kineticSpinObj.spacing) {
                    //Create parameters to pass into new spinner object
                    var spinnerType = Math.random();
                    //Math to translate random numbers into desired HSL color values
                    var spinnerHue = (Math.random() * (80-48)) + 48;
                    var spinnerSatur = (Math.random() * (96-70)) + 70;
                    var mySpinner = new kineticSpinObj.spinner(x, y, spinnerType, spinnerHue, spinnerSatur, 62);
                    kineticSpinObj.spinners.push(mySpinner);
                }
            }

	    //Run function to display spinners
            for (var i = 0; i < kineticSpinObj.spinners.length; i++) {
                kineticSpinObj.drawShapes(i);  //the index number of the spinner to draw is passed in to displaySpinner()
            }

        },

        //Constructor function for spinner objects; see http://www.w3schools.com/js/js_object_definition.asp
        spinner: function(shapeX, shapeY, shapeType, shapeHue, shapeSatur, shapeLight) {
            this.shapeX = shapeX;
            this.shapeY = shapeY,
            this.shapeType = shapeType;
            this.shapeHue = shapeHue;
            this.shapeSatur = shapeSatur;
            this.shapeLight = shapeLight;
//            this.shapeID = shapeID;
        },
	
	drawShapes: function(spinnerIndex) {
	    var shapeLayer = new Kinetic.Layer();     //Create a layer to put spinner shapes on

	    var currentSpinner = kineticSpinObj.spinners[spinnerIndex];
            var shapeHueString = currentSpinner.shapeHue.toString();            
            var shapeSaturString = currentSpinner.shapeSatur.toString();            
            var shapeLightString = currentSpinner.shapeLight.toString();            
            var spinnerColor = "hsl(" + shapeHueString + ", " + shapeSaturString + "%, " + shapeLightString + "%)";

	    //Choose which kind of shape to draw depending on random variable in parameter
            var shapeW;
            var shapeH;
            if (currentSpinner.shapeType > 0.66) {
                shapeW = 35;
                shapeH = 25;
            } 
            else if (currentSpinner.shapeType > 0.33) {
                shapeW = 25;
                shapeH = 35;
            } 
            else {
                shapeW = 20;
                shapeH = 20;
            }

	    //Code for drawing rectangles & then triangles
            if (currentSpinner.shapeType > 0.33) {
		var offsetX = shapeW/2;
		var offsetY = shapeH/2;
		var shape = new Kinetic.Rect({
		    x: currentSpinner.shapeX,             //x and y coordinates are set outside of drawShapes(), all others are local
		    y: currentSpinner.shapeY,
		    width: shapeW,
		    height: shapeH,
		    fill: spinnerColor,
		    offset: {x:offsetX, y:offsetY},
		    isRotating: false,                    //custom property that controls whether shape is spinning
		});

		//Add the rectangle shape to the layer
		shapeLayer.add(shape);
            } 
            else {
		//Some code so that when drawn, some triangles point up and some point down
		var triangleOrient;
		var triangleType = Math.random();
		if (triangleType > 0.5) {
		    triangleOrient = 60;
		} else {
		    triangleOrient = 240;
		}
		
                var shape = new Kinetic.RegularPolygon({
                    x: currentSpinner.shapeX,
                    y: currentSpinner.shapeY,
                    radius: shapeW,
                    sides: 3,
                    fill: spinnerColor,
		    //                offset: {x: 0, y: shapeH/2},
                    rotation: triangleOrient,              //pulls value from variable so that triangles randomly point up or down
		    //                offset: {x: 3, y: 3},
		    isRotating: false,
		});

		//Add the triangle shape to the layer
		shapeLayer.add(shape);

            }

            //Add layer to stage
            kineticSpinObj.stage.add(shapeLayer);

            //Add event listener to shape
            shape.addEventListener("click", kineticSpinObj.shapeClick);
           
            //Create animation for shape, one revolution every 4 sec.
            var angularSpeed = 360 / 4;
            shape.anim = new Kinetic.Animation(
                function(frame) {
                    var angleDiff = frame.timeDiff * angularSpeed / 1000;
                    shape.rotate(angleDiff);
                }, 
                shapeLayer);
            
	},

        shapeClick: function(event) {
            //Toggle the custom property boolean that controls whether a shape is rotating
//            kineticSpinObj.shapeRotating = !kineticSpinObj.shapeRotating;
	    //	    alert(kineticSpinObj.shapeRotating);
	    this.isRotating = !this.isRotating;
//	    alert(this.isRotating);
	    
            //Check rotation boolean and stop or start animation on clicked shape as needed
//            if (kineticSpinObj.shapeRotating == false) {
	    if (this.isRotating == false) {
		this.anim.stop();
            } else {
                this.anim.start();
            }

        },


    }

    //Run init on load
    kineticSpinObj.init();
}) (); //End anonymous function

