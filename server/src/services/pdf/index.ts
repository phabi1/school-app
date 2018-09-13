import fonts from "./fonts";
// tslint:disable-next-line:no-var-requires
const pdfMakePrinter = require("pdfmake/src/printer");

export function generatePdf(docDefinition: any): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const printer = new pdfMakePrinter(fonts);

      docDefinition.styles = {
        ...{
          header: {
            fontSize: 16,
            bold: true,
            alignment: "center",
            margin: [0, 0, 0, cmToPoints(0.5)],
          },
        },
        ...docDefinition.styles,
      };

      const doc = printer.createPdfKitDocument(docDefinition);

      const chunks: any[] = [];

      doc.on("data", (chunk: any) => {
        chunks.push(chunk);
      });

      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });

      doc.end();

    } catch (err) {
      reject(err);
    }
  });
}

export function cmToPoints(cm: number) {
  return cm * 12 * 6 * 0.39;
}
