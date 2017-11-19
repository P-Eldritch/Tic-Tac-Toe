document.addEventListener('DOMContentLoaded', function() {

	var circles = document.getElementsByClassName("field");
	var resetButton = document.querySelector(".new");
	var display = document.querySelector("h1");
	var xs = [];
	var os = [];
	var current, prevMove, counter, win;
	const oUnit ="O";
	const xUnit = "X"; 
	/* possible win combinations: 111000000, 000111000, 000000111, 100100100, 010010010, 001001001, 100010001, 001010100];
	* binary combos converted to decimal and stored in winBits array: */
	const winBits = [448,292,273,146,84,73,56,7]; 

	reset();

	//resets board for a new game when clicked
	resetButton.addEventListener("click", function(){
		reset();
	});

	//circles' events
	for (let i =0; i<circles.length; i++) {
	circles[i].addEventListener("click", function(){
		if (!win && !this.classList.contains("selected")){
			selectCheck(this);
			collectArray(i);
		}
		checkWin(xs, os);
	})
	}

	function selectCheck(param) {
			counter = counter +1;
			param.classList.add("selected");
			circlesText(param);
	}

	// writes an element position to a corresponding array
	function collectArray(elementIndex) {
		if (counter%2 !==0) {
			xs[elementIndex] = 1;
		}
		else {
			os[elementIndex] = 1;
		}
	}

	//tracks whetcher is X move, o O move
	function circlesText(currentField){
		if (current === null || prevMove === oUnit) {
			current = xUnit;
		}
		else {
			current = oUnit;
		}
		currentField.textContent = current;
		prevMove = current;
	}

	function checkWin(array1, array2) {
		var tempNum1 = array1.join("");
		var tempNum2 = array2.join("");
		for (let i=0; i<winBits.length; i++){ 
			if ((parseInt(tempNum1,2) & winBits[i]) === winBits[i]) {
				display.textContent = "X won!!!";
				win = true;
			}
			else if ((parseInt(tempNum2,2) & winBits[i]) === winBits[i]) {
				display.textContent = "O won!!!";
				win = true;
			}
			else if (counter === circles.length && win === false) {
				display.textContent = "DRAW! Try again";
			}
		}
	}

	//resets parameters and fills arrays with zeros
	function reset () {
		fillZero(xs,9);
		fillZero(os,9);
		removeSelected(circles);
		current = null;
		counter = null;
		win = false;
		removeCircleText();
		display.textContent = "tic tac toe";
	}

	//fills an array with zeros == ready to play(because of binary evaluation)
	function fillZero(array, size) {
		for (let i = 0; i<size; i++) {
			array[i] = 0;
		}
		return array;
	}

	 //removes class 'selected' from function parameters
	function removeSelected(selectedElements) {
		for (let i = 0; i<selectedElements.length; i++) {
			selectedElements[i].classList.remove("selected");
		}
	}
	//removes X and O markings from circles
	function removeCircleText() {
		for (let i = 0; i<circles.length; i++) {
		circles[i].textContent = "";
		}
	}
}