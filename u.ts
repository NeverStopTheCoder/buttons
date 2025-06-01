//%block="Button"
//%color=#37A8DB
//%icon=""
namespace button {
    let selectedButton: Sprite = null;
    let buttonBases: Sprite[] = [];
    let buttonKnobs: Sprite[] = [];
    let buttonColor: number[] = [];
    let c = false
    let buttonClick: boolean[] = []; // Store state for each toggle
    //% block="create button of color $color and egde color $linecolor"
    //% blockSetVariable=myButton
    //% group="Create"
    //% color.shadow="colorindexpicker"
    //% linecolor.shadow="colorindexpicker"
    export function createSlider3(color: number, linecolor: number): Sprite {
        let buttonIndex = buttonBases.length;
        // Create the bar for the slider (default: horizontal)
        let baseImage = image.create(15, 15);
        baseImage.fill(0)
        baseImage.drawCircle(7.5,7.5,5,color)
        baseImage.fillCircle(7.5, 7.5, 5, color)
        let buttonBase = sprites.create(baseImage, SpriteKind.Player);
        buttonBases.push(buttonBase);
        buttonColor.push(linecolor)

        // Position the knob at the leftmost position of the bar
        buttonBase.setPosition(80, 60); // Default position

        // make the square
        let knobImage = image.create(15, 15)
        knobImage.drawCircle(7.5,7.5,6,linecolor)
        let toggleKnob = sprites.create(knobImage, SpriteKind.Player)
        buttonKnobs.push(toggleKnob)

        toggleKnob.setPosition(buttonBase.x, buttonBase.y)

        // make the text
        return toggleKnob, buttonBase;
    }
    //% block="set $toggle position to X $x Y $y"
    //% group="Functions"
    //% toggle.shadow=variables_get
    export function setSliderPosition3(toggle: Sprite, x: number, y: number): void {
        let index = buttonBases.indexOf(toggle);
        if (index != -1) {
            let toggleBase = buttonBases[index];
            let toggleKnob = buttonKnobs[index]

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
            let index = buttonBases.indexOf(selectedButton);
            if (index != -1) {
                let toggleKnob = buttonKnobs[index];
                let toggleBase = buttonBases[index];
                let buttoncolor = buttonColor[index]
                if (buttonClick[index] == undefined) {
                    buttonClick[index] = false; // Default to false
                }

                if (buttonClick[index] == false) {
                    toggleKnob.image.drawCircle(7.5, 7.5, 6, 0)
                    pause(100)
                    toggleKnob.image.drawCircle(7.5, 7.5, 6, buttonColor[index])
                    buttonClick[index] = true;
                    pause(20)
                    buttonClick[index] = false
                }
            }
        }
    });


    //%block="is $button clicked"
    //%button.shadow=variables_get
    //%boolea.shadow="toggleOnOff"
    export function getToggleValue(button: Sprite,): boolean {
        let index = buttonBases.indexOf(button);
        if (index != -1) {
            let toggleKnob = buttonKnobs[index];
            if (buttonClick[index] == undefined) {
               
                return buttonClick[index]
            } else {
                return buttonClick[index]
            }

            if (buttonClick[index] == false) {
                buttonClick[index] = true;
                return buttonClick[index]
               
            }
        }
        
        return undefined;
    }
    //Cycling through the sliders
    //%block="Cycle through Buttons"
    export function cycleToNextSlider(): void {
     c = true
        if (buttonBases.length = 0) return; // No sliders exist
        // If no slider is selected, start from the first one
        if (!selectedButton) {
            selectedButton = buttonBases[0];
        } else {

            // Get the current index and cycle to the next slider
            let index = buttonBases.indexOf(selectedButton);
            if (index != -1) {
                index++
                if (index >= buttonBases.length) {
                    index = 0; // If we reach the end, cycle back to the first one
                }
                selectedButton = buttonBases[index];
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
         let index = buttonBases.indexOf(button);
        if (index != -1) {
            let buttonBase = buttonBases[index];
            buttonBase.destroy();
            button.destroy();
              let buttonKnob = buttonKnobs[index];
            buttonKnob.destroy();
            buttonBases.splice(index,1)
            buttonKnobs.splice(index,1)
        }
    }
}