const {remote} = require('webdriverio');

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  // 'appium:appPackage': 'com.android.settings',
  // 'appium:appActivity': '.Settings',
  'appium:app': '' // fill with your own apk location
};

const wdOpts = {
  // hostname: process.env.APPIUM_HOST || 'localhost',
  // port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  hostname: '127.0.0.1',
  port: 4723,
  // path: '/wd/hub',
  logLevel: 'info',
  capabilities,
};

const email = 'rafdi@mail.com'
const password = 'wdio12345'

async function runTest() {
  const driver = await remote(wdOpts);
  try {
    const btnMenuLogin = await driver.$('//android.widget.TextView[@text="Login"]');
    const fieldLoginEmail = await driver.$('//android.widget.EditText[@content-desc="input-email"]');
    const fieldLoginPassword = await driver.$('//android.widget.EditText[@content-desc="input-password"]');
    const btnLogin = await driver.$('//android.view.ViewGroup[@content-desc="button-LOGIN"]');
    const popupLoginSuccess = await driver.$('//android.widget.TextView[@resource-id="android:id/alertTitle"]');
    const btnPopupLoginOk = await driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
    const errorMsgPassword = await driver.$('//android.widget.TextView[@text="Please enter at least 8 characters"]');

    
    await btnMenuLogin.click();
    // Login success
    await fieldLoginEmail.setValue(email);
    await fieldLoginPassword.setValue(password);
    await popupLoginSuccess.isDisplayed();
    await btnLogin.click();
    await btnPopupLoginOk.click();

    // Login failed
    await fieldLoginEmail.setValue(email);
    await fieldLoginPassword.setValue('');
    await btnLogin.click();
    await errorMsgPassword.isDisplayed();

  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);