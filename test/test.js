

var formatInteger = require('../index').formatInteger;
var formatDateTime = require('../index').formatDateTime;
var parseDateTime = require('../index').parseDateTime;
var assert = require('assert');
var chai = require("chai");
var expect = chai.expect;


describe('#formatInteger', function () {
    describe('undefined value', function () {
        it('should return result object', function () {
            var result = formatInteger(undefined);
            var expected = undefined;
            assert.equal(result, expected);
        });
    });

    describe('decimal-digit-pattern - cardinal', function () {
        it('should format a number', function () {
            var result = formatInteger(123, '000');
            var expected = '123';
            assert.equal(result, expected);
        });

        it('should pad number with zeros', function () {
            var result = formatInteger(123, '0000');
            var expected = '0123';
            assert.equal(result, expected);
        });

        it('should pad number with zeros', function () {
            var result = formatInteger(1234, '0');
            var expected = '1234';
            assert.equal(result, expected);
        });

        it('should pad number with zeros', function () {
            var result = formatInteger(1234, '###0');
            var expected = '1234';
            assert.equal(result, expected);
        });

        it('should pad number with zeros', function () {
            var result = formatInteger(12, '###0');
            var expected = '12';
            assert.equal(result, expected);
        });

    });

    describe('decimal-digit-pattern - ordinal', function () {
        it('should format a number', function () {
            var result = formatInteger(123, '000;o');
            var expected = '123rd';
            assert.equal(result, expected);
        });

        it('should pad number with zeros', function () {
            var result = formatInteger(1, '0;o');
            var expected = '1st';
            assert.equal(result, expected);
        });

        it('should pad number with zeros', function () {
            var result = formatInteger(28, '#0;o');
            var expected = '28th';
            assert.equal(result, expected);
        });

        it('should pad number with zeros', function () {
            var result = formatInteger(1234, '###0;o');
            var expected = '1234th';
            assert.equal(result, expected);
        });

        it('should pad number with zeros', function () {
            var result = formatInteger(12, '###0;o');
            var expected = '12th';
            assert.equal(result, expected);
        });

    });

    describe('roman numerals', function () {
        it('0', function () {
            var result = formatInteger(0, 'I');
            var expected = '';
            assert.equal(result, expected);
        });

        it('1984', function () {
            var result = formatInteger(1984, 'I');
            var expected = 'MCMLXXXIV';
            assert.equal(result, expected);
        });

        it('99', function () {
            var result = formatInteger(99, 'i');
            var expected = 'xcix';
            assert.equal(result, expected);
        });

    });

    describe('words - cardinal', function () {
        it('12', function () {
            var result = formatInteger(12, 'w');
            var expected = 'twelve';
            assert.equal(result, expected);
        });

        it('20', function () {
            var result = formatInteger(20, 'w');
            var expected = 'twenty';
            assert.equal(result, expected);
        });

        it('34', function () {
            var result = formatInteger(34, 'w');
            var expected = 'thirty-four';
            assert.equal(result, expected);
        });

        it('99', function () {
            var result = formatInteger(99, 'W');
            var expected = 'NINETY-NINE';
            assert.equal(result, expected);
        });

        it('100', function () {
            var result = formatInteger(100, 'w');
            var expected = 'one hundred';
            assert.equal(result, expected);
        });

        it('555', function () {
            var result = formatInteger(555, 'W');
            var expected = 'FIVE HUNDRED AND FIFTY-FIVE';
            assert.equal(result, expected);
        });

        it('919', function () {
            var result = formatInteger(919, 'w');
            var expected = 'nine hundred and nineteen';
            assert.equal(result, expected);
        });

        it('730', function () {
            var result = formatInteger(730, 'w');
            var expected = 'seven hundred and thirty';
            assert.equal(result, expected);
        });

        it('1000', function () {
            var result = formatInteger(1000, 'w');
            var expected = 'one thousand';
            assert.equal(result, expected);
        });

        it('3730', function () {
            var result = formatInteger(3730, 'w');
            var expected = 'three thousand, seven hundred and thirty';
            assert.equal(result, expected);
        });

        it('327730', function () {
            var result = formatInteger(327730, 'w');
            var expected = 'three hundred and twenty-seven thousand, seven hundred and thirty';
            assert.equal(result, expected);
        });

        it('4327730', function () {
            var result = formatInteger(4327730, 'w');
            var expected = 'four million, three hundred and twenty-seven thousand, seven hundred and thirty';
            assert.equal(result, expected);
        });

        it('1e12 + 1', function () {
            var result = formatInteger(1e12 + 1, 'w');
            var expected = 'one trillion and one';
            assert.equal(result, expected);
        });

    });

    describe('words - ordinal', function () {
        it('12', function () {
            var result = formatInteger(12, 'w;o');
            var expected = 'twelfth';
            assert.equal(result, expected);
        });

        it('20', function () {
            var result = formatInteger(20, 'w;o');
            var expected = 'twentieth';
            assert.equal(result, expected);
        });

        it('34', function () {
            var result = formatInteger(34, 'w;o');
            var expected = 'thirty-fourth';
            assert.equal(result, expected);
        });

        it('99', function () {
            var result = formatInteger(99, 'W;o');
            var expected = 'NINETY-NINTH';
            assert.equal(result, expected);
        });

        it('100', function () {
            var result = formatInteger(100, 'w;o');
            var expected = 'one hundredth';
            assert.equal(result, expected);
        });

        it('555', function () {
            var result = formatInteger(555, 'W;o');
            var expected = 'FIVE HUNDRED AND FIFTY-FIFTH';
            assert.equal(result, expected);
        });

        it('919', function () {
            var result = formatInteger(919, 'w;o');
            var expected = 'nine hundred and nineteenth';
            assert.equal(result, expected);
        });

        it('730', function () {
            var result = formatInteger(730, 'w;o');
            var expected = 'seven hundred and thirtieth';
            assert.equal(result, expected);
        });

        it('1000', function () {
            var result = formatInteger(1000, 'w;o');
            var expected = 'one thousandth';
            assert.equal(result, expected);
        });

        it('3730', function () {
            var result = formatInteger(3731, 'w;o');
            var expected = 'three thousand, seven hundred and thirty-first';
            assert.equal(result, expected);
        });

        it('327730', function () {
            var result = formatInteger(327713, 'w;o');
            var expected = 'three hundred and twenty-seven thousand, seven hundred and thirteenth';
            assert.equal(result, expected);
        });

        it('4327730', function () {
            var result = formatInteger(4327732, 'w;o');
            var expected = 'four million, three hundred and twenty-seven thousand, seven hundred and thirty-second';
            assert.equal(result, expected);
        });

        it('1e12 + 1', function () {
            var result = formatInteger(1e12 + 1, 'w;o');
            var expected = 'one trillion and first';
            assert.equal(result, expected);
        });

    });

    describe('spreadsheet column names', function () {
        it('1', function () {
            var result = formatInteger(1, 'A');
            var expected = 'A';
            assert.equal(result, expected);
        });

        it('12', function () {
            var result = formatInteger(12, 'a');
            var expected = 'l';
            assert.equal(result, expected);
        });

        it('26', function () {
            var result = formatInteger(26, 'a');
            var expected = 'z';
            assert.equal(result, expected);
        });

        it('27', function () {
            var result = formatInteger(27, 'a');
            var expected = 'aa';
            assert.equal(result, expected);
        });

        it('300', function () {
            var result = formatInteger(300, 'A');
            var expected = 'KN';
            assert.equal(result, expected);
        });

        it('123456', function () {
            var result = formatInteger(123456, 'A');
            var expected = 'FZPH';
            assert.equal(result, expected);
        });

    })
});

