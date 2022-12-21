async function handleArduino() {
    // Prompt user to select any serial port.
    const port = await navigator.serial.requestPort();

    // Wait for the serial port to open.
    await port.open({ baudRate: 9600 });

    alert('Listening to Serial.port...');

    while (port.readable) {
        const reader = port.readable.getReader();
    
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    // Allow the serial port to be closed later.
                    reader.releaseLock();
                    break;
                }
                if (value) {
                    const btn = document.querySelector("#adit-button-push"); 
                    if (value[0] == 73) { //'I'
                        console.log("welcome!");
                        btn.click();
                    } else if (value[0] == 79) { //'O'
                        console.log("go home...");
                        btn.click();
                    } else {
                        console.log("???");
                    }
                }
            }
        } catch (error) {
        // TODO: Handle non-fatal read error.
        }
    }
}

handleArduino();