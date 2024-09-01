import pymysql

def ConnectToDatabase():
    global Conn
    Conn = pymysql.connect( 
        host='localhost', 
        user="root",  
        password = "", 
        db="ebook")
    cur = Conn.cursor() 
    cur.execute("select * from students") 
    output = cur.fetchall() 
    return True if len(output)>0 else False
ConnectToDatabase()
 

def GetData(CMD):
    cur = Conn.cursor() 
    cur.execute(CMD) 
    output = cur.fetchall() 
    return output


