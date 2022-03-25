const Page = require('./page');
const CommonActions = require('../../actions/actions');
const Data = require('../../data');
const AllureReporter = require('mocha-allure-reporter');

class AdministrationPage extends Page{
    /**
     * define selectors using getter methods
     */
    get leftnavForm() {return $('//a[text()="Forms"]')};
    get btnNewForm() {return $('//span[text()="New Form"]//ancestor::a')};
    get formOptionBiomaterial() {return $('//div[@title="Biomaterial"]')};
    get newFormName() {return $('//input[@name="formName"]')};
    get btndefineFields() {return $('//span[text()="Define Fields"]//ancestor::a')};
    get pageTitleNewForm() {return $('//div[@class="c-header-text"]')};
    get btnAddField() {return $('//span[text()="Add field..."]//ancestor::a')};
    get newFieldName() {return $('//input[@name="name"]')};
    get newFieldLable() {return $('//input[@name="label"]')};
    get newFieldDatatype() {return $('//input[@name="fieldType"]')}
    get newFieldFlagRequired() {return $('//label[text()="Required"]')}
    get newFieldDatatypeText() {return $('//div[@class="x-grid-cell-inner " and text()="Text"]')}
    get newFieldDatatypeInteger() {return $('//div[@class="x-grid-cell-inner " and text()="Integer"]')}
    get newFieldDatatypeDate() {return $('//div[@class="x-grid-cell-inner " and text()="Date"]')}
    get addAnotherField() {return $('//label[text()="Add another"]')};
    get btnAdd() {return $('//span[text()="Add "]//ancestor::a')};
    get chkbxFirstField() {return $('//div[@class="x-grid-row-checker"]')};
    get btnSaveForm() {return $('//span[text()="Save"]')}
    get txtSearchForm() {return $('//input[contains(@componentid, "ext-comp")]')}
    get searchFormNoRecords() {return $('//div[text() = "No records to display"]')};

    
    //get firstField() {return $('=Field1')};
    get btnformUpdate() {return $('//span[text()="Update "]//ancestor::a')};
    get btnformDelete() {return $('//span[text()="Delete"]//ancestor::a')};
    get popupConfirmDeleteFormYes() {return $('//span[text()="Yes"]//ancestor::a')};
    get confirmDeleteFormpassword() {return $('//input[@type="password"]')};
    get deleteRecord() {return $('//span[text()="Delete Record"]//ancestor::a')};

    get toolbar() {return $('//a[preceding-sibling::a[@data-qtip="Delete this form."]]')};
    get viewAuditTrail() {return $('//span[text()="View Audit Trail"]//ancestor::a')};
    get closeAuditTrail() {return $('//span[text()="Close"]//ancestor::a')};
    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    async createNewForm(option, formName, fieldsdata){
        await CommonActions.click(this.leftnavForm, "Form from left navigation");
        await CommonActions.click(this.btnNewForm, "New Form");
        let formOption = $(`//div[@title="${option}"]`)
        await CommonActions.click(formOption, option);
        await CommonActions.sendKeys(this.newFormName, formName, "New Form Name"); 
        await CommonActions.click(this.btndefineFields, "Define Fields");
        await expect(this.pageTitleNewForm).toBeDisplayed();
        await this.addFields(fieldsdata);
        await CommonActions.click(this.btnSaveForm, "Save Form");
        if (this.closeAuditTrail.isDisplayed()){
            let message = await `${formName} is already present!`;
            await CommonActions.addStepInReport("broken", message);
            await CommonActions.click(this.closeAuditTrail, "Close error popup saying form is already available")
        }
    }

