import sys
import glob
import serial
import multiprocessing as mp
import time
import json
import os


def read_data(port_name, q):
    """Worker function that reads data from a seral device"""
    print('Hi I\'m ' + port_name)
    print('I\'m process' + str(os.getpid()))
    while True:
        ser = serial.Serial(port_name, 9600)
        data = ser.readline()
        q.put(json.loads(data))


def serial_ports():
    """ Lists serial port names"""
    ports = glob.glob('/dev/cu.usb*')

    result = []
    for port in ports:
        try:
            s = serial.Serial(port)
            s.close()
            result.append(port)
        except (OSError, serial.SerialException):
            pass
    return result


if __name__ == '__main__':
    q = mp.Queue()
    jobs = []
    ports = serial_ports()

    for port in ports:
        p = mp.Process(target=read_data, args=(port, q,))
        jobs.append(p)
        p.start()
    while True:
        if not q.empty():
            print(q.get())
