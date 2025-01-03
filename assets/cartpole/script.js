import { drawCartPoleState, simulate } from "./env.js";

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

const resetBtn = document.getElementById("reset")
const angleSlider = document.getElementById("angleSlider")

function initAngleSlider(angleSlider) {
    angleSlider.min = 0
    angleSlider.max = 2*Math.PI
    angleSlider.step = 2*Math.PI/64
    const angleSliderState = {
        angleSliderAngle: 0
    }
    angleSlider.oninput = (event) => {
        angleSliderState.angleSliderAngle = event.target.value
        console.log(angleSliderState.angleSliderAngle)
    }
    return angleSliderState
}

function initKeyboardInput() {
    const keys = {
        ArrowLeft: false,
        ArrowRight: false,
        ArrowUp: false,
        ArrowDown: false
    };
    document.addEventListener('keydown', (event) => {
        if (event.key.startsWith('Arrow')) {
            event.preventDefault();
        }
        
        if (keys.hasOwnProperty(event.key)) {
            keys[event.key] = true;
        }
    });
    document.addEventListener('keyup', (event) => {
        if (keys.hasOwnProperty(event.key)) {
            keys[event.key] = false;
        }
    });
    return keys
}

const keys = initKeyboardInput()
const angleSliderState = initAngleSlider(angleSlider)

function drawScene(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.rect(0, canvas.height*17/32, canvas.width, 1.5)
    ctx.rect(0, canvas.height*3/4, canvas.width, 1.5)
    ctx.fill()
    ctx.restore()
}

function init() {
    // initializing state

    const animFrameReqId = requestAnimationFrame(() => draw())

    // UI controls setup
    resetBtn.onclick = (e) => {
        cancelAnimationFrame(animFrameReqId)
        init()
    }
}


function update() {
    let forceSign = 0
    
    if(keys.ArrowLeft) {
        forceSign = -1
    }
    if(keys.ArrowRight) {
        forceSign = 1
    }

    simulate(forceSign)
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // setup
    drawScene(ctx)

    drawCartPoleState(ctx)

    update()

    requestAnimationFrame(() => draw())
}

init()