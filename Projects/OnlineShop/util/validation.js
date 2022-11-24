// Function to check for empty for value and value with trim()
function isEmpty(value){
    return !value || value.trim() ==="";
}

// Function to check user credentials
function userCredentialsAreValid(email,password){
    return (email && email.includes("@") && password && password.trim().length>=6);
}

// Function with All User Details Valid
function userDetailsAreValid(email,password,name,street,postal,city){
    return ( userCredentialsAreValid(email,password) && !isEmpty(name) &&  !isEmpty(street) && !isEmpty(postal) && !isEmpty(city) );
}

// Function to Confirm Email address in both email fields
function emailIsConfirmed(email,confirmEmail){
    return email === confirmEmail;
}
module.exports = {
    userdetailsarevalid: userCredentialsAreValid,
    emailisconfirmed : emailIsConfirmed}