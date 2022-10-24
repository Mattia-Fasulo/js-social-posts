//funzione svuota div
const clearDiv = function (div) {
    div.innerHTML = '';
}

//funzione per numeri rando
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function isEven(num){
    if(num % 2 === 0){
        return true;
    } else {
        return false;
    }
}
function notificationError(msgError){
    const alerta = document.createElement('div');
    alerta.className='alert alert-danger';
    alerta.innerHTML = msgError;
    return alerta;
}
function removeFirstNotification(){
    const alertToRemove = document.querySelector('.alert');
    console.log(alertToRemove);
   if(alertToRemove) alertToRemove.remove();
}


function reverseString(parola){
let parolaGirata = parola.split('').reverse().join('');
console.log(parolaGirata);
}


//funzione che rende maiuscola la prima lettera
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

//funzione che eestrare da una stringa solo le lettere maiuscole
function onlyCapitalLetters (str) { 
let newStr = "";
for (let i = 0; i < str.length; i ++) {
    if (str[i].includes("ABCDEFGHIJKLMNOPQRSTUVWXYZ")) {
        newStr += str[i];
    }
}
return newStr;
}