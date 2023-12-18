function validateBookingform(){
    const bookingNumberInput=document.getElementById('IdBooking');
    const roomNumberInput=document.getElementById('IdRoom');
    const checkInInput=document.getElementById('dateFrom');
    const checkoutInput=document.getElementById('dateTo');

    const errorBookingNumber=document.getElementById('errorIdBooking');
    const errorRoomNumber=document.getElementById('errorIdRoom');
    const errorCheckIn=document.getElementById('errorDateFrom');
    const errorCheckout=document.getElementById('errorDateTo');

    let validation=true;

    resetError([bookingNumberInput,roomNumberInput,checkInInput,checkoutInput],[errorBookingNumber,errorRoomNumber,errorCheckIn,errorCheckout]);

    if(!validateRequired(bookingNumberInput.value) || bookingNumberInput.value == ""){
        validation=false;
        bookingNumberInput.classList.add("error-input");
        errorBookingNumber.innerText= "Please enter booking number";
    }
    
    if(!validateRequired(roomNumberInput.value) || roomNumberInput.value==""){
        validation=false;
        roomNumberInput.classList.add("error-input");
        errorRoomNumber.innerText="Please enter room number";
    }

    if(!validateRequired(checkInInput.value)){
        validation=false;
        checkInInput.classList.add("error-input");
        errorCheckIn.innerText="Please enter check in date";
    }
    else if (!validDate(checkInInput.value)){
        validation=false;
        checkInInput.classList.add("error-input");
        errorCheckIn.innerText=" date is not valid";
    }

    if(!validateRequired(checkoutInput.value) && !validDate(checkoutInput.value)){
        validation=false;
        checkoutInput.classList.add("error-input");
        errorCheckout.innerText="Please enter date in format yyyy-mm-dd";
    }
    else if(!compareDate(checkoutInput) && validDate(checkoutInput.value)){
        validation=false;
        checkoutInput.classList.add("error-input");
        errorCheckout.innerText="date should not be less than check in date"
    }




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

function validDate(value){
    const date=/^\d{4}-\d{2}-\d{2}$/;

    if(value.match(date) == null){
    return false;
    }

    return date.test(value);
    
}

function compareDate(value, compareDate)
{
    const date=/^\d{4}-\d{2}-\d{2}$/;

    if(value.match(date) == null){
        return false;
        }

        if(!date.test(value))
        return false;

        if(!date.test(compareDate))
        return false;

     const valueDate = new Date(value);
     const compareDateTo = new Date(compareDateTo);

     if(valueDate.getTime() <= compareDateTo.getTime())
     return false;

     return true;

}

