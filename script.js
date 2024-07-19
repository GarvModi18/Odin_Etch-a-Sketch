let colorSelector = document.getElementById('colorSelector');
let ColorBtn = document.getElementById('ColorMode');
let RainbowBtn = document.getElementById('RainbowMode');
let EraserBtn = document.getElementById('Eraser');
let SizeDisplay = document.getElementById('SizeDisplay');
let gridSizeCtr = document.getElementById('gridSizeCtr');
let container = document.getElementById('container');
let clearBtn = document.getElementById('clear');

//Assigning Default Values 
const defaultMode = "Color";
const defaultSize = 3;
const defaultColor = "black";

//Variables to Set Current Grid
let currentMode = defaultMode;
let currentColor = defaultColor;
let currentSize = defaultSize;

//Functions to Set Current Grid
function setCurrentMode(mode) {
    //Passing the Mode to Function which handles the status of each perticular button of Mode 
    //So it Can Update the status of Buttons and change their Styles
    activateButton(mode);
    currentMode = mode;
}
function setCurrentColor(color) {
    currentColor = color;
}
function setCurrentSize(size) {
    currentSize = size;
}
function clearGrid() {
    container.innerHTML = '';
}
//Will be Called to Clear and Set New Grid
function reloadGrid() {
    clearGrid();
    setGrid(currentSize);
}
//Displaying The Size of Grid
function displayUpdatedSize(size) {
    SizeDisplay.innerText = `${size} x ${size}`;
}
//Updating Size Value and Displaying
function updateSize(value) {
    setCurrentSize(value);
    displayUpdatedSize(value);
    reloadGrid();
}

//Setting up Function Calls on Buttons & Inputs
colorSelector.oninput = (e) => setCurrentColor(e.target.value);
ColorBtn.onclick = () => setCurrentMode('Color');
EraserBtn.onclick = () => setCurrentMode('Eraser');
RainbowBtn.onclick = () => setCurrentMode('Rainbow');
clearBtn.onclick = () => reloadGrid();
gridSizeCtr.onmousemove = (e) => displayUpdatedSize(e.target.value);
gridSizeCtr.onchange = (e) => updateSize(e.target.value);

//Trackdown the User Input by Mouse
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const containerElement = document.createElement('div');
        containerElement.classList.add('container-element');
        //User Can Click and Drag Multiple Blocks
        containerElement.addEventListener('mouseover', changeColor);
        //User Can Click a Specific Block
        containerElement.addEventListener('mousedown', changeColor);
        container.appendChild(containerElement);
    }
}

function changeColor(e) {
    //Prevents the Only Hover Effeact
    if (e.type === 'mouseover' && !mouseDown) return;

    if (currentMode === 'Rainbow') {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    } else if (currentMode === 'Color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'Eraser') {
        e.target.style.backgroundColor = 'white';
    }
}

//Function to handle Status of Buttons
function activateButton(newMode) {
    //Removes Style of Currently Selected Button 
    if (currentMode === 'Rainbow') {
        RainbowBtn.classList.remove('active');
        RainbowBtn.style.height='50px';
        RainbowBtn.style.width='100px';
        RainbowBtn.style.fontSize='large';
    } else if (currentMode === 'Color') {
        ColorBtn.classList.remove('active');
        ColorBtn.style.width='100px';
        ColorBtn.style.height='50px';
        ColorBtn.style.fontSize='large';
    } else if (currentMode === 'Eraser') {
        EraserBtn.classList.remove('active');
        EraserBtn.style.width='100px';
        EraserBtn.style.height='50px';
        EraserBtn.style.fontSize='large';
    }

    //Adds Style to Newly Selected Button
    if (newMode === 'Rainbow') {
        RainbowBtn.classList.add('active');
        RainbowBtn.style.height='60px';
        RainbowBtn.style.width='110px';
        RainbowBtn.style.fontSize='x-large';
    } else if (newMode === 'Color') {
        ColorBtn.classList.add('active');
        ColorBtn.style.width='110px';
        ColorBtn.style.height='60px';
        ColorBtn.style.fontSize='x-large';
    } else if (newMode === 'Eraser') {
        EraserBtn.classList.add('active');
        EraserBtn.style.width='110px';
        EraserBtn.style.height='60px';
        EraserBtn.style.fontSize='x-large';
    }
}
//On Load it Setup the Default Grid
window.onload = () => {
    setGrid(defaultSize);
    activateButton(defaultMode);
};
