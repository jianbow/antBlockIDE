
'use strict';

goog.provide('Blockly.Arduino.robot');

goog.require('Blockly.Arduino');


//---------------- EVENTS ------------------------
Blockly.Arduino.robot_start = function() {
	Blockly.Arduino.definitions_['AntBot_library'] = '#include "AntBot.h"';
	Blockly.Arduino.setups_['antBot_constructor'] = 'AntBot antBot(true);';
	var code = '';
	return code;
}

Blockly.Arduino.robot_addSensor = function() {
	var sensor = this.getFieldValue('SENSOR');
	var port = this.getFieldValue('PORT');
	var setupName;
	if(sensor == 'ULTRA'){
		setupName = 'ultrasonic_sensor';
	}else if (sensor == 'LINE'){
		setupName = 'lineFollower_sensor';
	}
	var setup;
	if(sensor == 'ULTRA'){
		setup = 'Ultrasonic ultrasonic';
	}else if (sensor == 'LINE'){
		setup = 'LineFollower lineFollower';
	}
	setup += '("' + port + '");';
	Blockly.Arduino.setups_[setupName] = setup;
	var code = '';
	return code;
}

Blockly.Arduino.robot_addGyro = function() {
	var setupName = 'gyro';
	var setup = 'Gyro gyro();';
	Blockly.Arduino.setups_[setupName] = setup;
	var code = '';
	return code;
}

Blockly.Arduino.robot_addRemote = function() {
	var setupName = 'remote';
	var setup = 'Remote remote();';
	Blockly.Arduino.setups_[setupName] = setup;
	var code = '';
	return code;
}

Blockly.Arduino.robot_addDisplay = function() {
	var sensor = this.getFieldValue('SENSOR');
	var port1 = this.getFieldValue('PORT1');
	var port2 = this.getFieldValue('PORT2');
	var setupName = 'display';
	var setup = 'Display display("' + port1 + '", "' + port2 + '");';
	Blockly.Arduino.setups_[setupName] = setup;
	var code = '';
	return code;
}

//----------------- MOTION ---------------------
Blockly.Arduino.robot_moveTimed = function() {
	var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || 50;
	if(speed > 100){
		speed = 100;
	}else if(!(speed > 0)){
		speed = 0;
	}
	if(this.getInput('SPEED').connection.targetConnection !== null){
		this.getInput('SPEED').connection.targetConnection.getSourceBlock().setFieldValue(speed, 'NUM');
	}
	
	var time = 1000 * Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC) || 1000;
	if(time > 0){
		//console.log('less');
	}else{
		time = 0;
		this.getInput('TIME').connection.targetConnection.getSourceBlock().setFieldValue(time, 'TIME');
	}
	var dir = this.getFieldValue('DIR');
	var code = 'antBot.'
	if(dir == 'FORWARD'){
		code += 'forward';
	}else if(dir == 'BACKWARD'){
		code += 'backward';
	}else if(dir == 'RIGHT'){
		code += 'turnRight';
	}else if(dir == 'LEFT'){
		code += 'turnLeft';
	}
	code += '(' + speed + ');\ndelay(' + time + ');\nantBot.stopMotion();\n';
	return code;
}

Blockly.Arduino.robot_move = function() {
	var dir = this.getFieldValue('DIR');
	var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || 50;
	var code = 'antBot.'
	if(dir == 'FORWARD'){
		code += 'forward';
	}else if(dir == 'BACKWARD'){
		code += 'backward';
	}else if(dir == 'RIGHT'){
		code += 'turnRight';
	}else if(dir == 'LEFT'){
		code += 'turnLeft';
	}
	code += '(' + speed + ');\n';
	return code;
};

Blockly.Arduino.robot_turnLeftDegrees = function() {
	var deg = Blockly.Arduino.valueToCode(this, 'DEG', Blockly.Arduino.ORDER_ATOMIC) || 15;
	var code = 'while(antBot.gyro.getAngle() < ' + deg + '){\n  antBot.turnLeft(50);\n}\nantBot.stopMotion();\n';
	return code;
}

