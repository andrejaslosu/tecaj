(function () {
    var allMeasurements = {};
    document.getElementById("date").valueAsDate = new Date();

    class Measurement {
        constructor(date, height, weight) {
            this.date = date;
            this.height = height / 100; // cm convert to meters
            this.weight = weight; // kg 
            this.dateNow = Date.now();
            this.bmi = this.calculateBmi();
        
        }

        calculateBmi() {
            return (this.weight / (this.height ** 2)).toFixed(2);
        }
        putToStorage() {
            if (localStorage !== undefined) {
                if (localStorage.getItem("measurements") === null) {
                    allMeasurements[this.date] = this;
                    localStorage.setItem("measurements", JSON.stringify(allMeasurements));
                }
                else {
                    allMeasurements = JSON.parse(localStorage.getItem("measurements"));
                    localStorage.removeItem("measurements");
                    this.putToStorage();
                }
            }
        }

    }

    function getFromStorage() {
        if (localStorage !== undefined) {
            if (localStorage.getItem("measurements") !== null) {
                return JSON.parse(localStorage.getItem("measurements"))
            }
        }
    }

    let saveResults = document.getElementById("save");

    function renderChart(data, labels) {
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'BMI',
                    data: data,
                }]
            },
        });
    }

    saveResults.addEventListener('click', function () {
        event.preventDefault();
        let height = document.getElementById("height");
        let width = document.getElementById("weight");
        let date = document.getElementById("date");
        let bmi = document.getElementById("bmi");
        let data = document.getElementById("data");

        let measurements = new Measurement(date.value, height.value, width.value)
        measurements.putToStorage();

        let bmiResult = measurements.calculateBmi();

        bmi.classList.remove("hidden");
        bmi.innerText = "Your BMI is: " + bmiResult;

        // data.classList.remove("hidden");

        let previousData = getFromStorage();
        console.log(previousData);

        var result = [];
        var dataBim = [];
        var labels = [];
         for (const [key, value] of Object.entries(previousData).sort()) {
             //console.log(value.bmi);
            console.log(key);
            /*for(var i in value)
            result.push([i,value[i]]);

                console.log((JSON.stringify(result)));
                */

               dataBim.push(value.bmi);
                labels.push(value.date);

            }


            
                //data = [20000, 14000, 12000, 15000, 18000, 19000, 22000];
                //labels =  ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                renderChart(dataBim, labels);
            
    
    });
})()



/*
$("#renderBtn").click(
    function () {
        data = [20000, 14000, 12000, 15000, 18000, 19000, 22000];
        labels =  ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        renderChart(data, labels);
    }
);*/