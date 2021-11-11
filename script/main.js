document.addEventListener('contextmenu', event => event.preventDefault());

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var r

var pen = document.getElementById('pen')
var eraser = document.getElementById('eraser')
var clrall = document.getElementById('clrall')
var save = document.getElementById('save')

var penVal = document.getElementById('penVal')
var eraserVal = document.getElementById('eraserVal')

var penOpt = document.getElementById('penOpt')
var eraserOpt = document.getElementById('eraserOpt')

var blackPen = document.getElementById('blackPen')
var bluePen = document.getElementById('bluePen')
var redPen = document.getElementById('redPen')

var control = document.getElementById('control')

var rPen = penVal.value / 10
var rEraser = eraserVal.value / 100 * 20
var penColor = 'black'

penOpt.style.left = (window.innerWidth - 280).toString() + 'px'
eraserOpt.style.left = (window.innerWidth - 390).toString() + 'px'
canvas.style.transform = 'translateY(' + ((window.innerHeight - canvas.height)/2-20).toString() + 'px)'
control.style.transform = 'translateY(' + ((window.innerHeight - 600)/2-20).toString() + 'px)'
penOpt.style.top = ((window.innerHeight - 600)/2+100).toString() + 'px'
eraserOpt.style.top = ((window.innerHeight - 600)/2+207).toString() + 'px'

function init() {
    penOpt.open = false
    eraserOpt.open = false
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = penColor
    r = rPen
    pen.style.backgroundColor = 'lightblue'
    eraser.style.backgroundColor = 'rgb(223, 223, 223)'
}

init()

var curX, curY

function draw(evt) {
    ctx.beginPath();
    ctx.lineWidth = r
    ctx.strokeStyle = ctx.fillStyle
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.moveTo(curX, curY)
    ctx.lineTo(getMousePos(canvas, evt).x, getMousePos(canvas, evt).y)
    ctx.stroke()

    curX = getMousePos(canvas, evt).x
    curY = getMousePos(canvas, evt).y
}

function drawMob(evt) {
    ctx.beginPath();
    ctx.lineWidth = r
    ctx.strokeStyle = ctx.fillStyle
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.moveTo(curX, curY)
    ctx.lineTo(getTouchPos(canvas, evt).x, getTouchPos(canvas, evt).y)
    ctx.stroke()

    curX = getTouchPos(canvas, evt).x
    curY = getTouchPos(canvas, evt).y
}

canvas.onmousedown = down
canvas.onmouseup = up
canvas.ontouchstart = downMob
canvas.ontouchend = upMob

function down(e) {
    penOpt.open = false
    eraserOpt.open = false

    curX = getMousePos(canvas, e).x
    curY = getMousePos(canvas, e).y

    ctx.beginPath()
    ctx.arc(curX, curY, r / 2, 0, 2 * Math.PI)
    ctx.fill()

    canvas.addEventListener('mousemove', draw)
}

function up(e) {
    curX = getMousePos(canvas, e).x
    curY = getMousePos(canvas, e).y
    canvas.removeEventListener('mousemove', draw)
}

function downMob(e) {
    penOpt.open = false
    eraserOpt.open = false

    curX = getTouchPos(canvas, e).x
    curY = getTouchPos(canvas, e).y

    ctx.beginPath()
    ctx.arc(curX, curY, r / 2, 0, 2 * Math.PI)
    ctx.fill()

    canvas.addEventListener('touchmove', drawMob)
}

function upMob(e) {
    curX = getTouchPos(canvas, e).x
    curY = getTouchPos(canvas, e).y
    canvas.removeEventListener('touchmove', drawMob)
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getTouchPos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    evt.preventDefault()
    return {
        x: evt.targetTouches[0].pageX - rect.left,
        y: evt.targetTouches[0].pageY - rect.top
    };
}

pen.onclick = function () {
    penOpt.open = false
    eraserOpt.open = false
    ctx.fillStyle = penColor
    r = rPen
    this.style.backgroundColor = 'lightblue'
    eraser.style.backgroundColor = 'rgb(223, 223, 223)'
}

eraser.onclick = function () {
    penOpt.open = false
    eraserOpt.open = false
    ctx.fillStyle = '#ffffff';
    r = rEraser
    this.style.backgroundColor = 'lightcoral'
    pen.style.backgroundColor = 'rgb(223, 223, 223)'
}

clrall.onclick = init

save.onclick = function () {
    penOpt.open = false
    eraserOpt.open = false

    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.

    window.location.href = image; // it will save locally
}

eraserVal.onchange = function () {
    rEraser = eraserVal.value / 100 * 20
    r = rEraser
}

penVal.onchange = function () {
    rPen = penVal.value / 10
    r = rPen
}

pen.onauxclick = function () {
    pen.click()
    penOpt.style.animation = 'fadein 1s'
    penOpt.open = true
}

eraser.ondblclick = function () {
    eraser.click()
    eraserOpt.style.animation = 'fadein 1s'
    eraserOpt.open = true
}

blackPen.onclick = function () {
    this.style.border = '3px solid #cccccc'
    bluePen.style.border = 'none'
    redPen.style.border = 'none'
    penColor = 'black'
    ctx.fillStyle = penColor
}

bluePen.onclick = function () {
    this.style.border = '3px solid #cccccc'
    blackPen.style.border = 'none'
    redPen.style.border = 'none'
    penColor = 'blue'
    ctx.fillStyle = penColor
}

redPen.onclick = function () {
    this.style.border = '3px solid #cccccc'
    bluePen.style.border = 'none'
    blackPen.style.border = 'none'
    penColor = 'red'
    ctx.fillStyle = penColor
}