
from PyQt5 import QtWidgets, uic
import MySQL_connecter as MS
import sys
class UI(QtWidgets.QMainWindow):
    def __init__(self):
        super(UI, self).__init__()
        uic.loadUi("./Layouts/Main.ui", self)
        self.show()
        self.BooksList=[]
        SQL_CMD="SELECT * FROM `books` SORT BY `NAME`"
        Books_data=MS.GetData(SQL_CMD)
        for j in Books_data:
            self.BooksList.append(j) 
        self.Update_Books_List(self.BooksList)

    def Update_Book_List(self):
        # Update Book card here in Books showing grid box
        """ Since this project is based on search technique, 
            so not focusing on UI """
        pass


app = QtWidgets.QApplication(sys.argv)
window = UI()
sys.exit(app.exec_())