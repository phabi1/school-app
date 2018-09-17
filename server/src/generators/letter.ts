import { cmToPoints, generatePdf } from "../services/pdf";
import { IGenerator } from "./interface";

export default class LetterGenerator implements IGenerator {
  public async generate() {

    const docDefinition: any = {
      pageMargins: [0, 0],
      pageOrientation: "landscape",
      content: [],
    };

    const table: any = {
      widths: "*",
      dontBreakRows: true,
      body: [],
    };

    const maxColumns = 2;
    let currentCol = 0;
    let row: any = [];
    for (let i = 65; i < 91; i++) {
      const letter = String.fromCharCode(i);
      row.push({
        text: letter,
        alignment: "center",
        font: "AcceseditionsscriptOStandard",
        fontSize: cmToPoints(16),
        margin: [0, 0, 0, 0],
      });
      currentCol++;
      if (currentCol >= maxColumns) {
        table.body.push(row);
        row = [];
        currentCol = 0;
      }
    }

    if (row.length > 0) {
      for (let j = row.length; j < maxColumns; j++) {
        row.push("");
      }
      table.body.push(row);
    }

    docDefinition.content.push({ table, layout: "noBorders" });

    const content = await generatePdf(docDefinition);

    return { content };
  }
}
