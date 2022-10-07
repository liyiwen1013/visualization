from django.http import HttpResponse
import json
from .data import *

# 仪表盘
def api1(request):
    return HttpResponse(json.dumps(gaugeData()), content_type='application/json; charset=UTF-8')

# 折线图
def api2(request):
    return HttpResponse(json.dumps(lineData()), content_type='application/json; charset=UTF-8')

# 散点图
def api3(request):
    return HttpResponse(json.dumps(scatterData()), content_type='application/json; charset=UTF-8')

# 迁徙图
def api4(request):
    data = geoLinesData()
    array1 = data[0]
    array2 = []
    for item in array1:
        tmp = {}
        tmp["name"] = item["toName"]
        tmp["value"] = item["coords"][1]
        array2.append(tmp)
    res = (array1, array2)
    return HttpResponse(json.dumps(res), content_type='application/json; charset=UTF-8')

# 热力地图
def api5(request):
    return HttpResponse(json.dumps(mapData()), content_type='application/json; charset=UTF-8')

# 饼图
def api6(request):
    return HttpResponse(json.dumps(pieData()), content_type='application/json; charset=UTF-8')

# 河流图
def api7(request):
    return HttpResponse(json.dumps(themeRiverData()), content_type='application/json; charset=UTF-8')

# 词云图
def api8(request):
    data = wordCloudData()
    res = []
    for i in data[0]:
        t = {}
        t["name"] = i
        res.append(t)
    for i, j in enumerate(data[1]):
        # print(1)
        res[i]["value"] = j
    return HttpResponse(json.dumps(res), content_type='application/json; charset=UTF-8')


