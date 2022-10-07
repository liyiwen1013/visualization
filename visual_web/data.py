from pymysql import Connect
from jieba.analyse import extract_tags
import re
import jieba

"""处理数据"""
# 封装connect
def connect_mysql(sql):
    conn = Connect(host="localhost", port=3306, user="root", password="root", database="visual_db_2018", charset="utf8")
    cur = conn.cursor()
    cur.execute(sql)
    conn.commit()
    data = cur.fetchall()
    cur.close()
    return data

# 仪表盘
# 查询全国感染新冠肺炎的死亡率，数据来源为表covid_data
def gaugeData():
    sql = """SELECT cast(SUM( dead_count )/( SELECT SUM( confirmed_count ) FROM covid_data 
          WHERE update_time = '2020-2-29' )as char) AS 死亡率 FROM covid_data WHERE update_time = '2020-2-29'"""
    data = connect_mysql(sql)
    gauge_data = round(float(data[0][0]) * 100, 2)
    return gauge_data


# 折线图
# 查询出二月份全国每天的新增确诊人数，数据来源为表covid_data。2data_x为二月份的每一天，data_y为全国每一天对应的全国新增确诊人数。
# 注意：2月13日那天的新增确诊人数是一个特殊值，这个值不做统计。
def lineData():
    sql = """SELECT cast(SUM(confirmed_add) as char),day(update_time) FROM covid_data WHERE day(update_time) <> 13 
         GROUP BY update_time ORDER BY update_time ASC"""
    data = connect_mysql(sql)
    data_x = []
    data_y = []
    j = 0
    for i in data:
        data_x.append(int(i[0]))
        data_y.append(i[1])
        j = j + 1
    return data_x, data_y

# 散点图
# 查询各省市从湖北迁入的人口比例与该省累计确诊人数的关系，数据来源为表migrate_data和表covid_data。
# data_x为各省市从湖北迁入的人口占比，data_y为各省市累计确诊人数（截止到2020年2月29日）。
def scatterData():
    sql = """SELECT `人口占比`,`累计确诊` FROM (SELECT province_name, SUM( covid_data.confirmed_count ) AS '累计确诊' 
        FROM covid_data WHERE covid_data.update_time = "2020-02-29" AND covid_data.province_name <> "湖北省" 
        GROUP BY covid_data.province_name ) AS a2 LEFT JOIN ( SELECT target_province_name, `value` AS `人口占比` 
        FROM migrate_data WHERE source_province_name = "湖北省" ) AS a1 ON province_name = target_province_name ORDER BY a1.`人口占比`"""
    data = connect_mysql(sql)
    scatter_data = []
    for i in data:
        scatter_data.append([i[0], int(i[1])])
    return scatter_data

# 迁徙图
# 查询从湖北省迁入到各省市的人口占比数据，数据来源为表migrate_data
def geoLinesData():
    sql = """SELECT source_province_name,target_province_name,value,longitude,latitude FROM `migrate_data`,area_china 
          where source_province_name = '湖北省' and migrate_data.target_province_code = area_china.`code`"""
    data = connect_mysql(sql)
    target = [114.341861, 30.546498]
    series1 = []
    for i in data:
        dic = {}
        dic["fromName"] = i[0]
        dic["toName"] = i[1]
        dic["value"] = i[2]
        dic["coords"] = [target, [i[3], i[4]]]
        series1.append(dic)
    serise2 = []
    for i in data:
        dic = {}
        dic["fromName"] = i[0]
        dic["toName"] = i[1]
        dic["value"] = i[2]
        serise2.append(dic)
    seriseAll = [series1, serise2]
    seriseAll01 = seriseAll[0]
    seriseAll02 = seriseAll[1]
    return seriseAll01, seriseAll02


# 地图
# 查询全国各省市的累计确诊人数，数据来源为表covid_data
def mapData():
    sql = """SELECT province_name,SUM(confirmed_count) FROM `covid_data` where update_time = '2020-02-29' GROUP BY province_name"""
    data = connect_mysql(sql)
    # 清洗数据，去掉“省市自治区回族壮族维吾尔族”
    mapSeries = []
    for i in data:
        dic = {}
        dic["name"] = i[0].strip("省市自治区回族壮族维吾尔族")
        dic["value"] = int(i[1])
        mapSeries.append(dic)
    return mapSeries


# 饼图
# 统计每个新闻媒体发布的所有新闻的数量，数据来源为news_info
def pieData():
    sql = """SELECT news_source as name,COUNT(*) FROM news_info GROUP BY news_source"""
    data = connect_mysql(sql)
    pie_data = []
    for i in data:
        dic = {}
        dic["value"] = i[1]
        dic["name"] = i[0]
        pie_data.append(dic)
    return pie_data


# 主题河流
# 统计每个新闻媒体每天发布的新闻的数量，数据来源为news_info
def themeRiverData():
    sql = """SELECT DATE_FORMAT(publish_time,'%Y-%m-%d'),count(news_source),news_source 
          FROM `news_info`where DATE_FORMAT(publish_time,'%Y-%m')='2020-02' 
          group by DATE_FORMAT(publish_time,'%Y-%m-%d'),news_source"""
    data = connect_mysql(sql)
    river = list(data)
    for i, j in enumerate(river):
        river[i] = list(j)
    return river


# 词云图
# 从所有的新闻概要(news_info. news_summary)中，找出tf-idf权重值最大的100个单词绘制词云图，数据来源为news_info
def wordCloudData():
    sql = """SELECT news_summary FROM news_info"""
    data = connect_mysql(sql)
    numlist = []
    for row in data:
        numlist.append(row[0])
    numlist = list(map(str, numlist))
    numlist = ''.join(numlist)
    cut_words = []
    for line in numlist:
        line.strip('\n')
        line = re.sub("[A-Za-z0-9\：\·\—\，\。\“ \”]", "", line)
        seg_list = jieba.cut(line, cut_all=False)
        cut_words.append(" ".join(seg_list))
    # 列表转为字符串
    cut_words = ''.join(cut_words)
    # 取权重值前100的词
    tf_idf_w = extract_tags(cut_words, topK=100, withWeight=True)

    key = []
    value = []
    for i, j in tf_idf_w:
        key.append(i)
        value.append(j)
    return key, value