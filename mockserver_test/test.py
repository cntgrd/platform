import sensor_data_pb2
import sys
import http.client
from google.protobuf.json_format import MessageToJson

URL = "cf4f5b8e-99ee-46f1-96fb-428394f44234.mock.pstmn.io"

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
conn.request("GET", "/getsth")
r1 = conn.getresponse()
print(r1.status, r1.reason)
data1 = r1.read()
print(data1)
conn.close()
