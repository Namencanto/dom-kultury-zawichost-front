const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs-extra");
const path = require("path");

// Funkcja do usuwania polskich znaków
function removeAccents(str) {
  const accents = {
    ą: "a",
    ć: "c",
    ę: "e",
    ł: "l",
    ń: "n",
    ó: "o",
    ś: "s",
    ź: "z",
    ż: "z",
    Ą: "A",
    Ć: "C",
    Ę: "E",
    Ł: "L",
    Ń: "N",
    Ó: "O",
    Ś: "S",
    Ź: "Z",
    Ż: "Z",
  };
  return str
    .split("")
    .map((char) => accents[char] || char)
    .join("");
}

// Funkcja do usuwania niepotrzebnych białych znaków
function cleanContent(content) {
  return content.replace(/\s+/g, " ").trim();
}

// Funkcja do zamiany polskich nazw miesięcy na angielskie
function translateMonth(month) {
  const months = {
    styczeń: "January",
    luty: "February",
    marzec: "March",
    kwiecień: "April",
    maj: "May",
    czerwiec: "June",
    lipiec: "July",
    sierpień: "August",
    wrzesień: "September",
    październik: "October",
    listopad: "November",
    grudzień: "December",
  };
  return months[month.toLowerCase()] || month;
}

// Funkcja do pobrania strony i zwrócenia zawartości HTML
async function fetchPage(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

// Funkcja do parsowania zawartości strony
async function parsePage(year, month) {
  const url = `https://mgok-zawichost.pl/kategoria/${year}/${month}/`;
  const html = await fetchPage(url);
  if (!html) return [];

  const $ = cheerio.load(html);
  const articles = [];

  $("article").each((_, element) => {
    const article = $(element);
    const title = article.find(".entry-title a").text();
    const link = article.find(".entry-title a").attr("href");
    const dateText = article.find("time").text().trim();
    const dateParts = dateText.split(",").slice(-1)[0].trim().split(" ");
    const monthTranslated = translateMonth(dateParts[0]);
    const date = new Date(
      Date.UTC(
        parseInt(dateParts[1]),
        new Date(`${monthTranslated} 1`).getMonth(),
        1,
        0,
        0,
        0
      )
    );
    const images = [];

    let linkDescription = "";
    if (link) {
      linkDescription = removeAccents(
        link
          .split("/")
          .slice(-2, -1)[0]
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase()
      );
    }

    article.find("img").each((_, img) => {
      const imgUrl = $(img).attr("src");
      if (imgUrl) {
        let imgDescription = removeAccents(
          title.replace(/[^a-z0-9]/gi, "_").toLowerCase()
        );

        // If the description is corrupted, use the description derived from the link
        if (/_{2,}/.test(imgDescription) && linkDescription) {
          imgDescription = linkDescription;
        }

        images.push({
          url: imgUrl,
          description: imgDescription,
          localPath: "",
        });
      }
    });

    articles.push({
      year,
      month,
      title,
      link: link ? link.replace("https://mgok-zawichost.pl", "") : "",
      date,
      images,
    });
  });

  return articles;
}

// Funkcja do zapisu danych do pliku
async function saveDataToFile(data) {
  const filePath = path.join(__dirname, "..", "public", "news.json");
  await fs.outputJson(filePath, data, { spaces: 2 });
  console.log("Data saved to", filePath);
}

// Funkcja do pobierania obrazków
async function downloadImages(articles) {
  for (const article of articles) {
    const downloadDir = path.join(
      __dirname,
      "..",
      "images",
      article.year.toString(),
      article.month.split("-")[0]
    );
    fs.ensureDirSync(downloadDir);

    for (const img of article.images) {
      if (img.url) {
        const imgName = path.basename(img.url);
        const imgPrefix = `${article.year}_${article.month.split("-")[0]}_${
          img.description
        }`;
        const imgPath = path.join(downloadDir, `${imgPrefix}_${imgName}`);

        const writer = fs.createWriteStream(imgPath);
        const response = await axios({
          url: img.url,
          method: "GET",
          responseType: "stream",
        });

        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });

        img.localPath = path.posix.join(
          "images",
          article.year.toString(),
          article.month.split("-")[0],
          `${imgPrefix}_${imgName}`
        );
        delete img.url;

        console.log(`Image downloaded: ${imgPath}`);
      }
    }
  }
}

// Główna funkcja do przetwarzania wszystkich lat i miesięcy
(async () => {
  const years = Array.from({ length: 2024 - 2012 + 1 }, (_, i) => 2012 + i);
  const months = [
    "styczen",
    "luty",
    "marzec",
    "kwiecien",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpien",
    "wrzesien",
    "pazdziernik",
    "listopad",
    "grudzien",
  ];
  let allArticles = [];

  for (const year of years) {
    for (const month of months) {
      const articles = await parsePage(year, `${month}-${year}`);
      if (articles.length > 0) {
        allArticles = allArticles.concat(articles);
      }
    }
  }

  await downloadImages(allArticles);
  await saveDataToFile(allArticles);
})();
