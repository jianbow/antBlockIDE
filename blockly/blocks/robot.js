//THIS COULD POTENTIALLY BE SPLIT INTO LOTS OF INDIVIDUAL
//FILES FOR EACH TOOLBOX MENU (IE MOTION, SENSORS)

'use strict';

goog.require('Blockly.Blocks');
goog.require('Blockly');

//Blockly.Constants.Robot.HUE = 20;
Blockly.BlockSvg.START_HAT = true;
const eventsHue = "#FFAB19";
const motionHue = "#4C97FF";
const sensorHue = "#61CEF2";
const timingHue = "#FFBF00";
const displayHue = "#9966FF";
const soundHue = "#CF63CF";

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
//----------------- EVENTS --------------------

  // ANTBOT CODE HAT
  {
    "type": "robot_start",
    "message0": "when antBot starts",
    "colour": eventsHue,
    "nextStatement": "Action"
  },
 
  
  //ADD SENSORS
  {
	"type": "robot_addSensor",
	"message0": "add %1 sensor at %2",
	"args0": [
		{
			"type": "field_dropdown",
			"name": "SENSOR",
			"options": [["ultrasonic", "ULTRA"],
						["line follower", "LINE"]]
		},
		{
			"type": "field_dropdown",
			"name": "PORT",
			"options": [["C", "C"],
						["D", "D"]]			
		}
	],
	"colour": eventsHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },
 
  // ADD GYRO
  {
	"type": "robot_addGyro",
	"message0": "add gyro sensor",
	"colour": eventsHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },
  
  // ADD IR REMOTE
  {
	"type": "robot_addRemote",
	"message0": "add IR remote",
	"colour": eventsHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },

  // ADD DISPLAY 
  {
	"type": "robot_addDisplay",
	"message0": "add LCD display at %1 and %2",
	"args0": [
		{
			"type": "field_dropdown",
			"name": "PORT1",
			"options": [["A", "A"]]	
		},
		{
			"type": "field_dropdown",
			"name": "PORT2",
			"options": [["B", "B"]]			
		}
	],
	"colour": eventsHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },
  
//----------------- MOTION ---------------------

  // MOVE FOR A CERTAIN NUMBER OF SECONDS
  {
    "type": "robot_moveTimed",
    "message0": "%1 at %2% for %3 sec",
    "args0": [
		{
			"type": "field_dropdown",
			"name": "DIR",
			"options": [["move forward", "FORWARD"],
						["move backward", "BACKWARD"],
						["turn right", "RIGHT"],
						["turn left", "LEFT"]]
		},
        {
			"type": "input_value",
			"name": "SPEED",
			"check": "Number"
        },
		{
			"type": "input_value",
			"name": "TIME",
			"check": "Number"
		}
    ],
    "colour": motionHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  },
 
  //MOVE FORWARD/BACKWAR/LEFT/RIGHT
  {
    "type": "robot_move",
    "message0": "%1 at %2% speed",
    "args0": [
		{
			"type": "field_dropdown",
			"name": "DIR",
			"options": [["move forward", "FORWARD"],
						["move backward", "BACKWARD"],
						["turn right", "RIGHT"],
						["turn left", "LEFT"]]
		},
        {
			"type": "input_value",
			"name": "SPEED",
			"check": "Number"
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
	"message0": "turn left %1 degrees",
	"args0": [
		{
			"type": "input_value",
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
	"message0": "turn right %1 degrees",
	"args0": [
		{
			"type": "input_value",
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
	"message0": "set left wheel to %1% and right wheel to %2%",
	"args0": [
		{
			"type": "input_value",
			"name": "SPEEDL"
		},
		{
			"type": "input_value",
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
	"message0": "stop all motion",
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
	"message0": "reset gyro sensor",
	"colour": sensorHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },
 
//------------------ DISPLAY -------------------

  // DELAY CERTAIN NUMBER OF SECONDS
  {
    "type": "robot_displayImage",
    "message0": "display Image",
    "colour": displayHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  },
  
  //DISPLAY TEXT
  {
	"type": "robot_displayText",
	"message0": "display text %1",
	"args0": [
		{
			"type": "input_value",
			"name": "TEXT",
			"check": "String"
		}
	],
	"inputsInline": true,
	"colour": displayHue,
	"previousStatement": "Action",
	"nextStatement": "Action"
  },
  
  //TEXT CONSTANT
  {
	"type": "robot_text",
	"message0": "\"%1\"",
	"args0": [
		{
			"type": "field_input",
			"name": "TEXT"
		}
	],
	"colour": displayHue,
	"output": "String"
  },
	

//------------------ SOUND -------------------

  // DELAY CERTAIN NUMBER OF SECONDS
  {
    "type": "robot_playNote",
    "message0": "play note",
    "colour": soundHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  },
  
  
//------------------ TIMING -------------------

  // DELAY CERTAIN NUMBER OF SECONDS
  {
    "type": "robot_delay",
    "message0": "wait %1 sec",
    "args0": [
        {
			"type": "input_value",
			"name": "TIME",
			"check": "Number"
        }
    ],
    "colour": timingHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  },

  // WAIT UNTIL BOOLEAN
  {
    "type": "robot_waitUntil",
    "message0": "wait until %1",
    "args0": [
        {
			"type": "input_value",
			"name": "END",
			"check": "Boolean"
        }
    ],
	"inputsInline": true,
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
    "message0": "reset timer",
    "colour": timingHue,
    "previousStatement": "Action",
    "nextStatement": "Action"
  },
  
]);  // END JSON EXTRACT (Do not delete this comment.)
