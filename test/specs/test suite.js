const Data = require('../../data');

const CommonActions = require('../../actions/actions');
const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');
const QiagramPage = require('../pageobjects/qiagram.page');
const AdminPage = require('../pageobjects/adminstration.page');
const BiomaterialNew = require('../pageobjects/biomaterial.new.page');
const BiomaterialSearch = require('../pageobjects/biomaterial.search.page');
const Storage = require('../pageobjects/storage.page');
const Subjects = require('../pageobjects/subjects.page');
const homePage = require('../pageobjects/home.page');


describe('test suite', () => {
    before( async () => {
        await LoginPage.login(Data.url, Data.userName, Data.password);
    })

    it('01-Datasource basic search and pagination', async () => {
        await HomePage.navigateToQiagram(); 
        await QiagramPage.navigateQiagramDatasourceManager();
        await QiagramPage.searchDatasource(Data.dataSourceSearch.datasourceName, Data.dataSourceSearch.datasourceType, "Yes");
        await QiagramPage.validateDatasourceSearchWithBlankSearchString();
    });

    it('03-Form Management Audit Data - Create new', async () => {
        await HomePage.navigateToAdministration();
        await AdminPage.createNewForm(Data.newFormOption, Data.newFormName);
        await AdminPage.addFields();
    });

    it('03-Form Management Audit Data - Edit', async () => {
        await HomePage.navigateToAdministration();
        await AdminPage.updateForm(Data.newFormName, Data.FormFields.Fields[1].name, Data.updateFieldName)
    });

    it('04-History is not available for deleted records', async () => {
        await HomePage.navigateToAdministration();
        await AdminPage.deletForm(Data.newFormName);
    });
    
    it('05-Create Biomaterial from multiple locations', async () => {
        await HomePage.navigateToCreateBiomaterialFromDataEntry(Data.studyCode);
        await BiomaterialNew.createBiomaterial(Data.newBiomaterialName, Data.newBiomaterialCode);
        await BiomaterialNew.navigateToChildBiomaterial();
        await BiomaterialNew.navigateToBiomaterialFromChildBiomaterial();
        await BiomaterialNew.createBiomaterial(Data.newChildBiomaterialName, Data.newchildBiomaterialCode);
        await BiomaterialNew.navigateToStudyFromTopLeftNav();
        await BiomaterialNew.navigateToSubject();
        await BiomaterialNew.navigateToBioMaterialFromSubject(Data.newBiomaterialName, Data.newChildBiomaterialName);
        await BiomaterialNew.createNewBioMaterialFromBiomaterialTab(Data.newChildBiomaterialName, Data.newchildBiomaterialCode);
    });

    it('06-Edit Biomaterial from its own page', async () => {
        await HomePage.navigateToBiomaterial();
        await BiomaterialSearch.searchBiomaterialWithStudyCode(Data.studyCode);
        await BiomaterialSearch.openBiomaterial(Data.newBiomaterialName);
        await BiomaterialSearch.editBiomaterial(Data.newBiomaterialName);
    });

    it('02-Users can delete biomaterial records', async () => {
        await HomePage.navigateToBiomaterial();
        await BiomaterialSearch.searchBiomaterialWithStudyCode(Data.studyCode);
        await BiomaterialSearch.openBiomaterial(Data.updateBiomaterialName);
        await BiomaterialSearch.deleteBiomaterial(Data.updateBiomaterialName);
    });

    it('07-Storage: Change Facility', async () => {
        await HomePage.navigateToStorage();
        await Storage.changeStorage(Data.storage1, Data.storage1Units);
    });
    
    it('07-Storage: inaccessible', async () => {
        await HomePage.navigateToStorage();
        await Storage.validateStorageInaccessible(Data.storage2);
    });

    it('08-Subject Search', async () => {
        await HomePage.navigateToSubject();
        await Subjects.searchSubjects(Data.searchSubjectData);
    });

    it('08-Subject Search - List opening on double click on fields in Subject', async () => {
        await HomePage.navigateToSubject();
        await Subjects.validateListOpeningOnDoubleClick();
    });

    it('09-Cascade Delete - Subject', async () => {
        await HomePage.navigateToSubject();
        await Subjects.deletingTheSubjectWithSubjectCode(Data.subjectCode, Data.deletStudyCode, Data.password);
    });

    it.only('10-Labmatrix has a general home page ', async () => {
        await homePage.validateLabmatrixUserManuallink();
        await homePage.validateBiofortisForumlink();
        await homePage.validateTermsofUselink();
    });
    
});


