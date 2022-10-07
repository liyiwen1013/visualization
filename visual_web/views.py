from django.shortcuts import render, HttpResponse, redirect
from .data import *
# Create your views here.

def index(request):
    gauge_data = gaugeData()
    data_x, data_y = lineData()
    scatter_data = scatterData()
    data_geoLine_lines, data_geoLine_scatter = geoLinesData()
    data_map = mapData()
    pie_data = pieData()
    river_data = themeRiverData()
    key, value = wordCloudData()
    return render(request, "index.html")

def login(request):
    return render(request, 'login.html')

def checkUser(request):
    username = request.POST["username"]
    password = request.POST.get("password")
    conn = Connect(user="root", password="root", host="127.0.0.1", database="visual_db_2018", port=3306, charset="utf8")
    cur = conn.cursor()
    sql = """SELECT * FROM user_info WHERE username = %s AND password = %s"""
    cur.execute(sql, (username, password))
    data = cur.fetchall()
    cur.close()
    conn.close()
    if len(data) > 0:
        return redirect("/index")
    else:
        return render(request, "login.html", context={"msg": "用户名或密码错误"})
