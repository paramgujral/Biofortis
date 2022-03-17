const expectChai = require('chai').expect;
const allureReporter = require('@wdio/allure-reporter').default;

const Page = require('./page');
const CommonActions = require('../../actions/actions');

class QiagramPage extends Page{
    /**
     * define selectors using getter methods
     */
    get menuManage() {return $('##ext-gen97')};
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
    get pagination() {return $('.pagination react-bootstrap-table-page-btns-ul')};
    get pageNumber() {return $$('//ul/li')};
    get nextPageArrow() {return $('//li[@title="next page"]/a')};


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async navigateQiagramDatasourceManager() {
        await CommonActions.click(this.menuManage, "Manage");
    }

    async searchDatasource(datasource, datasourceType) {
        await CommonActions.sendKeys(this.inputDatasource, datasource, "Datasource");
        await CommonActions.selectDropDown(this.dropdownDatasourceType, datasourceType, "Datasource Type");
        await CommonActions.click(this.btnSearch, "Search Datasource");
        await expect(this.noResult).not.toBeDisplayed(); 
        await expect(this.noResult).toBeDisplayed();
        await this.countDatasourcetype();
    }
    
    async countDatasourcetype() {

        let datasourceCount = {
            countSnapshot: 0,
            countSystem: 0,
            countForm: 0,
            countQuery: 0,
            countImported: 0,
            countFlatFile: 0,
            countStaging: 0,
            countStoredQueryResult: 0
        }

        
        let countSnapshot=0;
        let countSystem=0;
        let countForm=0;
        let countQuery=0;
        let countImported=0;
        let countFlatFile=0;
        let countStaging=0;
        let countStoredQueryResult=0;

        if(!await (this.pagination).isDisplayed()){
            allureReporter.addStep('WARNING!!! Number of datasource are very less.', 'attachment', 'broken')
        }

        for (let i=0; i<=pageNumber.length-2; i++){
            datasourceCount.countSnapshot+=datasourceTypeSnapshot.length;
            datasourceCount.countSystem+=datasourceTypeSystem.length;
            datasourceCount.countForm+=datasourceTypeForm.length;
            datasourceCount.countQuery+=datasourceTypeQuery.length;
            datasourceCount.countImported+=datasourceTypeImported.length;
            datasourceCount.countFlatFile+=datasourceTypeFaltFile.length;
            if (await (this.nextPageArrow).isDisplayed()){
                await CommonActions.click(this.nextPageArrow, "Pagination Next Page");
            } 
        }

        allureReporter.addStep("Snapshot Count: "+datasourceCount.countSnapshot+ ", System Count: "+datasourceCount.countSystem+ 
        ", Form Count: "+datasourceCount.countForm+ ", Query Count: "+datasourceCount.countQuery+ ", Imported Count: "+datasourceCount.countImported+ 
        ", Flat File Count: " +datasourceCount.countFlatFile+ ", Staging Count: "+datasourceCount.countStaging+
        ", Stored Query Result Count: "+datasourceCount.countStoredQueryResult, 'attachment', 'passed')

        let datasourceTypeCounter=0;
        for (const [key, value] of Object.entries(datasourceCount)) {
            if(value===0){
                datasourceTypeCounter+=1;
            }
          }
        if(datasourceTypeCounter<4){
            allureReporter.addStep('WARNING!!! types of datasource  in search are very less.', 'attachment', 'broken')
        }

    }


}

module.exports = new QiagramPage();