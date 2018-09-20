var error;
var rad2deg = 180 / Math.PI;

function calculate() {
	error = false;

    var point1 = document.getElementById("point1").value;
    var point2 = document.getElementById("point2").value;

    // Remove any spaces
    point1 = point1.replace(/\s/g,'');
    point2 = point2.replace(/\s/g,'');
   	
   	// Remove any characters
   	point1 = point1.replace(/\D/g,'');
   	point2 = point2.replace(/\D/g,'');

   	// Count the strings
   	length1 = point1.length;
   	length2 = point2.length;

   	// Verify that coordinates are valid

   	// Verify that the coordinates are long enough: There must be at least 4
   	if (length1 < 4 || length2 < 4) {
   		// Coordinates are not precise enough to calculate results
   		alert("The entered coordinates are not precise enough to calculate results. Please enter more precise coordinates.");
   		error = true;
   	} else {
   		// Coordinates are sufficiently precise, but may not be equal and even
   		if (length1 == length2) {

   			if ((length1 % 2 == 0) && (length2 % 2 == 0)) {
   			// Good to go, points are of sufficient length, even, and equal

   			// Split the points into their respective coordinates
   			point1x = point1.substring(0, length1 / 2);
   			point1y = point1.substring(length1 / 2, length1);
   			point2x = point2.substring(0, length2 / 2);
   			point2y = point2.substring(length2 / 2, length2);

   			// Convert raw coordinate to a decimal value
   			point1x = parseInt(point1x, 10);
   			point1y = parseInt(point1y, 10);
   			point2x = parseInt(point2x, 10);
   			point2y = parseInt(point2y, 10);

   			// Divide the point by a power necessary to have 2 values before the decimal place. No need to round after that operation
   			point1x = (point1x / (Math.pow(10, (length1 / 2) - 2)));
   			point1y = (point1y / (Math.pow(10, (length1 / 2) - 2)));
   			point2x = (point2x / (Math.pow(10, (length2 / 2) - 2)));
   			point2y = (point2y / (Math.pow(10, (length2 / 2) - 2)));

   			//alert("p1x:"+point1x + " p1y:" + point1y + " p2x:" + point2x + " p2y:" + point2y);

   			// Points are now processed and ready to calculate
   			} else {
   			alert("Please enter an even number of coordinates.");
   			error = true;
   			} 
   		} else {
			alert ("Please enter coordinates to an equal level of precision.");
   			error = true;
   		}
		
   	}

   	// Calculate azimuth and distance
   	if (!error) {
   		difX = point2x - point1x;
      difY = point2y - point1y;
      distance = Math.sqrt(Math.pow(difX, 2) + Math.pow(difY, 2));

      if (difX > 0 && difY > 0) {
        // 1st Quadrant
        angle = 90 - Math.atan(difY / difX) * rad2deg;
      } else if (difX < 0 && difY > 0) {
        // 2nd Quadrant
        angle = 270 + Math.atan(difY / Math.abs(difX)) * rad2deg;
      } else if (difX < 0 && difY < 0) {
        // 3rd Quadrant
        angle = 270 - Math.atan(difY / difX) * rad2deg;
      } else if (difX > 0 && difY < 0) {
        // 4th Quadrant
        angle = 90 + Math.atan(Math.abs(difY) / difX) * rad2deg;
      } else {
        // Unknown error
        alert("Unknown Error");
      }

      azimuth = angle + 14;

      // Round to 1 decimal
      angle = angle.toFixed(1);
      azimuth = azimuth.toFixed(1);
}


   
   	

	//alert("point1 len: " + length1 + ", point2 len: " + length2);
    //alert("point1: " + point1 + ", point2: " + point2);

    if (!error) {
    	output = "The distance to travel is " + distance + " meters."
   		document.getElementById("results").innerHTML = output;
      angleOut = "The azimuth to follow is " + angle + " degrees for grid and " + azimuth + " degrees for magnetic compass."
      document.getElementById("angle").innerHTML = angleOut; 
	} else {
		alert("Calculation failed.");
	}
}
