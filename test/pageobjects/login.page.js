const Page = require('./page');
const CommonActions = require('../../actions/actions');
const Data = require('../../data');


class LoginPage extends Page{
    /**
     * define selectors using getter methods
     */
    get inputUsername() {return $('//input[@name="username"]')}
    get inputPassword() { return $('//input[@name="password"]')}
    get chkbxTerminate() { return $('//input[@type="checkbox"]')}
    get btnSubmit() { return $('#submitButton');}

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (url, username, password) {
        await browser.url(url);
        await browser.maximizeWindow();
        await CommonActions.sendKeys(this.inputUsername, username, "User Name");
        await CommonActions.sendKeys(this.inputPassword, password, "Password");
        await CommonActions.click(this.chkbxTerminate, "Checkbox - Session Termination");
        await CommonActions.click(this.btnSubmit, "Log in");
        await browser.pause(5000);
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open();
    }
}

module.exports = new LoginPage();