describe('#formatDateTime', function () {
    describe('undefined value', function () {
        it('should return result object', function () {
            var result = formatDateTime(undefined);
            var expected = undefined;
            assert.equal(result, expected);
        });
    });

    describe('basic date patterns', function () {
        it('should return literal', function () {
            var result = formatDateTime(1521801216617, 'Hello');
            var expected = 'Hello';
            assert.equal(result, expected);
        });

        it('should return literal', function () {
            var result = formatDateTime(1521801216617, 'Year: [Y0001]');
            var expected = 'Year: 2018';
            assert.equal(result, expected);
        });

        it('should return literal', function () {
            var result = formatDateTime(1521801216617, 'Year: <[Y0001]>');
            var expected = 'Year: <2018>';
            assert.equal(result, expected);
        });

        it('should return literal', function () {
            var result = formatDateTime(1521801216617, '[D#1]/[M#1]/[Y0001]');
            var expected = '23/3/2018';
            assert.equal(result, expected);
        });

        it('should return literal', function () {
            var result = formatDateTime(1521801216617, '[Y0001]-[M01]-[D01]');
            var expected = '2018-03-23';
            assert.equal(result, expected);
        });

        it('should return literal', function () {
            var result = formatDateTime(1521801216617, '[M01]/[D01]/[Y0001] at [H01]:[m01]:[s01]');
            var expected = '03/23/2018 at 10:33:36';
            assert.equal(result, expected);
        });

    });

    describe('width modifier', function () {
        it('should return literal', function () {
            var result = formatDateTime(1521801216617, '[D#1,2]/[M1,2]/[Y,2]');
            var expected = '23/03/18';
            assert.equal(result, expected);
        });

    });

    describe('roman numeral dates', function () {
        it('year in roman numerals', function () {
            var result = formatDateTime(1521801216617, '[D1] [M01] [YI]');
            var expected = '23 03 MMXVIII';
            assert.equal(result, expected);
        });
    });

    describe('ordinals', function () {
        it('day in ordinal numerals', function () {
            var result = formatDateTime(1521801216617, '[D1o] [M01] [Y]');
            var expected = '23rd 03 2018';
            assert.equal(result, expected);
        });
    });

    describe('date in words', function () {
        it('year in words', function () {
            var result = formatDateTime(1521801216617, '[Yw]');
            var expected = 'two thousand and eighteen';
            assert.equal(result, expected);
        });

        it('day of month in ordinal words', function () {
            var result = formatDateTime(1521801216617, '[Dwo] [M01] [Y]');
            var expected = 'twenty-third 03 2018';
            assert.equal(result, expected);
        });

        it('month in words', function () {
            var result = formatDateTime(1521801216617, '[D1o] [MNn] [Y]');
            var expected = '23rd March 2018';
            assert.equal(result, expected);
        });

        it('month in uppercase words', function () {
            var result = formatDateTime(1521801216617, '[D1o] [MN] [Y]');
            var expected = '23rd MARCH 2018';
            assert.equal(result, expected);
        });

        it('day/month in words', function () {
            var result = formatDateTime(1521801216617, '[FNn], [D1o] [MNn] [Y]');
            var expected = 'Thursday, 23rd March 2018';
            assert.equal(result, expected);
        });

        it('day/date/month in words', function () {
            var result = formatDateTime(1521801216617, '[FNn], the [Dwo] of [MNn] [Y]');
            var expected = 'Thursday, the twenty-third of March 2018';
            assert.equal(result, expected);
        });

        it('abbreviated day/month in words', function () {
            var result = formatDateTime(1521801216617, '[FNn,3-3], [D1o] [MNn,3-3] [Y]');
            var expected = 'Thu, 23rd Mar 2018';
            assert.equal(result, expected);
        });

    });

});

