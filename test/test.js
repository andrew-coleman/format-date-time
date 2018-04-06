

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

        it('1234567890123', function () {
            var result = formatInteger(1234567890123, 'w');
            var expected = 'one trillion, two hundred and thirty-four billion, five hundred and sixty-seven million, eight hundred and ninety thousand, one hundred and twenty-three';
            assert.equal(result, expected);
        });

        it('1e15', function () {
            var result = formatInteger(1e15, 'w');
            var expected = 'one thousand trillion';
            assert.equal(result, expected);
        });

        it('1e46', function () {
            var result = formatInteger(1e46, 'w');
            var expected = 'ten billion trillion trillion trillion';
            assert.equal(result, expected);
        });

        it('1234567890123456', function () {
            var result = formatInteger(1234567890123456, 'w');
            var expected = 'one thousand, two hundred and thirty-four trillion, five hundred and sixty-seven billion, eight hundred and ninety million, one hundred and twenty-three thousand, four hundred and fifty-six';
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

        it('should format the year', function () {
            var result = formatDateTime(1521801216617, 'Year: [Y0001]');
            var expected = 'Year: 2018';
            assert.equal(result, expected);
        });

        it('should format the year', function () {
            var result = formatDateTime(1521801216617, 'Year: <[Y0001]>');
            var expected = 'Year: <2018>';
            assert.equal(result, expected);
        });

        it('should format the date in European style', function () {
            var result = formatDateTime(1521801216617, '[D#1]/[M#1]/[Y0001]');
            var expected = '23/3/2018';
            assert.equal(result, expected);
        });

        it('Sunday should be day 7', function () {
            var result = formatDateTime(1522616700000, '[F0] [FNn]');
            var expected = '7 Sunday';
            assert.equal(result, expected);
        });

        it('Monday should be day 1', function () {
            var result = formatDateTime(1522703100000, '[F0] [FNn]');
            var expected = '1 Monday';
            assert.equal(result, expected);
        });

        it('should format the date in ISO 8601 style', function () {
            var result = formatDateTime(1521801216617, '[Y0001]-[M01]-[D01]');
            var expected = '2018-03-23';
            assert.equal(result, expected);
        });

        it('should format the date & time in US style', function () {
            var result = formatDateTime(1521801216617, '[M01]/[D01]/[Y0001] at [H01]:[m01]:[s01]');
            var expected = '03/23/2018 at 10:33:36';
            assert.equal(result, expected);
        });

        it('should format the date & time in ISO 8601 style', function () {
            var result = formatDateTime(1521801216617, '[Y]-[M01]-[D01]T[H01]:[m]:[s].[f001][Z01:01t]');
            var expected = '2018-03-23T10:33:36.617Z';
            assert.equal(result, expected);
        });

    });

    describe('timezone', function () {
        it('should offset for BST +0100', function () {
            var result = formatDateTime(1521801216617, '[Y]-[M01]-[D01]T[H01]:[m]:[s].[f001][Z01:01t]', '+0100');
            var expected = '2018-03-23T11:33:36.617+0100';
            assert.equal(result, expected);
        });

        it('should rollover day boundaries', function () {
            var result = formatDateTime(1204405500000, '[Y]-[M01]-[D01]T[H01]:[m]:[s].[f001][Z01:01t]', '+0530');
            var expected = '2008-03-02T02:35:00.000+0530';
            assert.equal(result, expected);
        });

        it('should rollover year boundaries', function () {
            var result = formatDateTime(1230757500000, '[Y]-[M01]-[D01]T[H01]:[m]:[s].[f001][Z01:01t]', '+0530');
            var expected = '2009-01-01T02:35:00.000+0530';
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

    describe('dates with letters instead of numbers', function () {
        it('day/month in letters, year in roman numerals', function () {
            var result = formatDateTime(1521801216617, '[Da] [MA] [Yi]');
            var expected = 'w C mmxviii';
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
            var expected = 'Friday, 23rd March 2018';
            assert.equal(result, expected);
        });

        it('day/date/month in words', function () {
            var result = formatDateTime(1521801216617, '[FNn], the [Dwo] of [MNn] [Y] [E]');
            var expected = 'Friday, the twenty-third of March 2018 ISO';
            assert.equal(result, expected);
        });

        it('abbreviated day/month in words', function () {
            var result = formatDateTime(1521801216617, '[FNn,3-3], [D1o] [MNn,3-3] [Y] [C]');
            var expected = 'Fri, 23rd Mar 2018 ISO';
            assert.equal(result, expected);
        });

    });

    describe('Default presentation modifiers', function () {
        it('should apply default modifiers to day/date/time', function () {
            var result = formatDateTime(1521801216617, '[F], [D]/[M]/[Y] [h]:[m]:[s] [P]');
            var expected = 'friday, 23/3/2018 10:33:36 am';
            assert.equal(result, expected);
        });

        it('should apply default modifiers to day/date/time 12hr pm', function () {
            var result = formatDateTime(1204405500000, '[F], [D]/[M]/[Y] [h]:[m]:[s] [P]');
            var expected = 'saturday, 1/3/2008 9:05:00 pm';
            assert.equal(result, expected);
        });

        it('should apply default modifiers to day/date/time 12hr midnight', function () {
            var result = formatDateTime(1199664000000, '[F], [D]/[M]/[Y] [h]:[m]:[s] [P]');
            var expected = 'monday, 7/1/2008 12:00:00 am';
            assert.equal(result, expected);
        });
    });

    describe('Day of year; week of year; week of month', function () {
        it('1st Jan should be day 1', function () {
            var result = formatDateTime(1514808000000, '[dwo] day of the year');
            var expected = 'first day of the year';
            assert.equal(result, expected);
        });

        it('31st Dec should be day 365', function () {
            var result = formatDateTime(1546257600000, '[d] days in [Y0001]');
            var expected = '365 days in 2018';
            assert.equal(result, expected);
        });

        it('31st Dec should be day 366 in a leap year', function () {
            var result = formatDateTime(1483185600000, '[d] days in [Y0001]');
            var expected = '366 days in 2016';
            assert.equal(result, expected);
        });

        it('Monday 1st Jan should be in the first week of 2018', function () {
            var result = formatDateTime(1514808000000, 'Week: [W]');
            var expected = 'Week: 1';
            assert.equal(result, expected);
        });

        it('Sunday 7st Jan should be in the first week of 2018', function () {
            var result = formatDateTime(1515326400000, 'Week: [W]');
            var expected = 'Week: 1';
            assert.equal(result, expected);
        });

        it('Sunday 25th Dec should be in week 52 of 2018', function () {
            var result = formatDateTime(1545739200000, 'Week: [W]');
            var expected = 'Week: 52';
            assert.equal(result, expected);
        });

        it('Wed 1st Jan 2014 should be in week 1', function () {
            var result = formatDateTime(1388577600000, 'Week: [W]');
            var expected = 'Week: 1';
            assert.equal(result, expected);
        });

        it('Mon 29th Dec 2014 should be in week 1 of 2015', function () {
            var result = formatDateTime(1419854400000, 'Week: [W]');
            var expected = 'Week: 1';
            assert.equal(result, expected);
        });

        it('Sun 28th Dec 2014 should be in week 52 of 2014', function () {
            var result = formatDateTime(1419768000000, 'Week: [W]');
            var expected = 'Week: 52';
            assert.equal(result, expected);
        });

        it('Tues 23th Dec 2014 should be in week 52 of 2014', function () {
            var result = formatDateTime(1419336000000, 'Week: [W]');
            var expected = 'Week: 52';
            assert.equal(result, expected);
        });

        it('Thur 1st Jan 2015 should be in week 1 of 2015', function () {
            var result = formatDateTime(1420113600000, 'Week: [W]');
            var expected = 'Week: 1';
            assert.equal(result, expected);
        });

        it('Mon 5th Jan 2015 should be in week 2 of 2015', function () {
            var result = formatDateTime(1420459200000, 'Week: [W]');
            var expected = 'Week: 2';
            assert.equal(result, expected);
        });

        it('Mon 28th Dec 2015 should be in week 53 of 2015', function () {
            var result = formatDateTime(1451304000000, 'Week: [W]');
            var expected = 'Week: 53';
            assert.equal(result, expected);
        });

        it('Thur 31th Dec 2015 should be in week 53 of 2015', function () {
            var result = formatDateTime(1451563200000, 'Week: [W]');
            var expected = 'Week: 53';
            assert.equal(result, expected);
        });

        it('Sat 2nd Jan 2016 should be in week 53 of 2015', function () {
            var result = formatDateTime(1451736000000, 'Week: [W]');
            var expected = 'Week: 53';
            assert.equal(result, expected);
        });

        it('Tue 29th Jan 2013 should be in week 5 of Jan', function () {
            var result = formatDateTime(1359460800000, 'Week: [w] of [xNn]');
            var expected = 'Week: 5 of January';
            assert.equal(result, expected);
        });

        it('Thur 31st Jan 2013 should be in week 5 of Jan', function () {
            var result = formatDateTime(1359633600000, 'Week: [w] of [xNn]');
            var expected = 'Week: 5 of January';
            assert.equal(result, expected);
        });

        it('Thur 1st Feb 2013 should be in week 5 of Jan', function () {
            var result = formatDateTime(1359720000000, 'Week: [w] of [xNn]');
            var expected = 'Week: 5 of January';
            assert.equal(result, expected);
        });

        it('Mon 1st Jan 2018 should be in week 1 of Jan', function () {
            var result = formatDateTime(1514808000000, 'Week: [w] of [xNn]');
            var expected = 'Week: 1 of January';
            assert.equal(result, expected);
        });

        it('Sun 1st Jan 2017 should be in week 5 of Dec', function () {
            var result = formatDateTime(1483272000000, 'Week: [w] of [xNn]');
            var expected = 'Week: 5 of December';
            assert.equal(result, expected);
        });

        it('Tues 31st July 2018 should be in week 1 of Aug', function () {
            var result = formatDateTime(1533038400000, 'Week: [w] of [xNn]');
            var expected = 'Week: 1 of August';
            assert.equal(result, expected);
        });

        it('Tues 30th Dec 2014 should be in week 1 of Jan', function () {
            var result = formatDateTime(1419940800000, 'Week: [w] of [xNn]');
            var expected = 'Week: 1 of January';
            assert.equal(result, expected);
        });

    });

    describe('ISO week date format', function () {
        // test data in this section from https://en.wikipedia.org/wiki/ISO_week_date#Relation_with_the_Gregorian_calendar

        it('Sat 1 Jan 2005', function () {
            var millis = parseDateTime('2005-01-01', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2004-W53-6';
            assert.equal(result, expected);
        });

        it('Sun 2 Jan 2005', function () {
            var millis = parseDateTime('2005-01-02', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2004-W53-7';
            assert.equal(result, expected);
        });

        it('Sat 31 Dec 2005', function () {
            var millis = parseDateTime('2005-12-31', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2005-W52-6';
            assert.equal(result, expected);
        });

        it('Sun 1 Jan 2006', function () {
            var millis = parseDateTime('2006-01-01', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2005-W52-7';
            assert.equal(result, expected);
        });

        it('Mon 2 Jan 2006', function () {
            var millis = parseDateTime('2006-01-02', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2006-W01-1';
            assert.equal(result, expected);
        });

        it('Sun 31 Dec 2006', function () {
            var millis = parseDateTime('2006-12-31', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2006-W52-7';
            assert.equal(result, expected);
        });

        it('Mon 1 Jan 2007', function () {
            var millis = parseDateTime('2007-01-01', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2007-W01-1';
            assert.equal(result, expected);
        });

        it('Sun 30 Dec 2007', function () {
            var millis = parseDateTime('2007-12-30', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2007-W52-7';
            assert.equal(result, expected);
        });

        it('Mon 31 Dec 2007', function () {
            var millis = parseDateTime('2007-12-31', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2008-W01-1';
            assert.equal(result, expected);
        });

        it('Tue 1 Jan 2008', function () {
            var millis = parseDateTime('2008-01-01', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2008-W01-2';
            assert.equal(result, expected);
        });

        it('Sun 28 Dec 2008', function () {
            var millis = parseDateTime('2008-12-28', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2008-W52-7';
            assert.equal(result, expected);
        });

        it('Mon 29 Dec 2008', function () {
            var millis = parseDateTime('2008-12-29', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2009-W01-1';
            assert.equal(result, expected);
        });

        it('Tue 30 Dec 2008', function () {
            var millis = parseDateTime('2008-12-30', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2009-W01-2';
            assert.equal(result, expected);
        });

        it('Wed 31 Dec 2008', function () {
            var millis = parseDateTime('2008-12-31', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2009-W01-3';
            assert.equal(result, expected);
        });

        it('Thu 1 Jan 2009', function () {
            var millis = parseDateTime('2009-01-01', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2009-W01-4';
            assert.equal(result, expected);
        });

        it('Thu 31 Dec 2009', function () {
            var millis = parseDateTime('2009-12-31', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2009-W53-4';
            assert.equal(result, expected);
        });

        it('Fri 1 Jan 2010', function () {
            var millis = parseDateTime('2010-01-01', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2009-W53-5';
            assert.equal(result, expected);
        });

        it('Sat 2 Jan 2010', function () {
            var millis = parseDateTime('2010-01-02', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2009-W53-6';
            assert.equal(result, expected);
        });

        it('Sun 3 Jan 2010', function () {
            var millis = parseDateTime('2010-01-03', '[Y]-[M]-[D]');
            var result = formatDateTime(millis, '[X0001]-W[W01]-[F1]');
            var expected = '2009-W53-7';
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

    describe('dates with letters instead of numbers', function () {
        it('day/month in letters, year in roman numerals', function () {
            var result = parseDateTime('w C mmxviii', '[Da] [MA] [Yi]');
            console.log(new Date(result));
            var expected = new Date('2018-03-23T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('day/month in letters, year in roman numerals', function () {
            var result = parseDateTime('ae C mmxviii', '[Da] [MA] [Yi]');
            console.log(new Date(result));
            var expected = new Date('2018-03-31T00:00:00.000Z');
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

    describe('dates/years in words', function () {
        it('should parse year in words', function () {
            var result = parseDateTime('one thousand, nine hundred and eighty-four', '[Yw]');
            var expected = new Date('1984-01-01T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('should parse year in words', function () {
            var result = parseDateTime('nineteen hundred and eighty-four', '[Yw]');
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

    describe('12 hour clock', function () {
        it('just after midnight', function () {
            var result = parseDateTime('4/4/2018 12:06 am', '[D1]/[M1]/[Y0001] [h]:[m] [P]');
            var expected = new Date('2018-04-04T00:06:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('breakfast time', function () {
            var result = parseDateTime('4/4/2018 06:30 am', '[D1]/[M1]/[Y0001] [h]:[m] [P]');
            var expected = new Date('2018-04-04T06:30:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('just after midday', function () {
            var result = parseDateTime('4/4/2018 12:06 pm', '[D1]/[M1]/[Y0001] [h]:[m] [P]');
            var expected = new Date('2018-04-04T12:06:00.000Z');
            assert.equal(result, expected.getTime());
        });

        it('just before midnight', function () {
            var result = parseDateTime('4/4/2018 11:30 pm', '[D1]/[M1]/[Y0001] [h]:[m] [P]');
            var expected = new Date('2018-04-04T23:30:00.000Z');
            assert.equal(result, expected.getTime());
        });
    });

    describe('derive the date', function () {
        it('ordinal date: day 94 of the year 2018', function () {
            var result = parseDateTime('2018-094', '[Y0001]-[d001]');
            console.log('derived', new Date(result));
            var expected = new Date('2018-04-04T00:00:00.000Z');
            assert.equal(result, expected.getTime());
        });
    });
});