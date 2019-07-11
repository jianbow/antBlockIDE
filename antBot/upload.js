function upload(code) {
	//const output = execSync('ls', { encoding: 'utf-8' });
	//console.log('Output was:\n', output);
	alert("Ready to upload to Arduino.");
	
    var request = new XMLHttpRequest();
    var url = "http://127.0.0.1:8080/";
    var method = "POST";
	var async = true;
	  
	request.open(method, url, async);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
	//var code = "void setup() {} void loop() {}";
	request.send(code);
}