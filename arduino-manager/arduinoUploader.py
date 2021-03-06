import sys
import glob
import json
import tempfile
import os
import subprocess
#pip install pyserial


def uploadArduino():
	# HAS THE USER FOUND THE COM PORT?
	with open(sys.argv[2] + '\\arduino-manager\\arduinoSettings.json') as json_file:
		data = json.load(json_file)
		if 'port' in data:
			#MAKE INO FILE
			dirname = tempfile.mkdtemp()
			sketchname = os.path.join(dirname, os.path.basename(dirname)) + ".ino"
			#WRITE TO INO FILE
			f = open(sketchname, "wb")
			f.write(sys.argv[1] + "\n")
			f.close()

			#CALLS SUBPROCESS

			compile_args = ["C:/Program Files (x86)/Arduino/arduino_debug.exe","--port",data['port'],"--upload",sketchname,"--board", "MiniCore:avr:328:variant=modelPB"]
			rc = subprocess.call(compile_args)
			#0 NO ERROR; 1 IS ERROR
			if rc == 0:
				#100 CODE IS FOR SUCCESS
				sys.stdout.write('100')
			else:
				#200 CODE IS FOR ERROR
				sys.stdout.write('200')
		else:
			sys.stdout.write('We can\'t find the board. Try refreshing COM Ports')


if __name__ == '__main__':
	uploadArduino()