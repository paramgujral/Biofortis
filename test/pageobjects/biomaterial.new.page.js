const Page = require('./page');
const CommonActions = require('../../actions/actions');

class DataEntryBiomaterialPage extends Page{
    /**
     * define selectors using getter methods
     */
     get nameBiomaterial() {return $('//input[@name="name"]')};   //set to TA Biomaterial, TABiomaterialChild1, TABiomaterialChild1
     get status() {return $('//input[@name="currentStatus"]')};    //get attribute text
     get txtbarcodeDiv() {return $('//input[@name="externalBarcode"]/parent::div')};
     get txtbarcode() {return $('//input[@name="externalBarcode"]')};  //set to TA1234, TACH1234, TACH234
     get btnSaveBioMaterial() {return $('//span[text()="Save"]//ancestor::a')};
     get childBiomaterial() {return $('//span[text()="Child Biomaterials"]//ancestor::a')};
     get newChildBiomaterial() {return $('//span[text()="New..."]//ancestor::a')};
     get optionChildBiomaterial() {return $('//a/span[text()="Child Biomaterial"]')};
     get pagenavBiomaterial() {return $('//a[preceding-sibling::a[text()="Test Automation"]]')}
     get pagenavStudy() {return $('//a[text()="Test Automation"]')}
     
     //get pagenavStudy() {return $('//a[preceding-sibling::a[text()="Home"]]')}
     //get pagenavStudy() {return $('//a[preceding-sibling::a[text()="Subjects"]]')}
     get menuSubject() {return $('//span[text()="Subjects"]//ancestor::a')};
     get newSubject() {return $('//span[text()="New Subject"]//ancestor::a')};
     get menuBioMaterial() {return $('//span[text()="Biomaterials"]//ancestor::a')};
     get btnNewChildBiomaterial() {{return $('//span[text()="New Biomaterial"]')}};
     get tabBioMaterials() {return $('//div[@class="x-column-header-text-wrapper"]//span[text()="Biomaterials"]')};
     get biomaterial() {return $('//a[text()="Test Automation Biomaterial"]')};
     get childBiomaterialName() {return $('//a[text()="Test Automation Biomaterial - child"]')}
     get menuNewBioMaterial() {return $('//span[text()="New Biomaterial"]//ancestor::a')};
     get childBiomaterialUnderBiomaterial() {return $('//a[text()="Test Automation Biomaterial - Child"]')};
     get toolbar() {return $('//a[preceding-sibling::a[@data-qtip="Delete this record."]]')};
     get viewAuditTrail() {return $('//span[text()="View Audit Trail"]//ancestor::a')};
     get closeAuditTrail() {return $('//span[text()="Close"]//ancestor::a')};

     

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async createBiomaterial (name, barcode) {
        await CommonActions.sendKeys(this.nameBiomaterial, name, "Biomaterial Name");
        await CommonActions.click(this.txtbarcodeDiv, "Barcode");
        await CommonActions.sendKeys(this.txtbarcode, barcode, "Barcode");
        await CommonActions.click(this.btnSaveBioMaterial, "Save BioMaterial");
        await browser.pause(3000);
    }


    async validateAuditTrailForBiomaterial () {
        await CommonActions.click(this.viewAuditTrail, "View Audit Trail");
    }

    async navigateToChildBiomaterial () {
        await CommonActions.click(this.childBiomaterial, "Child Biomaterials");
    }

    async navigateToBiomaterialFromChildBiomaterial () {
        await CommonActions.click(this.newChildBiomaterial, "New Child Biomaterial");
        await CommonActions.click(this.optionChildBiomaterial, "Child Biomaterial");
    }

    async navigateToStudyFromTopLeftNav () {
        await CommonActions.click(this.pagenavStudy, "Study from top left")
    }

    async navigateToSubject () {
        await CommonActions.click(this.menuSubject, "Subject tab")
        await expect(this.newSubject).toBeDisplayed(); 
    }

    async navigateToBioMaterialFromSubject (biomaterial, childBiomaterial) {
        await CommonActions.click(this.menuBioMaterial, "BioMaterials tab")
        let elemBiomaterial = $('//a[text()="'+biomaterial+'"]');
        let elemChilsBiomaterial = $('//a[text()="'+childBiomaterial+'"]');
        await expect(elemBiomaterial).toBeDisplayed();
        await expect(elemChilsBiomaterial).toBeDisplayed();  
    }

    async createNewBioMaterialFromBiomaterialTab(name, barcode){
        await CommonActions.click(this.btnNewChildBiomaterial, "New Biomaterial")
        await this.createBiomaterial(name, barcode);
       }

    async validateNoChildForNewlyCreateBiomaterial(){
        //child Biomaterial element not displayed
        await expect(this.childBiomaterialUnderBiomaterial).not.toBeDisplayed();  
    }

    async navigateToAuditTrail(){
        await CommonActions.click(this.toolbar, "Toolbar on right top side");
        await CommonActions.click(this.viewAuditTrail, "View Audit Trail");
    }
    
    async validateAuditTrailDataNewBiomaterial(auditTrailData){
        Object.keys(auditTrailData)
        .forEach(async function eachKey(key) {
            let auditTrailField;
            let auditTrailvalue = await auditTrailData[key];
            if(key=='Added Fields'){
                auditTrailField = await $('//p[contains(text(),"Added")]//parent::li');
            }else{
                auditTrailField = await $('//span[text()="'+key+'"]//parent::li');
            }
            await CommonActions.validateText(auditTrailField, auditTrailvalue);
        })
        await CommonActions.click(this.closeAuditTrail, "Close Audit Trail");
    }

}

module.exports = new DataEntryBiomaterialPage();