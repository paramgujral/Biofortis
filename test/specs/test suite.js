const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');
const QiagramPage = require('../pageobjects/qiagram.page');


const SecurePage = require('../pageobjects/secure.page');

describe('test suite', () => {
    it('Datasource basic search and pagination', async () => {
        await LoginPage.open();
        await LoginPage.login();
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
    });
});


