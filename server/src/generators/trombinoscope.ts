import * as Path from "path";
import { models } from "../models";
import { fileService } from "../services/file";
import { generatePdf } from "../services/pdf";

export default class TrombinoscopeGenerator {

  public async generate(options: {
    classId: string,
  }) {
    const docDefinition: any = {
      pageSize: "A4",
      pageOrientation: "landscape",
      content: [],
      images: {
        boy: Path.resolve(fileService.getFilePath("public://students/pictures/boy.png")),
        girl: Path.resolve(fileService.getFilePath("public://students/pictures/girl.png")),
      },
    };

    const c = await models.class.findById(options.classId);
    if (!c) {
      throw Error("Class not found");
    }

    const students = [...c.students];

    const table: any = {
      widths: "*",
      body: [],
    };

    const maxColumns = 7;

    let row: any[] | null = [];
    let index = 1;
    for (const student of students) {
      if (!row) {
        row = [];
      }

      row.push([
        {
          image: student.sex === "FEMALE" ? "girl" : "boy",
          fit: [100, 100],
        },
        { text: student.firstname, alignment: "center" },
      ]);

      if (index > 0 && index % maxColumns === 0) {
        table.body.push(row);
        row = null;
      }
      index++;
    }

    if (row && row.length < maxColumns) {
      for (let i = row.length; i < maxColumns; i++) {
        row.push("");
      }
      table.body.push(row);
    }

    docDefinition.content.push({ table });

    return generatePdf(docDefinition);
  }

}