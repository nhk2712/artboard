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
var artboard = document.getElementById('artboard')

var saveCanv = document.getElementById('saveCanv')
var saveCtx = saveCanv.getContext('2d')
var saveCanv2 = document.getElementById('saveCanv2')
var saveCtx2 = saveCanv2.getContext('2d')
var saveCanv3 = document.getElementById('saveCanv3')
var saveCtx3 = saveCanv3.getContext('2d')
var saveCanv4 = document.getElementById('saveCanv4')
var saveCtx4 = saveCanv4.getContext('2d')
var saveCanv5 = document.getElementById('saveCanv5')
var saveCtx5 = saveCanv5.getContext('2d')

var nextCanv = document.getElementById('nextCanv')
var nextCtx = nextCanv.getContext('2d')
var nextCanv2 = document.getElementById('nextCanv2')
var nextCtx2 = nextCanv2.getContext('2d')
var nextCanv3 = document.getElementById('nextCanv3')
var nextCtx3 = nextCanv3.getContext('2d')
var nextCanv4 = document.getElementById('nextCanv4')
var nextCtx4 = nextCanv4.getContext('2d')
var nextCanv5 = document.getElementById('nextCanv5')
var nextCtx5 = nextCanv5.getContext('2d')

var undo = document.getElementById('undo')
var redo = document.getElementById('redo')

var redoTime = 0
redo.style = "cursor:not-allowed;transform: none;background-color: #bbbbbb;"

var undoTime = 0
undo.style = "cursor:not-allowed;transform: none;background-color: #bbbbbb;"

var rPen = penVal.value / 10
var rEraser = eraserVal.value / 100 * 20
var penColor = 'black'

window.onresize = setSize
window.onload = setSize

function setSize() {
    penOpt.style.left = (window.innerWidth - 280).toString() + 'px'
    eraserOpt.style.left = (window.innerWidth - 390).toString() + 'px'
    artboard.style.transform = 'translateY(' + ((window.innerHeight - canvas.height) / 2 - 20).toString() + 'px)'
    control.style.transform = 'translateY(' + ((window.innerHeight - 600) / 2 - 20).toString() + 'px)'
    penOpt.style.top = ((window.innerHeight - 600) / 2 + 100).toString() + 'px'
    eraserOpt.style.top = ((window.innerHeight - 600) / 2 + 207).toString() + 'px'
}

var bgcolor = 'white'

