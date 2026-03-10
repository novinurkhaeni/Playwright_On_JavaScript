// Mengimpor fungsi 'test' dari library Playwright
// Digunakan untuk membuat dan menjalankan test case
import { test, expect } from "@playwright/test";

// Membuat test case dengan nama 'Browser Context Playwright Test'
// async digunakan karena di dalam fungsi ini terdapat proses asynchronous
// (misalnya membuka browser atau memuat halaman) yang membutuhkan waktu
test.only ('Browser Context Playwright Test', async ({ browser }) => {
    // const digunakan untuk membuat variabel yang nilainya tidak akan diubah
    // browser.newContext() membuat browser context baru (lingkungan browser yang terisolasi)
    // Biasanya digunakan untuk menyimpan session, cookies, dan plugin secara terpisah
    // Sehingga setiap test bisa berjalan independen seperti browser baru
    
    // await digunakan untuk menunggu proses asynchronous selesai
    // sebelum melanjutkan ke baris kode berikutnya
    const context = await browser.newContext();

    // Membuka halaman/tab baru di dalam browser context
    // await memastikan halaman benar-benar dibuat sebelum kode berikutnya dijalankan
    const page = await context.newPage();

    //css, xpath
    // if Id is present
    // css -> tagname#id or #id
    // input#username

    // if class atribute is present
    // css -> tagname.class or .class
    // input.class-form

    // write css based on any atribute
    // css -> [attribute='value']
    // [name='username']

    // write css with traversing from parent to child
    // css -> parenttagname >> childtagname

    // if needs to write the locator based on text
    // text=''
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles =  page.locator(".card-body a");

    page.on('request',request=> console.log(request.url()));
    page.on('response',response=> console.log(response.url(), response.status()));
    // Membuka atau mengarahkan browser ke alamat URL tertentu
    // await menunggu sampai halaman selesai dimuat
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //css type, fill (versi terbaru)
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
   console.log(await cardTitles.nth(1).textContent());
   const allTitles = await cardTitles.allTextContents();
   
   console.log(allTitles);
})

//tanpa menyimpan session, cookies, dan plugin secara terpisah
//jika hanya menjalankan test case ini, maka gunakan tets.only
test('Page Playwright Test', async ({ page }) => {

    // Membuka atau mengarahkan browser ke alamat URL tertentu
    // await menunggu sampai halaman selesai dimuat
    await page.goto("https://google.com");
    // get title -assertion
    // Menampilkan judul halaman web ke console
    // page.title() adalah fungsi Playwright untuk mengambil title dari halaman yang sedang dibuka
    // await digunakan untuk menunggu proses pengambilan title selesai sebelum ditampilkan
    console.log(await page.title());
    // Melakukan assertion (pengecekan) bahwa judul halaman sesuai dengan yang diharapkan
    // expect digunakan untuk melakukan validasi dalam testing
    // page adalah halaman yang sedang diuji
    // toHaveTitle("Google") berarti kita mengecek apakah title halaman tersebut adalah "Google"
    // Jika title tidak sesuai, maka test akan gagal
    await expect(page).toHaveTitle("Google");

    // await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // const userName = page.locator('#username');
    // const signIn = page.locator("#signInBtn");
    // const documentLink = page.locator("[href*='documents-request']");
    // const dropdown = page.locator("select.form-control");
    // await dropdown.selectOption("consult");
    // await page.locator(".radiotextsty").last().click();
    // await page.locator("#okayBtn").click();
    // console.log(await page.locator(".radiotextsty").last().isChecked());
    // await expect(page.locator(".radiotextsty").last()).toBeChecked();
    // await page.locator("#terms").click();
    // await expect( page.locator("#terms")).toBeChecked();
    // await page.locator("#terms").uncheck();
    // expect( await page.locator("#terms").isChecked()).toBeFalsy();
    // await expect(documentLink).toHaveAttribute("class","blinkingText");
})