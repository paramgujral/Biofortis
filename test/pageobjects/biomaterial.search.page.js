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
    get auditTrailEditDateTime() {return $('//span[text()="Paramjeet Gujral (Paramjeet)"]/following-sibling::span')};
    get closeAuditTrail() {return $('//span[text()="Close"]//ancestor::a')};

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
        await CommonActions.validateElementIsNotDispalyed(this.searchFormNoRecords, 'Biomaterial Found!', 'Biomaterial not found');
    }

    async searchBiomaterialforNotfound (studyCode) {
        await CommonActions.sendKeys(this.txtStudyCode, studyCode, "Study Code");
        await browser.keys("\uE007");
        await browser.pause(2000);
        await browser.keys("\uE007");
        await CommonActions.validateElementIsDispalyed(this.searchFormNoRecords, 'Biomaterial is not Found!', 
        'Biomaterial found expected to be not');
    }

    async openBiomaterial(biomaterialName){
        let elemSearchResultBiomaterial = $('//td/div/a[text()="'+biomaterialName+'"]');
        await CommonActions.click(elemSearchResultBiomaterial, "Biomaterial");
        let elemHeaderBiomaterial = $('//div[@class="c-header-text" and text()="'+biomaterialName+'"]');
        await CommonActions.validateElementIsDispalyed(elemHeaderBiomaterial, 'Biomaterial page opned', 
        'Unable to navigate to Biomaterial page');
    }

    async editBiomaterial(biomaterialName){
        await CommonActions.click(this.btnEditBiomaterial, "Edit");
        let updatedName = await biomaterialName+" Updated";
        await CommonActions.sendKeys(this.txtNameBiomaterial, updatedName, "Biomaterial Name");
        await CommonActions.click(this.btnSaveBiomaterial, "Save");
        let elemBiomaterialName = $('//div/div[text()="'+updatedName+'"]');
        await CommonActions.validateElementIsDispalyed(elemBiomaterialName, 'Biomaterial edited sucessfully', 
        'Unable to edit Biomaterial');
    }

    async deleteBiomaterial(biomaterialName){
        await CommonActions.click(this.btnDeleteBioMaterial, "Delete Biomaterial");
        await browser.pause(2000);
        await CommonActions.validateElementIsDispalyed(this.confirmDeleteMessage, 
            '"Child Biomaterial record found" message found on confirm delete pop-up for BioMaterial', 
            'No Child Biomaterial found for Biomaterial on confirm delete pop-up for BioMaterial');
        await CommonActions.validateElementIsDispalyed(this.this.confirmDeleteChild, 
            'Child Biomaterial name found on confirm delete pop-up for BioMaterial', 
            'No Child Biomaterial found for Biomaterial on confirm delete pop-up for BioMaterial');
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

        await CommonActions.validateElementIsDispalyed(this.propertiesID, 'ID found on Properties popup for Biomaterial', 
        'ID is not found on Properties popup for Biomaterial'); 
        await CommonActions.validateElementIsDispalyed(this.propertiesExternalID, 'External ID found on Properties popup for Biomaterial', 
        'External ID is not found on Properties popup for Biomaterial');
        await CommonActions.validateElementIsDispalyed(this.propertiesExternalSource, 'External Source found on Properties popup for Biomaterial', 
        'External Source is not found on Properties popup for Biomaterial');
        await CommonActions.validateElementIsDispalyed(this.propertiesExternalVersion, 'External Version found on Properties popup for Biomaterial', 
        'External Version is not found on Properties popup for Biomaterial');
        await CommonActions.validateElementIsDispalyed(this.propertiesBatchID, 'Batch ID found on Properties popup for Biomaterial', 
        'Batch ID is not found on Properties popup for Biomaterial');
        await CommonActions.validateElementIsDispalyed(this.propertiesCreatedBy, 'Created By found on Properties popup for Biomaterial', 
        'Created By is not found on Properties popup for Biomaterial');
        await CommonActions.validateElementIsDispalyed(this.propertiesCreatedOn, 'Created On found on Properties popup for Biomaterial', 
        'Created On is not found on Properties popup for Biomaterial');
        await CommonActions.validateElementIsDispalyed(this.propertiesModifyBy, 'Modify By found on Properties popup for Biomaterial', 
        'Modify By is not found on Properties popup for Biomaterial');
        await CommonActions.validateElementIsDispalyed(this.propertiesModifyOn, 'Modify On found on Properties popup for Biomaterial', 
        'Modify On is not found on Properties popup for Biomaterial');

        let URL = await browser.getUrl();
        let ID = await this.propertiesIDValue.getText();
        
        if(URL.toString().includes(ID)!=-1){
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

        if(CreatedBy.toString().includes(userName)!=-1 && ModifyBy.toString().includes(userName)!=-1){
            allureReporter.addStep(userName +' is the creator and modifier in the Record Properties', 'attachment', 'passed');
        }else{
            allureReporter.addStep(userName +' isn\'t the creator and modifier in the Record Properties', 'attachment', 'broken');
        }

        let modifyDate = Moment(new Date()).format('MM/DD/yyyy');

        if(CreatedOn.toString().includes(modifyDate)!=-1 && ModifyOn.toString().includes(modifyDate)!=-1){
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
            await CommonActions.validateText(auditTrailField, key, auditTrailvalue);
        })

        let humanReadableTimeSpan = await this.auditTrailEditTimeSpan.getText();
        if(humanReadableTimeSpan.toString().includes("SECOND AGO")!=-1){
            allureReporter.addStep(humanReadableTimeSpan +' is recorded in the Audit Trail.', 'attachment', 'passed');
        }else{
            allureReporter.addStep(humanReadableTimeSpan +' isn\'t recorded in the Audit Trail.', 'attachment', 'broken');
        }

        await CommonActions.validateElementIsDispalyed(this.auditTrailUser, 'User name is present in Audit Trail', 'User name isn\'t present in Audit Trail');
        let modifyDate = Moment(new Date()).format('M/DD/yyyy');

        await CommonActions.validateText(this.auditTrailEditDateTime, "Date and Time", modifyDate.toString());

        await CommonActions.click(this.closeAuditTrail, "Close Audit Trail");
    }
}

module.exports = new BiomaterialSearchPage();