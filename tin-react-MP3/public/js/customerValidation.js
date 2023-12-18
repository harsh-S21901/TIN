function validateCustomerForm() {
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');

    const errorName = document.getElementById('errorName');
    const errorSurname = document.getElementById('errorSurname');

    let validation = true;

    resetError([nameInput, surnameInput], [errorName,errorSurname]);

    if(!validateRequired(nameInput.value)){
        validation = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Please Enter First Name";
    }
    else if (!validateLength(nameInput.value, 1, 100)){
        validation = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Please Eneter name between 1 to 100 characters";
    }

    if(!validateRequired(surnameInput.value)){
        validation = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Please Eneter Last Name";
    }
    else if (!validateLength(surnameInput.value, 1, 100)){
        validation = false;
        surnameInput.classList.add("error-input");
        errorSurname.innerText = "Please Eneter name between 1 to 100 characters";
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

function validateLength(input, min, max) {
    if (!input) return false;
    input = inputValue.toString().trim();
    const length = inputValue.length;
    if (length > max && length < min) return false;
    return true;
}