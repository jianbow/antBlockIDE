

// This javascript file includes all the necessary javascript functions to deal with the Arduino side of the antBlockIDE


//MAKE GENERATED CODE A PARAMETER
function upload() {
    //const output = execSync('ls', { encoding: 'utf-8' });
    //console.log('Output was:\n', output);
    alert("Ready to upload to Arduino.");



    var request = new XMLHttpRequest();
    var url = "http://127.0.0.1:8080/";
    var method = "POST";
    var async = true;

    request.onreadystatechange = function () {

        var status = parseInt(request.status); // HTTP response status, e.g., 200 for "200 OK"
        //alert(status);
        if (status == 200) {
            alert("Program Uploaded");
        }

    }




    request.open(method, url, async);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    //currently, this includes a default blink wired to pin 8. replace this with code generated from blockly generator. 
    //MAKE THIS EQUAL TO THE PASSED IN PARAMETER
    var code = "void setup() {pinMode(8,OUTPUT); digitalWrite(8,LOW);} void loop() {} ";
    request.send(code);
}

function changeSpinner(status) {
    if (status == false) {
        document.getElementById("uploadMessage").innerHTML = "";
    }
    else {
        document.getElementById("uploadMessage").innerHTML = "<li class='nav-item'><div class='spinner-border text-light mr-auto' role='status'><span class='sr-only'>Loading...</span></div></li><h6 class='mt-1 mx-2'>Uploading...</h6>";
    }

}

function heck() {
    alert(document.getElementById("port").innerHTML = "<i class='fas fa-file-export mr-1'></i>OOGA");
}

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

    fileInput.addEventListener('change', function (e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function (e) {
                alert(reader.result);
                var xml = Blockly.Xml.textToDom(reader.result);
                Blockly.Xml.domToWorkspace(xml, workspace);
                //fileDisplayArea.innerText = reader.result;
            }

            reader.readAsText(file);
        } else {
            alert('uh oh');
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
        let student = JSON.parse(rawdata);
        //alert('asdfasdf');
        //console.log(student.port);
        //alert(student.port);
        if (student.port != 0 && student.port != null) {
            document.getElementById("port").innerHTML = "<i class='fas fa-file-export mr-1'></i> " + student.port;
            alert('Board Detected at ' + student.port);
        }
        else {
            alert('No Board Detected');
        }
    });

    // Takes stdout data from script which executed
    // with arguments and send this data to res object
    //process.stdout.on('data', function(data) {
    //     res.send(data.toString());


    // const fs = require('fs');
    // let rawdata = fs.readFileSync('./arduino-manager/arduinoSettings.json');
    // let student = JSON.parse(rawdata);
    // //console.log(student.port);
    // alert(student.port);
    //// document.getElementById("code").innerHTML = student.port;
}

function saveFile() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);
    var blob = new Blob([xml_text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "untitled");
}