
/**
 * common utilities
 */
const allureReporter = require('@wdio/allure-reporter').default;
const { assert } = require('chai');
const path = require('path');
class actions {


    async click(elem, logname) {
        try {
            await this.waitForClickable(elem, logname);
            await elem.waitForDisplayed({ timeout: this.shortDynamicWait() });
            await elem.click();
            allureReporter.addStep("able to click " + logname, 'attachment', 'passed');
            await browser.pause(1000);
        } catch (err) {
            await console.log(err);
            allureReporter.addStep("unable to click " + logname + " as the element not displayed", this.getScreenshot(), 'failed');
            await assert.fail("unable to click " + logname);
        }
    }

    async sendKeys(elem, value, logname) {
        try {
            await browser.pause(1000);
           await elem.waitForExist({ timeout: this.shortDynamicWait() });
           await elem.click();
           await elem.setValue(value);
           allureReporter.addStep("able to enter " + value + " into the field " + logname, 'attachment', 'passed')
        } catch (err) {
            allureReporter.addStep("unable to enter " + value + " into the field " + logname, this.getScreenshot(), 'failed');
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
            allureReporter.addStep("unable to select " + name + " from dropdown " + logname, this.getScreenshot(), 'failed');
            assert.fail("unable to select " + logname);
        }
    }

    async dragAndDrop(elem, target) {
        try {
            await elem.waitForExist({ timeout: this.shortDynamicWait() });
            await elem.dragAndDrop(target)
            allureReporter.addStep("able to drag " + value + " from dropdown " + logname, 'attachment', 'passed');
        } catch (err) {
            allureReporter.addStep("unable to select " + value + " from dropdown " + logname, this.getScreenshot(), 'failed');
            assert.fail("unable to select " + logname);
        }
    }
    
    async validateText(elem, elemName, text){
        try {
            await elem.waitForDisplayed({timeout : this.shortDynamicWait()})
            let actualText = await elem.getText();
            if(actualText.indexOf(text)!=-1){
                allureReporter.addStep('Verified field '+elemName+' has value '+text+' successfully', 'attachment' ,'passed');
            }else{
                allureReporter.addStep('Verified field '+elemName+' has value other than '+text, this.getScreenshot() ,'failed');
            }
        } catch (Error) {
            console.log(Error.message);
        }
    }

    async validateElementIsDispalyed(elem, messageOnPass, messageOnFail){
        try {
            await browser.pause(5000);
            if(await elem.isDisplayed()){
                allureReporter.addStep(messageOnPass, 'attachment' ,'passed');
                return true;
            }else{                
                allureReporter.addStep(messageOnFail, this.getScreenshot() ,'failed');
                return false;
            }
        } catch (error) {
            allureReporter.addStep(error.message, this.getScreenshot() ,'failed');
            return false;
        }
    }

    async validateElementIsNotDispalyed(elem, messageOnPass, messageOnFail){
        try {
            if(!await elem.isDisplayed()){
                allureReporter.addStep(messageOnPass, 'attachment' ,'passed');
            }else{                
                allureReporter.addStep(messageOnFail, this.getScreenshot() ,'failed');
            }
        } catch (error) {
            allureReporter.addStep(error.message, this.getScreenshot() ,'failed');
        }
    }

    async addStepInReport(status, reportMessage){
        if (status=='pass'){
            allureReporter.addStep(reportMessage, 'attachment' ,'passed');
        }else if(status=='fail'){
            allureReporter.addStep(reportMessage, this.getScreenshot() ,'falied');
        }else if(status=='broken'){
            allureReporter.addStep(reportMessage, this.getScreenshot() ,'broken');
        }
    }

    async assertTextPresentOnElement(elem , text){
        try {
            await elem.waitForDisplayed({timeout : this.shortDynamicWait()})
            await expect(elem).toHaveTextContaining(text)
            allureReporter.addStep('Verified that '+text+' successfully ', 'attachment' ,'passed');
        } catch (Error) {
            allureReporter.addStep(text+' not present ', this.getScreenshot() ,'failed');
        }
    }

    async assertElement(elem, logname) {
        try {
            var isDisplayed = await elem.isDisplayed();
            allureReporter.addStep('expected '+logname+" is displayed","attachment", "passed");
            return isDisplayed           
        } catch (error) {
            allureReporter.addStep('expected '+logname+" is not displayed",this.getScreenshot(), "failed");
        }
    }

    async expectToHaveTitle(title){
        try {
            await expect(browser).toHaveTitle(title);
            allureReporter.addStep('Validated that '+title+' is successfully displayed', "attachment",'passed');
        } catch (Error) {
            allureReporter.addStep('Expected page '+title+' is not displayed', this.getScreenshot(), 'failed');
        }
    }

    async Switchtonext() {
        await browser.pause(10000)
        await browser.switchToWindow(await browser.getWindowHandles()[1])
        allureReporter.addStep("switched to next window", 'attachemnt', 'passed')
    }

    async Switchtonexttonext() {
        await browser.pause(10000)
        await browser.switchToWindow(await browser.getWindowHandles()[2])
        allureReporter.addStep("switched to next window", 'attachemnt', 'passed')
    }

    async switchToParent(wid) {
        await browser.switchToWindow(wid)
        allureReporter.addStep("switched back to parent window", 'attachemnt', 'passed')
    }

   async clear(locator, logname) {
        try {
            await elem.waitForExist({ timeout: this.shortDynamicWait() });
            await elem.clear();
            allureReporter.addStep("able to clear the field " + logname, 'attachment', 'passed');
        } catch (err) {
            allureReporter.addStep("unable to clear the field " + logname, this.getScreenshot(), 'failed');
        }
    }

    async assertText(elem, logname) {
        try {
            await elem.waitForExist({ timeout: this.shortDynamicWait() });
            assert.equal(elem, logname);
            allureReporter.addStep("able to validate text " + logname, 'attachment', 'passed')
        } catch (err) {
            allureReporter.addStep("unable to click " + logname + " as it is not displayed", this.getScreenshot(), 'failed');
            await assert.fail("unable to validate " + logname);
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

    async waitForClickable(elem){
        await browser.waitUntil(
            async () => (await elem.isClickable(),
            {
                timeout: 30000,
                timeoutMsg: "@@@@@@@@@@@element is not clickable"
            })
        )}

    async waitFordisplay(elem){
        await browser.waitUntil(
            async () => (await elem.isDisplayed(),
            {
                timeout: 30000,
                timeoutMsg: '------------->Element'+elem+'is not displayed'
            })
        )}

    async getElementID(elem){
        await this.waitForClickable(elem);
        return await elem.getAttribute('id');
    }

    async switchToIFrame(index){
        await browser.pause(10000);
        await browser.switchToFrame(index);
        }
      
    async switchToParent(){
        await browser.pause(3000); 
        await browser.switchToFrame(null);
        }

    async switchToWindowWithTitle(title){
        await browser.pause(3000);
        await browser.switchWindow(title);
    }

    async closeWindow(title){
        await browser.pause(2000);
        await browser.closeWindow(title);
    }

    async clickEnter(){
        await browser.pause(2000);
        await browser.keys("\uE007");
    }

    async getScreenshot(){
        await browser.takeScreenshot(); 
       }

    shortDynamicWait() {
        return 15000;
    }

    veryShortWait() {
        return 1000;
    }

}


module.exports = new actions();
