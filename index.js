const few = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const ordinals = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth',
    'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
const decades = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred'];
const magnitudes = ['thousand', 'million', 'billion', 'trillion'];

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
            words = (prev ? ', ' : '') + few[hundreds] + ' hundred';
            if(remainder > 0) {
                words += lookup(remainder, true, ord);
            } else if(ord) {
                words += 'th';
            }
        } else {
            const mag = Math.floor(Math.log10(num)/3);
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
    wordValues[word] = index;
});
ordinals.forEach(function (word, index) {
    wordValues[word] = index;
});
decades.forEach(function (word, index) {
    wordValues[word] = (index + 2) * 10;
    wordValues[word.substring(0, word.length - 1) + 'ieth'] = wordValues[word];
});
magnitudes.forEach(function (word, index) {
    wordValues[word] = Math.pow(10, (index + 1) * 3);
});

function wordsToNumber(text) {
    const parts = text.split(/,\s|\sand\s|[\s\\-]/);
    const values = parts.map(function(part) {
        return wordValues[part];
    });
    const partition = function(sequence) {
        const group = [];
        var pos = 0;
        while(pos < sequence.length) {
            group.push(sequence[pos]);
            if(sequence[pos] >= 100) {
                group.push(partition(sequence.slice(pos + 1)));
                return group;
            }
            pos++;
        }
        return group;
    };
    const sumTriplets = function(triple) {
        if(triple.length === 3) {
            return triple[0] * triple[1] + sumTriplets(triple[2]);
        } else {
            return triple.reduce(function(acc, val) {
                return acc + val;
            });
        }
    };
    const triplets = partition(values);
    const result = sumTriplets(triplets);
    return result;
}

const romanNumerals = [
    [1000, 'M', 'm'],
    [900, 'CM', 'cm'],
    [500, 'D', 'd'],
    [400, 'CD', 'cd'],
    [100, 'C', 'c'],
    [90, 'XC', 'xc'],
    [50, 'L', 'l'],
    [40, 'XL', 'xl'],
    [10, 'X', 'x'],
    [9, 'IX', 'ix'],
    [5, 'V', 'v'],
    [4, 'IV', 'iv'],
    [1, 'I', 'i']
];

