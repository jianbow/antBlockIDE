

// This javascript file includes all the necessary javascript functions to deal with the Arduino side of the antBlockIDE


//MAKE GENERATED CODE A PARAMETER
function upload(inputCode) {
    //const output = execSync('ls', { encoding: 'utf-8' });
    //console.log('Output was:\n', output);
    alert("Ready to upload to Arduino.");
    document.getElementById("message").innerHTML = "Uploading...";

    changeSpinner(true);


    var request = new XMLHttpRequest();
    var url = "http://127.0.0.1:8080/";
    var method = "POST";
    var async = true;

    request.onreadystatechange = function () {
        
        var status = parseInt(request.status); // HTTP response status, e.g., 200 for "200 OK"
        var errorInfo = null;
        switch (status) {
            case 200:
                break;
            case 0:
                errorInfo = "code 0\n\nCould not connect to server at " + url + ".  Is the local web server running?";
                break;
            case 400:
                errorInfo = "code 400\n\nBuild failed - probably due to invalid source code.  Make sure that there are no missing connections in the blocks.";
                break;
            case 500:
                errorInfo = "code 500\n\nUpload failed.  Is the Arduino connected to USB port?";
                break;
            case 501:
                errorInfo = "code 501\n\nUpload failed.  Is 'ino' installed and in your path?  This only works on Mac OS X and Linux at this time.";
                break;
            default:
                errorInfo = "code " + status + "\n\nUnknown error.";
                break;
        };

        alertStatus(status, errorInfo);
    };






    request.open(method, url, async);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    //currently, this includes a default blink wired to pin 8. replace this with code generated from blockly generator. 
    //MAKE THIS EQUAL TO THE PASSED IN PARAMETER
    var code = "void setup() {pinMode(8,OUTPUT); digitalWrite(8,HIGH);} void loop() {} ";
    request.send(inputCode);
	//alert("done");
}


function alertStatus(status, errorInfo) {
    if (status == 200) {
        alert("Program Uploaded");
        document.getElementById("message").innerHTML = "Program Uploaded";
        changeSpinner(false);
    } else if (status!= 0) {
        alert("Error uploading program: " + errorInfo);
        document.getElementById("message").innerHTML = "<div id='errorMessage'>Error uploading program: </div>" + errorInfo;
        changeSpinner(false);
    }
}

function changeSpinner(status) {
    if (status == false) {
        document.getElementById("uploadMessage").innerHTML = "";
    }
    else {
        document.getElementById("uploadMessage").innerHTML = "<li class='nav-item'><div class='spinner-border text-light mr-auto' role='status'><span class='sr-only'>Loading...</span></div></li><h6 class='mt-1 mx-2'>Uploading...</h6>";
    }

}

/*function heck() {
    alert(document.getElementById("port").innerHTML = "<i class='fas fa-file-export mr-1'></i>OOGA");
}
*/
function save() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);
}

function loadFile() {
    document.getElementById('loadFile').click();
    

}

function loadXML(fileEvent) {

    alert('asdfasdf');

    var selectedFile = fileEvent.target.files[0];

    // However, if you want to do something else like parse into a dataURL to create a virtual URL or upload it to the server, you need to use the FileReader as shown below

    var reader = new FileReader();
    reader.onload = function (event) {
        var fileContent = event.target.result;
        alert('we in');
    }
    alert(reader.readAsText(selectedFile));


}


window.onload = function () {
    var fileInput = document.getElementById('loadFile');
    //var fileDisplayArea = document.getElementById('fileDisplayArea');

    //WE LOOK FOR CHANGE IN INPUT
    fileInput.addEventListener('change', function (e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            //ANOTHER IMPORTED JAVASCRIPT LIBRARY
            var reader = new FileReader();
            //THEN, WE MOVE THE TEXT INTO XML INTO THE WORKSPACE
            reader.onload = function (e) {
                alert(reader.result);
                var xml = Blockly.Xml.textToDom(reader.result);
                Blockly.Xml.domToWorkspace(xml, workspace);
                //fileDisplayArea.innerText = reader.result;
            }

            reader.readAsText(file);
        } else {
            //ESCAPE CODE BABYYY
            alert('Uh oh. We can\'t load that file');
            //fileDisplayArea.innerText = "File not supported!"
        }
    });


}

//THIS FUNCTION RUNS COMTEST, WHICH FINDS ALL DEVICES PLUGGED INTO THE COMPUTER AND GIVES THEIR COM PORT
//SHOULD FIND ALL PORTS, PUT INTO JSON, READ JSON, INJECT INTO DIV


function checkDevices() {

    // Use child_process.spawn method from
    // child_process module and assign it
    // to variable spawn
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

    const child = execFile('python', ["./arduino-manager/comTest.py"], () => {
        const fs = require('fs');
        let rawdata = fs.readFileSync('./arduino-manager/arduinoSettings.json');
        let com = JSON.parse(rawdata);

        if (com.port != 0 && com.port != null) {
            document.getElementById("port").innerHTML = "<i class='fas fa-file-export mr-1'></i> " + com.port;
            alert('Board Detected at ' + com.port);
        }
        else {
            alert('No Board Detected');
        }
    });
}

function saveFile() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);
    var blob = new Blob([xml_text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "untitled");
}

function testSTD() {
    const execFile = require('child_process').execFile;
    const child = execFile('python', ['./arduino-manager/arduinoUploader.py', 'void setup(){} void loop(){}'], (error, stdout, stderr) => {
        document.getElementById('message').innerHTML = stdout;
    });
}