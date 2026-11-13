const readline = require('readline-sync');

//Model
// - Day
START_YEAR = 1800;
START_DAY_1800 = 3;
const Day = Object.freeze([
  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
]);
// - Months
const Months = Object.freeze({
  1: 'JANUARY',
  2: 'FEBRUARY',
  3: 'MARCH',
  4: 'APRIL',
  5: 'MAY',
  6: 'JUNE',
  7: 'JULY',
  8: 'AUGUST',
  9: 'SEPTEMBER',
  10: 'OCTOBER',
  11: 'NOVEMBER',
  12: 'DECEMBER'
  }
);

function inherit(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype, {
    constructor: {
      value: Child,
      writable: true,
      enumerable: false,
      configurable: true
    }
  });
};

// - isLeapYear
function isLeapYear(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
};

// - Dates
function Dates (month, year) { 
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      return 31;
  } else if (month === 2) {
      return isLeapYear(year) ? 29 : 28;
  } else {
      return 30;
  }   
};

function getFirstDayIndex(targetMonth, targetYear) {
    let totalDays = 0;

    if (targetYear >= START_YEAR) {
        for (let i = START_YEAR; i < targetYear; i++) {
            totalDays += isLeapYear(i) ? 366 : 365;
        }
        for (let j = 1; j < targetMonth; j++) {
            totalDays += Dates(j, targetYear);
        }
        return (totalDays + START_DAY_1800) % 7;
    } else {
        for (let i = targetYear; i < START_YEAR; i++) {
            totalDays += isLeapYear(i) ? 366 : 365;
        }
        for (let j = 1; j < targetMonth; j++) {
            totalDays -= Dates(j, targetYear);
        }
        
        let resultDay = (START_DAY_1800 - (totalDays % 7)) % 7;
        if (resultDay < 0) {
            resultDay += 7;
        }
        return resultDay;
    }
}

//View
// - PromptView
function readYear () {
  return +readline.question('Enter full year (e.g., 2001): ');
}; 

function readMonth () {
  return +readline.question('Enter month in number between 1 and 12: ');
};

function CalenderBoard (month, year) {
  const monthName = Months[month];
  const monthYear = String(`${monthName} ${year}`)
  console.log(monthYear.padStart(22, ' '));
  console.log('---------------------------------');
  console.log(Day.join('  '));
};

function displayDate(month, year) {
    const firstDayIndex = getFirstDayIndex(month, year);
    const totalDays = Dates(month, year);
    
    let calendarStr = '';
    let currentDayIndex = firstDayIndex;
    
    for (let i = 0; i < firstDayIndex; i++) {
        calendarStr += '     '; 
    }

    for (let day = 1; day <= totalDays; day++) {
        calendarStr += String(day).padStart(3, ' ') + '  ';
        
        if (currentDayIndex === 6) {
            calendarStr += '\n';
            currentDayIndex = 0; 
        } else {
            currentDayIndex++;
        }
    }
    console.log(calendarStr);
}


//Controller
function Controller() {
    let year;
    let month;

    while (true) {
        year = readYear();
        if (!isNaN(year)) {
            break; 
        }
        console.log('Please Input a Valid Number for Year!');
    }

    while (true) {
        month = readMonth();
        if (!isNaN(month) && month >= 1 && month <= 12) {
            break; 
        }
        console.log('Please Input a Valid Number between 1 and 12!');
    }
    console.log('\n')
    CalenderBoard(month, year); 
    displayDate(month, year);
}

Controller();