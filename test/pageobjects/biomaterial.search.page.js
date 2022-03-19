const allureReporter = require('@wdio/allure-reporter').default;

const Page = require('./page');
const CommonActions = require('../../actions/actions');
const Data = require('../../data');

class BiomaterialSearchPage extends Page{
    /**
     * define selectors using getter methods
     */
    get txtStudyCode() {return $('//*[@name="value-2"]')};
    get searchFormNoRecords() {return $('=No records to display')};
    get searchResultStudy() {return $$('//td/div[text()="Test Automation"]')};
    get btnEditBiomaterial() {return $('//span[text()="Edit"]//ancestor::a')};
    get txtNameBiomaterial() {return $('//input[@name="name"]')};
    get btnSaveBiomaterial() {return $('//span[text()="Save"]//ancestor::a')};
    get btnDeleteBioMaterial() {return $('//a[@data-qtip="Delete this record."]')};
    get confirmDeleteMessage () {return $('//div[contains(text(), "The following 1 dependent record(s) will also be deleted:")]')};
    get confirmDeleteChild () {return $('//div[@class="icons-biomaterial icon"]/following-sibling::a')};
    get confirmDeletePassword () {return $('//input[@type="password"]')};
    get btnDeleteRecord () {return $('//span[text()="Delete Record"]//ancestor::a')};
    get successfullyMessageDeleted () {return $('//div[contains(text(), "deleted.")]')};
    get backToSearch () {return $('//a[text()="Back to Search"]')};

    get propertiesID () {return $('//span[text()="ID:"]')};
    get propertiesIDValue () {return $('//span[text()="ID:"]//ancestor::Label/following-sibling::div/div')};
    get propertiesExternalID () {return $('//span[text()="External ID:"]')};
    get propertiesExternalIDValue () {return $('//span[text()="External ID:"]//ancestor::Label/following-sibling::div/div')};
    get propertiesExternalSource () {return $('//span[text()="External Source:"]')};
    get propertiesExternalSourceValue () {return $('//span[text()="External Source:"]//ancestor::Label/following-sibling::div/div')};
    get propertiesExternalVersion () {return $('//span[text()="External Version:"]')};
    get propertiesExternalVersionValue () {return $('//span[text()="External Version:"]//ancestor::Label/following-sibling::div/div')};
    get propertiesBatchID () {return $('//span[text()="Batch ID:"]')};
    get propertiesBatchIDValue () {return $('//span[text()="Batch ID:"]//ancestor::Label/following-sibling::div/div')};
    get propertiesCreatedBy () {return $('//span[text()="Created by:"]')};
    get propertiesCreatedByValue () {return $('//span[text()="Created by:"]//ancestor::Label/following-sibling::div/div')};
    get propertiesCreatedOn () {return $('//span[text()="Created on:"]')};
    get propertiesCreatedOnValue () {return $('//span[text()="Created on:"]//ancestor::Label/following-sibling::div/div')};
    get propertiesModifyBy () {return $('//span[text()="Last Modified by:"]')};
    get propertiesModifyByValue () {return $('//span[text()="Last Modified by:"]//ancestor::Label/following-sibling::div/div')};
    get propertiesModifyOn () {return $('//span[text()="Last Modified on"]')};
    get propertiesModifyOnValue () {return $('//span[text()="Last Modified on:"]//ancestor::Label/following-sibling::div/div')};

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async navigateBackToSearch(){
        await CommonActions.click(this.backToSearch, "Back to search");
    }

    async searchBiomaterialWithStudyCode (studyCode) {
        await CommonActions.sendKeys(this.txtStudyCode, studyCode, "Study Code");
        await browser.pause(2000);
        await browser.keys("\uE007");
        await browser.pause(2000);
        await browser.keys("\uE007");
        await expect(this.searchFormNoRecords).not.toBeDisplayed(); 
        let elemSearchResultStudy = $$('//td/div[text()="'+studyCode+'"]');
        await expect(elemSearchResultStudy).toBeDisplayed();
    }

