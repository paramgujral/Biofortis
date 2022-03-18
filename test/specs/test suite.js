const Data = require('../../data');

const CommonActions = require('../../actions/actions');
const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');
const QiagramPage = require('../pageobjects/qiagram.page');
const AdminPage = require('../pageobjects/adminstration.page');
const BiomaterialNew = require('../pageobjects/biomaterial.new.page')




describe('test suite', () => {
   beforeEach( async() => {
        await LoginPage.login(Data.url, Data.userName, Data.password);
    })

    it('Datasource basic search and pagination', async () => {
        await HomePage.navigateToQiagram(); 
        await QiagramPage.navigateQiagramDatasourceManager();
        await QiagramPage.searchDatasource(Data.dataSourceSearch.datasourceName, Data.dataSourceSearch.datasourceType, "Yes");
        await QiagramPage.validateDatasourceSearchWithBlankSearchString();
    });

    it('Form Management Audit Data - Create new', async () => {
        await HomePage.navigateToAdministration();
        await AdminPage.createNewForm(Data.newFormOption, Data.newFormName);
        await AdminPage.addFields();
    });

    it('Form Management Audit Data - Edit', async () => {
        await HomePage.navigateToAdministration();
        await AdminPage.updateForm(Data.newFormName, Data.FormFields.Fields[1].name, Data.updateFieldName)
    });

    it('History is not available for deleted records', async () => {
        await HomePage.navigateToAdministration();
        await AdminPage.deletForm(Data.newFormName);
    });
    
    it.only('Create Biomaterial from multiple locations', async () => {
        await HomePage.navigateToCreateBiomaterialFromDataEntry(Data.studyCode);
        await BiomaterialNew.createBiomaterial(Data.newBiomaterialName, Data.newBiomaterialCode);
        await BiomaterialNew.navigateToChildBiomaterial();
        await BiomaterialNew.navigateToBiomaterialFromChildBiomaterial();
        await BiomaterialNew.createBiomaterial(Data.newChildBiomaterialName, Data.newchildBiomaterialCode);
        await BiomaterialNew.navigateToStudyFromTopLeftNav();
        await BiomaterialNew.navigateToSubject();
        await BiomaterialNew.navigateToBioMaterialFromSubject(Data.newBiomaterialName, Data.newChildBiomaterialName);
        await BiomaterialNew.createNewBioMaterialFromBiomaterialTab(Data.newChildBiomaterialName2, Data.newchildBiomaterialCode2);
    });

});