function init() {
    penOpt.open = false
    eraserOpt.open = false
    ctx.fillStyle = bgcolor
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

artboard.onmousedown = down
artboard.onmouseup = up
artboard.ontouchstart = downMob
artboard.ontouchend = upMob

function down(e) {
    undoTime++
    if (undoTime > 5) undoTime = 5
    if (undoTime > 0) undo.style="unset"
    redoTime=0
    redo.style = "cursor:not-allowed;transform: none;background-color: #bbbbbb;"

    saveCtx5.drawImage(saveCanv4, 0, 0)
    saveCtx4.drawImage(saveCanv3, 0, 0)
    saveCtx3.drawImage(saveCanv2, 0, 0)
    saveCtx2.drawImage(saveCanv, 0, 0)
    saveCtx.drawImage(canvas, 0, 0)

    penOpt.open = false
    eraserOpt.open = false

    curX = getMousePos(canvas, e).x
    curY = getMousePos(canvas, e).y

    ctx.beginPath()
    ctx.arc(curX, curY, r / 2, 0, 2 * Math.PI)
    ctx.fill()

    artboard.addEventListener('mousemove', draw)
}

function up(e) {
    curX = getMousePos(canvas, e).x
    curY = getMousePos(canvas, e).y
    artboard.removeEventListener('mousemove', draw)
}

function downMob(e) {
    saveCtx5.drawImage(saveCanv4, 0, 0)
    saveCtx4.drawImage(saveCanv3, 0, 0)
    saveCtx3.drawImage(saveCanv2, 0, 0)
    saveCtx2.drawImage(saveCanv, 0, 0)
    saveCtx.drawImage(canvas, 0, 0)

    undoTime++
    if (undoTime > 5) undoTime = 5
    if (undoTime > 0) undo.style="unset"
    redoTime =0
    redo.style = "cursor:not-allowed;transform: none;background-color: #bbbbbb;"

    penOpt.open = false
    eraserOpt.open = false

    curX = getTouchPos(canvas, e).x
    curY = getTouchPos(canvas, e).y

    ctx.beginPath()
    ctx.arc(curX, curY, r / 2, 0, 2 * Math.PI)
    ctx.fill()

    artboard.addEventListener('touchmove', drawMob)
}

function upMob(e) {
    curX = getTouchPos(canvas, e).x
    curY = getTouchPos(canvas, e).y
    artboard.removeEventListener('touchmove', drawMob)
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
    ctx.fillStyle = bgcolor;
    r = rEraser
    this.style.backgroundColor = 'lightcoral'
    pen.style.backgroundColor = 'rgb(223, 223, 223)'
}

clrall.onclick = function () {
    saveCtx5.drawImage(saveCanv4, 0, 0)
    saveCtx4.drawImage(saveCanv3, 0, 0)
    saveCtx3.drawImage(saveCanv2, 0, 0)
    saveCtx2.drawImage(saveCanv, 0, 0)
    saveCtx.drawImage(canvas, 0, 0)
    init()
}

save.onclick = function () {
    penOpt.open = false
    eraserOpt.open = false

    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.

    var tmpLink = document.createElement("a")
    tmpLink.download = "download.png"
    tmpLink.href = image
    tmpLink.style.display = "none"
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
}

eraserVal.onchange = function () {
    rEraser = eraserVal.value / 100 * 20
    r = rEraser
}

penVal.onchange = function () {
    rPen = penVal.value / 10
    r = rPen
}

pen.ontouchend = function () {
    pen.click()
    penOpt.style.animation = 'fadein 1s'
    penOpt.open = true
}

pen.onauxclick = pen.ontouchend

eraser.ontouchend = function () {
    eraser.click()
    eraserOpt.style.animation = 'fadein 1s'
    eraserOpt.open = true
}

eraser.onauxclick = eraser.ontouchend

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

var isCtrl = false

document.onkeydown = function (e) {
    if (e.key == 'Control') isCtrl = true
    else if (e.key == 'Shift') isShift = true
    else if (e.key == 'z') {
        if (isCtrl) undo.click()
    }
    else if (e.key == 'y') {
        if (isCtrl) redo.click()
    }
    else if (e.key == 's') {
        e.preventDefault()
        if (isCtrl) save.click()
    }
    else if (e.key == 'F12') e.preventDefault()
}

document.onkeyup = function (e) {
    if (e.key == 'Control') {
        isCtrl = false
    }
}

undo.onclick = function () {
    if (undoTime > 0) {
        nextCtx5.drawImage(nextCanv4, 0, 0)
        nextCtx4.drawImage(nextCanv3, 0, 0)
        nextCtx3.drawImage(nextCanv2, 0, 0)
        nextCtx2.drawImage(nextCanv, 0, 0)
        nextCtx.drawImage(canvas, 0, 0)
        ctx.drawImage(saveCanv, 0, 0)
        saveCtx.drawImage(saveCanv2, 0, 0)
        saveCtx2.drawImage(saveCanv3, 0, 0)
        saveCtx3.drawImage(saveCanv4, 0, 0)
        saveCtx4.drawImage(saveCanv5, 0, 0)

        redoTime++
        if (redoTime > 0) redo.style = "unset"
    }

    undoTime--
    if (undoTime < 1) undo.style = "cursor:not-allowed;transform: none;background-color: #bbbbbb;"
}

redo.onclick = function () {
    if (redoTime > 0) {
        saveCtx5.drawImage(saveCanv4, 0, 0)
        saveCtx4.drawImage(saveCanv3, 0, 0)
        saveCtx3.drawImage(saveCanv2, 0, 0)
        saveCtx2.drawImage(saveCanv, 0, 0)
        saveCtx.drawImage(canvas, 0, 0)
        ctx.drawImage(nextCanv, 0, 0)
        nextCtx.drawImage(nextCanv2, 0, 0)
        nextCtx2.drawImage(nextCanv3, 0, 0)
        nextCtx3.drawImage(nextCanv4, 0, 0)
        nextCtx4.drawImage(nextCanv5, 0, 0)

        undoTime++
        if (undoTime > 5) undoTime = 5
        if (undoTime > 0) undo.style="unset"
    }

    redoTime--
    if (redoTime < 1) redo.style = "cursor:not-allowed;transform: none;background-color: #bbbbbb;"
}