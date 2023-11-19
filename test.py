import json,uuid
print(str(uuid.uuid4())[::5])
Parent_Path="D:\\Website\\Portfolio\\somnathdashs.github.io\\"
STORE_DATAA=json.load(open(Parent_Path+"Datas\\Store.json","r"))
STORE_DATA=STORE_DATAA["DATA"]
CataGory="PINU"
ALL_CATAGODY=[i["CATAGORY"] for i in STORE_DATA]
New_Data_Dict={'CATAGORY': 'PINU', 'ARRAY': [{'ID': 'QLI-09-UIY', 'NAME': 'TPortfolio - website template', 'PRICE': '250', 'DIS': 'Somthing', 'TAGS': 'Tags,Tag,TPortfolio', 'DURL': '', 'FEATURES': ['FS1', 'FS2', 'FS3', 'FS4', 'FS5'], 'ICOIMAGE': 'https://somnathdashs.github.io/Image/IMG_5.jpg', 'PATH': 'https://somnathdashs.github.io/Store/TPortfolio/'}]}    
New_Data={'ID': 'QLI-09-UIY', 'NAME': 'TPortfolio - website template', 'PRICE': '250', 'DIS': 'Somthing', 'TAGS': 'Tags,Tag,TPortfolio', 'DURL': '', 'FEATURES': ['FS1', 'FS2', 'FS3', 'FS4', 'FS5'], 'ICOIMAGE': 'https://somnathdashs.github.io/Image/IMG_5.jpg', 'PATH': 'https://somnathdashs.github.io/Store/TPortfolio/'}
if (CataGory in ALL_CATAGODY):
    index=ALL_CATAGODY.index(CataGory)
    Array=STORE_DATA[index]["ARRAY"]
    Array.append(New_Data)
else:
    STORE_DATA.append(New_Data_Dict)

print(len(STORE_DATA))
print(STORE_DATAA)
json.dump(STORE_DATA,open(Parent_Path+"Datas\\Store1.json","w"))