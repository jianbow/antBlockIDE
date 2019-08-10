import sys
import glob
import json
import tempfile
import os
import subprocess
#pip install pyserial
def uploadArduino():
	#HAS THE USER FOUND THE COM PORT?
	with open('./arduino-manager/arduinoSettings.json') as json_file:
		data = json.load(json_file)
		if 'port' in data:
			#sys.stdout.write('Nice, we\'re in business')						
			#MAKE INO FILE
			dirname = tempfile.mkdtemp()
			sketchname = os.path.join(dirname, os.path.basename(dirname)) + ".ino"
			sys.stdout.write(sketchname)
			f = open(sketchname, "wb")
			f.write('' + "\n")
			f.close()
			#sys.stdout.write(sketchname)
			#MAKE ARGUMENTS

			#ITWORKS UP TO HERE
			compile_args = ["arduino_debug","--port","COM3","--upload","c:/Users/Leo/test/test.ino"]
			rc = subprocess.call(compile_args)
			#subprocess.call(['python', 'arduino_web_server.py'], shell=True)
			sys.stdout.write('rc')
		else:
			sys.stdout.write('We can\'t find the board. Try refreshing COM Ports')
	#PATH TO ARDUINO?


	#WRITE DATA TO STDOUT
#	sys.stdout.write('please asdfawsdf damn')
if __name__ == '__main__':
	uploadArduino()