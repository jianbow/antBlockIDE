//THIS COULD POTENTIALLY BE SPLIT INTO LOTS OF INDIVIDUAL
//FILES FOR EACH TOOLBOX MENU (IE MOTION, SENSORS)

'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

//Blockly.Constants.Robot.HUE = 20;
Blockly.BlockSvg.START_HAT = true;
const eventsHue = 0;
const motionHue = 230;
const sensorHue = 125;
const timingHue = 50;
const displayHue = 275;
const soundHue = 315;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
//----------------- EVENTS --------------------

  // ANTBOT CODE HAT
  {
    "type": "robot_start",
    "message0": "When AntBot Starts %1",
    "args0": [
        {
			"type": "input_dummy"
        }
    ],
    "colour": eventsHue,
    "nextStatement": "Action"
  },
  
//----------------- MOTION ---------------------

  // MOVE FOR A CERTAIN NUMBER OF SECONDS
  // DECIDE IF DROPDOWN OR SEPARATE BLOCKS FOR FORWARD/BACKWAR/LEFT/RIGHT
  // THEN ADD DROPDOWN MENU OR ADDITIONAL BLOCKS
  {
    "type": "robot_forwardTimed",
    "message0": "%1 at %2% for %3 sec",
    "args0": [
		{
			"type": "field_dropdown",
			"name": "OPT",
			"options": [["Move forward", "FORWARD"],
						["Move backward", "BACKWARD"],
						["Turn right", "RIGHT"],
						["Turn left", "LEFT"]]
		},
        {
			"type": "field_number",
			"name": "SPEED"
        },
		{
			"type": "field_number",
			"name": "TIME"
		}
    ],
    "colour": motionHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  },
 
  //MOVE FORWARD/BACKWAR/LEFT/RIGHT
  //IMPLEMENT DROPDOWN MENU OR ADDITIONAL BLOCKS
  {
    "type": "robot_forward",
    "message0": "%1 at %2% speed",
    "args0": [
		{
			"type": "field_dropdown",
			"name": "OPT",
			"options": [["Move forward", "FORWARD"],
						["Move backward", "BACKWARD"],
						["Turn right", "RIGHT"],
						["Turn left", "LEFT"]]
		},
        {
			"type": "field_number",
			"name": "SPEED"
        }
    ],
    "colour": motionHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  }, 
  
  
  //GYRO ASSISTED TURNS: ADD ARROWS TO INDICATE DIRECTION
  //USE GYRO TO TURN LEFT TO A CERTAIN NUMBER OF DEGREES
  {
	"type": "robot_turnLeftDegrees",
	"message0": "Turn left %1 degrees",
	"args0": [
		{
			"type": "field_number",
			"name": "DEG"
		}
	],
	"colour": motionHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },
  
  //USE GYRO TO TURN RIGHT TO A CERTAIN NUMBER OF DEGREES
  {
	"type": "robot_turnRightDegrees",
	"message0": "Turn right %1 degrees",
	"args0": [
		{
			"type": "field_number",
			"name": "DEG"
		}
	],
	"colour": motionHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },
  
  //SET EACH WHEEL SPPED INDIVIDUALLY
  {
	"type": "robot_wheelSpeeds",
	"message0": "Set left wheel to %1% and right wheel to %2%",
	"args0": [
		{
			"type": "field_number",
			"name": "SPEEDL"
		},
		{
			"type": "field_number",
			"name": "SPEEDR"
		}
	],
	"colour": motionHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },

  //SET BOTH WHEELS TO ZERO
  {
	"type": "robot_stopMotion",
	"message0": "Stop all motion",
	"colour": motionHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },
  
//------------------ SENSORS -----------------
  //RETURN ULTRASONIC DISTANCE IN EITHER CM OR IN
  {
	"type": "robot_getDistance",
	"message0": "distance in %1",
	"args0": [
	    {
			"type": "field_dropdown",
			"name": "UNIT",
			"options": [["cm", "CM"],["inches", "IN"]]
		}
	],
	"colour": sensorHue,
	"output": "Number"
  },
  
  //RETURN BOOLEAN FOR EITHER SIDE OF LINE FOLLOWER
  {
	"type": "robot_getLineFollower",
	"message0": "%1 side line follower",
	"args0": [
	    {
			"type": "field_dropdown",
			"name": "SIDE",
			"options": [["right", "RIGHT"],["left", "LEFT"]]
		}
	],
	"colour": sensorHue,
	"output": "Boolean"
  },  
  
  //RETURN THE ROBOTS POSITION RELATIVE TO A LINE
  {
	"type": "robot_line",
	"message0": "%1 line",
	"args0": [
	    {
			"type": "field_dropdown",
			"name": "POS",
			"options": [["on", "ON"],["off", "OFF"],
						["to the right of", "RIGHT"],
						["to the left of", "LEFT"]]
		}
	],
	"colour": sensorHue,
	"output": "Boolean"
  },

  //RETURN GYRO ANGLE
  {
	"type": "robot_getAngle",
	"message0": "gyro angle",
	"colour": sensorHue,
	"output": "Number"
  },
  
  //RESET GYRO
  {
	"type": "robot_resetGyro",
	"message0": "Reset gyro sensor",
	"colour": sensorHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },
 
//------------------ DISPLAY -------------------

  // DELAY CERTAIN NUMBER OF SECONDS
  {
    "type": "robot_displayImage",
    "message0": "Display Image",
    "colour": displayHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  },

//------------------ SOUND -------------------

  // DELAY CERTAIN NUMBER OF SECONDS
  {
    "type": "robot_playNote",
    "message0": "Play Note",
    "colour": soundHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  },
  
//------------------ TIMING -------------------

  // DELAY CERTAIN NUMBER OF SECONDS
  {
    "type": "robot_delay",
    "message0": "Wait %1 sec",
    "args0": [
        {
			"type": "field_number",
			"name": "TIME"
        }
    ],
    "colour": timingHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  },
  
  // WAIT UNTIL BOOLEAN
  {
    "type": "robot_waitUntil",
    "message0": "Wait until %1",
    "args0": [
        {
			"type": "input_value",
			"name": "END",
			"check": "Boolean"
        }
    ],
    "colour": timingHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  },  

  // GET TIME SINCE PROGRAM STARTED
  {
    "type": "robot_getTime",
    "message0": "timer",
    "colour": timingHue,
	"output": "Number"
  },

  // RESET TIMER
  {
    "type": "robot_resetTimer",
    "message0": "Reset timer",
    "colour": timingHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  }
  
]);  // END JSON EXTRACT (Do not delete this comment.)
