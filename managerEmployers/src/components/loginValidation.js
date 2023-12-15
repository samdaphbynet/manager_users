function Validation(values) {
    let error = {}
    const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const password_pattern = /^[A-Za-z]\w{7,14}$/

    if (values.email === "") {
        error.email = "Name should not be empty"
    }

    else if (!email_pattern.test(values.email)) {
        error.email = "Email Didn't match"
    }else {
        error.email = ""
    }

    if (values.password === "") {
        error.password = "Password should not be empty"
    }

    else if (!password_pattern.test(values.password)) {
        error.password = "Password Didn't match"
    }else {
        error.password = ""
    }

    return error
    
}

export default Validation;