Blockly.Arduino.robot_turnRightDegrees = function() {
	//var deg = this.getFieldValue('DEG');
	var deg = Blockly.Arduino.valueToCode(this, 'DEG', Blockly.Arduino.ORDER_ATOMIC) || 15;
	var code = 'while(antBot.gyro.getAngle() < ' + deg + '){\n  antBot.turnRight(50);\n}\nantBot.stopMotion();\n';
	return code;
}

Blockly.Arduino.robot_wheelSpeeds = function() {
	//var left = this.getFieldValue('SPEEDL');
	//var right = this.getFieldValue('SPEEDR');
	var left = Blockly.Arduino.valueToCode(this, 'SPEEDL', Blockly.Arduino.ORDER_ATOMIC) || 50;
	var right = Blockly.Arduino.valueToCode(this, 'SPEEDR', Blockly.Arduino.ORDER_ATOMIC) || 50;
	var code = 'antBot.setMotors(' + left + ', ' + right + ');\n';
	return code;
}

Blockly.Arduino.robot_stopMotion = function() {
	var code = 'antBot.stopMotion();\n';
	return code;
}

//--------------------- SENSORS ---------------------
Blockly.Arduino.robot_getDistance = function() {
	var unit = this.getFieldValue('UNIT');
	var code = 'antBot.ultrasonic.getDist';
	if(unit == 'CM'){
		code += 'Cm';
	}else if(unit == 'IN'){
		code += 'In';
	}
	code += '()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.robot_getLineFollower = function() {
	var side = this.getFieldValue('SIDE');
	var code = 'antBot.lineFollower.get';
	if(side == 'RIGHT'){
		code += 'Right';
	}else if(side == 'LEFT'){
		code += 'Left';
	}
	code += '()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.robot_line = function() {
	var pos = this.getFieldValue('POS');
	var code = 'antBot.lineFollower.';
	if(pos == 'ON'){
		code += 'on';
	}else if(pos == 'OFF'){
		code += 'off';
	}else if(pos == 'RIGHT'){
		code += 'rightOf';
	}else if(pos == 'LEFT'){
		code += 'leftOf';
	}
	code += 'Line()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.robot_getAngle = function() {
	var code = 'antBot.gyro.getAngle()';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.robot_resetGyro = function() {
	var code = 'antBot.gyro.reset();\n';
	return code;
}

//--------------------- DISPLAY ---------------------
Blockly.Arduino.robot_displayImage = function() {
	var code = '//display image\n';
	return code;
}

Blockly.Arduino.robot_displayText = function() {
	var text = this.getFieldValue('TEXT');
	var code = '//display text'
	return code;
}

Blockly.Arduino.robot_text = function(){
	var type = this.outputConnection.getCheck();
	var text = this.getFieldValue('TEXT');
	var code = type + '\n' + text;
	return code;
}

//-------------------- SOUND ------------------------
Blockly.Arduino.robot_playNote = function() {
	var code = '//play note\n';
	return code;
}

//--------------------- TIMING ----------------------	
Blockly.Arduino.robot_delay = function() {
	var time = 1000 * Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC) || '0';
	var code = 'delay(' + time + ');\n';
	return code;
}

Blockly.Arduino.robot_waitUntil = function() {
	//var end = this.getFieldValue('END');
	var end = Blockly.Arduino.valueToCode(this, 'END', Blockly.Arduino.ORDER_ATOMIC) || 'false';
	var code = 'while(!' + end + '){\n  delay(1);\n}\n';
	return code;
}

Blockly.Arduino.robot_getTime = function() {
	//add timer = millis(); beforehand
	Blockly.Arduino.setups_['timer'] = 'long timer = 0;';
	var code = 'timer';
	return [code, Blockly.Arduino.ORDER_ATOMIC];
}

Blockly.Arduino.robot_resetTimer = function() {
	Blockly.Arduino.setups_['timer'] = 'long timer = 0;';
	var code = 'timer = 0;\n';
	return code;
}
