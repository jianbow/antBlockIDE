// JavaScript source code

//CONTAINS MOST UP TO DATE UPLOADER
//const { app } = require('electron');


function uploadLocal(code) {
    changeSpinner(true);
    const execFile = require('child_process').execFile;
    const child = execFile('python', [process.env['APP_PATH'] + '\\arduino-manager\\arduinoUploader.py', code, process.env['APP_PATH']], (error, stdout, stderr) => {
        statusCode = stdout.substring(stdout.length - 3);
        let statusMessage;
        if (statusCode == 100) {
            statusMessage = "Upload Successful";
        }
        else if (statusCode == 200) {
            statusMessage = "Error with Upload";
        }
        else {
            statusMessage = "";
        }

        document.getElementById('message').innerHTML = stderr + "<br>" + stdout + "<br>" + statusMessage; /* + "\n"  error + "\n" +  stderr */
        changeSpinner(false);
    });
}
