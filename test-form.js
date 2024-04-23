const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  'appium:app': '' // fill with your own apk location
};

const wdOpts = {
  hostname: '127.0.0.1',
  port: 4723,
  logLevel: 'info',
  capabilities,
};

const email = 'rifdasha@gmail.com'
const password = 'wdio12345'

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const btnForm = await driver.$('//android.widget.TextView[@text="Forms"]');
    const fieldInputField = await driver.$('//android.widget.EditText[@content-desc="text-input"]');
    const typedText = await driver.$('//android.widget.TextView[@content-desc="input-text-result"]');
    const toggleSwitch = await driver.$('//android.widget.Switch[@content-desc="switch"]');
    const dropdown = await driver.$('//android.widget.EditText[@resource-id="text_input"]');
    const switchText = await driver.$('//android.widget.TextView[@content-desc="switch-text"]');
    const dropdownItem1 = await driver.$('//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="webdriver.io is awesome"]');
    const dropdownItem2 = await driver.$('//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="Appium is awesome"]');
    const dropdownItem3 = await driver.$('//android.widget.CheckedTextView[@resource-id="android:id/text1" and @text="This app is awesome"]');
    const btnActive = await driver.$('//android.widget.TextView[@text="Active"]');
    const btnInactive = await driver.$('//android.widget.TextView[@text="Inactive"]');
    const popupButtonInfo = await driver.$('//android.widget.TextView[@resource-id="android:id/message"]');
    const btnPopupButtonOK = await driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
    
    await btnForm.click();

    /*
    == Scenario 1 ==
    */
    await fieldInputField.setValue('forms1@99.co');
    
    const getInputInfo1 = await typedText.getText();
    if (getInputInfo1 == 'forms1@99.co') {
      console.log("\nPassed\n")
    } else {
      console.log("\nFailed\n")
    }
    await toggleSwitch.click(); // switch to ON

    const getSwitchText1 = await switchText.getText();
    if (getSwitchText1 == 'Click to turn the switch OFF') {
      console.log("\nPassed\n")
    } else {
      console.log("\nFailed\n")
    }
    await dropdown.click();
    await dropdownItem1.click();
    await btnActive.click();
    await popupButtonInfo.isDisplayed();
    
    const getButtonInfo1 = await popupButtonInfo.getText();
    if (getButtonInfo1 == 'This button is active') {
      console.log("\nPassed\n")
    } else {
      console.log("\nFailed\n")
    }
    await btnPopupButtonOK.click();

    /*
    == Scenario 2 ==
    */
    await fieldInputField.setValue('Form2@99.co');

    const getInputInfo2 = await typedText.getText();
    if (getInputInfo2 == 'Form2@99.co') {
      console.log("\nPassed\n")
    } else {
      console.log("\nFailed\n")
    }
    await toggleSwitch.click(); // switch to OFF

    const getSwitchText2 = await switchText.getText();
    if (getSwitchText2 == 'Click to turn the switch ON') {
      console.log("\nPassed\n")
    } else {
      console.log("\nFailed\n")
    }
    await dropdown.click();
    await dropdownItem3.click();
    await btnActive.click();
    await popupButtonInfo.isDisplayed();

    const getButtonInfo2 = await popupButtonInfo.getText();
    if (getButtonInfo2 == 'This button is active') {
      console.log("\nPassed\n")
    } else {
      console.log("\nFailed\n")
    }
    await btnPopupButtonOK.click();

    /*
    == Scenario 3 ==
    */
    await fieldInputField.setValue('f0rm3@99.co');

    const getInputInfo3 = await typedText.getText();
    if (getInputInfo3 == 'f0rm3@99.co') {
      console.log("\nPassed\n")
    } else {
      console.log("\nFailed\n")
    }
    await toggleSwitch.click(); // switch to ON

    const getSwitchText3 = await switchText.getText();
    if (getSwitchText3 == 'Click to turn the switch OFF') {
      console.log("\nPassed\n")
    } else {
      console.log("\nFailed\n")
    }
    await dropdown.click();
    await dropdownItem2.click();
    await btnInactive.click(); // nothing happens

  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);