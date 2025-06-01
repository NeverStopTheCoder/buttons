//%block="Button"
//%color=#37A8DB
//%icon=""
//% weight=85
namespace UIButton {
    let selectedButton: Sprite = null;
    let uibuttonBases: Sprite[] = [];
    let uibuttonKnobs: Sprite[] = [];
    let uibuttonColor: number[] = [];
    let c = false
    let uibuttonClick: boolean[] = []; // Store state for each toggle
    //% block="create button of color $color and egde color $linecolor"
    //% blockSetVariable=Button
    //% group="Create"
    //% color.shadow="colorindexpicker"
    //% linecolor.shadow="colorindexpicker"
    export function createSlider3(color: number, linecolor: number): Sprite {
        let buttonIndex = uibuttonBases.length;
        // Create the bar for the slider (default: horizontal)
        let baseImage = image.create(15, 15);
        baseImage.fill(0)
        baseImage.drawCircle(7.5,7.5,5,color)
        baseImage.fillCircle(7.5, 7.5, 5, color)
        let buttonBase = sprites.create(baseImage, SpriteKind.Player);
        uibuttonBases.push(buttonBase);
        uibuttonColor.push(linecolor)

        // Position the knob at the leftmost position of the bar
        buttonBase.setPosition(80, 60); // Default position

        // make the square
        let knobImage = image.create(15, 15)
        knobImage.drawCircle(7.5,7.5,6,linecolor)
        let toggleKnob = sprites.create(knobImage, SpriteKind.Player)
       uibuttonKnobs.push(toggleKnob)

        toggleKnob.setPosition(buttonBase.x, buttonBase.y)

        // make the text
        return toggleKnob, buttonBase;
    }
    //% block="set $toggle position to X $x Y $y"
    //% group="Functions"
    //% toggle.shadow=variables_get
    export function setSliderPosition3(toggle: Sprite, x: number, y: number): void {
        let index = uibuttonBases.indexOf(toggle);
        if (index != -1) {
            let toggleBase = uibuttonBases[index];
            let toggleKnob = uibuttonKnobs[index]

            toggleBase.setPosition(x, y);
            toggleKnob.setPosition(toggleBase.x, toggleBase.y)


        }
    }
    //%button.shadow=variables_get
    //%block
    export function control(button: Sprite): void {
        selectedButton = button
    }

    controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
        if (selectedButton) {
            let index = uibuttonBases.indexOf(selectedButton);
            if (index != -1) {
                let toggleKnob = uibuttonKnobs[index];
                let toggleBase = uibuttonBases[index];
                let buttoncolor = uibuttonColor[index]
                if (uibuttonClick[index] == undefined) {
                    uibuttonClick[index] = false; // Default to false
                }

                if (uibuttonClick[index] == false) {
                    toggleKnob.image.drawCircle(7.5, 7.5, 6, 0)
                    pause(100)
                    toggleKnob.image.drawCircle(7.5, 7.5, 6, uibuttonColor[index])
                    uibuttonClick[index] = true;
                    pause(20)
                    uibuttonClick[index] = false
                }
            }
        }
    });


    //%block="is $button clicked"
    //%button.shadow=variables_get
    //%boolea.shadow="toggleOnOff"
    export function getToggleValue(button: Sprite,): boolean {
        let index = uibuttonBases.indexOf(button);
        if (index != -1) {
            let toggleKnob = uibuttonKnobs[index];
            if (uibuttonClick[index] == undefined) {
               
                return uibuttonClick[index]
            } else {
                return uibuttonClick[index]
            }

            if (uibuttonClick[index] == false) {
                uibuttonClick[index] = true;
                return uibuttonClick[index]
               
            }
        }
        
        return undefined;
    }
    //Cycling through the sliders
    //%block="Cycle through Buttons"
    export function cycleToNextSlider(): void {
     c = true
        if (uibuttonBases.length = 0) return; // No sliders exist
        // If no slider is selected, start from the first one
        if (!selectedButton) {
            selectedButton = uibuttonBases[0];
        } else {

            // Get the current index and cycle to the next slider
            let index = uibuttonBases.indexOf(selectedButton);
            if (index != -1) {
                index++
                if (index >= uibuttonBases.length) {
                    index = 0; // If we reach the end, cycle back to the first one
                }
                selectedButton = uibuttonBases[index];
            }
        }
    }
    controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
        if (selectedButton !== null && c == true) {
            cycleToNextSlider(); // Trigger slider cycl
        }
    })
    //%block="Destroy $button"
    //%button.shadow=variables_get
    export function destroy(button: Sprite): void {
         let index = uibuttonBases.indexOf(button);
        if (index != -1) {
            let buttonBase = uibuttonBases[index];
            buttonBase.destroy();
            button.destroy();
              let buttonKnob = uibuttonKnobs[index];
            buttonKnob.destroy();
            uibuttonBases.splice(index,1)
            uibuttonKnobs.splice(index,1)
        }
    }
}