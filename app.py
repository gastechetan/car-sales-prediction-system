import pickle
import numpy as np
import pandas as pd
from flask import Flask,render_template,request

app = Flask(__name__, template_folder='templates')
model = pickle.load(open('prediqt.pkl', 'rb'))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    year = 2018
    month = int(request.form.get('MONTH'))
    oem = request.form.get('oem')
    model1 = request.form.get('car')
    body_type = request.form.get('body_type')

    car_with_price = {"Alto":3.25,"Amaze":6.38,"Aspire":7.28,"Baleno":6.03,"Bolero":8.99,"Bolt":5.25,"Brio":4.73,"BRV":13.9,"Camry":41.7,"Celerio":5.14,"Ciaz":8.67,"City":15.18,"Corolla":16.46,"Creta":10.22,"CRV":28.34,"Dzire":6.09,"EcoSport":8.19,"Elantra":17.86,"Elite i20":5.57,"Endeavour":29.99,"Eon":3.33,"Ertiga":8.11,"Etios":7.04,"Evo, Avventura":6.57,"Figo":5.82,"Fortuner":31.38,"Go":4.03,"Go Plus":4.26,"Grand i10":5,"Gypsy":6.5,"Hexa":13.69,"Ignis":5.08,"Innova":17.3,"Jazz":7.81,"KUV100":6.19,"Kwid":4.24,"Landcruiser":147,"Linea":7.19,"Liva, Cross":5.68,"Lodgy":8.63,"Micra":6.63,"Mustang":74.61,"Nano":2.05,"Octavia":26.29,"Omni":2.08,"Polo":6.49,"Rapid":11.99,"RediGo":3.98,"Safari, Storme":11.09,"Scorpio":13.18,"S-Cross":8.6,"Sumo":5.26,"Sunny":7.07,"Superb":32.85,"Swift":5.9,"Terrano":10,"Tiago":5.19,"Tigor":5.79,"Tucson":23,"TUV300":15,"Vento":10,"Verito, Vibe":10,"Verna":8,"Vitara Brezza":7.68,"WagonR":5.16,"WRV":8.82,"Xcent":6,"XUV500":13,"Xylo":8.86,"Zest":5.82,"Eeco":4.53}

    for i in car_with_price:
        if(model1 == i):
            price =  car_with_price[i]
    
    prediction = model.predict(pd.DataFrame([[oem,model1,body_type,price, year, month]],columns=['OEM','MODEL','BODY TYPE','PRICE IN LAKHS','YEAR','MONTH']))
    return str(int(prediction[0]))

if __name__ == '__main__':
    app.run(debug=True)