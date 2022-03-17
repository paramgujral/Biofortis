const Page = require('./page');
const CommonActions = require('../../actions/actions');

class DataEntryBiomaterialPage extends Page{
    /**
     * define selectors using getter methods
     */
     get nameBiomaterial() {return $('//input[@name="name"]')};   //set to TA Biomaterial, TABiomaterialChild1, TABiomaterialChild1
     get status() {return $('//input[@name="currentStatus"]')};    //get attribute text
     get txtbarcode() {return $('//input[@name="externalBarcode""]')};  //set to TA1234, TACH1234, TACH234
     get childBiomaterial() {return $('//span[text()="Child Biomaterials"]//ancestor::a')};
     get newChildBiomaterial() {return $('//span[text()="New..."]//ancestor::a')};
     get optionChildBiomaterial() {return $('=Child Biomaterial')}
     get pagenavBiomaterial() {return $('//a[preceding-sibling::a[text()="Test Automation"]]')}
     get pagenavStudy() {return $('//a[preceding-sibling::a[text()="Home"]]')}
     get pagenavStudy() {return $('//a[preceding-sibling::a[text()="Subjects"]]')}
     get menuSubject() {return $('//span[text()="Subjects"]//ancestor::a')};
     get newSubject() {return $('//span[text()="New Subject"]//ancestor::a')};
     get menuBioMaterial() {return $('//span[text()="Biomaterials"]//ancestor::a')};

     get biomaterial() {return $('//a[text()="TA Biomaterial"]')};
     get childBiomaterial() {return $('//a[text()="TA Child Biomaterial"]')}

     get menuNewBioMaterial() {return $('//span[text()="New Biomaterial"]//ancestor::a')};
     

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async createBiomaterial (name, barcode) {
        await CommonActions.sendKeys(this.nameBiomaterial, name, "Biomaterial Name");
        await CommonActions.sendKeys(this.txtbarcode, barcode, "Barcode");
        await CommonActions.click(this.btnSaveBioMaterial, "Save BioMaterial");
    }


    async validateAuditTrailForBiomaterial () {
        await CommonActions.click(this.viewAuditTrail, "View Audit Trail");
    }

    async navigateToChildBiomaterial () {
        await CommonActions.click(this.childBiomaterial, "Child Biomaterials")
    }

    async navigateToBiomaterialFromChildBiomaterial () {
        await CommonActions.click(this.pagenavBiomaterial, "Biomaterials from top left")
    }

    async navigateToStudyFromBiomaterial () {
        await CommonActions.click(this.pagenavStudy, "Study from top left")
    }

    async navigateToSubject () {
        await CommonActions.click(this.menuSubject, "Subject")
        await expect(this.newSubject).toBeDisplayed(); 
    }

    async navigateToBioMaterial  () {
        await CommonActions.click(this.menuBioMaterial, "SubjBioMaterialect")
        await expect(this.biomaterial).toBeDisplayed();
        await expect(this.childBiomaterial).toBeDisplayed();  
    }

    async validateNoChildForNewlyCreateBiomaterial(){
        //child Biomaterial element not displayed
    }






}

module.exports = new DataEntryBiomaterialPage();