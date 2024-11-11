export const ErrorCodes = {
    INCORRECT_PASSWORD:{
        CODE:"INCORRECT_PASSWORD",
        MESSAGE: "Incorrect password"


},
UNAUTHORISED:{
    CODE: "UNAUTHORISED",
    MESSAGE:"You are not authorised to perform ths action"
},
EMPLOYEE_WITH_ID_NOT_FOUND:{
    CODE:"EMPLOEE_WITH_ID_NOT_FOUND",
    MESSAGE:"The employ with corresponding id is not found"
},


};

export type CustomError = typeof ErrorCodes[keyof typeof ErrorCodes];