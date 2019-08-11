import sys
import glob
import json
import tempfile
import os
import subprocess
#pip install pyserial

compile_args = ["arduino_debug","--upload","c:/Users/Leo/test/test.ino"]
print sys.argv[0]
print sys.argv[1]
subprocess.call(compile_args)


#def uploadArduino():
	#HAS THE USER FOUND THE COM PORT?
	#with open('./arduino-manager/arduinoSettings.json') as json_file:
	#	data = json.load(json_file)
	#	if 'port' in data:
			#sys.stdout.write('Nice, we\'re in business')						
			#MAKE INO FILE
	#		dirname = tempfile.mkdtemp()
	#		sketchname = os.path.join(dirname, os.path.basename(dirname)) + ".ino"
			#sys.stdout.write(sketchname)
	#		f = open(sketchname, "wb")
	#		f.write('' + "\n")
	#		f.close()
			#sys.stdout.write(sketchname)
			#MAKE ARGUMENTS

			#ITWORKS UP TO HERE

