import { test, expect } from "@playwright/test";

test('@Web Client App Login', async ({page}) => {
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
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
});