import { chromium } from "@playwright/test";

async function globalsetup() {
     let browser=await chromium.launch();   
   let context= await browser.newContext();
  let  page= await context.newPage(); 
await page.goto('https://www.valsoftcorp.com/');
   await page.context().storageState({path:"./Playwright/.auth/auth.json"});

}
export default globalsetup;