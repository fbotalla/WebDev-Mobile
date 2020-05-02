function calculateFirstResult(){
   var firstinput = document.getElementById('firstinput').value;
   document.getElementById('firstresult').innerHTML = firstinput;
   console.log(firstinput);
}

const getNum = ()=>{
    var secondinput = document.getElementById('secondinput').value;
    return secondinput;
}
function calculateSecondResult(num){
    var sum = 0;
    for(var i = 1; i <= num; i++){
         sum += i;
         console.log(sum);
    }
    document.getElementById('secondresult').innerHTML = sum;
}

function calculateThirdResult() {
    var firstinput = document.getElementById('firstinput').value;
    var secondinput = document.getElementById('secondinput').value;
    var thirdinput = document.getElementById('thirdinput').value;

    let sum = parseInt(firstinput) + parseInt(secondinput) + parseInt(thirdinput)

    document.getElementById('thirdresult').innerHTML = sum;
  }