const Page = require('./page');
const CommonActions = require('../../actions/actions');

const TITLELABMATRIXADMINISTRATION = 'Labmatrix Administration';
const HOMEURL = 'https://automation.biofortis-test.net/#/'
const TITLEHOMELABMATRIX = 'Home - Labmatrix';
const TITLETERMSOFUSE = 'BioFortis Software Terms of Use';
const TITLEUSERCOMMUNITY = 'BioFortis User Community';
const TITLEUSERMANUAL = 'Welcome to Labmatrix\'s Online Help';


class HomePage extends Page{
    /**
     * define selectors using getter methods
     */
    get linkAccount() {return $('//span[text()="Paramjeet Gujral"]//ancestor::a')};
    get menuAdmin() {return $('//span[text()="Administration"]')};
    get menuSearch() {return $('//span[text()="Search"]//ancestor::a')};
    get menuQiagram() {return $('//span[text()="Qiagram"]//ancestor::a')};
    get menuSubjects() {return $('//span[text()="Subjects"]//ancestor::a')};
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

    get labmatrixLogo ()            { return $('//a[@class="logo labmatrix-logo"]')}
    get labmatrixUserManualLink ()  { return $("//a[text()='Labmatrix User Manual']")}
    get bioFortisForumLink ()       { return $("//a[text()='BioFortis Forum']")}
    get termsOfUseLink ()           { return $("//a[text()='Terms of Use']")}
    get termsOfUseText ()           { return $("//span[contains(text(),'IMPORTANT')]")}
    get userCommunityLoginBtn ()    { return $('//span[@class="d-button-label"]')}
    get userManualPageText()        { return $('//h2[@class="SubCenter"]')}

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

    async navigateToSubject () {
        await CommonActions.click(this.menuSearch, "Search");
        await CommonActions.click(this.menuSubjects, "Subjects"); 
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


    async validateLabmatrixUserManuallink(){
        await CommonActions.click(this.labmatrixUserManualLink, "labmatrix User Manual Link");
        await CommonActions.switchToWindowWithTitle(TITLEUSERMANUAL);
        await CommonActions.expectToHaveTitle("Welcome to Labmatrix's Online Help");
        await CommonActions.assertElement(this.userManualPageText, "user Manual Page Text")
        await browser.pause(3000)
        await CommonActions.switchToWindowWithTitle(TITLEHOMELABMATRIX);
        
    } 

    async validateBiofortisForumlink(){
        await CommonActions.click(this.bioFortisForumLink, " bioFortis Forum Link");
        await CommonActions.switchToWindowWithTitle(TITLEUSERCOMMUNITY);
        await CommonActions.expectToHaveTitle("BioFortis User Community");
        await CommonActions.assertElement(this.userCommunityLoginBtn, "user Community page Login Btn");
        await browser.pause(3000)
        await CommonActions.switchToWindowWithTitle(TITLEHOMELABMATRIX);

    } 

    async validateTermsofUselink(){
        await CommonActions.click(this.termsOfUseLink, " terms Of Use Link");
        await CommonActions.switchToWindowWithTitle(TITLETERMSOFUSE);
        await CommonActions.expectToHaveTitle("BioFortis Software Terms of Use");
        await browser.pause(3000)
        await CommonActions.assertElement(this.termsOfUseText, "IMPORTANT INFORMATION ON TERMS OF USE AND LEGAL RESTRICTIONS  >>text");
        await browser.pause(3000);
        await CommonActions.switchToWindowWithTitle(TITLEHOMELABMATRIX);
    } 


}

module.exports = new HomePage();