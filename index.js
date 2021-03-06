const few = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const ordinals = ['Zeroth', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth',
    'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
const decades = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety', 'Hundred'];
const magnitudes = ['Thousand', 'Million', 'Billion', 'Trillion'];

function numberToWords(value, ordinal) {
    var lookup = function(num, prev, ord) {
        var words = '';
        if (num <= 19) {
            words = (prev ? ' and ' : '') + (ord ? ordinals[num] : few[num]);
        } else if (num < 100) {
            const tens = Math.floor(num / 10);
            const remainder = num % 10;
            words = (prev ? ' and ' : '') + decades[tens - 2];
            if(remainder > 0) {
                words += '-' + lookup(remainder, false, ord);
            } else if(ord) {
                words = words.substring(0, words.length - 1) + 'ieth';
            }
        } else if (num < 1000) {
            const hundreds = Math.floor(num / 100);
            const remainder = num % 100;
            words = (prev ? ', ' : '') + few[hundreds] + ' Hundred';
            if(remainder > 0) {
                words += lookup(remainder, true, ord);
            } else if(ord) {
                words += 'th';
            }
        } else {
            var mag = Math.floor(Math.log10(num)/3);
            if(mag > magnitudes.length) {
                mag = magnitudes.length; // the largest word
            }
            const factor = Math.pow(10, mag * 3);
            const mant = Math.floor(num / factor);
            const remainder = num - mant * factor;
            words = (prev ? ', ' : '') + lookup(mant, false, false) + ' ' + magnitudes[mag - 1];
            if(remainder > 0) {
                words += lookup(remainder, true, ord);
            } else if(ord) {
                words += 'th';
            }
        }
        return words;
    };

    var words = lookup(value, false, ordinal);
    return words;
}

const wordValues = {};
few.forEach(function (word, index) {
    wordValues[word.toLowerCase()] = index;
});
ordinals.forEach(function (word, index) {
    wordValues[word.toLowerCase()] = index;
});
decades.forEach(function (word, index) {
    const lword = word.toLowerCase();
    wordValues[lword] = (index + 2) * 10;
    wordValues[lword.substring(0, word.length - 1) + 'ieth'] = wordValues[lword];
});
wordValues.hundredth = 100;
magnitudes.forEach(function (word, index) {
    const lword = word.toLowerCase();
    const val = Math.pow(10, (index + 1) * 3);
    wordValues[lword] = val;
    wordValues[lword + 'th'] = val;
});

function wordsToNumber(text) {
    const parts = text.split(/,\s|\sand\s|[\s\\-]/);
    const values = parts.map(part => wordValues[part]);
    let segs = [0];
    values.forEach(value => {
        if(value < 100) {
            let top = segs.pop();
            if(top >= 1000) {
                segs.push(top);
                top = 0;
            }
            segs.push(top + value);
        } else {
            segs.push(segs.pop() * value);
        }
    });
    const result = segs.reduce((a,b) => a + b, 0);
    return result;
}

const romanNumerals = [
    [1000, 'm'],
    [900, 'cm'],
    [500, 'd'],
    [400, 'cd'],
    [100, 'c'],
    [90, 'xc'],
    [50, 'l'],
    [40, 'xl'],
    [10, 'x'],
    [9, 'ix'],
    [5, 'v'],
    [4, 'iv'],
    [1, 'i']
];

const romanValues = { 'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1};

function decimalToRoman(value) {
    for(var index = 0; index < romanNumerals.length; index++) {
        const numeral = romanNumerals[index];
        if(value >= numeral[0]) {
            return numeral[1] + decimalToRoman(value - numeral[0]);
        }
    }
    return '';
}

function romanToDecimal(roman) {
    var decimal = 0;
    var max = 1;
    for(var i = roman.length - 1; i >= 0; i--) {
        const digit = roman[i];
        const value = romanValues[digit];
        if(value < max) {
            decimal -= value;
        } else {
            max = value;
            decimal += value;
        }
    }
    return decimal;
}

function decimalToLetters(value, aChar) {
    var letters = [];
    var aCode = aChar.charCodeAt(0);
    while (value > 0) {
        letters.unshift(String.fromCharCode((value - 1) % 26 + aCode));
        value = Math.floor((value - 1) / 26);
    }
    return letters.join('');
}

function lettersToDecimal(letters, aChar) {
    var aCode = aChar.charCodeAt(0);
    var decimal = 0;
    for(var i = 0; i < letters.length; i++) {
        decimal += (letters.charCodeAt(letters.length - i - 1) - aCode + 1) * Math.pow(26, i);
    }
    return decimal;
}

function formatInteger(value, picture) {
    if (typeof value === 'undefined') {
        return undefined;
    }

    const format = analyseIntegerPicture(picture);
    return _formatInteger(value, format);
}

function _formatInteger(value, format) {
    let formattedInteger;
    const negative = value < 0;
    value = Math.abs(value);
    switch(format.primary) {
        case formats.LETTERS:
            formattedInteger = decimalToLetters(value, format.case === tcase.UPPER ? 'A' : 'a');
            break;
        case formats.ROMAN:
            formattedInteger = decimalToRoman(value);
            if(format.case === tcase.UPPER) {
                formattedInteger = formattedInteger.toUpperCase();
            }
            break;
        case formats.WORDS:
            formattedInteger = numberToWords(value, format.ordinal);
            if(format.case === tcase.UPPER) {
                formattedInteger = formattedInteger.toUpperCase();
            } else if(format.case === tcase.LOWER) {
                formattedInteger = formattedInteger.toLowerCase();
            }
            break;
        case formats.DECIMAL:
            formattedInteger = '' + value;
            // TODO use functionPad
            var padLength = format.mandatoryDigits - formattedInteger.length;
            if (padLength > 0) {
                var padding = (new Array(padLength + 1)).join('0');
                formattedInteger = padding + formattedInteger;
            }
            if(format.zeroCode !== 0x30) {
                formattedInteger = Array.from(formattedInteger).map(code => {
                    return String.fromCodePoint(code.codePointAt(0) + format.zeroCode - 0x30);
                }).join('');
            }
            // insert the grouping-separator-signs, if any
            if(format.regular) {
                const n = Math.floor((formattedInteger.length - 1) / format.groupingSeparators.position);
                for(let ii = n; ii > 0; ii--) {
                    const pos = formattedInteger.length - ii * format.groupingSeparators.position;
                    formattedInteger = formattedInteger.substr(0, pos) + format.groupingSeparators.character + formattedInteger.substr(pos);
                }
            } else {
                format.groupingSeparators.reverse().forEach(separator => {
                    const pos = formattedInteger.length - separator.position;
                    formattedInteger = formattedInteger.substr(0, pos) + separator.character + formattedInteger.substr(pos);
                })
            }

            if(format.ordinal) {
                var suffix123 = {'1': 'st', '2': 'nd', '3': 'rd'};
                var lastDigit = formattedInteger[formattedInteger.length - 1];
                var suffix = suffix123[lastDigit];
                if(!suffix || (formattedInteger.length > 1 && formattedInteger[formattedInteger.length - 2] === '1')) {
                    suffix = 'th';
                }
                formattedInteger = formattedInteger + suffix;
            }
            break;
        case formats.SEQUENCE:
            throw {
                code: 'unsupported: sequence'
            }
    }
    if(negative) {
        formattedInteger = '-' + formattedInteger;
    }

    return formattedInteger;
}

const formats = {
    DECIMAL: 'decimal',
    LETTERS: 'letters',
    ROMAN: 'roman',
    WORDS: 'words',
    SEQUENCE: 'sequence'
};

const tcase = {
    UPPER: 'upper',
    LOWER: 'lower',
    TITLE: 'title'
};

//TODO what about decimal groups in the unicode supplementary planes (surrogate pairs) ???
const decimalGroups = [0x30, 0x0660, 0x06F0, 0x07C0, 0x0966, 0x09E6, 0x0A66, 0x0AE6, 0x0B66, 0x0BE6, 0x0C66, 0x0CE6, 0x0D66, 0x0DE6, 0x0E50, 0x0ED0, 0x0F20, 0x1040, 0x1090, 0x17E0, 0x1810, 0x1946, 0x19D0, 0x1A80, 0x1A90, 0x1B50, 0x1BB0, 0x1C40, 0x1C50, 0xA620, 0xA8D0, 0xA900, 0xA9D0, 0xA9F0, 0xAA50, 0xABF0, 0xFF10];

function analyseIntegerPicture(picture) {
    const format = {
        type: 'integer',
        primary: formats.DECIMAL,
        case: tcase.LOWER,
        ordinal: false
    };

    let primaryFormat, formatModifier;
    const semicolon = picture.lastIndexOf(';');
    if(semicolon === -1) {
        primaryFormat = picture;
    } else {
        primaryFormat = picture.substring(0, semicolon);
        formatModifier = picture.substring(semicolon + 1);
        if(formatModifier[0] === 'o') {
            format.ordinal = true;
        }
    }

    switch(primaryFormat) {
        case 'A':
            format.case = tcase.UPPER;
        case 'a':
            format.primary = formats.LETTERS;
            break;
        case 'I':
            format.case = tcase.UPPER;
        case 'i':
            format.primary = formats.ROMAN;
            break;
        case 'W':
            format.case = tcase.UPPER;
            format.primary = formats.WORDS;
            break;
        case 'Ww':
            format.case = tcase.TITLE;
            format.primary = formats.WORDS;
            break;
        case 'w':
            format.primary = formats.WORDS;
            break;
        default:
            // this is a decimal-digit-pattern if it contains a decimal digit (from any unicode decimal digit group)
            let zeroCode = null;
            let mandatoryDigits = 0;
            let optionalDigits = 0;
            let groupingSeparators = [];
            let separatorPosition = 0;
            const formatCodepoints = Array.from(primaryFormat, c => c.codePointAt(0)).reverse(); // reverse the array to determine positions of grouping-separator-signs
            formatCodepoints.forEach((codePoint) => {
                // step though each char in the picture to determine the digit group
                let digit = false;
                for(let ii = 0; ii < decimalGroups.length; ii++) {
                    const group = decimalGroups[ii];
                    if (codePoint >= group && codePoint <= group + 9) {
                        // codepoint is part of this decimal group
                        digit = true;
                        mandatoryDigits++;
                        separatorPosition++;
                        if (zeroCode === null) {
                            zeroCode = group;
                        } else if (group !== zeroCode) {
                            // error! different decimal groups in the same pattern
                            throw {
                                code: 'whatever'
                            }
                        }
                        break;
                    }
                }
                if(!digit) {
                    if (codePoint === 0x23) { // # - optional-digit-sign
                        separatorPosition++;
                        optionalDigits++;
                    } else {
                        // neither a decimal-digit-sign ot optional-digit-sign, assume it is a grouping-separator-sign
                        groupingSeparators.push({
                            position: separatorPosition,
                            character: String.fromCodePoint(codePoint)
                        });
                    }
                }
            });
            if(mandatoryDigits > 0) {
                format.primary = formats.DECIMAL;
                // TODO validate decimal-digit-pattern

                // the decimal digit family (codepoint offset)
                format.zeroCode = zeroCode;
                // the number of mandatory digits
                format.mandatoryDigits = mandatoryDigits;
                // the number of optional digits
                format.optionalDigits = optionalDigits;
                // grouping separator template
                // are the grouping-separator-signs 'regular'?
                const regularRepeat = function(separators) {
                    // are the grouping positions regular? i.e. same interval between each of them
                    // is there at least one separator?
                    if(separators.length === 0) {
                        return 0;
                    }
                    // are all the characters the same?
                    const sepChar = separators[0].character;
                    for(let ii = 1; ii < separators.length; ii++) {
                        if(separators[ii].character !== sepChar) {
                            return 0;
                        }
                    }
                    // are they equally spaced?
                    const indexes = separators.map(separator => separator.position);
                    const gcd = function(a, b) {
                        return b === 0 ? a : gcd(b, a % b);
                    };
                    // find the greatest common divisor of all the positions
                    const factor = indexes.reduce(gcd);
                    // is every position separated by this divisor? If so, it's regular
                    for(let index = 1; index <= indexes.length; index++) {
                        if(indexes.indexOf(index * factor) === -1) {
                            return 0;
                        }
                    }
                    return factor;
                };

                const regular = regularRepeat(groupingSeparators);
                if(regular > 0) {
                    format.regular = true;
                    format.groupingSeparators = {
                        position: regular,
                        character: groupingSeparators[0].character
                    }
                } else {
                    format.regular = false;
                    format.groupingSeparators = groupingSeparators;
                }

            } else {
                // this is a 'numbering sequence' which the spec says is implementation-defined
                // this implementation doesn't support any numbering sequences at the moment.
                format.primary = formats.SEQUENCE;
            }
    }

    return format;
}

const defaultPresentationModifiers = {
    Y: '1', M: '1', D: '1', d: '1', F: 'n', W: '1', w: '1', X: '1', x: '1', H: '1', h: '1',
    P: 'n', m: '01', s: '01', f: '1', Z: '01:01', z: '01:01', C: 'n', E: 'n'
};

// §9.8.4.1 the format specifier is an array of string literals and variable markers
function analyseDateTimePicture(picture) {
    var spec = [];
    const format = {
        type: 'datetime',
        parts: spec
    };
    const addLiteral = function(start, end) {
        if(end > start) {
            let literal = picture.substring(start, end);
            // replace any doubled ]] with single ]
            // what if there are instances of single ']' ? - the spec doesn't say
            literal = literal.split(']]').join(']');
            spec.push({ type: 'literal', value: literal });
        }
    };

    var start = 0, pos = 0;
    while(pos < picture.length) {
        if(picture.charAt(pos) === '[') {
            // check it's not a doubled [[
            if(picture.charAt(pos + 1) === '[') {
                // literal [
                addLiteral(start, pos);
                spec.push({ type: 'literal', value: '[' });
                pos+=2;
                start = pos;
                continue;
            }
            // start of variable marker
            // push the string literal (if there is one) onto the array
            addLiteral(start, pos);
            start = pos;
            // search forward to closing ]
            pos = picture.indexOf(']', start);
            // TODO handle error case if pos === -1
            let marker = picture.substring(start+1, pos);
            // whitespace within a variable marker is ignored (i.e. remove it)
            marker = marker.split(/\s+/).join('');
            var def = {
                type: 'marker',
                component: marker.charAt(0)  // 1. The component specifier is always present and is always a single letter.
            };
            var comma = marker.lastIndexOf(','); // 2. The width modifier may be recognized by the presence of a comma
            var presMod; // the presentation modifiers
            if(comma !== -1) {
                // §9.8.4.2 The Width Modifier
                const widthMod = marker.substring(comma+1);
                const dash = widthMod.indexOf('-');
                let min, max;
                const parseWidth = function(wm) {
                    if(typeof wm === 'undefined' || wm === '*') {
                        return undefined;
                    } else {
                        // TODO validate wm is an unsigned int
                        return parseInt(wm);
                    }
                };
                if(dash === -1) {
                    min = widthMod;
                } else {
                    min = widthMod.substring(0, dash);
                    max = widthMod.substring(dash + 1);
                }
                const widthDef = {
                    min: parseWidth(min),
                    max: parseWidth(max)
                };
                def.width = widthDef;
                presMod = marker.substring(1, comma);
            } else {
                presMod = marker.substring(1);
            }
            if(presMod.length === 1) {
                def.presentation1 = presMod; // first presentation modifier
                //TODO validate the first presentation modifier - it's either N, n, Nn or it passes analyseIntegerPicture
            } else if(presMod.length > 1) {
                var lastChar = presMod.charAt(presMod.length - 1);
                if('atco'.indexOf(lastChar) !== -1) {
                    def.presentation2 = lastChar;
                    if(lastChar === 'o') {
                        def.ordinal = true;
                    }
                    // 'c' means 'cardinal' and is the default (i.e. not 'ordinal')
                    // 'a' & 't' are ignored (not sure of their relevance to English numbering)
                    def.presentation1 = presMod.substring(0, presMod.length - 1);
                } else {
                    def.presentation1 = presMod;
                    //TODO validate the first presentation modifier - it's either N, n, Nn or it passes analyseIntegerPicture,
                    // doesn't use ] as grouping separator, and if grouping separator is , then must have width modifier
                }
            } else {
                // no presentation modifier specified - apply the default;
                def.presentation1 = defaultPresentationModifiers[def.component];
            }
            if(def.presentation1[0] === 'n') {
                def.names = tcase.LOWER;
            } else if(def.presentation1[0] === 'N') {
                if(def.presentation1[1] === 'n') {
                    def.names = tcase.TITLE;
                } else {
                    def.names = tcase.UPPER;
                }
            } else if('YMDdFWwXxHhmsf'.indexOf(def.component) !== -1) {
                var integerPattern = def.presentation1;
                if (def.presentation2) {
                    integerPattern += ';' + def.presentation2;
                }
                def.integerFormat = analyseIntegerPicture(integerPattern);
                if (def.width && def.width.min !== undefined) {
                    if(def.integerFormat.mandatoryDigits < def.width.min) {
                        def.integerFormat.mandatoryDigits = def.width.min;
                    }
                }
                if (def.component === 'Y') {
                    // §9.8.4.4
                    def.n = -1;
                    if(def.width && def.width.max !== undefined) {
                        def.n = def.width.max;
                        def.integerFormat.mandatoryDigits = def.n;
                    } else {
                        var w = def.integerFormat.mandatoryDigits + def.integerFormat.optionalDigits;
                        if(w >= 2) {
                            def.n = w;
                        }
                    }
                }
            }
            if(def.component === 'Z' || def.component === 'z') {
                def.integerFormat = analyseIntegerPicture(def.presentation1);
            }
            spec.push(def);
            start = pos + 1;
        }
        pos++;
    }
    addLiteral(start, pos);
    return format;
}

const days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const millisInADay = 1000 * 60 * 60 * 24;

const startOfFirstWeek = function(ym) {
    // ISO 8601 defines the first week of the year to be the week that contains the first Thursday
    // XPath F&O extends this same definition for the first week of a month
    // the week starts on a Monday - calculate the millis for the start of the first week
    // millis for given 1st Jan of that year (at 00:00 UTC)
    const jan1 = Date.UTC(ym.year, ym.month);
    var dayOfJan1 = (new Date(jan1)).getDay();
    if (dayOfJan1 === 0) {
        dayOfJan1 = 7;
    }
    // if Jan 1 is Fri, Sat or Sun, then add the number of days (in millis) to jan1 to get the start of week 1
    return dayOfJan1 > 4 ? jan1 + (8 - dayOfJan1) * millisInADay : jan1 - (dayOfJan1 - 1) * millisInADay;
};

const yearMonth = function (year, month) {
    return {
        year: year,
        month: month,
        nextMonth: function() {
            return (month === 11) ? yearMonth(year + 1, 0) : yearMonth(year, month + 1);
        },
        previousMonth: function() {
            return (month === 0) ? yearMonth(year - 1, 11) : yearMonth(year, month - 1);
        },
        nextYear: function () {
            return yearMonth(year + 1, month);
        },
        previousYear: function () {
            return yearMonth(year - 1, month);
        }
    }
};

const deltaWeeks = function(start, end) {
    return (end - start) / (millisInADay * 7) + 1;
};

function formatDateTime(millis, picture, timezone) {
    if(typeof millis === 'undefined') {
        return undefined;
    }

    var offsetHours = 0;
    var offsetMinutes = 0;
    if(typeof timezone !== 'undefined') {
        // parse the hour and minute offsets
        // assume for now the format supplied is +hhmm
        const offset = parseInt(timezone);
        offsetHours = Math.floor(offset / 100);
        offsetMinutes = offset % 100;
    }

    var formatComponent = function(date, markerSpec) {
        var componentValue;
        switch (markerSpec.component) {
            case 'Y':
                componentValue = date.getFullYear();
                break;
            case 'M':
                componentValue = date.getMonth() + 1;
                break;
            case 'D':
                componentValue = date.getDate();
                break;
            case 'd': {
                // millis for given date (at 00:00 UTC)
                const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
                // millis for given 1st Jan of that year (at 00:00 UTC)
                const firstJan = Date.UTC(date.getFullYear(), 0);
                componentValue = (today - firstJan) / millisInADay + 1;
                break;
            }
            case 'F':
                componentValue = date.getDay();
                if(componentValue === 0) {
                    // ISO 8601 defines days 1-7: Mon-Sun
                    componentValue = 7;
                }
                break;
            case 'W': {
                const thisYear = yearMonth(date.getFullYear(), 0);
                const startOfWeek1 = startOfFirstWeek(thisYear);
                const today = Date.UTC(thisYear.year, date.getMonth(), date.getDate());
                let week = deltaWeeks(startOfWeek1, today);
                if (week > 52) {
                    // might be first week of the following year
                    const startOfFollowingYear = startOfFirstWeek(thisYear.nextYear());
                    if (today >= startOfFollowingYear) {
                        week = 1;
                    }
                } else if (week < 1) {
                    // must be end of the previous year
                    const startOfPreviousYear = startOfFirstWeek(thisYear.previousYear());
                    week = deltaWeeks(startOfPreviousYear, today);
                }
                componentValue = Math.floor(week);
                break;
            }
            case 'w':{
                const thisMonth = yearMonth(date.getFullYear(), date.getMonth());
                const startOfWeek1 = startOfFirstWeek(thisMonth);
                const today = Date.UTC(thisMonth.year, thisMonth.month, date.getDate());
                let week = deltaWeeks(startOfWeek1, today);
                if (week > 4) {
                    // might be first week of the following month
                    const startOfFollowingMonth = startOfFirstWeek(thisMonth.nextMonth());
                    if (today >= startOfFollowingMonth) {
                        week = 1;
                    }
                } else if (week < 1) {
                    // must be end of the previous month
                    const startOfPreviousMonth = startOfFirstWeek(thisMonth.previousMonth());
                    week = deltaWeeks(startOfPreviousMonth, today);
                }
                componentValue = Math.floor(week);
                break;
            }
            case 'X': {
                // Extension: The F&O spec says nothing about how to access the year associated with the week-of-the-year
                // e.g. Sat 1 Jan 2005 is in the 53rd week of 2004.
                // The 'W' component specifier gives 53, but 'Y' will give 2005.
                // I propose to add 'X' as the component specifier to give the ISO week-numbering year (2004 in this example)
                const thisYear = yearMonth(date.getFullYear(), 0);
                const startOfISOYear = startOfFirstWeek(thisYear);
                const endOfISOYear = startOfFirstWeek(thisYear.nextYear());
                const now = date.getTime();
                if(now < startOfISOYear) {
                    componentValue = thisYear.year - 1;
                } else if(now >= endOfISOYear) {
                    componentValue = thisYear.year + 1;
                } else {
                    componentValue = thisYear.year;
                }
                break;
            }
            case 'x': {
                // Extension: The F&O spec says nothing about how to access the month associated with the week-of-the-month
                // e.g. Sat 1 Jan 2005 is in the 5th week of December 2004.
                // The 'w' component specifier gives 5, but 'W' will give January and 'Y' will give 2005.
                // I propose to add 'x' as the component specifier to give the 'week-numbering' month (December in this example)
                const thisMonth = yearMonth(date.getFullYear(), date.getMonth());
                const startOfISOMonth = startOfFirstWeek(thisMonth);
                const nextMonth = thisMonth.nextMonth();
                const endOfISOMonth = startOfFirstWeek(nextMonth);
                const now = date.getTime();
                if(now < startOfISOMonth) {
                    componentValue = thisMonth.previousMonth().month + 1;
                } else if(now >= endOfISOMonth) {
                    componentValue = nextMonth.month + 1;
                } else {
                    componentValue = thisMonth.month + 1;
                }
                break;
            }
            case 'H':
                componentValue = date.getHours();
                break;
            case 'h':
                componentValue = date.getHours();
                componentValue = componentValue % 12;
                if(componentValue === 0) {
                    componentValue = 12;
                }
                break;
            case 'P':
                componentValue = date.getHours() >= 12 ? 'pm' : 'am';
                break;
            case 'm':
                componentValue = date.getMinutes();
                break;
            case 's':
                componentValue = date.getSeconds();
                break;
            case 'f':
                componentValue = date.getMilliseconds();
                break;
            case 'Z':
            case 'z':
                // since the date object is constructed from epoch millis, the TZ component is always be UTC.
                break;
            case 'C':
                componentValue = 'ISO';
                break;
            case 'E':
                componentValue = 'ISO';
                break;
        }
        // §9.8.4.3 Formatting Integer-Valued Date/Time Components
        if('YMDdFWwXxHhms'.indexOf(markerSpec.component) !== -1) {
            if(markerSpec.component === 'Y') {
                // §9.8.4.4 Formatting the Year Component
                if(markerSpec.n !== -1) {
                    componentValue = componentValue % Math.pow(10, markerSpec.n);
                }
            }
            if(markerSpec.names) {
                if(markerSpec.component === 'M' || markerSpec.component === 'x') {
                    componentValue = months[componentValue - 1];
                } else if(markerSpec.component === 'F') {
                    componentValue = days[componentValue];
                }
                if(markerSpec.names === tcase.UPPER) {
                    componentValue = componentValue.toUpperCase();
                } else if(markerSpec.names === tcase.LOWER) {
                    componentValue = componentValue.toLowerCase();
                }
                if(markerSpec.width && componentValue.length > markerSpec.width.max) {
                    componentValue = componentValue.substring(0, markerSpec.width.max);
                }
            } else {
                componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
            }
        } else if(markerSpec.component === 'f') {
            // TODO §9.8.4.5 Formatting Fractional Seconds
            componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
        } else if(markerSpec.component === 'Z' || markerSpec.component === 'z') {
            // §9.8.4.6 Formatting timezones
            console.log(offsetHours, offsetMinutes);
            console.log(markerSpec);
            const offset = offsetHours * 100 + offsetMinutes;
            if(markerSpec.integerFormat.regular) {
                componentValue = _formatInteger(offset, markerSpec.integerFormat)
                console.log(offset, componentValue);
            } else {
                const numDigits = markerSpec.integerFormat.mandatoryDigits;
                if(numDigits === 1 || numDigits === 2) {
                    componentValue = _formatInteger(offsetHours, markerSpec.integerFormat);
                    if(offsetMinutes !== 0) {
                        componentValue += ':' + formatInteger(offsetMinutes, '00');
                    }
                } else if(numDigits === 3 || numDigits === 4) {
                    componentValue = _formatInteger(offset, markerSpec.integerFormat);
                }
            }
            if(offset >= 0) {
                componentValue = '+' + componentValue;
            }
            if(markerSpec.component === 'z') {
                componentValue = 'GMT' + componentValue;
            }
            if(offset === 0 && markerSpec.presentation2 === 't') {
                componentValue = 'Z';
            }
        }
        return componentValue;
    };

    var formatSpec = analyseDateTimePicture(picture);

    const offsetMillis = (60 * offsetHours + offsetMinutes) * 60 * 1000;
    var dateTime = new Date(millis + offsetMillis);

    var result = '';
    formatSpec.parts.forEach(function(part) {
        if(part.type === 'literal') {
            result += part.value;
        } else {
            result += formatComponent(dateTime, part);
        }
    });

    return result;
}


function generateRegex(formatSpec) {
    var matcher = {};
    if(formatSpec.type === 'datetime') {
        matcher.type = 'datetime';
        matcher.parts = formatSpec.parts.map(function (part) {
            var res = {};
            if (part.type === 'literal') {
                res.regex = part.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            } else if (part.integerFormat) {
                res = generateRegex(part.integerFormat);
            } else {
                // must be a month or day name
                res.regex = '[a-zA-Z]+';
                var lookup = {};
                if (part.component === 'M' || part.component === 'x') {
                    // months
                    months.forEach(function (name, index) {
                        if (part.width && part.width.max) {
                            lookup[name.substring(0, part.width.max)] = index + 1;
                        } else {
                            lookup[name] = index + 1;
                        }
                    });
                } else if (part.component === 'P') {
                    lookup = {'am': 0, 'AM': 0, 'pm': 1, 'PM': 1};
                }
                res.parse = function (value) {
                    return lookup[value]
                };
            }
            res.component = part.component;
            return res;
        });
    } else { // type === 'integer'
        matcher.type = 'integer';
        const isUpper = formatSpec.case === tcase.UPPER;
        switch (formatSpec.primary) {
            case formats.LETTERS:
                matcher.regex = isUpper ? '[A-Z]+' : '[a-z]+';
                matcher.parse = function (value) {
                    return lettersToDecimal(value, isUpper ? 'A' : 'a');
                };
                break;
            case formats.ROMAN:
                matcher.regex = isUpper ? '[MDCLXVI]+' : '[mdclxvi]+';
                matcher.parse = function (value) {
                    return romanToDecimal(isUpper ? value : value.toUpperCase());
                };
                break;
            case formats.WORDS:
                matcher.regex = '(?:' + Object.keys(wordValues).concat('and', '[\\-, ]').join('|') + ')+';
                matcher.parse = function (value) {
                    return wordsToNumber(value.toLowerCase());
                };
                break;
            case formats.DECIMAL:
                matcher.regex = '[0-9]+';
                if(formatSpec.ordinal) {
                    // ordinals
                    matcher.regex += '(?:th|st|nd|rd)'
                }
                matcher.parse = function (value) {
                    let digits = value;
                    if(formatSpec.ordinal) {
                        // strip off the suffix
                        digits = value.substring(0, value.length - 2);
                    }
                    // strip out the separators
                    if(formatSpec.regular) {
                        digits = digits.split(',').join('');
                    } else {
                        formatSpec.groupingSeparators.forEach(sep => {
                            digits = digits.split(sep.character).join('');
                        })
                    }
                    if(formatSpec.zeroCode !== 0x30) {
                        // apply offset
                        digits = digits.split('').map(char => String.fromCodePoint(char.codePointAt(0) - formatSpec.zeroCode + 0x30)).join('');
                    }
                    return parseInt(digits);
                };
        }

    }
    return matcher;
}

function parseInteger(value, picture) {
    if(typeof value === 'undefined') {
        return undefined;
    }

    const formatSpec = analyseIntegerPicture(picture);
    const matchSpec = generateRegex(formatSpec);
    const fullRegex = '^' + matchSpec.regex + '$';
    const matcher = new RegExp(fullRegex);
    // TODO validate input based on the matcher regex
    const result = matchSpec.parse(value);
    return result;
}

function parseDateTime(timestamp, picture) {
    if(typeof timestamp === 'undefined') {
        return undefined;
    }

    const formatSpec = analyseDateTimePicture(picture);
    const matchSpec = generateRegex(formatSpec);
    const fullRegex = '^' + matchSpec.parts.map(part => '(' + part.regex + ')').join('') + '$';

    const matcher = new RegExp(fullRegex, 'i'); // TODO can cache this against the picture
    var info = matcher.exec(timestamp);
    if(info !== null) {
        var components = {D: 1, m: 0, s: 0, f: 0};
        for(var i = 1; i < info.length; i++) {
            const mpart = matchSpec.parts[i-1];
            if(mpart.parse) {
                components[mpart.component] = mpart.parse(info[i]);
            }
        }

        // validate and fill in components
        if(typeof components.M !== 'undefined') {
            components.M -= 1;  // Date.UTC requires a zero-indexed month
        } else {
            components.M = 0; // default to January
        }
        if(typeof components.d !== 'undefined') {
            // TODO should we throw errors if 'd' is found when 'M' & 'D' is also present?
            // millis for given 1st Jan of that year (at 00:00 UTC)
            const firstJan = Date.UTC(components.Y, 0);
            const offsetMillis = components.d * 1000 * 60 * 60 * 24;
            const derivedDate = new Date(firstJan + offsetMillis);
            components.M = derivedDate.getMonth();
            components.D = derivedDate.getDay();
        }
        if(typeof components.H === 'undefined') {
            if(components.h !== 'undefined' && typeof components.P !== 'undefined') {
                // 12hr to 24hr
                components.H = components.h === 12 ? 0 : components.h;
                if (components.P === 1) {
                    components.H += 12;
                }
            } else {
                // TODO only apply default if the m, s & f are unspecified
                components.H = 0; // default to midnight
            }
        }
        if(typeof components.Y === 'undefined') {
            return undefined;
        }

        var millis = Date.UTC(components.Y, components.M, components.D, components.H, components.m, components.s, components.f);
        console.log('parse: ', components);
        return millis;
    }
}

module.exports = {
    formatInteger: formatInteger,
    formatDateTime: formatDateTime,
    parseInteger: parseInteger,
    parseDateTime: parseDateTime
};