    async addFields(fieldsdata){
        CommonActions.click(this.btnAddField, "Add Field");
        for(const data of fieldsdata) {
            await CommonActions.sendKeys(this.newFieldName, data.name, "Field Name");
            //await browser.pause(20000);
            await CommonActions.sendKeys(this.newFieldLable, data.lable, "Field Lable");
            await CommonActions.click(this.newFieldDatatype, "Field Data type");
            let elemDataType = await $(`//td/div[text()="${data.dataType}"]`); 
            await CommonActions.click(elemDataType, "Field Data type");
            if(data.Flags=='Required'){
                await CommonActions.click(this.newFieldFlagRequired, "Field flag - Required");
             }
            await CommonActions.click(this.addAnotherField, "Add Another Field");
            await CommonActions.click(this.btnAdd, "Add");
        }
        
    }

    async searchAndOpenForm(formName){
        await CommonActions.click(this.leftnavForm, "Form from left navigation");
        await CommonActions.sendKeys(this.txtSearchForm, formName, "Search form name");
        await browser.keys("\uE007");
        await expect(this.searchFormNoRecords).not.toBeDisplayed(); 
        let elemFormMatcherRecord = await $('//a[text()="'+formName+'"]');
        await CommonActions.click(elemFormMatcherRecord, "Matched form");
    }

    async updateForm(formName,fieldName,updatedFiedlName){
        await this.searchAndOpenForm(formName);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@', fieldName);
        let elemFieldName = await $('//div[contains(text(),"'+fieldName+'")]');
        await CommonActions.click(elemFieldName, "First Field");
        await CommonActions.sendKeys(this.newFieldName, updatedFiedlName, "Udpate Lable Name");
        await CommonActions.click(this.btnformUpdate, "Udpate Button");
        let elemFirstFieldName = await $('//div[text()="'+updatedFiedlName+'"]');
        await expect(elemFirstFieldName).toBeDisplayed();
        await CommonActions.click(this.btnSaveForm, "Save Form");
    }

    async deletForm(formName){
        await this.searchForm(formName);
        await CommonActions.click(this.chkbxFirstField, "Check box for form")
        await CommonActions.click(this.btnformDelete, "Delete form");
        await CommonActions.click(this.popupConfirmDeleteFormYes, "Yes on confirm delete form pop-up");
        await CommonActions.sendKeys(this.confirmDeleteFormpassword, Data.password, "Password");
        await CommonActions.click(this.deleteRecord, "Delete Record");
        await expect(this.searchFormNoRecords).toBeDisplayed(); 
    }

    async navigateToAuditTrail(){
        await CommonActions.click(this.toolbar, "Toolbar on right top side");
        await CommonActions.click(this.viewAuditTrail, "View Audit Trail");
        await browser.pause(5000);
    }
    
    async validateAuditTrailDataForm(auditTrailData){
        // Object.keys(auditTrailData)
        // .forEach(async function eachKey(key) {
        for (const [key, value] of Object.entries(auditTrailData)) {
            let auditTrailField;
            // let auditTrailvalue = await value;
            if(key=='Added Fields'){
                auditTrailField = await $('//p[contains(text(),"Added")]//parent::li');
            }else if(key=='Updated Fields'){
                auditTrailField = await $('//p[contains(text(),"Updated")]//ancestor::li');
            }
            else{
                auditTrailField = await $('//span[text()="'+key+'"]//parent::li');
            }
            await CommonActions.validateText(auditTrailField, value);
        }
        await CommonActions.click(this.closeAuditTrail, "Close Audit Trail");
    }

    async validateAuditTrailDataEditForm(auditTrailData){
        Object.keys(auditTrailData)
        .forEach(async function eachKey(key) {
            let auditTrailField;
            let auditTrailvalue = await auditTrailData[key];
            if(key=='Updated Fields'){
                auditTrailField = await $('//p[contains(text(),"Updated")]//ancestor::li');
            }else{
                auditTrailField = await $('//span[text()="'+key+'"]//ancestor::li');
            }
            await CommonActions.assertTextPresentOnElement(auditTrailField, auditTrailvalue);
        })
        await CommonActions.click(this.closeAuditTrail, "Close Audit Trail");
    }
}

module.exports = new AdministrationPage(this.toolbar, "");