
let initialField = document.querySelector(".field");
let grades = [];

let addNewButton;
let finalGrade = document.querySelector(".grade");
let calculateGradeButton = document.querySelector(".calculate");

function init() {
	grades.push(initialField);
	addNewButton = initialField.querySelector(".addNew");
	refreshButtonEvent();
}

function addGrade() {
	var lastField = getLastField();
	var lastID = parseInt(lastField.id);
	var lastAddButton = lastField.querySelector(".addNew");
	
	var clone = initialField.cloneNode(true);
	var newID = lastID + 1;
	clone.id = newID;
	lastField.after(clone);
	grades.push(clone);

	lastAddButton.style.display = "none";
	refreshButtonEvent();
}

function refreshButtonEvent() {
	addNewButton = getLastField().querySelector(".addNew");
	removeGradeButton = getLastField().querySelector(".remove");
	addNewButton.addEventListener("click", function() {
		calculateGrade();
		addGrade();
	});

	addNewButton.style.display = "flex";
	getLastField().querySelector(".inputBox").value = "";
}

function calculateGrade() {
	var sum = null;
	for(var i = 0; i < grades.length; i++) {
		var selectedGradeField = grades[i];
		var inputField = selectedGradeField.querySelector(".inputBox");
		var inputVal = inputField.value;
		var inputValFloat = parseFloat(inputVal);
		if(isNaN(inputValFloat) || inputValFloat > 4) {
			continue;
		}
		if(sum === null ) {
			sum = inputValFloat;
		} else {
			var sumTemp = sum + inputValFloat;
			sum = sumTemp / 2;
		}
	}
	finalGrade.innerHTML = "Estimated Final Grade: " +  sum;
}

function getPreviousField() {
	var targetIndex = grades.length - 2;
	return grades[targetIndex];
}

function getLastField() {
	var gradesLength = grades.length;
	return grades[gradesLength - 1];
}

calculateGradeButton.addEventListener("click", function() {
	calculateGrade();
});

init();
