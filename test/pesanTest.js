const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
// Requiring the module
const assert = require("assert");

//describe - describes test
describe("add note", function () {
  //it - describes expected behaviour
  it("should add a note and display on the page", async function () {
    this.timeout(0);

    let driver = await new Builder().forBrowser("chrome").build();
    try {
      //open the website
      await driver.get("https://victoria-lo.github.io/bulletin-board/");

      //find the search box and enter a note
      await driver
        .findElement(By.xpath('//*[@id="new-item"]/input'))
        .sendKeys("Hello Selenium", Key.RETURN);

      //get the note's text
      let note = await driver
        .findElement(By.xpath('//*[@id="items"]/div/p'))
        .getText();

      //assert that the note's text is the same as the input text "Hello Selenium"
      assert.equal(note, "Hello Selenium");
      //assert that the note's text is the same as the input text "Hello Selenium"
    } finally {
      await driver.quit();
    }
  });
});
