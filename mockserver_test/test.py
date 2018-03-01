import sensor_data_pb2
import sys
import http.client
from google.protobuf.json_format import MessageToJson

URL = "69e90bbc-66f3-4019-9540-e5817e80f3c9.mock.pstmn.io"

sensorMsg = sensor_data_pb2.Quantity()
sensorMsg.value = 110
sensorMsg.unit = 0
sensorMsg.vector = 1

print(sensorMsg.value)
print(sensorMsg.unit)
print(sensorMsg.vector)

jsonObj = MessageToJson(sensorMsg)
print(jsonObj)


conn = http.client.HTTPSConnection(URL)
conn.request("GET", "/test")
r1 = conn.getresponse()
print(r1.status, r1.reason)
data1 = r1.read()
print(data1)
conn.close()
