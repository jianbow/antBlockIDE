// This javascript file includes all the necessary javascript functions to deal with the Arduino side of the antBlockIDE.

// Electron doesn't support alert -- using alert will stop all other threads. This means that Blockly won't work after alert.
// Instead use dialog.
const {remote} = require('electron')
const dialog   = remote.dialog

// Spinner.
function changeSpinner(status) {
    if (status == false) {
        document.getElementById("uploadMessage").innerHTML = "";
    }
    else {
        document.getElementById("uploadMessage").innerHTML = "<li class='nav-item'><div class='spinner-border text-light mr-auto' role='status'><span class='sr-only'>Loading...</span></div></li><h6 class='mt-1 mx-2'>Uploading...</h6>";
    }

}

// Converts Blockly to text.
function save() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);
}

// Load saved file.
function loadFile() {
    document.getElementById('loadFile').click();
}

// This is testing/demo.
function loadXML(fileEvent) {
    alert('asdfasdf');
    var selectedFile = fileEvent.target.files[0];

    // However, if you want to do something else like parse into a dataURL to create a virtual URL or upload it to the server, you need to use the FileReader as shown below.
    var reader = new FileReader();
    reader.onload = function (event) {
        var fileContent = event.target.result;
        alert('we in');
    }
    alert(reader.readAsText(selectedFile));
}

// Runs on start, waits for file to be loaded.
window.onload = function () {
    var fileInput = document.getElementById('loadFile');

    // Look for a change in input.
    fileInput.addEventListener('change', function (e) {
        var file = fileInput.files[0];
        var textType = /text.*/;
        // Check if the file is the right type.
        if (file.type.match(textType)) {
            var reader = new FileReader();
            // Move the text into XML and into Blockly.
			
            reader.onload = function (e) {
				const response = dialog.showMessageBox(null, {message: reader.result});
                var xml = Blockly.Xml.textToDom(reader.result);
                Blockly.Xml.domToWorkspace(xml, workspace);
            }
			
            reader.readAsText(file);
        } else {
            //ESCAPE CODE BABYYY
            const response = dialog.showMessageBox(null, {message: 'Uh oh. We can\'t load that file'});
        }
    });
}

// Run comTest, which finds all devices and returns their COM Port. Puts all ports into JSON, reads JSON, and injects into div.
function checkDevices() {
    // Use child_process.spawn method from child_process module and assign it to variable spawn.
    //var spawn = require("child_process").spawn;

    // Parameters passed in spawn -
    // 1. type_of_script
    // 2. list containing Path of the script
    //    and arguments for the script

    // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
    // so, first name = Mike and last name = Will

    //CALL PYTHON FILE, PYTHON WRITES TO JSON
    //   var process = spawn('python', ["./arduino-manager/comTest.py"]);

    const { execFile } = require('child_process');

    const child = execFile('python', [process.env['APP_PATH'] + "\\arduino-manager\\comTest.py", process.env['APP_PATH']], () => {
        const fs = require('fs');
        let rawdata = fs.readFileSync(process.env['APP_PATH'] + '\\arduino-manager\\arduinoSettings.json');
        let com = JSON.parse(rawdata);

        if (com.port != 0 && com.port != null) {
            document.getElementById("port").innerHTML = "<i class='fas fa-file-export mr-1'></i> " + com.port;
			const response = dialog.showMessageBox(null, {message: 'Board detected at ' + com.port});
        }
        else {
			const response = dialog.showMessageBox(null, {message: 'No Board Detected'});
        }
    });
}

function saveFile() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);
    var blob = new Blob([xml_text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "untitled");
}



