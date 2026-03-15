// Mengimpor fungsi 'test' dari library Playwright
// Digunakan untuk membuat dan menjalankan test case
import { test, expect } from "@playwright/test";

// Membuat test case dengan nama 'Browser Context Playwright Test'
// async digunakan karena di dalam fungsi ini terdapat proses asynchronous
// (misalnya membuka browser atau memuat halaman) yang membutuhkan waktu
test('@Web Browser Context-Validating Error login', async ({ browser }) => {
    // const digunakan untuk membuat variabel yang nilainya tidak akan diubah
    // browser.newContext() membuat browser context baru (lingkungan browser yang terisolasi)
    // Browser Context adalah lingkungan browser yang terisolasi
    // sehingga cookies, session, dan storage tidak tercampur dengan test lain
    
    // await digunakan untuk menunggu proses asynchronous selesai
    // sebelum melanjutkan ke baris kode berikutnya
    const context = await browser.newContext(); 
    // Membuka tab atau halaman baru di dalam browser context
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
    //card-body a

    // if needs to write the locator based on text
    // text=''

    // Membuat locator untuk input username menggunakan id
    // locator digunakan untuk menemukan elemen pada halaman
    const userName = page.locator('#username');
    // locator untuk input password menggunakan atribute type
    const password = page.locator("[type='password']");
    // Locator untuk tombol sign in menggunakan id
    const signIn = page.locator("#signInBtn");
    // Locator untuk semua judul produk pada halaman shop
    // selector ".card-body a" akan mengambil semua link judul produk
    const cardTitles =  page.locator(".card-body a");

    // Event listener untuk menangkap setiap request yang dikirim browser
    // biasanya digunakan untuk debugging network
    page.on('request',request=> console.log(request.url()));
    // Event listener untuk melihat response dari server
    // akan menampilkan URL dan status response (200, 404, dll)
    page.on('response',response=> console.log(response.url(), response.status()));
    // Membuka atau mengarahkan browser ke alamat URL tertentu
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // Menampilkan title halaman ke console
    console.log(await page.title());

    //css type, fill (versi terbaru)
    await userName.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signIn.click();
    // textContent() berfungsi untuk mengambil seluruh teks yang berada di dalam elemen
    console.log(await page.locator("[style*='block']").textContent());
    // expect digunakan untuk melakukan validasi dalam testing
    // toContainText() → mengecek apakah teks pada elemen mengandung kata tertentu.
    // 'Incorrect' → teks yang diharapkan ada pada elemen tersebut.
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    // first() untuk mengambil elemen pertama dari daftar elemen yang ditemukan
    console.log(await cardTitles.first().textContent());
    // nth(1) Digunakan untuk mengambil elemen berdasarkan index ke-1.
    console.log(await cardTitles.nth(1).textContent());
    // allTextContents Mengambil semua teks dari elemen yang ditemukan, Mengembalikan hasil dalam bentuk array (daftar).
    const allTitles = await cardTitles.allTextContents();
   
    console.log(allTitles); 
});

//tanpa menyimpan session, cookies, dan plugin secara terpisah
//jika hanya menjalankan test case ini, maka gunakan tets.only
test('@Web UI Controls', async ({ page }) => {

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

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult"); //memilih option dengan value "consult"
    await page.locator(".radiotextsty").last().click(); //select radio button terakhir
    await page.locator("#okayBtn").click();
    //assertion
    //verify radio button is checked or not
    console.log(await page.locator(".radiotextsty").last().isChecked()); //Mengecek status dan mengembalikan true/false
    await expect(page.locator(".radiotextsty").last()).toBeChecked(); //Assertion untuk memastikan elemen harus checked, rekomendasi pake ini
    
    await page.locator("#terms").click(); //check checkbox
    await expect( page.locator("#terms")).toBeChecked(); //Assertion untuk memastikan elemen harus checked
    await page.locator("#terms").uncheck(); //uncheck checkbox
    expect( await page.locator("#terms").isChecked()).toBeFalsy(); //mengecek status harus false, kebalikannya toBeTruethy
    await expect(documentLink).toHaveAttribute("class","blinkingText"); //memeriksa bahwa elemen memiliki attribute class blinkingText
});

test.only('@Child Window Hadl', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const documentLink = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    
    // Promise.all digunakan untuk menjalankan dua proses secara bersamaan
    // 1. Menunggu event halaman baru terbuka
    // 2. Klik link yang membuka halaman baru
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen for any new page pending, rejected, fulfilled
        documentLink.click(), // klik link yang memicu tab baru
    ])//new page is openned

    // Mengambil teks dari elemen dengan class ".red" di halaman baru
    const text = await newPage.locator(".red").textContent();
    console.log(text);

    // Memisahkan teks menggunakan karakter "@"
    const arrayText = text.split("@");
    console.log(arrayText);

    // Memisahkan teks menggunakan karakter " " di index 1, lalu ambil index 0
    // contoh: mentoring@rahulshettyacademy.com
    const domain = arrayText[1].split(" ")[0];

    // Menampilkan domain ke console
    console.log(domain);

    // Mengisi field username pada halaman utama dengan domain yang didapat
    await page.locator("#username").fill(domain);

    // Menampilkan isi input username
    console.log(await page.locator("#username").textContent()); //textContent() digunakan untuk mengambil teks yang berada di dalam elemen HTML.
    console.log(await page.locator("#username").inputValue()); //inputValue() digunakan khusus untuk mengambil nilai dari input field
    // await page.pause();
});