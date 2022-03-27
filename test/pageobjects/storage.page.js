const allureReporter = require('@wdio/allure-reporter').default;

const Page = require('./page');
const CommonActions = require('../../actions/actions');

class StoragePage extends Page{
    /**
     * define selectors using getter methods
     */
    get btnChangeFacility() {return $('//span[text()="Change Facility"]//ancestor::a')};
    get headerStorage() {return $('//div[@class="c-header-text"]')};

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async changeStorage (storageName, storageunits) {
        let currentStorage = await this.headerStorage.getText();
        allureReporter.addStep('Current Storage: '+currentStorage, 'attachment', 'passed');
        await CommonActions.click(this.btnChangeFacility, "Change Facility");
        let elemStorage = await $(`//span[text()="${storageName}"]//ancestor::a`)
        await CommonActions.click(elemStorage, storageName); 
        currentStorage = await this.headerStorage.getText();
        allureReporter.addStep('New Storage: '+currentStorage, 'attachment', 'passed');
        
        for(const unit of storageunits) {
            let elemUnit = await $(`//span[text()="${unit}"]`);
            await CommonActions.validateElementIsDispalyed(elemUnit, unit+': Store unit Found', unit +': Store unit Not found!');
        }
    }

    async validateStorageInaccessible (storageName) {
        await CommonActions.click(this.btnChangeFacility, "Change Facility");
        let elemStorage = $(`//span[text()="${storageName}"]//ancestor::a`)
        await CommonActions.validateElementIsNotDispalyed(elemStorage, 'Storage inaccessible', 'Storage is accessible');
    }

}

module.exports = new StoragePage();