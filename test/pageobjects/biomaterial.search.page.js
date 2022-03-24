const allureReporter = require('@wdio/allure-reporter').default;

const Moment = require('moment');

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
    get propertiesModifyOn () {return $('//span[text()="Last Modified on:"]')};
    get propertiesModifyOnValue () {return $('//span[text()="Last Modified on:"]//ancestor::Label/following-sibling::div/div')};
    get linkAccount() {return $('//span[text()="Paramjeet Gujral"]//ancestor::a')};
    get toolbar() {return $('//a[preceding-sibling::a[@data-qtip="Delete this record."]]')};
    get viewAuditTrail() {return $('//span[text()="View Audit Trail"]//ancestor::a')};
    get auditTrailEditTimeSpan() {return $('//div[@class="entry-human-readable-timestamp"]')}; //contains MINUTES AGO
    get auditTrailUser() {return $('//span[text()="Paramjeet Gujral (Paramjeet)"]')};
    get auditTrailEditDateTime() {return $('//span[text()="Paramjeet Gujral (Paramjeet)"]/following-sibling::Span')};

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

    async navigateToBiomaterialProperty(){
        await CommonActions.click(this.toolbar, "Properties on Biomaterial");
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

        let URL = await browser.getUrl();

        console.log('@@@@@@@@@@@@@@@@@@@@@@', URL);
        let ID = await this.propertiesIDValue.getText();
        console.log('@@@@@@@@@@@@@@@@@@@@@@', ID);
        if(URL.toString().indexOf(ID)!=-1){
            allureReporter.addStep(ID +' is the ID in Record Properties', 'attachment', 'passed');
        }else{
            allureReporter.addStep(ID + ' isn\'t the ID in Record Properties', 'attachment', 'broken');
        }

        let ExternalID = await this.propertiesExternalID.getText();
        let Source = await this.propertiesExternalSourceValue.getText();
        let Version = await this.propertiesExternalVersionValue.getText();
        let BatchID = await this.propertiesBatchIDValue.getText();
        let CreatedBy = await this.propertiesCreatedByValue.getText();
        let CreatedOn = await this.propertiesCreatedOnValue.getText();
        let ModifyBy = await this.propertiesModifyByValue.getText();
        let ModifyOn = await this.propertiesModifyOnValue.getText();
        let userName = await this.linkAccount.getText();

        if(CreatedBy.toString().indexOf(userName)!=-1 && ModifyBy.toString().indexOf(userName)!=-1){
            allureReporter.addStep(userName +' is the creator and modifier in the Record Properties', 'attachment', 'passed');
        }else{
            allureReporter.addStep(userName +' isn\'t the creator and modifier in the Record Properties', 'attachment', 'broken');
        }

        let modifyDate = await Moment(new Date()).format('mm/dd/yyyy');

        if(CreatedOn.toString().indexOf(modifyDate)!=-1 && ModifyOn.toString().indexOf(modifyDate)!=-1){
            allureReporter.addStep(modifyDate +' is the create and modify Date in the Record Properties', 'attachment', 'passed');
        }else{
            allureReporter.addStep(modifyDate +' isn\'t the create and modify Date in the Record Properties', 'attachment', 'broken');
        }

        allureReporter.addStep("External ID: "+ExternalID+ ", Source Value: "+Source+ ", Version: "+Version+ ", BatchID "+BatchID+ 
        ", Created By: "+CreatedBy+ ", Created On: " +CreatedOn+ ", Modify By: "+ModifyBy+", Modify On: "+ModifyOn,
         'attachment', 'passed')
    }

    async navigatetoAuditTrailFormProperty(){
        await CommonActions.click(this.viewAuditTrail, "View Audit Trail");
    } 


    async validateAuditTrailDataEditBiomaterial(auditTrailData){
        Object.keys(auditTrailData)
        .forEach(async function eachKey(key) {
            let auditTrailvalue = await auditTrailData[key];
            let auditTrailField = await $('//span[text()="'+key+'"]//ancestor::li');
            await CommonActions.assertTextPresentOnElement(auditTrailField, auditTrailvalue);
        })

        let humanReadableTimeSpan = await this.propertiesExternalID.getText();
        // if(humanReadableTimeSpan.toString().indexOf("MINUTES AGO")!=-1){
        //     allureReporter.addStep(modifyDate +' is the create and modify Date in the Record Properties', 'attachment', 'passed');
        // }else{
        //     allureReporter.addStep(modifyDate +' isn\'t the create and modify Date in the Record Properties', 'attachment', 'broken');
        // }


        
        await CommonActions.click(this.closeAuditTrail, "Close Audit Trail");
    }
}

module.exports = new BiomaterialSearchPage();