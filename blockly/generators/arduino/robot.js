
'use strict';

goog.provide('Blockly.Arduino.robot');

goog.require('Blockly.Arduino');


//---------------- EVENTS ------------------------
Blockly.Arduino.robot_start = function() {
	//ADD ANTBOT CONSTRUCTOR
	Blockly.Arduino.setups_['antBot_constructor'] = '//antBot constuctor';
	var code = '';
	return code;
}

//----------------- MOTION ---------------------
Blockly.Arduino.robot_forwardTimed = function() {
	var speed = this.getFieldValue('SPEED');
	var time = 1000 * this.getFieldValue('TIME');
	var code = '//set motors to speed input\n//delay(' + time + ');\n//set motors to 0\n';
	return code;
}

Blockly.Arduino.robot_forward = function() {
	var speed = this.getFieldValue('SPEED');
	var code = '//set motors to speed input\n';
	return code;
};

Blockly.Arduino.robot_turnLeftDegrees = function() {
	var deg = this.getFieldValue('DEG');
	var code = '//turn left for input degrees with gyro\n';
	return code;
}

Blockly.Arduino.robot_turnRightDegrees = function() {
	var deg = this.getFieldValue('DEG');
	var code = '//turn right for input degrees with gyro\n';
	return code;
}

Blockly.Arduino.robot_wheelSpeeds = function() {
	var left = this.getFieldValue('SPEEDL');
	var right = this.getFieldValue('SPEEDR');
	var code = '//set left wheel to left speed input\n//set right wheel to right speed input\n';
	return code;
}

Blockly.Arduino.robot_stopMotion = function() {
	var code = '//set left wheel to 0\n//set right wheel to 0\n';
	return code;
}

//--------------------- SENSORS ---------------------
Blockly.Arduino.robot_getDistance = function() {
	var unit = this.getFieldValue('UNIT');
	//distinguish between cm and inch
	var code = '//get ultrasonic dist\n';
	return code;
}

Blockly.Arduino.robot_getLineFollower = function() {
	var side = this.getFieldValue('SIDE');
	//choose left or right sensor
	var code = '//read one side of line follower\n';
	return code;
}

Blockly.Arduino.robot_line = function() {
	var pos = this.getFieldValue('POS');
	//use pos to determine which logic to use
	var code = '//return boolean for if robot matches position relative to line\n';
	return code;
}

Blockly.Arduino.robot_getAngle = function() {
	var code = '//get gyro angle\n';
	return code;
}

Blockly.Arduino.robot_resetGyro = function() {
	var code = '//reset gyro\n';
	return code;
}

//--------------------- DISPLAY ---------------------
Blockly.Arduino.robot_displayImage = function() {
	var code = '//display image\n';
	return code;
}

//-------------------- SOUND ------------------------
Blockly.Arduino.robot_playNote = function() {
	var code = '//play note\n';
	return code;
}

//--------------------- TIMING ----------------------	
Blockly.Arduino.robot_delay = function() {
	var time = 1000 * this.getFieldValue('TIME');
	var code = 'delay(' + time + ');\n';
	return code;
}

Blockly.Arduino.robot_waitUntil = function() {
	var end = this.getFieldValue('END');
	var code = 'while(!' + end + '){\n\tdelay(1);\n\r}\n';
	return code;
}

Blockly.Arduino.robot_getTime = function() {
	var code = '//get timer value\n';
	return code;
}

Blockly.Arduino.robot_resetTimer = function() {
	var code = '//reset timer\n';
	return code;
}
