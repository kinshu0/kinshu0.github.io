// my solution to cart-pole equations was super unstable, but learned a lot, so i'm using simulation from https://jeffjar.me/cartpole.html

// Constants of simulation
const g = 10; // strength of gravity
const l = 200; // length of pole
const Mm = 1; // Ratio of cart mass to pole mass
const strength = 15; // How strongly user input accelerates cart
const friction = 0.15; // Damping constant of left-right motion
const dt = 1e-3; // Time step
const stepsPerFrame = 50; // Number of steps before drawing a frame
const framesPerSec = 100; // Number of frames to draw each second
const stepsPerSec = stepsPerFrame * framesPerSec;
const LEFT_PUSH = -1;
const RIGHT_PUSH = 1;
const NO_PUSH = 0;

// Current state
let running = false; // true if simulation is currently running, false otherwise
let automaticMode = false; // true if Automatic Mode radio button is selected
let mouseDown = false; // true if user's mouse is pressed down on arrow
let throttle = NO_PUSH; // one of LEFT_PUSH, RIGHT_PUSH, or NO_PUSH
let x = 400 // canvas.width / 2; // x-position of cart
let xDot = 0; // time derivative of ^
let theta = (Math.random() - 0.5) / 5; // angle of the pole, measuring cw from vertical
let thetaDot = 0; // time derivative of ^
let t = 0; // timesteps taken
let needToInitialize = true; // Whether ^^^^^ need to be initialized next frame
let obj = {}; // an object for user to keep track of things if they so desire
let highScore = 0; // Current high score, in seconds alive.

// visual elements
const cartWidth = 150
const cartHeight = 100

function drawCart(ctx, x, y, width, height) {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.rect(x-width/2, y-height/2, width, height)
    ctx.fill()
    ctx.restore()
}

function drawPole(ctx, x, y, width, height, angle) {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(-angle)
    ctx.fillStyle = 'sandybrown'
    ctx.beginPath()
    ctx.rect(-width/2, -height+width/2, width, height)
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle = 'royalblue'
    ctx.arc(0, 0, width/2, 0, 2*Math.PI)
    ctx.fill()
    ctx.restore()
}

function step(forceSign) {
    // Evolve forward in time for `dt` seconds, and update the state space
    // parameters `x`, `xDot`, `theta`, and `thetaDot`.
    let cos = Math.cos(theta);
    let sin = Math.sin(theta);
    let F = forceSign * strength;
    let det = (l*cos**2 - l*(1+Mm));
    let xDotDot = (-l*F + l*l*sin*(thetaDot**2) - g*l*sin*cos) / det;
    let thetaDotDot = (-cos*F + l*cos*sin*(thetaDot**2) - g*sin*(1+Mm)) / det;
    
    xDotDot -= friction * xDot;

    x += xDot * dt;
    theta += thetaDot * dt;
    xDot += xDotDot * dt;
    thetaDot += thetaDotDot * dt;
    t += 1;
}

function simulate(forceSign) {
    for (let i = 0; i < stepsPerFrame; i++) {
        step(forceSign)
    }
}

function drawCartPoleState(ctx) {
    drawCart(ctx, x, 300, cartWidth, cartHeight)
    drawPole(ctx, x, 300, l / 20, l, theta)
}

export {
    drawCartPoleState,
    simulate
}