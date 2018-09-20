// this is a validator that makes sure user entered correct values
// a validator is a function that takes value from field and returns a string
// if error
// first 3 vhecks for username and password

// required checks if value has been entered
export const required = value => (value ? undefined : 'Required');
// nonEmpty checks that a string (not whitespace) has been entered
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
// isTrimmed makes sure user hasnt entered a string with leading or trailing whitespace
export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';
// password field uses length to check if pw contains right amount of chars
// a function which returns another function, and inner function returns string
// if field is invalid. it is a validator creator function
// outer function takes length obj (describe max and min lenght)
// returns a validator function takes value from field and carries check
export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};

// Also a validator creator, ensures two fields have identical values entered
// make sure user enters same pw each time
// field arg to creator function is name of field we want identical value for
// validator function makes use of 2nd arg from redux form (allvalues)
// obj which contains values entered into each form field.
export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';
