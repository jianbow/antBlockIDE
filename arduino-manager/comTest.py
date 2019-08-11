import sys
import glob
import serial
import json
#pip install pyserial
def serial_ports():
    """ Lists serial port names

        :raises EnvironmentError:
            On unsupported or unknown platforms
        :returns:
            A list of the serial ports available on the system
    """
	#WHAT SYSTEM ARE WE USING?
    if sys.platform.startswith('win'):
        ports = ['COM%s' % (i + 1) for i in range(256)]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
        # this excludes your current terminal "/dev/tty"
        ports = glob.glob('/dev/tty[A-Za-z]*')
    elif sys.platform.startswith('darwin'):
        ports = glob.glob('/dev/tty.*')
    else:
        raise EnvironmentError('Unsupported platform')
	#IF WANT TO HAVE MULTIPLE COM READ, USE RESULT ARRAY
    result = []
	#FOREACH LOOP
    for port in ports:
        try:
			#CLOSES THE SERIAL port
            s = serial.Serial(port)
            s.close()
            result.append(port)
			#MAKE JSON DATA
            x={"port":port}
			#PUT JSON INTO Y
            y = json.dumps(x)
			#PUT JSON INTO THE TARGET FILE
            with open('./arduino-manager/arduinoSettings.json', 'w') as outfile:  
                json.dump(x, outfile)
        except (OSError, serial.SerialException):
            pass
    return result


if __name__ == '__main__':
    print(serial_ports())