describe('#parseDateTime', function () {
    describe('undefined value', function () {
        it('should return result object', function () {
            var result = parseDateTime(undefined);
            var expected = undefined;
            assert.equal(result, expected);
        });
    });

    describe('basic date patterns', function () {
        it('should parse string literal', function () {
            var result = parseDateTime('Hello', 'Hello');
            var expected = undefined;
            assert.equal(result, expected);
        });

        it('should parse year', function () {
            var result = parseDateTime('2018', '[Y1]');
            var expected = new Date('2018-01-01T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse year/month/day', function () {
            var result = parseDateTime('2018-03-27', '[Y1]-[M01]-[D01]');
            var expected = new Date('2018-03-27T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse ISO 8601 format', function () {
            var result = parseDateTime('2018-03-27T14:03:00.123Z', '[Y0001]-[M01]-[D01]T[H01]:[m01]:[s01].[f001]Z');
            var expected = new Date('2018-03-27T14:03:00.123Z');
            assert.equal(result, expected.getTime());
        });

    });

    describe('ordinal numeric dates', function () {
        it('should parse year/month/day', function () {
            var result = parseDateTime('27th 3 1976', '[D1o] [M#1] [Y0001]');
            var expected = new Date('1976-03-27T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse year/month/day', function () {
            var result = parseDateTime('21st 12 1881', '[D1o] [M01] [Y0001]');
            var expected = new Date('1881-12-21T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse year/month/day', function () {
            var result = parseDateTime('2nd 12 2012', '[D1o] [M01] [Y0001]');
            var expected = new Date('2012-12-02T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

    });


    describe('roman numeral dates', function () {
        it('should parse year', function () {
            var result = parseDateTime('MCMLXXXIV', '[YI]');
            var expected = new Date('1984-01-01T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse year/month/day', function () {
            var result = parseDateTime('27 03 MMXVIII', '[D1] [M01] [YI]');
            var expected = new Date('2018-03-27T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse year/month/day', function () {
            var result = parseDateTime('27 iii MMXVIII', '[D1] [Mi] [YI]');
            var expected = new Date('2018-03-27T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });


    });

    describe('months in words', function () {
        it('should parse year/month/day', function () {
            var result = parseDateTime('27th April 2008', '[D1o] [MNn] [Y0001]');
            var expected = new Date('2008-04-27T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse year/month/day', function () {
            var result = parseDateTime('21 August 2017', '[D1] [MNn] [Y0001]');
            var expected = new Date('2017-08-21T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse year/month/day', function () {
            var result = parseDateTime('2 Feb 2012', '[D1] [MNn,3-3] [Y0001]');
            var expected = new Date('2012-02-02T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

    });

    describe('should parse dates/years in words', function () {
        it('should parse year in words', function () {
            var result = parseDateTime('one thousand, nine hundred and eighty-four', '[Yw]');
            var expected = new Date('1984-01-01T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse date/month in words', function () {
            var result = parseDateTime('twenty-seven April 2008', '[Dw] [MNn] [Y0001]');
            var expected = new Date('2008-04-27T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse date/month in ordinal words', function () {
            var result = parseDateTime('twenty-seventh April 2008', '[Dw] [MNn] [Y0001]');
            var expected = new Date('2008-04-27T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse ordinal date/month/year', function () {
            var result = parseDateTime('twenty-first August two thousand and seventeen', '[Dw] [MNn] [Yw]');
            var expected = new Date('2017-08-21T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse ordinal date/month/year', function () {
            var result = parseDateTime('TWENTY-SECOND August two thousand and seventeen', '[DW] [MNn] [Yw]');
            var expected = new Date('2017-08-22T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse ordinal date/month/year', function () {
            var result = parseDateTime('Twentieth of August, two thousand and seventeen', '[DW] of [MNn], [Yw]');
            var expected = new Date('2017-08-20T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

    });


});