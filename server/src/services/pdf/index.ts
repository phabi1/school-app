import fonts from "./fonts";
// tslint:disable-next-line:no-var-requires
const pdfMakePrinter = require("pdfmake/src/printer");

export function generatePdf(docDefinition: any): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const printer = new pdfMakePrinter(fonts);
      const doc = printer.createPdfKitDocument(docDefinition);

      const chunks: any[] = [];

      doc.on("data", (chunk: any) => {
        chunks.push(chunk);
      });

      doc.on("end", () => {
        resolve( Buffer.concat(chunks));
      });

      doc.end();

    } catch (err) {
      reject(err);
    }
  });
}
