radio.onReceivedNumber(function (receivedNumber) {
    if (1 == receivedNumber) {
        rotate = 0
        speed = 2
        strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
    } else if (2 == receivedNumber) {
        rotate = 0
        speed = 2
        strip.showColor(neopixel.colors(NeoPixelColors.Orange))
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Entertainer), music.PlaybackMode.InBackground)
    } else {
    	
    }
})
input.onButtonPressed(Button.A, function () {
    if (0 == rotate) {
        strip.rotate(1)
        strip.show()
    } else {
        speed = speed - 1
    }
})
input.onButtonPressed(Button.AB, function () {
    speed = Math.map(input.rotation(Rotation.Roll), -90, 90, -20, 20)
})
input.onButtonPressed(Button.B, function () {
    if (0 == rotate) {
        strip.setPixelColor(4, colors_array._pickRandom())
        strip.show()
    } else {
        speed = speed + 1
    }
})
input.onGesture(Gesture.Shake, function () {
    strip.showColor(neopixel.colors(NeoPixelColors.Black))
    rotate = 0
    speed = 2
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (0 == rotate) {
        rotate = 1
    } else {
        rotate = 0
    }
    basic.pause(200)
})
let colors_array: number[] = []
let speed = 0
let rotate = 0
let strip: neopixel.Strip = null
radio.setGroup(1)
strip = neopixel.create(DigitalPin.P0, 11, NeoPixelMode.RGB)
strip.setBrightness(50)
rotate = 0
speed = 2
colors_array = [
neopixel.colors(NeoPixelColors.Red),
neopixel.colors(NeoPixelColors.Orange),
neopixel.colors(NeoPixelColors.Yellow),
neopixel.colors(NeoPixelColors.Green),
neopixel.colors(NeoPixelColors.Blue),
neopixel.colors(NeoPixelColors.Indigo),
neopixel.colors(NeoPixelColors.Violet),
neopixel.colors(NeoPixelColors.Purple),
neopixel.colors(NeoPixelColors.White),
neopixel.colors(NeoPixelColors.Black)
]
basic.forever(function () {
    if (1 == rotate) {
        if (speed > 0) {
            strip.rotate(1)
        } else {
            strip.rotate(-1)
        }
        strip.show()
        basic.pause(Math.abs(speed) * 25)
    }
})
basic.forever(function () {
    basic.showString("Apalucha 2025")
})
