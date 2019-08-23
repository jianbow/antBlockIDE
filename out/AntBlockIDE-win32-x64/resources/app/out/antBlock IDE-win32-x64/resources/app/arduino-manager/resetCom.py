import json



#MAKE JSON DATA
x={"port":0}
#PUT JSON INTO Y
y = json.dumps(x)
#PUT JSON INTO THE TARGET FILE
with open('arduinoSettings.json', 'w') as outfile:  
    json.dump(x, outfile)