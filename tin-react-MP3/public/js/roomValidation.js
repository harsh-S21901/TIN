function validateRoomform(){
    const roomInput=document.getElementById('room');
    const rateInput=document.getElementById('rate');

    const errorroomNumber=document.getElementById('errorroomNumber');
    const errorRate=document.getElementById('errorRate');   

    let validation=true;
    resetError([roomInput, rateInput], [errorroomNumber,errorRate]);

    if(!validateRequired(roomInput.value) || roomInput.value == ""){
        validation=false;
        roomInput.classList.add("error-input");
        errorroomNumber.innerText="Please enter room number";
    }
    
    if(!validateRequired(rateInput.value) || rateInput.value == ""){
        validation=false;
        rateInput.classList.add("error-input");
        errorRate.innerText="Please enter rate";
    }
    return validation;
}

function resetError(inputs, errorTexts) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }

    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
}

function validateRequired(input) {
    if (!inputValue) return false;
    inputValue = inputValue.toString().trim();
    if (inputValue === "") return false;
    return true;
}

