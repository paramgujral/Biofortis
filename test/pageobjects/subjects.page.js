const allureReporter = require('@wdio/allure-reporter').default;

const Page = require('./page');
const CommonActions = require('../../actions/actions');

class HomePage extends Page{
    get subjectCodeSearchFeild ()   { return $('//*[@name="value-0"]')};
    get studyCodeSearchFeild ()     { return $('//*[@name="value-1"]')};
    get subjectIDSearchFeild ()     { return $('//*[@name="value-2"]')};
    get fullNameSearchFeild ()      { return $('//*[@name="value-3"]')};
    get sexSearchFeildDD ()         { return $('//*[@name="value-4"]')};
    get sexSearchFeildValue ()      { return $("//li[text()='Male']")}
    get mortalityStatusSearchfeildDD(){ return $('//*[@name="value-5"]')};
    get mortalityStatusSearchfeildValue(){ return $("//li[text()='Dead']")}
    get batchIdSearchFeild ()       { return $('//*[@name="value-6"]')};
    get barcodeSearchFeild ()       { return $('//*[@name="value-7"]')};
    get searchBtn ()                { return $('//span[@class="x-btn-inner x-btn-inner-default-small" and text()="Search"]')};
    get listOfAvailableValues ()    { return $$('//ul')};
    get subjectCodeLinkInGrid ()    { return $("//a[contains(text(), 'Test Automation')]")}
    get deleteTrashIcon ()          { return $('//a[@data-qtip="Delete this record."]')}
    get backToSearch ()             { return $("//a[text()='Back to Search']")}
    get searchFormNoRecords()       {return $("//div[text()='No records to display']")}
    get deleteRecord()              {return $('//span[text()="Delete Record"]//ancestor::a')}
    get confirmDeleteFormpassword() {return $('//input[@type="password"]')}
    get txtChooseAStrudy()          {return $('//input[preceding-sibling::div[text()="Find studies..."]]')}
    get successfullyMessageDeleted () {return $('//div[contains(text(), "deleted.")]')}
        

async searchSubjects (searchSubjectData) {
    await CommonActions.sendKeys(this.subjectCodeSearchFeild, searchSubjectData.subjectCode, "subject Code Search Field");
    await CommonActions.clickEnter();
    await CommonActions.sendKeys (this.studyCodeSearchFeild, searchSubjectData.studyCode, "study Code Search Field");
    await CommonActions.clickEnter();
    await CommonActions.sendKeys (this.subjectIDSearchFeild, searchSubjectData.subjectID, "subject ID search Field");
    await CommonActions.clickEnter();
    await CommonActions.sendKeys (this.fullNameSearchFeild, searchSubjectData.fullName, "full Name Search Field");
    await CommonActions.clickEnter();
    await CommonActions.click (this.sexSearchFeildDD, "Sex Search Field DD");
    await CommonActions.click(this.sexSearchFeildValue,"Sex Search Field value");
    await CommonActions.click (this.mortalityStatusSearchfeildDD, "mortality Status Search feild DD");
    await CommonActions.click (this.mortalityStatusSearchfeildValue, "mortality Status Search feild value");
    await CommonActions.sendKeys (this.barcodeSearchFeild, searchSubjectData.barcode, "barcode Search Field");
    await CommonActions.clickEnter();
    await CommonActions.click(this.searchBtn, "search Btn");
    await browser.pause(5000);
    let elemSearchResult = await $('//td/div/a[text()="'+searchSubjectData.subjectCode+'"]');
    let foundSubject = await CommonActions.validateElementIsDispalyed(elemSearchResult, 'Subject found', 'Subject isn\'t found');
    if(foundSubject){
        await CommonActions.click(elemSearchResult, "Subject from Search Result");
        let elemheader = await $('//div[@class="c-header-text" and text()="'+searchSubjectData.subjectCode+'"]');
        await CommonActions.validateElementIsDispalyed(elemheader, 'Open Subject page', 'Subject page isn\'t Opened');
    }else{
        await CommonActions.addStepInReport('broken', 'Subject not found');
    }
}
async validateListOpeningOnDoubleClick () {
    //await expect(this.listOfAvailableValues).toBeElementsArrayOfSize(0);

    await this.subjectCodeSearchFeild.doubleClick();
    //await CommonActions.clear(this.subjectCodeSearchFeild);
    await CommonActions.clickEnter();
    await expect(this.listOfAvailableValues).toBeElementsArrayOfSize(1); 
   
    await this.studyCodeSearchFeild.doubleClick();
    //await CommonActions.clear(this.studyCodeSearchFeild);
    await CommonActions.clickEnter();
    await expect(this.listOfAvailableValues).toBeElementsArrayOfSize(2); 
   
    await this.subjectIDSearchFeild.doubleClick();
    //await CommonActions.clear(this.subjectIDSearchFeild);
    await CommonActions.clickEnter();
    await expect(this.listOfAvailableValues).toBeElementsArrayOfSize(3); 
   
    await this.fullNameSearchFeild.doubleClick();
    //await CommonActions.clear(this.fullNameSearchFeild);
    await CommonActions.clickEnter();
    await expect(this.listOfAvailableValues).toBeElementsArrayOfSize(4); 
   
    await this.batchIdSearchFeild.doubleClick();
    //await CommonActions.clear(this.batchIdSearchFeild);
    await CommonActions.clickEnter();
    await expect(this.listOfAvailableValues).toBeElementsArrayOfSize(5); 
   
    await this.barcodeSearchFeild.doubleClick();
    //await CommonActions.clear(this.barcodeSearchFeild);
    await CommonActions.clickEnter();
    await expect(this.listOfAvailableValues).toBeElementsArrayOfSize(6); 
}

async deletingTheSubjectWithSubjectCode(subjectCode, studyCode, password) {
    await CommonActions.sendKeys(this.studyCodeSearchFeild, subjectCode, "study Code Search Feild");
    await CommonActions.clickEnter()
    await CommonActions.click(this.searchBtn, "search Btn");
    
    await browser.pause(5000);
    if(this.searchFormNoRecords.isDisplayed()){
        await CommonActions.addStepInReport('broken', 'No Records found!');
    }else{

        let elemSearchResult = await $('//td/div/a[text()="'+studyCode+'"]');
        await CommonActions.validateElementIsDispalyed(elemSearchResult, 'Subject found', 'Subject isn\'t found');

        await CommonActions.click(elemSearchResult, "Subject from Search Result");
        let elemheader = await $('//div[@class="c-header-text" and text()="'+studyCode+'"]');
        
        await CommonActions.validateElementIsDispalyed(elemheader, 'Open Subject page', 'Subject page isn\'t Opened');

        await CommonActions.click(this.deleteTrashIcon, "delete trash icon");
        await CommonActions.sendKeys(this.confirmDeleteFormpassword, password, "Password");
        await CommonActions.click(this.deleteRecord, "Delete Record");
        let elemDeletedBiomaterialName = $('//div[@text="Subject '+studyCode+' deleted."}]');
            if(elemDeletedBiomaterialName.isDisplayed()){
                allureReporter.addStep(studyCode+" Deleted Sucessfully", 'attachment', 'passed');
            }
        await CommonActions.click(this.backToSearch, "Back To search");
        // await CommonActions.clear(this.studyCodeSearchFeild);
        // await CommonActions.sendKeys(this.studyCodeSearchFeild, studyCode, "study Code Search Feild");
        await CommonActions.click(this.searchBtn, "search Btn");
        await CommonActions.getScreenshot();
    }
}

}

module.exports = new HomePage();