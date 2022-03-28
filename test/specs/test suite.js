const Data = require('../../data');

const FormAuditTrailData = require('../../audittrail.form');
const BiomaterialAuditTrailData = require('../../audittrail.biomaterial');

const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');
const QiagramPage = require('../pageobjects/qiagram.page');
const AdminPage = require('../pageobjects/adminstration.page');
const BiomaterialNew = require('../pageobjects/biomaterial.new.page');
const BiomaterialSearch = require('../pageobjects/biomaterial.search.page');
const Storage = require('../pageobjects/storage.page');
const Subjects = require('../pageobjects/subjects.page');



describe('Labmatrix Automation Suite', () => {
    beforeEach(async () => {
        await LoginPage.login(Data.url, Data.userName, Data.password);
    })

    describe('01 - Datasource basic search and pagination', async () => {
        it('Datasource basic search and pagination', async () => {
            await HomePage.navigateToQiagram(); 
            await QiagramPage.navigateQiagramDatasourceManager();
            await QiagramPage.searchDatasource(Data.dataSourceSearch.datasourceName, Data.dataSourceSearch.datasourceType, "Yes");
            await QiagramPage.validateDatasourceSearchWithBlankSearchString();
        });
    });

    describe('03 - Form Management', async () => {

        it('Form Management - Create new', async () => {
            await HomePage.navigateToAdministration();
            await AdminPage.createNewForm(Data.newFormOption, Data.newFormName, Data.FormFields.Fields);
        });

        it('Audit Trail for new form', async () => {
            await HomePage.navigateToAdministration();
            await AdminPage.searchForm(Data.newFormName);
            await AdminPage.openForm(Data.newFormName);
            await AdminPage.navigateToAuditTrail();
            await AdminPage.validateAuditTrailDataForm(FormAuditTrailData.addTrail);
        });


        it('Audit Trail - Edit', async () => {
            await HomePage.navigateToAdministration();
            await AdminPage.updateForm(Data.newFormName, Data.FormFields.Fields[0].name, Data.updateFieldName);
            await AdminPage.navigateToAuditTrail();
            await AdminPage.validateAuditTrailDataForm(FormAuditTrailData.updateTrail);
        });
    });


    describe('04 - History is not available for deleted records', async () => {
        it('History is not available for deleted records', async () => {
            await HomePage.navigateToAdministration();
            await AdminPage.deletForm(Data.newFormName);
        });
    });
    
    describe('05 - Create Biomaterial from multiple locations', async () => {
        it('Create Biomaterial from multiple locations', async () => {
            await HomePage.navigateToCreateBiomaterialFromDataEntry(Data.studyCode);
            await BiomaterialNew.createBiomaterial(Data.newBiomaterialName, Data.newBiomaterialCode);
            await BiomaterialNew.navigateToAuditTrail();
            await BiomaterialNew.validateAuditTrailDataNewBiomaterial(BiomaterialAuditTrailData.addTrailBiomaterial);
            await BiomaterialNew.navigateToChildBiomaterial();
            await BiomaterialNew.validateNoChildForNewlyCreateBiomaterial();
            await BiomaterialNew.navigateToBiomaterialFromChildBiomaterial();
            await BiomaterialNew.createBiomaterial(Data.newChildBiomaterialName, Data.newchildBiomaterialCode);
            await BiomaterialNew.navigateToAuditTrail();
            await BiomaterialNew.validateAuditTrailDataNewBiomaterial(BiomaterialAuditTrailData.addTrailChildBiomaterial);
            await BiomaterialNew.navigateToStudyFromTopLeftNav();
            await BiomaterialNew.navigateToSubject();
            await BiomaterialNew.navigateToBioMaterialFromSubject(Data.newBiomaterialName, Data.newChildBiomaterialName);
            await BiomaterialNew.createNewBioMaterialFromBiomaterialTab(Data.newBiomaterialName2, Data.newBiomaterialCode2);
            await BiomaterialNew.navigateToAuditTrail();
            await BiomaterialNew.validateAuditTrailDataNewBiomaterial(BiomaterialAuditTrailData.addTrailBiomaterial2);
        });
    })

    describe('06 - Edit Biomaterial from its own page', async () => {
        it('Edit Biomaterial from its own page', async () => {
            await HomePage.navigateToBiomaterial();
            await BiomaterialSearch.searchBiomaterialWithStudyCode(Data.studyCode);
            await BiomaterialSearch.openBiomaterial(Data.newBiomaterialName);
            await BiomaterialSearch.editBiomaterial(Data.newBiomaterialName);
            await BiomaterialSearch.navigateToBiomaterialProperty();
            await BiomaterialSearch.verifyPropertiesBiomaterial();
            await BiomaterialSearch.navigatetoAuditTrailFormProperty();
            await BiomaterialSearch.validateAuditTrailDataEditBiomaterial(BiomaterialAuditTrailData.editTrailBiomaterial);

        });
    });

    describe('02 - Users can delete biomaterial records', async () => {
        it('Users can delete biomaterial records', async () => {
            await HomePage.navigateToBiomaterial();
            await BiomaterialSearch.searchBiomaterialWithStudyCode(Data.studyCode);
            await BiomaterialSearch.openBiomaterial(Data.updateBiomaterialName);
            await BiomaterialSearch.deleteBiomaterial(Data.updateBiomaterialName);
        });
    });

    describe('07 - Storage: Change Facility', async () => {
        it('Change Storage Facility', async () => {
            await HomePage.navigateToStorage();
            await Storage.changeStorage(Data.storage1, Data.storage1Units);
        });
    
        it('Storage is inaccessible', async () => {
            await HomePage.navigateToStorage();
            await Storage.validateStorageInaccessible(Data.storage2);
        });
    });

    describe('08 - Subject Search', async () => {
        it('Subject Search', async () => {
            await HomePage.navigateToSubject();
            await Subjects.searchSubjects(Data.searchSubjectData);
        });
    
        it('List opening on double click on search Subject form', async () => {
            await HomePage.navigateToSubject();
            await Subjects.validateListOpeningOnDoubleClick();
        });
    });

    describe('09 - Cascade Delete - Subject', async () => {
        it('Cascade Delete - Subject', async () => {
            await HomePage.navigateToSubject();
            await Subjects.deletingTheSubjectWithSubjectCode(Data.subjectCode, Data.deletStudyCode, Data.password);
        });
    });

    describe('10 - Labmatrix has a general home page ', async () => {
        it('Labmatrix has a general home page ', async () => {
            await HomePage.validateLabmatrixUserManuallink();
            await HomePage.validateBiofortisForumlink();
            await HomePage.validateTermsofUselink();
        });
    });

    afterEach(async () => {
        await browser.reloadSession();
        });
});


