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
                    allMeasurements[this.dateNow] = this;
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

         for (const [key, value] of Object.entries(previousData)) {
             console.log(value.bmi);
         }
    
    });
})()