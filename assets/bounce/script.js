const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

const FPS = 60

const resetBtn = document.getElementById("reset")

class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    addv(other) {
        return new Vector2(this.x+other.x, this.y+other.y)
    }
    scale(factor) {
        return new Vector2(this.x*factor, this.y*factor)
    }
}

function drawCircle(ctx, posv, radius) {
    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.arc(posv.x, posv.y, radius, 0, 2*Math.PI)
    ctx.fill()
}

function drawCircleState(ctx, circleState) {
    drawCircle(ctx, circleState.pos, circleState.radius)
}

function drawGround(ctx, groundState) {
    ctx.fillStyle = 'blue'
    ctx.fillRect(groundState.pos.x, groundState.pos.y, groundState.w, groundState.h)
}

function updateCircleState(circleState) {
    circleState.pos = circleState.pos.addv(circleState.v.scale(1/60))
    circleState.v = circleState.v.addv(circleState.a.scale(1/60))
}

function init() {
    // initializing state
    const gameState = {
        circleState: {
            pos: new Vector2(45, 45),
            v: new Vector2(50, 0),
            a: new Vector2(0, 600),
            restitution_coef: 0.7,
            radius: 40,
        },
        groundState: {
            pos: new Vector2(0, canvas.height-10),
            w: canvas.width,
            h: 10
        }
    }

    const animFrameReqId = requestAnimationFrame(() => draw(gameState))
    resetBtn.onclick = (e) => {
        cancelAnimationFrame(animFrameReqId)
        init()
    }
}

function update(gameState) {
    const { circleState, groundState } = gameState

    updateCircleState(circleState)

    circleGroundCollision = circleState.pos.y+circleState.radius > groundState.pos.y

    // bounce
    if (circleGroundCollision) {
        circleState.pos.y = groundState.pos.y-circleState.radius
        circleState.v.y = -circleState.restitution_coef*circleState.v.y
        console.log('circle ground collision')
    }

    // settle
    if (circleGroundCollision && Math.abs(circleState.v.y) < 40) {
        circleState.a.y = 0
        circleState.v.y = 0
        console.log('circle settle')
    }
}


function draw(gameState) {
    const { circleState, groundState } = gameState

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // setup
    drawCircleState(ctx, circleState)
    drawGround(ctx, groundState)

    // update
    update(gameState)

    requestAnimationFrame(() => draw(gameState))
}

init()