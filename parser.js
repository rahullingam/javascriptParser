const unsupported = require('./unsupported.json');
const operations = require('./operations.json');
let finalValue;

//Input your string here
let str = 'What is 5';


// Parses and evaluates input text
const parser = (str) => {
    const unsupportedOpts= unsupported.filter((item) => hasWord(str, item));
    if (unsupportedOpts.length > 0) {
        return 'Invalid input to parser';
    } else if (getDigits(str).length == 0) {
        return 'Invalid input, no arithmetic operations can be performed';
    } else if (getDigits(str).length == 1) {
        return getDigits(str)[0];
    } else {
        for(let key in operations) { 
            if (isRepeated(str, key)) {
                return 'Invalid Syntax';
            } else {
                let value = operations[key];
                finalValue = fetchValue(str, key, value);
                if(finalValue){
                    return finalValue;
                } else {
                    continue;
                }
            }
        }
    
    }
}
/**
 * returns back the calculated value
 * @param {*} str 
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
const fetchValue = (str, key, value) => {
    if (hasWord(str, key)) {
        // let text = str.replace(/[A-Za-z]/g, "");
        // text = text.replace(/\s/g, "")
        return calculate(getDigits(str), value);
    }
};

// returns digits present in input string
const getDigits = (str) => {
    let match = str.match(/[+\-0-9]+/g)
    if (match) {
        return match.map(Number);
    } else {
        return [];
    }
    
}

// Performs arithmetic operations
const calculate = (digits, operation) => {
    switch (operation) {
        case '+':
            return digits.reduce((a, b)=> a+b);
        case '-':
            return digits.reduce((a, b)=> a-b);
        case '*':
            return digits.reduce((a, b)=> a*b);
        case '/':
            return digits.reduce((a, b)=> a/b);
    }
}

// Checks duplicate operations in the input text
const isRepeated = (str, key) => {
    let words = str.toLowerCase().split(' '); //check for ,
    let duplicates = words.filter((item) => item == key)
    return duplicates.length > 1;
}

const hasWord = (str, word) => str.includes(word);

console.log(parser(str));