    async searchBiomaterialforNotfound (studyCode) {
        await CommonActions.sendKeys(this.txtStudyCode, studyCode, "Study Code");
        await browser.keys("\uE007");
        let elemSearchResultStudy = $$('//td/div[text()="'+studyCode+'"]');
        await expect(elemSearchResultStudy).not.toBeDisplayed();
    }

    async openBiomaterial(biomaterialName){
        let elemSearchResultBiomaterial = $('//td/div/a[text()="'+biomaterialName+'"]');
        await CommonActions.click(elemSearchResultBiomaterial, "Biomaterial");
        let elemHeaderBiomaterial = $('//div[@class="c-header-text" and text()="'+biomaterialName+'"]');
        await expect(elemHeaderBiomaterial).toBeDisplayed();
    }

    async editBiomaterial(biomaterialName){
        await CommonActions.click(this.btnEditBiomaterial, "Edit");
        let updatedName = await biomaterialName+" updated";
        await CommonActions.sendKeys(this.txtNameBiomaterial, updatedName, "Biomaterial Name");
        await CommonActions.click(this.btnSaveBiomaterial, "Save");
        let elemBiomaterialName = $('//div/div[text()="'+updatedName+'"]');
        await expect(elemBiomaterialName).toBeDisplayed();
    }

    async deleteBiomaterial(biomaterialName){
        await CommonActions.click(this.btnDeleteBioMaterial, "Delete Biomaterial");
        await browser.pause(2000);
        await expect(this.confirmDeleteMessage).toBeDisplayed();
        await expect(this.confirmDeleteChild).toBeDisplayed();
        await CommonActions.sendKeys(this.confirmDeletePassword, Data.password, "Password");
        await CommonActions.click(this.btnDeleteRecord, "Delete Record");
        let elemDeletedBiomaterialName = $('//b[@text="'+biomaterialName+'"}]');
        if(elemDeletedBiomaterialName.isDisplayed() && this.successfullyMessageDeleted.isDisplayed()){
            allureReporter.addStep(biomaterialName+" Deleted Sucessfully", 'attachment', 'passed');
        }
    
    }

    async verifyPropertiesBiomaterial(){
        await expect(this.propertiesID).toBeDisplayed(); 
        await expect(this.propertiesExternalID).toBeDisplayed(); 
        await expect(this.propertiesExternalSource).toBeDisplayed(); 
        await expect(this.propertiesExternalVersion).toBeDisplayed(); 
        await expect(this.propertiesBatchID).toBeDisplayed(); 
        await expect(this.propertiesCreatedBy).toBeDisplayed(); 
        await expect(this.propertiesCreatedOn).toBeDisplayed(); 
        await expect(this.propertiesModifyBy).toBeDisplayed(); 
        await expect(this.propertiesModifyOn).toBeDisplayed(); 

        let ID = this.propertiesIDValue.getText();
        let ExternalID = this.propertiesExternalID.getText();
        let Source = this.propertiesExternalSourceValue.getText();
        let Version = this.propertiesExternalVersionValue.getText();
        let BatchID = this.propertiesBatchIDValue.getText();
        let CreatedBy = this.propertiesCreatedByValue.getText();
        let CreatedOn = this.propertiesCreatedOnValue.getText();
        let ModifyBy = this.propertiesModifyByValue.getText();
        let ModifyOn = this.propertiesModifyOnValue.getText();

        if(ID.isEmpty() || CreatedBy.isEmpty() || CreatedOn.isEmpty() || ModifyBy.isEmpty() || ModifyOn.isEmpty()){
            allureReporter.addStep('WARNING!!! critical informations are missing in Record Properties.', 'attachment', 'broken');
        }

        allureReporter.addStep("External ID: "+ExternalID+ ", Source Value: "+Source+ ", Version: "+Version+ ", BatchID "+BatchID+ 
        ", Created By: "+CreatedBy+ ", Created On: " +CreatedOn+ ", Modify By: "+ModifyBy+", Modify On: "+ModifyOn,
         'attachment', 'passed')
    }

}

module.exports = new BiomaterialSearchPage();