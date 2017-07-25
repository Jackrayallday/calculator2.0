//global variable declaration
var inputs = [""];
var i = 0;
var num1 = null;
var num2 = null;
var totalInt1 = null;
var totalInt2 = null;
var operator;
var equalFire = false;
var storeNum2 = null;
var ogOperator = null;
//Click handlers
$(document).ready(function (){
    $("#zero").click(numberPressed);
    $("#one").click(numberPressed);
    $("#two").click(numberPressed);
    $("#three").click(numberPressed);
    $("#four").click(numberPressed);
    $("#five").click(numberPressed);
    $("#six").click(numberPressed);
    $("#seven").click(numberPressed);
    $("#eight").click(numberPressed);
    $("#nine").click(numberPressed);
    $("#addition").click(operatorPressed);
    $("#subtraction").click(operatorPressed);
    $("#multiplication").click(operatorPressed);
    $("#division").click(operatorPressed);
    $("#clear").click(clearPressed);
    $("#clearEntry").click(clearEntryPressed);
    $("#equal").click(equalPressed);
    $("#decimal").click(numberPressed);
});

//The function that runs if a numeric button is clicked
function numberPressed() {

    //all of my values that I am getting from the button pressing I am storing in an array (inputs[]).
    //the variable totalInt1 is used as a snapshot of what the current index in the array is at that time.
    if($(this).text() == '.'){
            if(inputs[i].includes(".")){
                return;
            }
    }
    if(num1 == null) {
        var val = $(this).text();
        inputs[i] += val;
        totalInt1 = inputs[i];
        $("#displayScreen p").text(totalInt1);
    }
    else if(num1 != null && num2 !=null){
        var ogOperator = inputs[inputs.length-3];
        num1 = doMath(num1 , num2 , ogOperator);
        num2 = null;
        ++i;
        ogOperator = operator;
    }
    else if(num2 == null) {
        var val = $(this).text();
        if(inputs[i] == null){
            inputs[i] = "";
        }
        inputs[i] += val;
        totalInt2 = inputs[i];
        $("#displayScreen p").text(totalInt2);
    }
    equalFire = false;
}


//The function that runs if a operator is clicked
function operatorPressed(){
    if(num1 == this){
        return;
    }
    if(num1 == null){
        ++i;
        num1 = totalInt1;
    }
    if(num2 == null) {
        num2 = totalInt2;
        var val = $(this).text();
        inputs.push(val);
        $("#displayScreen p").text(val);
        ++i;
        // inputs[i] = val;
    }else{
        var val = $(this).text();
        inputs.push(val);
        $("#displayScreen p").text(val);

    }
    if(inputs[0] == ""){
        inputs = [""];
        i = 0;
        return;
    }
    operator = $(this).text();
}


//The function that runs if the clear button is pressed
function clearPressed(){
    inputs = [""];
    $("#displayScreen p").text(0);
    i = 0;
    num1 = null;
    num2 = null;
    operator = null;
    totalInt1= null;
    totalInt2 = null;
    storeNum2 = null;
    equalFire = false;

}

//This function deletes the last thing in the inputs array and displays whatever you pressed before it
function clearEntryPressed(){
        inputs[inputs.length-1] = "";
        if(inputs.length-1 == 0){
            $("#displayScreen p").text(0);
        }
        $("#displayScreen p").text(inputs[inputs.length-2]);
}



//The function that runs if the equals sign is pressed
function equalPressed() {
    if(equalFire == true){
        num1 = doMath(num1 , storeNum2 , operator);
        $("#displayScreen p").text(parseFloat(num1).toFixed(3));
    }else {
        if(inputs.length <= 2){
            num2 = num1;
        }
        num1 = doMath(num1, num2, operator);
        $("#displayScreen p").text(num1);
        inputs = [];
        num2 = null;
        totalInt2 = null;
        inputs[0] = num1;
        i = 1;
        equalFire = true;
    }
}

//The function that takes the parameter data (num1 num2 operator) and interprets what to do with it based on the parameters
function doMath(num1 ,num2 , operator) {
    if (num2 == null) {
        if(totalInt2 == null){
            totalInt2 = parseFloat(num1);
        }
        num2 = totalInt2;
        storeNum2 = parseFloat(num2);

    }
    if (operator == "+") {
        num1 = parseFloat(num1) + parseFloat(num2);
    }
    else if (operator == "-") {
        num1 = parseFloat(num1) - parseFloat(num2);
    }
    else if (operator == "/") {
        if(num2 == 0){
            $("#displayScreen p").text("Error");
            totalInt2 = null;
            return;
        }
        num1 = parseFloat(num1) / parseFloat(num2);
    }
    else if (operator == "X") {
        num1 = parseFloat(num1) * parseFloat(num2);
    }
    return num1.toFixed(3);
}