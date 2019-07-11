

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

    request.open(method, url, async);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    //currently, this includes a default blink wired to pin 8. replace this with code generated from blockly generator. 
    //MAKE THIS EQUAL TO THE PASSED IN PARAMETER
    var code = "void setup() {pinMode(8,OUTPUT); digitalWrite(8,LOW);} void loop() {} ";
    request.send(code);
}

