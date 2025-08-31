radio.onReceivedNumber(function (receivedNumber) {
    if (0 == modes_array.indexOf(mode)) {
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
        }
    } else if (1 == modes_array.indexOf(mode)) {
        connection_watchdog_counter = 5
        delta = Math.map(Math.abs(radio.receivedPacket(RadioPacketProperty.SignalStrength)), 55, 95, 25, 500)
        if (radio.receivedPacket(RadioPacketProperty.SignalStrength) < -90) {
            strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        } else if (radio.receivedPacket(RadioPacketProperty.SignalStrength) < -90 && radio.receivedPacket(RadioPacketProperty.SignalStrength) < -80) {
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        } else if (radio.receivedPacket(RadioPacketProperty.SignalStrength) < -80 && radio.receivedPacket(RadioPacketProperty.SignalStrength) < -75) {
            strip.showColor(neopixel.colors(NeoPixelColors.Orange))
        } else if (radio.receivedPacket(RadioPacketProperty.SignalStrength) < -75 && radio.receivedPacket(RadioPacketProperty.SignalStrength) < -60) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
        } else if (radio.receivedPacket(RadioPacketProperty.SignalStrength) < -60) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
        }
    }
})
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    if (input.isGesture(Gesture.ScreenDown)) {
        mode = modes_array[(modes_array.indexOf(mode) + 1) % modes_array.length]
        music.play(music.tonePlayable(tones_array[modes_array.indexOf(mode)], music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        if (0 == modes_array.indexOf(mode)) {
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
            rotate = 0
            speed = 2
        } else if (1 == modes_array.indexOf(mode)) {
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
            delta = 1000
        }
        led.stopAnimation()
        basic.showString("" + (mode))
    }
})
input.onButtonPressed(Button.A, function () {
    if (0 == modes_array.indexOf(mode)) {
        if (0 == rotate) {
            strip.rotate(1)
            strip.show()
        } else {
            speed = speed - 1
        }
    } else if (1 == modes_array.indexOf(mode)) {
    	
    }
})
input.onGesture(Gesture.SixG, function () {
    if (0 == modes_array.indexOf(mode)) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        rotate = 0
        speed = 2
    } else if (1 == modes_array.indexOf(mode)) {
    	
    }
})
input.onButtonPressed(Button.B, function () {
    if (0 == modes_array.indexOf(mode)) {
        if (0 == rotate) {
            strip.setPixelColor(4, colors_array._pickRandom())
            strip.show()
        } else {
            speed = speed + 1
        }
    } else if (1 == modes_array.indexOf(mode)) {
    	
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (0 == modes_array.indexOf(mode)) {
        if (0 == rotate) {
            rotate = 1
        } else {
            rotate = 0
        }
        basic.pause(200)
    } else if (1 == modes_array.indexOf(mode)) {
    	
    }
})
let connection_watchdog_counter = 0
let delta = 0
let mode = ""
let tones_array: number[] = []
let modes_array: string[] = []
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
modes_array = ["lightshow", "treasure_hunt"]
tones_array = [262, 294]
mode = modes_array[0]
delta = 1000
connection_watchdog_counter = 5
basic.forever(function () {
    if (0 == modes_array.indexOf(mode)) {
        basic.showString("Apalucha 2025")
    } else if (1 == modes_array.indexOf(mode)) {
    	
    }
})
basic.forever(function () {
    if (0 == modes_array.indexOf(mode)) {
        if (1 == rotate) {
            if (speed > 0) {
                strip.rotate(1)
            } else {
                strip.rotate(-1)
            }
            strip.show()
            basic.pause(Math.abs(speed) * 25)
        }
    } else if (1 == modes_array.indexOf(mode)) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        basic.pause(delta)
        if (connection_watchdog_counter > 0) {
            connection_watchdog_counter = connection_watchdog_counter - 1
        } else if (connection_watchdog_counter == 0) {
            strip.showColor(neopixel.colors(NeoPixelColors.Black))
            delta = 1000
        }
    }
})
