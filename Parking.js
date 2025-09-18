// Proyecto 1 'Mujeres Digitales' - Estacionamiento
// Por: Angélica Grajales
// ======================================================================================================
// Objetivo: Calcular las tarifas de estacionamiento basándose en las horas de estacionamiento, 
// el tipo de vehículo y las condiciones de horas pico.
// ======================================================================================================
// Propósito principal: Estar entre las 10 mejores estudiantes del curso :)
// ======================================================================================================

// Variable global: totalFee
// Scope: Seria global porque puede funcionar o accederse desde cualquier parte del código
// Hoisting : Con 'var' la variable se eleva al inicio del codigo, pero su valor seria undefined hasta que se le asigne un valor
var totalFee = 0;

// Función para calcular la tarifa de estacionamiento
function calculateParkingFee() {
    // Inputs con prompts para obtener datos del usuario

    // Variable y scope local: por que esta declarada dentro de la función no funcionara por fuera
    // Tipo Number (parseInt convierte de string del prompt a entero)
    // Hoisting elevada al inicio de la funcion
    var parkedHours = parseInt(prompt("Enter parked hours:"));

    // Variable y scope local: vehicleType por que esta declarada dentro de la función no funcionara por fuera
    // Tipo String (texto del prompt, convertido a minúsculas con toLowerCase() evitando errores por mayus
    // Hoisting elevada al inicio de la funcion
    var vehicleType = prompt("Enter vehicle type (car, motorcycle, truck):").toLowerCase();

    // Variable y scope local: isPeakHour por que esta declarada dentro de la función no funcionara por fuera
    // Tipo Boolean (true/false)
    // Hoisting elevada al inicio de la funcion
    var isPeakHour = confirm("Is it peak hour? (OK for yes, Cancel for no)");

    // Output inicial: Mensaje de bienvenida (cumple con output requerido).
    // Usa console.log para mostrar en consola.
    console.log("Welcome to the parking fee calculator.");

    // Condicional If-Else para validar horas de estacionamiento
    // Verifica si horas <=1 o inválido (NaN si no es numero)
    // Scope del bloque: Si es let/const dentro del bloque no se puede usar fuera del bloque
    if (parkedHours <= 1 || isNaN(parkedHours)) { // Por si no es un numero el input 
        // Output: Mensaje 
        console.log("Free parking for the first hour or invalid input.");
        // Actualiza global: totalFee = 0 (demuestra acceso a global desde función).
        totalFee = 0;
    } else {
        // Output: Mensaje de cálculo.
        console.log("Calculating fee for extra hours...");

        // Bucle for: Proceso repetitivo (cumple con bucle requerido).
        // Suma $5 por cada hora adicional después de la primera.
        // Variable en bucle: i.
        // Tipo numerico 
        // Inicialización: En el for, i=1 (no se declara antes).
        // Scope: De función con 'var' (accesible fuera del for, pero no recomendado; 
        // Hoisting: 'var i' se eleva al top de la function (undefined antes del for)
        for (var i = 1; i < parkedHours; i++) {  // Itera (horas-1) veces
            // Actualiza global: totalFee +=5 en cada iteración.
            totalFee += 5;
        }

        // Condicional para hora pico (If)
        // Ajuste por hora pico: Multiplica por 1.5 que es el 50% extra.
        // Usa variable local isPeakHour.
        if (isPeakHour) {
            // Actualiza global: totalFee *=1.5.
            totalFee *= 1.5;  // Equivale a +50%; usa *= para precisión con decimales.
            // Output: Mensaje de ajuste.
            console.log("Adjustment for peak hour: +50%.");
        }

        // Switch: Selección múltiple 
        switch (vehicleType) {
            case "car":
                // Actualiza global: +2.
                totalFee += 2;
                // Output: Mensaje específico.
                console.log("Adjustment for car: +$2.");
                break;  // Sale del switch.
            case "motorcycle":
                // Actualiza global: -1 (descuento).
                totalFee -= 1;
                // Output: Mensaje.
                console.log("Discount for motorcycle: -$1.");
                break;
            case "truck":
                // Actualiza global: +4.
                totalFee += 4;
                // Output: Mensaje.
                console.log("Adjustment for truck: +$4.");
                break;
            default:
                // Output: Error.
                console.log("Invalid vehicle type.");
                // Actualiza global: 0 para reset.
                totalFee = 0;
        }
    }

    // Output final: Muestra total a pagar
    // Concatena string con número (totalFee)
    console.log("Total to pay: $" + totalFee);

    // Llamar la función
calculateParkingFee(); }