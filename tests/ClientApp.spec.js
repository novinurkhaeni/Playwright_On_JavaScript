// import { test, expect } from "@playwright/test"; // ini typeScript
const { test, expect } = require('@playwright/test'); //ini javaScript

test('@Web Client App Login', async ({page}) => {
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    // mengarahkan browser ke alamat url tertentu
    await page.goto("https://rahulshettyacademy.com/client");

    // jalankan login
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();

    // Menunggu sampai semua request network selesai
    // 'networkidle' berarti tidak ada request jaringan yang aktif
    // biasanya digunakan untuk memastikan halaman sudah selesai loading
    await page.waitForLoadState('networkidle');
    // Menunggu sampai elemen produk pertama muncul di halaman
    // .card-body b biasanya berisi nama produk
    await page.locator(".card-body b").first().waitFor();

    // verifikasi login
    // allTextContents Mengambil semua teks dari elemen yang ditemukan
    const title = await page.locator(".card-body b").allTextContents();
    // menampilkan array
    console.log(title);

    //ZARA COAT
    // Menghitung jumlah produk yang ditemukan pada locator "products"
    const count = await products.count();
    // Melakukan perulangan dari produk pertama sampai terakhir
    for(let i = 0; i < count; i++){
      if (await products.nth(i).locator("b").textContent() === productName) {
        //add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        // break digunakan untuk menghentikan perulangan
        break;
      }
    }

    // Setelah produk ditambahkan ke cart, buka halaman cart
    await page.locator("[routerlink*='cart']").click();
    // Menunggu sampai minimal satu item cart muncul
    await page.locator("div li").first().waitFor();
    // Mengecek apakah produk "ZARA COAT 3" terlihat di halaman cart
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    // Assertion untuk memastikan produk benar-benar ada di cart
    // toBeTruthy() artinya nilai harus true
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind"); //menekan tombol keyboard satu per satu
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const countOptions = await dropdown.locator("button").count();
    for(let i = 0; i < countOptions; i++) {
      const textCountry = await dropdown.locator("button").nth(i).textContent();
      if(textCountry === " Indonesia") {
        await dropdown.locator("button").nth(i).click();
        break;
      }
    }

    //validasi  email
    expect(await page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator("a:has-text('PLACE ORDER')").click();

    //validasi thank you page
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i = 0; i < await rows.count(); i++) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if(orderId.includes(rowOrderId)){
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }
    
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});