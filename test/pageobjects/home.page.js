const Page = require('./page');
const CommonActions = require('../../actions/actions');

const TITLELABMATRIXADMINISTRATION = "Labmatrix Administration";

class HomePage extends Page{
    /**
     * define selectors using getter methods
     */
    get linkAccount() {return $('//span[text()="Paramjeet Gujral"]//ancestor::a')};
    get menuAdmin() {return $('//span[text()="Administration"]')};
    get menuSearch() {return $('//span[text()="Search"]//ancestor::a')};
    get menuQiagram() {return $('//span[text()="Qiagram"]//ancestor::a')};
    get menuDataEntry() {return $('//span[text()="Data Entry"]//ancestor::a')};
    get menuBiomaterial() {return $('//span[text()="Biomaterials"]//ancestor::a')};
    get menuStorage() {return $('//span[text()="Storage"]//ancestor::a')};
    
    get dataEntryBioMaterial() {return $('//span[text()="Biomaterial"]')};
    get txtChooseAStrudyDiv() {return $('//div[text()="Find studies..."]')};
    get txtChooseAStrudy() {return $('//input[preceding-sibling::div[text()="Find studies..."]]')};
    get btnCreateBioMaterial() {return $('//span[text()="Create Biomaterial"]//ancestor::a')};

    get btnSaveBioMaterial() {return $('//span[text()="Save"]//ancestor::a')};
    get auditTrailBiomaterial() {return $('//a[preceding-sibling::a[@data-qtip="Delete this record."]]')};
    get viewAuditTrail() {return $('//span[text()="View Audit Trail"]//ancestor::a')};


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async navigateToQiagram () {
        await CommonActions.click(this.menuSearch, "Search");
        await CommonActions.click(this.menuQiagram, "Qiagram"); 
    }

    async navigateToBiomaterial () {
        await CommonActions.click(this.menuSearch, "Search");
        await CommonActions.click(this.menuBiomaterial, "Biomaterial"); 
    }

    async navigateToAdministration () {
        await CommonActions.click(this.linkAccount, "Account Link");
        await CommonActions.click(this.menuAdmin, "Administration"); 
        await CommonActions.switchToWindowWithTitle(TITLELABMATRIXADMINISTRATION);
    }

    async navigateToCreateBiomaterialFromDataEntry (study) {
        await CommonActions.click(this.menuDataEntry, "Data Entry");
        await CommonActions.click(this.dataEntryBioMaterial, "BioMaterial");
        await CommonActions.click(this.txtChooseAStrudyDiv, "Find Study");
        await CommonActions.sendKeys(this.txtChooseAStrudy, study, "Enter Study for Creating Biomaterial");
        await browser.keys("\uE007");
        await CommonActions.click(this.btnCreateBioMaterial, "Create BioMaterial");
        await expect(browser).toHaveTitle('New Biomaterial - Labmatrix');  
    }

    async navigateToStorage(){
        await CommonActions.click(this.menuStorage, "Storage");
    }


}

module.exports = new HomePage();