const romanValues = { 'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1};

function decimalToRoman(value, uppercase) {
    for(var index = 0; index < romanNumerals.length; index++) {
        const numeral = romanNumerals[index];
        if(value >= numeral[0]) {
            return numeral[uppercase ? 1 : 2] + decimalToRoman(value - numeral[0], uppercase);
        }
    }
    return '';
}

function numberToDecimal(roman) {
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

function formatInteger(value, picture) {
    if(typeof value === 'undefined') {
        return undefined;
    }
    
    var formattedInteger;

    const count = function(str, char) {
        var count = 0;
        for(var i = 0; i < str.length; i++) {
            if(str.charAt(i) === char) {
                count++;
            }
        }
        return count;
    };
    
    var primaryFormat, formatModifier;
    var ordinal = false;
    var semicolon = picture.lastIndexOf(';');
    if(semicolon === -1) {
        primaryFormat = picture;
    } else {
        primaryFormat = picture.substring(0, semicolon);
        formatModifier = picture.substring(semicolon + 1);
        if(formatModifier[0] === 'o') {
            ordinal = true;
        }
    }
    
    switch(picture[0]) {
        case 'A':
        case 'a':
            var letters = [];
            var aCode = picture[0].charCodeAt(0);
            while (value > 0) {
                letters.unshift(String.fromCharCode((value - 1) % 26 + aCode));
                value = Math.floor((value - 1) / 26);
            }
            formattedInteger = letters.join('');
            break;
        case 'i':
        case 'I':
            formattedInteger = decimalToRoman(value, picture[0] === 'I');
            break;
        case 'w':
            formattedInteger = numberToWords(value, ordinal);
            break;
        case 'W': // TODO check for Ww
            formattedInteger = numberToWords(value, ordinal).toUpperCase();
            break;
        default:
            // decimal-digit-pattern
            const optionalDigits = count(primaryFormat, '#');
            const groupingSeparators = count(primaryFormat, ',');
            const mandatoryDigits = primaryFormat.length - optionalDigits - groupingSeparators;

            formattedInteger = '' + value;

            // TODO use functionPad
            var padLength = mandatoryDigits - formattedInteger.length;
            if (padLength > 0) {
                var padding = (new Array(padLength + 1)).join('0');
                formattedInteger = padding + formattedInteger;
            }
            
            if(ordinal) {
                var suffix123 = {'1': 'st', '2': 'nd', '3': 'rd'};
                var lastDigit = formattedInteger[formattedInteger.length - 1];
                var suffix = suffix123[lastDigit];
                if(!suffix || (formattedInteger.length > 1 && formattedInteger[formattedInteger.length - 2] === '1')) {
                    suffix = 'th';
                }
                formattedInteger = formattedInteger + suffix;
            }
    }

    return formattedInteger;
}

// the format specifier is an array of string literals and variable markers
function analysePicture(picture) {
    var spec = [];
    var start = 0, pos = 0;
    while(pos < picture.length) {
        if(picture.charAt(pos) === '[') { //TODO check it's not a doubled [[
            // start of variable marker
            // push the string literal (if there is one) onto the array
            if(pos > start) {
                spec.push({ type: 'literal', value: picture.substring(start, pos) });
            }
            start = pos;
            // search forward to closing ]
            pos = picture.indexOf(']', start);
            // TODO handle error case if pos === -1
            const marker = picture.substring(start+1, pos);
            var def = {
                type: 'marker',
                component: marker.charAt(0)
            };
            var comma = marker.lastIndexOf(',');
            var presMod;
            if(comma !== -1) {
                // width modifier
                var widthDef;
                const widthMod = marker.substring(comma+1);
                const dash = widthMod.indexOf('-');
                widthDef = {};
                if(dash === -1) {
                    if(widthMod !== '*') {
                        widthDef.min = parseInt(widthMod)
                    }
                } else {
                    var min = widthMod.substring(0, dash);
                    var max = widthMod.substring(dash + 1);
                    if(min !== '*') {
                        widthDef.min = parseInt(min);
                    }
                    if(max !== '*') {
                        widthDef.max = parseInt(max);
                    }
                }
                def.width = widthDef;
                presMod = marker.substring(1, comma);
            } else {
                presMod = marker.substring(1);
            }
            if(presMod.length === 1) {
                def.presentation1 = presMod;
            } else if(presMod.length > 1) {
                var lastChar = presMod.charAt(presMod.length - 1);
                if('atco'.indexOf(lastChar) !== -1) {
                    def.presentation2 = lastChar;
                    if(lastChar === 'o') {
                        def.ordinal = true;
                    }
                    def.presentation1 = presMod.substring(0, presMod.length - 1);
                } else {
                    def.presentation1 = presMod;
                }
            }
            if(def.component === 'Y') {
                // §9.8.4.4
                def.n = -1;
                if(def.width && def.width.min !== undefined) {
                    def.n = def.width.min;
                } else if(def.presentation1) {
                    var w = def.presentation1;  // TODO only count the optional and mandatory digit signs
                    if(w >= 2) {
                        def.n = w;
                    }
                }
            }
            if('YMDdFWwHhmsf'.indexOf(def.component) !== -1 && !def.presentation1 || (def.presentation1[0] !== 'N' && def.presentation1[0] !== 'n')) {
                var integerPattern = def.presentation1;
                if (typeof integerPattern === 'undefined') {
                    integerPattern = '0';
                }
                if (def.width && def.width.min !== undefined) {
                    var specifiedWidth = 0;
                    var patpos = integerPattern.length - 1;
                    while (specifiedWidth < def.width.min) {
                        if (patpos < 0) {
                            integerPattern = '0' + integerPattern;
                            specifiedWidth++;
                            continue;
                        }
                        var currentChar = integerPattern.charAt(patpos);
                        if ('0123456789'.indexOf(currentChar) !== -1) {
                            specifiedWidth++;
                            patpos--;
                        } else if (currentChar === '#') {
                            integerPattern = integerPattern.replaceAt(patpos, '0');
                            specifiedWidth++;
                            patpos--
                        }
                    }
                }
                if (def.presentation2) {
                    integerPattern += ';' + def.presentation2;
                }
                def.integerPattern = integerPattern;
            }
            spec.push(def);
            start = pos + 1;
        }
        pos++;
    }
    if(pos > start) {
        // last bit of literal text
        spec.push({ type: 'literal', value: picture.substring(start, pos) });
    }
    return spec;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function formatDateTime(millis, picture) {
    if(typeof millis === 'undefined') {
        return undefined;
    }

    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
    };

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
            case 'd':
                componentValue = date.getDate();  // TODO day of the year
                break;
            case 'F':
                componentValue = date.getDay();
                break;
            case 'W':
                componentValue = date.getDate();  // TODO week of the year
                break;
            case 'w':
                componentValue = date.getDate();  // TODO week of the month
                break;
            case 'H':
                componentValue = date.getHours();
                break;
            case 'h':
                componentValue = date.getHours();  // TODO 12 hour format
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
                componentValue = date.getDate();  // TODO
                break;
            case 'z':
                componentValue = date.getDate();// TODO
                break;
            case 'C':
                componentValue = date.getDate();// TODO
                break;
            case 'E':
                componentValue = date.getDate();// TODO
                break;
        }
        // §9.8.4.3
        if('YMDdFWwHhms'.indexOf(markerSpec.component) !== -1) {
            if(markerSpec.component === 'Y') {
                if(markerSpec.n !== -1) {
                    componentValue = componentValue % Math.pow(10, markerSpec.n);
                }
            }
            if(markerSpec.presentation1 === 'Nn' || markerSpec.presentation1 === 'N' || markerSpec.presentation1 === 'n') {
                if(markerSpec.component === 'M') {
                    componentValue = months[componentValue - 1];
                } else if(markerSpec.component === 'F') {
                    componentValue = days[componentValue - 1];
                }
                if(markerSpec.presentation1 === 'N') {
                    componentValue = componentValue.toUpperCase();
                } else if(markerSpec.presentation1 === 'n') {
                    componentValue = componentValue.toLowerCase();
                }
                if(markerSpec.width && componentValue.length > markerSpec.width.max) {
                    componentValue = componentValue.substring(0, markerSpec.width.max);
                }
            } else {
                componentValue = formatInteger(componentValue, markerSpec.integerPattern);
            }
        }
        return componentValue;
    };

    var formatSpec =  analysePicture(picture);

    var dateTime = new Date(millis);

    var result = '';
    formatSpec.forEach(function(part) {
        if(part.type === 'literal') {
            result += part.value;
        } else {
            result += formatComponent(dateTime, part);
        }
    });

    return result;
}


