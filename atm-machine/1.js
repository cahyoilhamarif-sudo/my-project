const readline = require('readline-sync');

let account = 
    [100.0, 100.0, 100.0, 100.0, 100.0, 100.0,
    100.0, 100.0, 100.0, 100.0, 100.0, 100.0]
    
const mainMenu = {
    1: ': check balance',
    2: ': withdraw',
    3: ': deposit',
    4: ': exit'
}
let id = 0;

function enterId() {
    id = +readline.question('\nEnter an id: ');
    if (id > account.length) {
        console.log('Please enter the correct id!')
        console.log(enterId());
    } else {
    enterMenu();
    }
}

enterId();

function enterMenu() {
    console.log('\nMain menu');
    if (id < account.length) {
    for (const key in mainMenu){
    console.log(key + mainMenu[key]);
        }
    let enterChoice = +readline.question('Enter a choice: ');
    if (enterChoice === 1) {
        checkBalance();}   
    if (enterChoice === 2) {
        withdraw();} 
    if (enterChoice === 3) {
        deposit();} 
    if (enterChoice === 4) {
        enterId();
        } else {
            console.log('Please enter the correct choice!');
            enterMenu();
        }
    } 
}

function checkBalance() {
    console.log(`This balance is ${account[id]}`);
    enterMenu();
}

function withdraw() {
    let amountWithdraw = +readline.question('Enter an amount to withdraw: ');
    account[id] = account[id] - amountWithdraw;
    enterMenu();
}

function deposit() {
    let amountDeposit = +readline.question('Enter an amount to deposit: ')
    account[id] = account[id] + amountDeposit;
    enterMenu();
}

function exit() {
    enterId();
}