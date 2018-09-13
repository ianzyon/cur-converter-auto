const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;


(async function automate(){
    let driver = await new webdriver.Builder().forBrowser('chrome').build();
    try {

        await driver.get('http://127.0.0.1:3005/');

        for(let i = 1; i < 80; i++) {
            let value = 10 * i;
            await driver.findElement(By.id('inputValue')).clear();
            await driver.findElement(By.id('inputValue')).sendKeys(value);
            await driver.executeScript(
                `document.getElementById("conversor").value = 'euro';
                `);
            await driver.findElement(By.id('botaoConverter')).click();
            let output = await driver.findElement(By.id('outputValue'));
            let result = await driver.executeScript(
                `let result = document.getElementById("outputValue").value;
                return result
                `, output);
            console.log(value + ' R$ = ' + result + ' EU');
        }

    } catch(e) {
        console.log('fail error: ' + e)
    }

})();




