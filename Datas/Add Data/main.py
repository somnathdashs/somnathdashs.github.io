from PyQt5 import QtWidgets, uic, QtCore
from PyQt5.QtCore import Qt
import os
import sys
import uuid
from datetime import datetime
import threading
import json
import sys
from PyQt5.QtWidgets import (
    QApplication, QWidget, QToolTip, QPushButton, QMessageBox)
from PyQt5.QtCore import QCoreApplication, Qt







class UI(QtWidgets.QMainWindow):
    def __init__(self):
        super(UI, self).__init__()
        uic.loadUi("./Layouts/Main.ui", self)
        self.show()
        self.setup()
        self.get_data()
    
    def BackUP(self):
        AllData=json.load(open("../TP.json","r"))
        json.dump(AllData,open("./Backup/TP.json","w"))
        AllData=json.load(open("../Projects.json","r"))
        json.dump(AllData,open("./Backup/Projects.json","w"))

    def setup(self):
        self.ISAI = False
        self.statusBar = QtWidgets.QStatusBar()
        self.setStatusBar(self.statusBar)
        self.isai.stateChanged.connect(self.isaif)
        self.model_url.setEnabled(False)
        self.addbtn.clicked.connect(
            lambda: self.Add_data())
        self.cancelbtn.clicked.connect(self.Cancel)
        self.refreshbtn.clicked.connect(self.refresh)

        self.updatebtn.setEnabled(False)
        self.cancelbtn.setEnabled(False)
        self.deletebtn.setEnabled(False)


    def refresh(self):
        self.setup()
        self.get_data()

    def get_data(self,Update=False):
        try:
            self.Col = []
            self.Row = []
            data = json.load(open("../Projects.json","r"))
            for d in data.values():
                self.Col.append(list(d[0].keys()))
            self.Col=max(self.Col,key=len)

            if data:
                self.Allprojects = [d[0] for d in data.values()]
                for P in self.Allprojects:
                    Trow = []
                    for key in self.Col:
                        try:
                            Trow.append(P[key])
                        except:
                            Trow.append("")
                            
                    self.Row.append(Trow)
                if not Update:
                    self.Load_data()
        except Exception as e:
            self.statusBar.showMessage(
                "Somthing really went wrong.")
            print(e)

    def Load_data(self):
        Col = self.Col
        Row = self.Row
        if len(Col) > 0:
            row = []
            for i in range(len(Row)):
                row.append(i+1)
            model = TableModel(Row, Col, row)
            self.Main_tableView.setModel(model)
            self.Main_tableView.horizontalHeader().setStretchLastSection(True)
            self.Main_tableView.horizontalHeader().setSectionResizeMode(
                QtWidgets.QHeaderView.Stretch)
            self.Main_tableView.selectionModel().selectionChanged.connect(self.Select_Row)

    def Cancel(self):
        self.updatebtn.setEnabled(False)
        self.cancelbtn.setEnabled(False)
        self.addbtn.setEnabled(True)
        self.deletebtn.setEnabled(False)
        self.UID.setText("UID:")
        self.titletxt.clear()
        self.destxt.clear()
        self.readmeurl.clear()
        self.imageurl.clear()
        self.ssurl.clear()
        self.githuburl.clear()
        self.model_url.clear()
        self.get_data(Update=True)


    def Select_Row(self):
        a=self.Main_tableView.selectionModel().selectedIndexes()
        i=a[0].row()
        try:
            ROW=self.Allprojects[i]
        except Exception as e:
            print(e)
            self.statusBar.showMessage(str(i),"Refresh and Select the row again")

        id=str(ROW["Uid"])
        title=ROW["Title"]
        des=ROW["Des"]
        readmeurl=ROW["ReadmeUrl"]
        imageurl=ROW["ImageUrl"]
        ssurl=ROW["SsUrl"]
        githuburl=ROW["GithubUrl"]
        model_url="No Url"
        C_date=ROW["CreatedDate"]
        self.updatebtn.setEnabled(True)
        self.cancelbtn.setEnabled(True)
        self.addbtn.setEnabled(False)
        self.deletebtn.setEnabled(True)
        # Udate=ROW["UpdateDate"]
        self.ISAI=ROW["ISAI"]
        if self.ISAI:
            model_url=ROW["ModelUrl"]
        self.status=self.StatusOfTP(id)
        self.UID.setText("UID:"+id)
        self.titletxt.setText(title)
        self.destxt.setPlainText(des)
        self.readmeurl.setText(readmeurl)
        self.imageurl.setText(imageurl)
        self.ssurl.setText(ssurl)
        self.githuburl.setText(githuburl)
        self.isai.setChecked(self.ISAI)
        self.addtoTP.setChecked(self.status)
        self.model_url.setText(model_url)
        self.updatebtn.clicked.connect(lambda: self.Update_data(id,C_date))
        self.deletebtn.clicked.connect(lambda: self.Delete_data(id))
        self.addtoTP.clicked.connect(lambda:self.Add_TP(id,C_date,self.status))

    def StatusOfTP(self,id):
        try:        
            keys=json.load(open("../TP.json","r"))
            for key in keys.keys():
                if id in key:
                    return True 
                return False 
        except:
            return False

    def Add_TP(self,id,cd,status):
        TP={}
        AllData=json.load(open("../TP.json","r"))
        self.addtoTP.setEnabled(False)
        if not status:
            title=self.titletxt.text()
            des=self.destxt.toPlainText()
            readmeurl=self.readmeurl.text()
            imageurl=self.imageurl.text()
            ssurl=str(self.ssurl.text()).replace(" ",",")
            githuburl=self.githuburl.text()
            model_url=""
            Udate=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
            if self.ISAI:
                model_url=self.model_url.text()
            search=title+" "+des+" "+ssurl+" "+Udate+" "+githuburl+" "+cd
            if title and des  and imageurl and ssurl and githuburl and readmeurl :
                TP["Uid"]=id
                TP["Title"]=title
                TP["Des"]=des
                TP["ImageUrl"]=imageurl
                TP["SsUrl"]=ssurl
                TP["ReadmeUrl"]=readmeurl
                TP["GithubUrl"]=githuburl
                TP["ISAI"]=self.ISAI
                TP["ModelUrl"]=model_url
                TP["CreatedDate"]=cd
                TP["UpdateDate"]=Udate
                TP["Search"]=search
                AllData[id]=[TP]
                json.dump(AllData,open("../TP.json","w"))
            else:
                self.statusBar.showMessage("You must have to fill all the box before you procced",15000)
        else:
            try:
                AllData=json.load(open("../TP.json","r"))
                AllData.pop(id)
                json.dump(AllData,open("../TP.json","w"))
            except Exception as e:
                print(e)
                self.refresh()
        self.status=self.StatusOfTP(id)
        self.addtoTP.setEnabled(True)


        






    def isaif(self):
        if self.ISAI:
            self.ISAI=False
        else:
            self.ISAI=True
        self.model_url.setEnabled(self.ISAI)


    def Delete_data(self,id):
        try:
            AllData=json.load(open("../Projects.json","r"))
            AllData.pop(id)
            json.dump(AllData,open("../Projects.json","w"))
        except:
            self.refresh()
        self.refresh()
        self.Cancel()
        


    def Update_data(self,id,cd):
        Update={}
        AllData=json.load(open("../Projects.json","r"))
        self.updatebtn.setEnabled(False)
        title=self.titletxt.text()
        des=self.destxt.toPlainText()
        readmeurl=self.readmeurl.text()
        imageurl=self.imageurl.text()
        ssurl=str(self.ssurl.text()).replace(" ",",")
        githuburl=self.githuburl.text()
        model_url=""
        Udate=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
        if self.ISAI:
            model_url=self.model_url.text()
    
        search=title+" "+des+" "+ssurl+" "+Udate+" "+githuburl+" "+cd
        if title and des  and imageurl and ssurl and githuburl and readmeurl :
            self.statusBar.showMessage("Updating Data")
            Update["Uid"]=id
            Update["Title"]=title
            Update["Des"]=des
            Update["ImageUrl"]=imageurl
            Update["SsUrl"]=ssurl
            Update["ReadmeUrl"]=readmeurl
            Update["GithubUrl"]=githuburl
            Update["ISAI"]=self.ISAI
            Update["ModelUrl"]=model_url
            Update["CreatedDate"]=cd
            Update["UpdateDate"]=Udate
            Update["Search"]=search
            AllData[id]=[Update]
            json.dump(AllData,open("../Projects.json","w"))
            self.Cancel()
            self.refresh()
            self.statusBar.showMessage("Data has been updated successfully",5000)

        else:
            self.statusBar.showMessage("You must have to fill all the box before you procced",15000)
        self.BackUP()
        


    def Add_data(self):
        Add={}
        AllData=json.load(open("../Projects.json","r"))
        self.addbtn.setEnabled(False)
        id=str(uuid.uuid4())
        title=self.titletxt.text()
        des=self.destxt.toPlainText()
        readmeurl=self.readmeurl.text()
        imageurl=self.imageurl.text()
        ssurl=str(self.ssurl.text()).replace(" ",",")
        githuburl=self.githuburl.text()
        model_url=""
        Cdate=datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')
        if self.ISAI:
            model_url=self.model_url.text()

        search=title+" "+des+" "+ssurl+" "+githuburl+" "+Cdate
        if title and des and imageurl and ssurl and githuburl and readmeurl :
            self.statusBar.showMessage("Adding Data")
            Add["Uid"]=id
            Add["Title"]=title
            Add["Des"]=des
            Add["ImageUrl"]=imageurl
            Add["SsUrl"]=ssurl
            Add["ReadmeUrl"]=readmeurl
            Add["GithubUrl"]=githuburl
            Add["ISAI"]=self.ISAI
            Add["ModelUrl"]=model_url
            Add["CreatedDate"]=Cdate
            Add["UpdateDate"]="No Update"
            Add["Search"]=search+"No Update"
            AllData[id]=[Add]
            json.dump(AllData,open("../Projects.json","w"))
            self.Cancel()
            self.refresh()
            self.statusBar.showMessage("Data has been added successfully")

        else:
            self.statusBar.showMessage("You must have to fill all the box before you procced")
        self.BackUP()




        


























class TableModel(QtCore.QAbstractTableModel):
    try:
        def __init__(self, data, colomue, row):
            super(TableModel, self).__init__()
            self._data = data
            self._colomue = colomue
            self._row = row

        def headerData(self, section: int, orientation: Qt.Orientation, role: int = ...):
            if orientation == Qt.Horizontal and role == Qt.DisplayRole:
                # return f"Column {section + 1}"
                return self._colomue[section]
            if orientation == Qt.Vertical and role == Qt.DisplayRole:
                # return f"Column {section + 1}"
                return self._row[section]

        def data(self, index, role):
            if role == Qt.DisplayRole:
                return self._data[index.row()][index.column()]

        def rowCount(self, index):
            return len(self._data)

        def columnCount(self, index):
            return len(self._data[0])
    except:
        pass


app = QtWidgets.QApplication(sys.argv)
window = UI()
<<<<<<< HEAD
sys.exit(app.exec_())
=======
sys.exit(app.exec_())
>>>>>>> 25d6ad9ed3e85326d22c7be46c8ebf714bba64f6
