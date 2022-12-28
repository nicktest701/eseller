const puppeteer = require("puppeteer");

const generateVoucher = async (htmltext, transaction_id) => {
  const browser = await puppeteer.launch();

  //page
  const page = await browser.newPage();
  await page.setContent(htmltext);
  await page.emulateMediaType("screen");
  await page.evaluate(() => matchMedia("screen").matches);

  //pdf
  await page.pdf({
    path: `vouchers/${transaction_id}.pdf`,
    format: "A4",
    printBackground: true,
    landscape: true,
    timeout: 0,
  });

  //close browser
  console.log("printed");
  await browser.close();
};

module.exports = generateVoucher;
