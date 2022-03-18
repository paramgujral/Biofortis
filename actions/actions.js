
/**
 * common utilities
 */
const allureReporter = require('@wdio/allure-reporter').default;
const { assert } = require('chai');
const path = require('path');
class actions {

    async waitForClickable(elem){
        await browser.waitUntil(
            async () => (await elem.isClickable(),
            {
                timeout: 30000,
                timeoutMsg: "@@@@@@@@@@@element is not clickable"
            })
        )}

    async getElementID(elem){
        await this.waitForClickable(elem);
        return await elem.getAttribute('id');
    }

    async switchToIFrame(index){
        await browser.pause(15000); //XXX
        await browser.switchToFrame(index);
        }

    async switchToWindowWithTitle(title){
        await browser.switchWindow(title);
    }

   async clear(locator, logname) {
        try {
            await elem.waitForExist({ timeout: this.shortDynamicWait() });
            await elem.clear();
            allureReporter.addStep("able to clear the field " + logname, 'attachment', 'passed');
        } catch (err) {
            allureReporter.addStep("unable to clear the field " + logname, 'attachment', 'failed');
        }
    }

    async click(elem, logname) {
        try {
            await this.waitForClickable(elem, logname);
            await elem.waitForDisplayed({ timeout: this.shortDynamicWait() });
            await elem.click();
            allureReporter.addStep("able to click " + logname, 'attachment', 'passed');
            await browser.pause(2000);
        } catch (err) {
            await console.log(err);
            allureReporter.addStep("unable to click " + logname + " as the element not displayed", 'attachment', 'failed');
            await assert.fail("unable to click " + logname);
        }

    }

    async assertText(elem, logname) {
        try {
            await elem.waitForExist({ timeout: this.shortDynamicWait() });
            assert.equal(elem, logname);
            allureReporter.addStep("able to validate text " + logname, 'attachment', 'passed')
        } catch (err) {
            allureReporter.addStep("unable to click " + logname + " as it is not displayed", 'attachment', 'failed');
            await assert.fail("unable to validate " + logname);
        }
    }

   
    async sendKeys(elem, value, logname) {
        try {
           await elem.waitForExist({ timeout: this.shortDynamicWait() });
           await elem.click();
           await elem.setValue(value);
           allureReporter.addStep("able to enter " + value + " into the field " + logname, 'attachment', 'passed')
           await browser.pause(2000);
        } catch (err) {
            allureReporter.addStep("unable to enter " + value + " into the field " + logname, 'attachment', 'failed');
            assert.fail("unable to enter " + logname);
        }
    };

    async selectDropDown(elem, name, logname) {
        try {
            await elem.waitForExist({ timeout: this.shortDynamicWait() });
            await browser.waitUntil(() => elem.isClickable())
            await elem.selectByAttribute('name', name);
            allureReporter.addStep("able to select " + name + " from dropdown " + logname, 'attachment', 'passed');
        } catch (err) {
            allureReporter.addStep("unable to select " + name + " from dropdown " + logname, 'attachment', 'failed');
            assert.fail("unable to select " + logname);
        }
    }

    async dragAndDrop(elem, target) {
        try {
            await elem.waitForExist({ timeout: this.shortDynamicWait() });
            await elem.dragAndDrop(target)
            allureReporter.addStep("able to drag " + value + " from dropdown " + logname, 'attachment', 'passed');
        } catch (err) {
            allureReporter.addStep("unable to select " + value + " from dropdown " + logname, 'attachment', 'failed');
            assert.fail("unable to select " + logname);
        }
    }

    async uploadFile(elem, path) {
        try {
            await elem.waitForExist({ timeout: this.shortDynamicWait() });
            const filePath = path //('/path/to/some/file.png')
            const remoteFilePath = browser.uploadFile(filePath)
            await elem.setValue(remoteFilePath);
            await elem.click();
        } catch (err) {

        }
    }


    shortDynamicWait() {
        return 15000;
    }

    veryShortWait() {
        return 1000;
    }

}


module.exports = new actions();
