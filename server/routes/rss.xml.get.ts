import { serverQueryContent } from "#content/server";

const escapeXml = (unsafe: string) => {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
};

const convertContentToHtml = (content) => {
  if (!Array.isArray(content)) {
    return "";
  }

  return content
    .map((block) => {
      switch (block.type) {
        case "heading":
          return `<h${block.level}>${escapeXml(block.text)}</h${block.level}>`;
        case "paragraph":
          return `<p>${escapeXml(block.text)}</p>`;
        case "image":
          return `<img src="${escapeXml(block.src)}" alt="${escapeXml(block.alt)}" />`;
        default:
          return "";
      }
    })
    .join("");
};

export default defineEventHandler(async (event) => {
  const articles = await serverQueryContent(event).find();

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml("Dom Kultury w Zawichoście")}</title>
        <link>${process.env.BASE_URL}/</link>
        <description>${escapeXml("Dom Kultury w Zawichoście - wydarzenia, warsztaty, i kultura dla wszystkich.")}</description>
        <language>pl</language>
        ${articles
          .map(
            (article) => `
          <item>
            <title>${escapeXml(article.title)}</title>
            <link>${process.env.BASE_URL}${article._path}</link>
            <description>${convertContentToHtml(article.content)}</description>
            <pubDate>${new Date(article.publishDate).toUTCString()}</pubDate>
          </item>
        `
          )
          .join("")}
      </channel>
    </rss>
  `;

  setHeader(event, "Content-Type", "application/xml");
  return feed;
});
