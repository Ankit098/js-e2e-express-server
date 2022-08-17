const webdriver = require('selenium-webdriver')

username = process.env.BROWSERSTACK_USERNAME
accessKey = process.env.BROWSERSTACK_ACCESS_KEY
buildName = process.env.BROWSERSTACK_BUILD_NAME
local = process.env.BROWSERSTACK_LOCAL
localIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER

var capabilities = {
  'bstack:options' : {
    "os" : "Windows",
    "osVersion" : "10",
    "sessionName" : buildName, // CI/CD job name using BROWSERSTACK_BUILD_NAME env variable
    "local" : local,
    "localIdentifier" : localIdentifier,
    "userName" : username,
    "accessKey" : accessKey,
    "seleniumVersion" : "4.0.0",
    "buildName": buildName
  },
    "browserName" : "Chrome",
    "browserVersion" : "100.0",
}


const runSampleTest = async (capabilities) => {
  let driver
  try {
    driver = await new webdriver.Builder()
      .usingServer(`https://hub-cloud.browserstack.com/wd/hub`)
      .withCapabilities(capabilities)
      .build();

    await driver.get('http://github.com')
    console.log(await driver.getTitle())
    console.log(await driver.getCurrentUrl())
    await markPass(driver)
  } catch (e) {
    console.log(e)
  } finally {
    if(driver) {
      await driver.quit()
    }
  }
}

runSampleTest(capabilities)
