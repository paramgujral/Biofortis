const Page = require('./page');
const CommonActions = require('../../actions/actions');
const Data = require('../../data');

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
    get newFieldFlagRequired() {return $('#checkboxfield-1822-displayEl')}
    get newFieldDatatypeText() {return $('//div[@class="x-grid-cell-inner " and text()="Text"]')}
    get newFieldDatatypeInteger() {return $('//div[@class="x-grid-cell-inner " and text()="Integer"]')}
    get newFieldDatatypeDate() {return $('//div[@class="x-grid-cell-inner " and text()="Date"]')}
    get addAnotherField() {return $('#checkboxfield-1899-displayEl')};
    get btnAdd() {return $('#button-2306-btnEl')};
    get chkbxFirstField() {return $('//div[@class="x-grid-row-checker"]')};
    get btnSaveForm() {return $('//span[text()="Save"]')}
    get txtSearchForm() {return $('//input[contains(@componentid, "ext-comp")]')}
    get searchFormNoRecords() {return $('=No records to display')};

    get formMatcherRecord() {return $('=testingForms')};
    get firstField() {return $('=Field1')};
    get btnformUpdate() {return $('=Update ')};
    get btnformDelete() {return $('=Delete')};

    get popupConfirmDeleteFormYes() {return $('//span[text()="Yes"]//ancestor::a')};

    get confirmDeleteFormpassword() {return $('//input[@type="password"]')};

    get deleteRecord() {return $('//span[text()="Delete Record"]//ancestor::a')};

    
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async openNewForm () {
        await CommonActions.click(this.leftnavForm, "Form from left navigation");
        await CommonActions.click(this.btnNewForm, "New Form"); 
    }

    async createNewForm(option, formName){
        let formOption = $(`//div[@title="${option}"]`)
        await CommonActions.click(this.formOption, option);
        await CommonActions.sendKeys(this.newFormName, formName, "New Form Name"); 
        await expect(this.pageTitleNewForm).toBeDisplayed();
        await this.addFields();
        await CommonActions.click(this.btnSaveForm, "Save Form");

    }

    async addFields(){
        let fieldsdata = Data.FormFields.Fields;
        fieldsdata.forEach(data => {
            await CommonActions.click(this.btnAddField, "Add Field");
            await CommonActions.sendKeys(this.newFieldName, data.name, "Field Name");
            await CommonActions.sendKeys(this.newFieldLable, data.name, "Field Lable");
            await CommonActions.click(this.newFieldDatatype, "Field Data type");
            let elemDataType = $(`//div[@class="x-grid-cell-inner " and text()="${data.dataType}"]`) 
            await CommonActions.click(elemDataType, "Field Data type");
            if(data.Flags=='Required'){
                await CommonActions.click(this.newFieldFlagRequired, "Field flag - Reguired");
            }
            await CommonActions.click(this.addAnotherField, "Add Another Field");
            await CommonActions.click(this.btnAdd, "Add");
        })
    }

    async searchForm(formName){
        await CommonActions.sendKeys(this.txtSearchForm, formName, "Search form name");
        await browser.keys("\uE007");
        await expect(this.searchFormNoRecords).not.toBeDisplayed(); 
    }

    async updateForm(formName, fiedlName){
        await this.searchForm(formName);
        await CommonActions.click(this.formMatcherRecord, "Matched form");
        await CommonActions.click(this.firstField, "First Field");
        await CommonActions.sendKeys(this.newFieldName, fiedlName, "Udpate Lable Name");
        await CommonActions.click(this.btnformUpdate, "Udpate Button");
        let elemFirstFieldName = $(`=${fiedlName}`);
        await expect(elemFirstFieldName).toBeDisplayed();
        await CommonActions.click(this.btnSaveForm, "Save Form");
    }

    async deletForm(formName){
        await this.searchForm(formName);
        await CommonActions.click(this.btnformDelete, "Delete form");
        await CommonActions.click(this.popupConfirmDeleteFormYes, "Yes on confirm delete form pop-up");
        await CommonActions.sendKeys(this.confirmDeleteFormpassword, Data.password, "Password");
        await CommonActions.click(this.deleteRecord, "Delete Record");
        await expect(this.searchFormNoRecords).toBeDisplayed(); 
    }
    
}

module.exports = new AdministrationPage();