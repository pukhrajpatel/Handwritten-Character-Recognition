let model;
var canvasHeight            = 400;
var canvasId                = "canvas";
var canvasLineJoin          = "round";
var canvasWidth             = 400;
var canvasStrokeStyle       = "white";
var canvasLineWidth         = 20;
var canvasBackgroundColor   = "black";
var clickX = new Array();
var clickY = new Array();
var clickD = new Array();
var drawing;

var canvasBox = document.getElementById('canvas_box');
var canvas    = document.createElement("canvas");
 
canvas.setAttribute("width", canvasWidth);
canvas.setAttribute("height", canvasHeight);
canvas.setAttribute("id", canvasId);
canvas.style.backgroundColor = canvasBackgroundColor;
canvasBox.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}
ctx = canvas.getContext("2d");

$("#canvas").mousedown(function(e) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = e.clientX- rect.left;;
    var mouseY = e.clientY- rect.top;
    drawing = true;
    addUserGesture(mouseX, mouseY);
    drawOnCanvas();
});

canvas.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
 
    var rect = canvas.getBoundingClientRect();
    var touch = e.touches[0];
 
    var mouseX = touch.clientX - rect.left;
    var mouseY = touch.clientY - rect.top;
 
    drawing = true;
    addUserGesture(mouseX, mouseY);
    drawOnCanvas();
 
}, false);
 

$("#canvas").mousemove(function(e) {
    if(drawing) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = e.clientX- rect.left;;
        var mouseY = e.clientY- rect.top;
        addUserGesture(mouseX, mouseY, true);
        drawOnCanvas();
    }
});

canvas.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
    if(drawing) {
        var rect = canvas.getBoundingClientRect();
        var touch = e.touches[0];
 
        var mouseX = touch.clientX - rect.left;
        var mouseY = touch.clientY - rect.top;
 
        addUserGesture(mouseX, mouseY, true);
        drawOnCanvas();
    }
}, false);


$("#canvas").mouseup(function(e) {
    drawing = false;
});

canvas.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
    drawing = false;
}, false);

$("#canvas").mouseleave(function(e) {
    drawing = false;
});

canvas.addEventListener("touchleave", function (e) {
    if (e.target == canvas) {
        e.preventDefault();
    }
    drawing = false;
}, false);

function addUserGesture(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickD.push(dragging);
}

function drawOnCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
 
    ctx.strokeStyle = canvasStrokeStyle;
    ctx.lineJoin    = canvasLineJoin;
    ctx.lineWidth   = canvasLineWidth;
 
    for (var i = 0; i < clickX.length; i++) {
        ctx.beginPath();
        if(clickD[i] && i) {
            ctx.moveTo(clickX[i-1], clickY[i-1]);
        } else {
            ctx.moveTo(clickX[i]-1, clickY[i]);
        }
        ctx.lineTo(clickX[i], clickY[i]);
        ctx.closePath();
        ctx.stroke();
    }
}

$("#clear-button").click(async function () {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    clickX = new Array();
    clickY = new Array();
    clickD = new Array();
    var pred_text = document.getElementById('pred_t');
    pred_text.innerHTML = '';

    var pred_char = document.getElementById('pred_c');
    pred_char.innerHTML = '';
});

async function preprocessCanvas(image) {
    let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([28, 28])
        .mean(2)
        .expandDims(2)
        .expandDims()
        .toFloat();
    return tensor.div(255.0);
}

$("#predict-button").click(async function () {
    var imageData = ctx.getImageData(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    let tensor_ = await preprocessCanvas(imageData);
    const model_ = await tf.loadLayersModel("models/model.json");
    let predict = await model_.predict(tensor_).data();
    let results = Array.from(predict);
    let m = 0;
    let index = -1;
    for(var i = 0; i < results.length; i++){
        if(results[i] > m){
            m = results[i];
            index = i;
        }
    }


    var pred_text = document.getElementById('pred_t');
    pred_text.innerHTML = 'Predicted Character';

    var pred_char = document.getElementById('pred_c');

    if(index == 0){
        pred_char.innerHTML = 'A';
    }
    else if(index == 1){
        pred_char.innerHTML = 'B';
    }
    else if(index == 2){
        pred_char.innerHTML = 'C';
    }
    else if(index == 3){
        pred_char.innerHTML = 'D';
    }
    else if(index == 4){
        pred_char.innerHTML = 'E';
    }
    else if(index == 5){
        pred_char.innerHTML = 'F';
    }
    else if(index == 6){
        pred_char.innerHTML = 'G';
    }
    else if(index == 7){
        pred_char.innerHTML = 'H';
    }
    else if(index == 8){
        pred_char.innerHTML = 'I';
    }
    else if(index == 9){
        pred_char.innerHTML = 'J';
    }
    else if(index == 10){
        pred_char.innerHTML = 'K';
    }
    else if(index == 11){
        pred_char.innerHTML = 'L';
    }
    else if(index == 12){
        pred_char.innerHTML = 'M';
    }
    else if(index == 13){
        pred_char.innerHTML = 'N';
    }
    else if(index == 14){
        pred_char.innerHTML = 'O';
    }
    else if(index == 15){
        pred_char.innerHTML = 'P';
    }
    else if(index == 16){
        pred_char.innerHTML = 'Q';
    }
    else if(index == 17){
        pred_char.innerHTML = 'R';
    }
    else if(index == 18){
        pred_char.innerHTML = 'S';
    }
    else if(index == 19){
        pred_char.innerHTML = 'T';
    }
    else if(index == 20){
        pred_char.innerHTML = 'U';
    }
    else if(index == 21){
        pred_char.innerHTML = 'V';
    }
    else if(index == 22){
        pred_char.innerHTML = 'W';
    }
    else if(index == 23){
        pred_char.innerHTML = 'X';
    }
    else if(index == 24){
        pred_char.innerHTML = 'Y';
    }
    else{
        pred_char.innerHTML = 'Z';
    } 
});


