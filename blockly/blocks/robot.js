const hue = 0;

//Blockly.Blocks['robot_start'] = {
//  init: function() {
//    this.jsonInit({
//      "message0": 'Start Code',
//      "args0": [
//        {
//          "type": "input_value",
//          "name": "VALUE",
//          "check": "String"
//        }
//		],
//      "output": "Number",
//      "colour": hue,
//	  "tooltip": "Starts antBot code",
//		"nextStatement": "Action",
//		"previousStatement": null,
//    });
//  }
//};
Blockly.BlockSvg.START_HAT = true;

Blockly.Blocks['robot_start'] = {
	init: function () {
		this.jsonInit({
			"type": "example_label",
			"message0": "Start Ant Bot Code %1",
			"args0": [
				{
					"type": "input_dummy"
				}
			],
			"colour": hue,
			"nextStatement": "Action"
		});
	}
};


Blockly.Blocks['robot_end'] = {
    init: function () {
        this.jsonInit({
            "type": "example_label",
            "message0": "End Ant Bot Code %1",
            "args0": [
                {
                    "type": "input_dummy"
                }
            ],
            "colour": hue,
            "previousStatement": "Action",
            "nextStatement": "Action"
        });
    }
};
