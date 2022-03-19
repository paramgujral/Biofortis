const expectChai = require('chai').expect;
const allureReporter = require('@wdio/allure-reporter').default;

const Page = require('./page');
const CommonActions = require('../../actions/actions');

const IFRAMEINDEX=0;
const TITLELABMATRIXMANAGEMENT = "Labmatrix Management";

class QiagramPage extends Page{
    /**
     * define selectors using getter methods
     */

    get frame() {return $('//*[contains(@name,"c-iframepane")]')};
    get menuManage() {return $('//td/em/button[text()="Manage"]')};
    get btnSearch() {return $('//button[@title="Search Datasources"]')};
    get inputDatasource() {return $('//input[@placeholder="Enter Datasource Name..."]')};
    get dropdownDatasourceType() {return $('//select[@class="form-control"]')};

    get noResult() {return $('=No Result')}

    //Datasource Type
    get datasourceTypeSnapshot() {return $$('//span[text()="Snapshot"]')};
    get datasourceTypeSystem() {return $$('//span[text()="System"]')};
    get datasourceTypeForm() {return $$('//span[text()="Form"]')};
    get datasourceTypeQuery() {return $$('//span[text()="Query"]')};
    get datasourceTypeImported() {return $$('//span[text()="Imported"]')};
    get datasourceTypeFaltFile() {return $$('//span[text()="Flat File"]')};
    get datasourceTypeStaging() {return $$('//span[text()="Staging"]')};
    get datasourceTypeStoredQueryResult() {return $$('//span[text()="Stored Query Result"]')};

    //paginations elements
    get pagination() {return $('//ul[@class="pagination react-bootstrap-table-page-btns-ul"]')};
    get pageNumber() {return $$('//ul/li')};
    get nextPageArrow() {return $('//li[@title="next page"]/a')};


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async navigateQiagramDatasourceManager() {
        await CommonActions.switchToIFrame(IFRAMEINDEX);
        await CommonActions.click(this.menuManage, "Manage");
        await CommonActions.switchToWindowWithTitle(TITLELABMATRIXMANAGEMENT);
        await browser.pause(15000);
    }

    async searchDatasource(datasource, datasourceType, searchWithBlank) {
        if (searchWithBlank=='No'){
            await CommonActions.sendKeys(this.inputDatasource, datasource, "Datasource");
            await CommonActions.selectDropDown(this.dropdownDatasourceType, datasourceType, "Datasource Type");
        }
        await CommonActions.click(this.btnSearch, "Search Datasource");
        await browser.pause(5000);
        await expect(this.noResult).not.toBeDisplayed(); 
    }
    
    async validateDatasourceSearchWithBlankSearchString() {

        
        let countSnapshot=0;
        let countSystem=0;
        let countForm=0;
        let countQuery=0;
        let countImported=0;
        let countFlatFile=0;
        let countStaging=0;
        let countStoredQueryResult=0


        if(!await (this.pagination).isDisplayed()){
            allureReporter.addStep('WARNING!!! Number of datasource are very less.', 'attachment', 'broken')
        }

        await browser.pause(5000);
        do {
            countSnapshot  += await  this.datasourceTypeSnapshot.length;
            countSystem  += await  this.datasourceTypeSystem.length;
            countForm  += await  this.datasourceTypeForm.length;
            countQuery  += await  this.datasourceTypeQuery.length;
            countImported  += await  this.datasourceTypeImported.length;
            countFlatFile  += await  this.datasourceTypeFaltFile.length;
            if (await (this.nextPageArrow).isDisplayed()){
                await CommonActions.click(this.nextPageArrow, "Pagination Next Page");
            } 
        }while(await (this.nextPageArrow).isDisplayed())

        allureReporter.addStep("Snapshot Count: "+countSnapshot+ ", System Count: "+countSystem+ 
        ", Form Count: "+countForm+ ", Query Count: "+countQuery+ ", Imported Count: "+countImported+ 
        ", Flat File Count: " +countFlatFile+ ", Staging Count: "+countStaging+
        ", Stored Query Result Count: "+countStoredQueryResult, 'attachment', 'passed')

    }


}

module.exports = new QiagramPage();