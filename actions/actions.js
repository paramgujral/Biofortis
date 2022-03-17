
/**
 * common utilities
 */
const allureReporter = require('@wdio/allure-reporter').default;
const { assert } = require('chai');
const path = require('path');
class actions {

    clear(locator, logname) {
        try {
            elem.waitForExist({ timeout: this.shortDynamicWait() });
            elem.clear();
            allureReporter.addStep("able to clear the field " + logname, 'attachment', 'passed');
        } catch (err) {
            allureReporter.addStep("unable to clear the field " + logname, 'attachment', 'failed');
        }
    }

     click(elem, logname) {
        try {
            elem.waitForExist({ timeout: this.shortDynamicWait() });
            elem.click();
            allureReporter.addStep("able to click " + logname, 'attachment', 'passed')
        } catch (err) {
            console.log(err);
            allureReporter.addStep("unable to click " + logname + " as the element not displayed", 'attachment', 'failed');
            assert.fail("unable to click " + logname);
        }

    }

    assertText(elem, logname) {
        try {
            elem.waitForExist({ timeout: this.shortDynamicWait() });
            assert.equal(elem, logname);
            allureReporter.addStep("able to validate text " + logname, 'attachment', 'passed')
        } catch (err) {
            allureReporter.addStep("unable to click " + logname + " as it is not displayed", 'attachment', 'failed');
            assert.fail("unable to validate " + logname);
        }
    }

    sendKeys(elem, value, logname) {
        try {
            elem.waitForExist({ timeout: this.shortDynamicWait() });
            elem.setValue(value);
            allureReporter.addStep("able to enter " + value + " into the field " + logname, 'attachment', 'passed')
        } catch (err) {
            allureReporter.addStep("unable to enter " + value + " into the field " + logname, 'attachment', 'failed');
            assert.fail("unable to enter " + logname);
        }
    };

    selectDropDown(elem, name, logname) {
        try {
            elem.waitForExist({ timeout: this.shortDynamicWait() });
            browser.waitUntil(() => elem.isClickable())
            elem.selectByAttribute('name', name);
            allureReporter.addStep("able to select " + name + " from dropdown " + logname, 'attachment', 'passed');
        } catch (err) {
            allureReporter.addStep("unable to select " + name + " from dropdown " + logname, 'attachment', 'failed');
            assert.fail("unable to select " + logname);
        }
    }

    dragAndDrop(elem, target) {
        try {
            elem.waitForExist({ timeout: this.shortDynamicWait() });
            elem.dragAndDrop(target)
            allureReporter.addStep("able to drag " + value + " from dropdown " + logname, 'attachment', 'passed');
        } catch (err) {
            allureReporter.addStep("unable to select " + value + " from dropdown " + logname, 'attachment', 'failed');
            assert.fail("unable to select " + logname);
        }
    }

    uploadFile(elem, path) {
        try {
            elem.waitForExist({ timeout: this.shortDynamicWait() });
            const filePath = path //('/path/to/some/file.png')
            const remoteFilePath = browser.uploadFile(filePath)
            elem.setValue(remoteFilePath);
            elem.click();
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
