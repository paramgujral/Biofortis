const Page = require('./page');
const CommonActions = require('../../actions/actions');
const Data = require('../../data');


class LoginPage extends Page{
    /**
     * define selectors using getter methods
     */
    get inputUsername() {return $('#username')}
    get inputPassword() { return $('//input[@name="password"]')}
    get btnSubmit() { return $('#submitButton');}

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login () {
        await CommonActions.sendKeys(this.inputUsername, Data.username, "User Name");
        await CommonActions.sendKeys(this.inputPassword, Data.password, "Password");
        await CommonAction.click(this.btnSubm, "Log in");
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('login');
    }
}

module.exports = new LoginPage();
