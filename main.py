
import sys, sqlite3
from pathlib import Path
from PySide6.QtWidgets import *
from PySide6.QtCore import Qt

DB="agency.db"

def init_db():
    con=sqlite3.connect(DB)
    cur=con.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS clients(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, phone TEXT, service TEXT, price REAL, deposit REAL
    )""")
    con.commit(); con.close()

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("AgencyFlow V1")
        self.resize(1000,600)

        tabs=QTabWidget()
        self.setCentralWidget(tabs)

        dash=QWidget()
        dlay=QVBoxLayout(dash)
        dlay.addWidget(QLabel("AgencyFlow Dashboard"))
        tabs.addTab(dash,"Dashboard")

        clients=QWidget()
        lay=QVBoxLayout(clients)

        self.name=QLineEdit()
        self.phone=QLineEdit()
        self.service=QLineEdit()
        self.price=QLineEdit()
        self.deposit=QLineEdit()

        for lbl,w in [
            ("Client Name",self.name),
            ("Phone",self.phone),
            ("Service",self.service),
            ("Price",self.price),
            ("Deposit",self.deposit)
        ]:
            lay.addWidget(QLabel(lbl)); lay.addWidget(w)

        btn=QPushButton("Save Client")
        btn.clicked.connect(self.save_client)
        lay.addWidget(btn)

        self.table=QTableWidget()
        lay.addWidget(self.table)

        tabs.addTab(clients,"Clients")
        self.load_clients()

    def save_client(self):
        con=sqlite3.connect(DB)
        cur=con.cursor()
        cur.execute("INSERT INTO clients(name,phone,service,price,deposit) VALUES(?,?,?,?,?)",
                    (self.name.text(),self.phone.text(),self.service.text(),
                     self.price.text() or 0,self.deposit.text() or 0))
        con.commit(); con.close()
        self.load_clients()

    def load_clients(self):
        con=sqlite3.connect(DB)
        rows=con.execute("SELECT * FROM clients").fetchall()
        con.close()
        self.table.setColumnCount(6)
        self.table.setHorizontalHeaderLabels(["ID","Name","Phone","Service","Price","Deposit"])
        self.table.setRowCount(len(rows))
        for r,row in enumerate(rows):
            for c,val in enumerate(row):
                self.table.setItem(r,c,QTableWidgetItem(str(val)))

if __name__=="__main__":
    init_db()
    app=QApplication(sys.argv)
    w=MainWindow()
    w.show()
    sys.exit(app.exec())
