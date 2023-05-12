const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
// Requiring the module
const assert = require("assert");

//describe - describes test
describe("Test Pesan Reservasi", function () {
  //it - describes expected behaviour
  it("Menampilkan Pesan Berhasil dikirim", async function () {
    this.timeout(0);

    let driver = await new Builder().forBrowser("chrome").build();
    try {
      //open the website
      await driver.get("https://pecel.websatelit.com/");

      //find the form and enter character
      await driver.findElement(By.xpath('//*[@id="nama"]')).sendKeys("Arnando");
      await driver.sleep(2000);
      await driver
        .findElement(By.xpath('//*[@id="email"]'))
        .sendKeys("arnandofajar@gmail.com");
      await driver.sleep(1000);
      await driver
        .findElement(By.xpath('//*[@id="telp"]'))
        .sendKeys("0987654321");
      await driver.sleep(1000);
      await driver
        .findElement(By.xpath('//*[@id="date"]'))
        .sendKeys("13/05/2023");
      await driver.sleep(1000);
      await driver.findElement(By.xpath('//*[@id="time"]')).sendKeys("18:10");
      await driver.sleep(1000);
      await driver.findElement(By.xpath('//*[@id="people"]')).sendKeys("10");
      await driver.sleep(1000);
      await driver
        .findElement(By.xpath('//*[@id="form-reservasi"]/div[2]/textarea'))
        .sendKeys("Pesan Pecel Lele 10 Porsi");
      await driver.sleep(1000);

      await driver.executeScript("window.scrollBy(0,350)", "");
      await driver.sleep(1000);
      await driver
        .findElement(By.xpath("/html/body/main/section[5]/div/div[2]/div/form"))
        .submit();
      await driver.sleep(3000);

      // get hasil jawaban server
      let note = await driver
        .findElement(
          By.xpath(
            "/html/body/main/section[5]/div/div[2]/div/form/div[3]/div[3]"
          )
        )
        .getText();

      //pencocokan
      assert.equal(
        note,
        "Booking Berhasil Dikirim, Kami Akan Konfirmasi Secepatnya"
      );
    } finally {
      await driver.quit();
    }
  });
});
