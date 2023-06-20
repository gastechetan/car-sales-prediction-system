let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}

let content = document.querySelector('#prediqt');
let go_back_p = document.querySelector('#go_back_p');
let submit_btn = document.querySelector('#submit_btn');
submit_btn.addEventListener('click', () => {
    content.innerHTML = "<h1 class='heading'><span> Result</span></h1><div class='box-container'><div class='box' ><div class='center'><h3 id='displayText' style='text-align: center;'></h3><div><h1 class='heading' style='font-size:15ch;text-align:center;color: aliceblue;'><span id='prediction' class='counter'></span></h1></div></div></div></div>";
    document.getElementById("submit_btn").disabled = true;
    document.getElementById("go_back_p").disabled = false;
});
go_back_p.addEventListener('click', () => {
    window.location.reload();
    document.getElementById("go_back_p").disabled = true;
    document.getElementById("submit_btn").disabled = false;
});

var car_data = {
    "Hatchback":{
        "Datsun":["Go","RediGo"],
        "Fiat":["Evo, Avventura"],
        "Ford":["Figo"],
        "Honda":["Brio","Jazz"],
        "Hyundai":["Elite i20","Eon","Grand i10"],
        "Mahindra":["KUV100"],
        "Maruti Suzuki":["Alto","Baleno","Celerio","Ignis","S-Cross","Swift","WagonR"],
        "Nissan":["Micra"],
        "Renault":["Kwid"],
        "Tata":["Bolt","Nano","Tiago"],
        "Toyota":["Liva, Cross"],
        "Volkswagen":["Polo"]
    },
    "MUV":{
        "Datsun":["Go Plus"],
        "Mahindra":["Bolero","Xylo"],
        "Maruti Suzuki":["Ertiga","Gypsy","Omni","Eeco"],
        "Renault":["Lodgy"],
        "Tata":["Hexa","Sumo"],
        "Toyota":["Innova"]
    },
    "Sedan":{
        "Fiat":["Linea"],
        "Ford":["Aspire"],
        "Honda":["Amaze","City"],
        "Hyundai":["Elantra","Verna","Xcent"],
        "Mahindra":["Verito, Vibe"],
        "Maruti Suzuki":["Ciaz","Dzire"],
        "Nissan":["Sunny"],
        "Skoda":["Octavia","Rapid","Superb"],
        "Tata":["Tigor","Zest"],
        "Toyota":["Camry","Corolla","Etios"],
        "Volkswagen":["Vento"]
    },
    "SUV":{
        "Ford":["EcoSport","Endeavour"],
        "Honda":["BRV","CRV","WRV"],
        "Hyundai":["Creta","Tucson"],
        "Mahindra":["Scorpio","TUV300","XUV500"],
        "Maruti Suzuki":["Vitara Brezza"],
        "Nissan":["Terrano"],
        "Tata":["Safari, Storme"],
        "Toyota":["Fortuner","Landcruiser"]
    },
    "Others":{
        "Ford":["Mustang"]
    }
}
window.onload = function () {
    var body_type = document.getElementById("body_type");
    var oem = document.getElementById("oem");
    var car = document.getElementById("car");

    for (var x in car_data) {
        body_type.options[body_type.options.length] = new Option(x, x);
    }
    body_type.onchange = function () {
        oem.length = 1;
        car.length = 1;
        for (var y in car_data[this.value]) {
            oem.options[oem.options.length] = new Option(y, y);
        }
    }
    oem.onchange = function () {
        car.length = 1;
        var z = car_data[body_type.value][this.value];
        for (var i = 0; i < z.length; i++) {
            car.options[car.options.length] = new Option(z[i], z[i]);
        }
       
    }
    car.onchange = function () {
        document.getElementById("submit_btn").disabled = false;
    }
}

function form_handler(event) {
    event.preventDefault();

}

function send_data() {
    var oem = document.getElementById("oem");
    var car = document.getElementById("car");
    var month = document.getElementById("MONTH");
    var printmonth;

    var monthText = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    var monthNum = [1,2,3,4,5,6,7,8,9,10,11,12];
    for(var i = 0; i < monthNum.length; i++) {
        if (month.value == monthNum[i]) {
            printmonth = monthText[i];
        }
    }
    
    document.querySelector('form').addEventListener('submit', form_handler);
    const fd = new FormData(document.querySelector('form'));
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/predict', true);
    document.getElementById("prediction").innerHTML="Loading...";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            document.getElementById("displayText").innerHTML = "Sales Prediction of " + oem.value + "&nbsp;" + car.value + "&nbsp;for&nbsp;" + printmonth + "&nbsp;2018 is:";
           
            const counter = document.querySelector('.counter');
            counter.innerText = '0';
            const updateCounter = () => {
                const target = parseInt(xhr.responseText);
                const c = +counter.innerText;
                const increment = target / 250;
                if (c < target) {
                    counter.innerText = `${Math.ceil(c+increment)}`;
                    setTimeout(updateCounter, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        }
    }
    xhr.unload = function () {};
    xhr.send(fd);
}