const printResults = (...args) => {
    for (let i = 0; i < args.length / 2; i++) {
        console.log(args[i*2], args[i*2+1])
    }
}

// String length

const checkStringLength = (string, maxLength) => string.length <= maxLength;

printResults(
    'checkStringLength("test", 10) = ', checkStringLength("test", 10),
    'checkStringLength("test", 4) = ', checkStringLength("test", 4),
    'checkStringLength("test", 1) = ', checkStringLength("test", 1),
);

// Palindrome

const isStringPalindromeSimple = (value) => {
    if (!value.length) {
        return false
    }

    const sanitizedValue = value.toLowerCase().replaceAll(/\s+/g, '');
    return sanitizedValue.split('').reverse().join('') === sanitizedValue;
}

const isStringPalindromeOptimal = (value) => {
    if (!value.length) {
        return false
    }

    for (let i = 0, y = value.length - 1; i < value.length / 2; i++, y--) {
        if (value[i] !== value[y]) {
            return false;
        }
    }

    return true;
}

const isIntPalindrome = (value) => {
    if (value < 0 || (value % 10 === 0 && value !== 0)) {
        return false;
    }

    let reversedValue = 0;
    const sourceValue = value;
    while (value > 0) {
        const lastDigit = value % 10;
        reversedValue = reversedValue * 10 + lastDigit;
        value = Math.ceil(value / 10);
    }

    return sourceValue === reversedValue;
}

console.log()
printResults(
    'isStringPalindromeSimple("testset") = ', isStringPalindromeSimple('testset'),
    'isStringPalindromeSimple("tesset") = ', isStringPalindromeSimple('tesset'),
    'isStringPalindromeSimple("test") = ', isStringPalindromeSimple('test'),
    'isStringPalindromeSimple(" ") = ', isStringPalindromeSimple(' '),
    'isStringPalindromeSimple() = ', isStringPalindromeSimple(''),
);

console.log()
printResults(
    'isStringPalindromeOptimal("testset") = ', isStringPalindromeOptimal('testset'),
    'isStringPalindromeOptimal("tesset") = ', isStringPalindromeOptimal('tesset'),
    'isStringPalindromeOptimal("test") = ', isStringPalindromeOptimal('test'),
    'isStringPalindromeOptimal(" ") = ', isStringPalindromeOptimal(' '),
    'isStringPalindromeOptimal() = ', isStringPalindromeOptimal(''),
);

console.log()
printResults(
    'isIntPalindrome(123454321) = ', isIntPalindrome(123454321),
    'isIntPalindrome(123404321) = ', isIntPalindrome(123404321),
    'isIntPalindrome(12344321) = ', isIntPalindrome(12344321),
    'isIntPalindrome(12345) = ', isIntPalindrome(12345),
    'isIntPalindrome() = ', isIntPalindrome(),
);

// extractNumber

const extractNumber = (value) => {
    const nums = String(value).split('').filter((char) => char >= '0' && char <= '9').join('');
    return nums ? nums : NaN;
}

console.log()
printResults(
    'extractNumber("test123454321test") = ', extractNumber("test123454321test"),
    'extractNumber("1234test04321") = ', extractNumber("1234test04321"),
    'extractNumber("t1e2s3t44321") = ', extractNumber("t1e2s3t44321"),
    'extractNumber("12345") = ', extractNumber("12345"),
    'extractNumber("test") = ', extractNumber("test"),
    'extractNumber(" ") = ', extractNumber(" "),
    'extractNumber(12345) = ', extractNumber(12345),
    'extractNumber(-12345) = ', extractNumber(-12345),
);
