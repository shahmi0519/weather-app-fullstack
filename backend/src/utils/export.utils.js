const { Parser } = require("json2csv");
const js2xmlparser = require("js2xmlparser");
const PDFDocument = require("pdfkit");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();


const exportJSON = (records) => {
  return JSON.stringify(records, null, 2);
};


const exportCSV = (records) => {
  const parser = new Parser();
  return parser.parse(records);
};


const exportXML = (records) => {
  return js2xmlparser.parse("weatherRecords", { record: records });
};


const exportMarkdown = (records) => {
  let markdown = "# Weather Records\n\n";
  records.forEach((r) => {
    markdown += `## ${r.location}\n`;
    markdown += `**Date Range:** ${r.startDate.toDateString()} - ${r.endDate.toDateString()}\n\n`;
    markdown += `**Coordinates:** ${r.latitude}, ${r.longitude}\n\n`;
    markdown += `**Weather Data Sample:**\n`;
    r.weatherData.slice(0, 3).forEach((item) => {
      markdown += `- ${item.dt_txt}: ${item.main.temp}°C, ${item.weather[0].description}\n`;
    });
    markdown += "\n";
  });
  return markdown;
};


const exportPDF = (records, res) => {
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=weather_records.pdf");
  doc.pipe(res);

  doc.fontSize(18).text("Weather Records", { align: "center" });
  doc.moveDown();

  records.forEach((r) => {
    doc.fontSize(14).text(`Location: ${r.location}`);
    doc.text(`Date Range: ${r.startDate.toDateString()} - ${r.endDate.toDateString()}`);
    doc.text(`Coordinates: ${r.latitude}, ${r.longitude}`);
    doc.text("Weather Data Sample:");
    r.weatherData.slice(0, 3).forEach((item) => {
      doc.text(`- ${item.dt_txt}: ${item.main.temp}°C, ${item.weather[0].description}`);
    });
    doc.moveDown();
  });

  doc.end();
};

module.exports = { exportJSON, exportCSV, exportXML, exportMarkdown, exportPDF };