function generateRegex(formatSpec) {
    formatSpec.forEach(function(part) {
        if(part.type === 'literal') {
            part.regex = part.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        } else {
            if(part.integerPattern) {
                switch(part.integerPattern[0]) {
                    case 'a':
                        part.regex = '[a-z]+';
                        break;
                    case 'A':
                        part.regex = '[A-Z]+';
                        break;
                    case 'i':
                        part.regex = '[mdclxvi]+';
                        part.parse = function(value) { return numberToDecimal(value.toUpperCase()); };
                        break;
                    case 'I':
                        part.regex = '[MDCLXVI]+';
                        part.parse = function(value) { return numberToDecimal(value); };
                        break;
                    case 'w':
                    case 'W':
                        part.regex = '(?:' + Object.keys(wordValues).concat('and', '[\\-, ]').join('|') + ')+';
                        part.parse = function(value) { return wordsToNumber(value.toLowerCase()); };
                        break;
                    default:
                        // decimal-digit-pattern
                        part.regex = '[0-9]+';
                        if(part.ordinal) {
                            // ordinals
                            part.regex += '(?:th|st|nd|rd)'
                        }
                        part.parse = function(value) { return part.ordinal ? value.substring(0, value.length - 2) : value; };
                }
            } else {
                // must be a month or day name
                part.regex = '[a-zA-Z]+';
                var lookup = {};
                if(part.component === 'M') {
                    // months
                    months.forEach(function(name, index) {
                        if(part.width && part.width.max) {
                            lookup[name.substring(0, part.width.max)] = index + 1;
                        } else {
                            lookup[name] = index + 1;
                        }
                    });
                }
                part.parse = function(value) { return lookup[value] };
            }
        }
    });
}

function parseDateTime(timestamp, picture) {
    if(typeof timestamp === 'undefined') {
        return undefined;
    }

    const formatSpec = analysePicture(picture);
    generateRegex(formatSpec);
    const fullRegex = '^' + formatSpec.map(function(part) {
        return '(' + part.regex + ')';
    }).join('') + '$';

    const setComponent = function(date, component, value) {
        switch(component) {
            case 'Y':
                date.setUTCFullYear(value);
                break;
            case 'M':
                date.setUTCMonth(value - 1);
                break;
            case 'D':
                date.setUTCDate(value);
                break;
            case 'H':
                date.setUTCHours(value);
                break;
            case 'h':
                date.setHours(value);  // TODO 12 hour format - lookup P component
                break;
            case 'm':
                date.setUTCMinutes(value);
                break;
            case 's':
                date.setUTCSeconds(value);
                break;
            case 'f':
                date.setMilliseconds(value);
                break;
            case 'Z':
                date.setDate();  // TODO
                break;
            case 'z':
                date.setDate();  // TODO
                break;
            case 'C':
                date.setDate();  // TODO
                break;
            case 'E':
                date.setDate();  // TODO
                break;
            default:
                // ignore
        }
    };

    const matcher = new RegExp(fullRegex, 'i'); // TODO can cache this against the picture
    var info = matcher.exec(timestamp);
    if(info !== null) {
        var date = new Date(0, 0, 1, 0, 0, 0);
        var values = {};
        for(var i = 1; i < info.length; i++) {
            const part = formatSpec[i-1];
            if(part.type === 'marker') {
                values[part.component] = info[i];
                setComponent(date, part.component, part.parse(info[i]));
            }
        }
        if(Object.keys(values).length === 0) {
            return undefined;
        }
        return date.getTime();
    }
}

module.exports = {
    formatInteger: formatInteger,
    formatDateTime: formatDateTime,
    parseDateTime: parseDateTime
};