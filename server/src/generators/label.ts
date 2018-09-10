import { models } from "../models";
import { generatePdf } from "../services/pdf";
import { IGenerator, IGeneratorResult } from "./interface";

export default class LabelGenerator implements IGenerator {

  public async generate(options: {
    classId: string,
    students: string[],
    layout: { type: string, options: any },
  }): Promise<IGeneratorResult> {

    const names = await this.getNames(options.classId, options.students || []);

    const definition = this.selectLayout(options.layout, names);

    const content = await generatePdf(definition);
    return { content };
  }

  private async getNames(classId: string, ids: string[]): Promise<string[]> {
    const c = await models.class.findById(classId);
    if (!c) {
      throw new Error("Class not found");
    }
    const students = c.students;

    const allow = ids.length === 0;

    const names: string[] = [];
    students.forEach((student) => {
      if (allow || ids.indexOf(student.id) > -1) {
        names.push(student.firstname);
        if (student.shortname) {
          names.push(student.shortname);
        }
      }
    });
    return names;
  }

  private selectLayout(layout: { type: string, options?: any }, names: string[]) {
    let definition: any;
    switch (layout.type) {
      case "layout1":
        definition = this.renderLayout1(names, { ...layout.options || {}, align: "center" });
        break;
      case "layout2":
        definition = this.renderLayout1(names, { ...layout.options || {}, align: "left" });
        break;
      case "layout3":
        definition = this.renderLayout2(names);
        break;
      case "layout4":
        definition = this.renderLayout3(names);
        break;
      case "layout5":
        definition = this.renderLayout4(names);
        break;
      default:
        break;
    }

    return definition;
  }

  private renderLayout1(names: string[], options: { align: string }): any {

    const maxColumns = 2;

    const body = [];
    let row: any = null;
    for (let index = 0; index < names.length; index++) {

      if (!row) {
        row = [];
      }

      const name = names[index];

      let fontSize = 54;
      let margin = [0, 16];
      if (name.length > 10) {
        fontSize = 36;
        margin = [0, 25];
      }

      row.push({ text: name.toUpperCase(), fontSize, margin, alignment: options.align });

      if ((index + 1) % maxColumns === 0) {
        body.push(row);
        row = null;
      }
    }

    if (row && row.length < maxColumns) {
      for (let i = row.length; i < maxColumns; i++) {
        row.push("");
      }
      body.push(row);
    }

    const widths = [];
    for (let i = 0; i < maxColumns; i++) {
      widths.push(350);
    }

    const docDefinitions: any = {
      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [20, 20],
      content: [
        {
          table: {
            dontBreakRows: true,
            widths,
            body,
          },
        },
      ],
    };
    return docDefinitions;
  }

  private renderLayout2(names: string[]): any {
    const maxColumns = 3;

    const body = [];
    let row: any = null;
    for (let index = 0; index < names.length; index++) {

      if (!row) {
        row = [];
      }

      const name = names[index];

      let fontSize = 40;
      let margin = [0, 18];

      const length = name.length;
      if (length >= 10) {
        fontSize = 20;
        margin = [0, 36];
      } else if (length > 6 && length < 10) {
        fontSize = 30;
        margin = [0, 29];
      } else {
        fontSize = 40;
        margin = [0, 24];
      }

      row.push({ text: name.toUpperCase(), fontSize, margin, alignment: "center" });

      if ((index + 1) % maxColumns === 0) {
        body.push(row);
        row = null;
      }
    }

    if (row && row.length < maxColumns) {
      for (let i = row.length; i < maxColumns; i++) {
        row.push("");
      }
      body.push(row);
    }

    const widths = [];
    for (let i = 0; i < maxColumns; i++) {
      widths.push("*");
    }

    const docDefinitions: any = {
      pageOrientation: "portrait",
      pageMargins: [0, 20],
      content: [
        {
          table: {
            dontBreakRows: true,
            widths,
            body,
          },
          layout: "noBorders",
        },
      ],
    };

    return docDefinitions;
  }
  private renderLayout3(names: string[]): any {
    const maxColumns = 2;

    const body = [];
    let row: any = null;
    for (let index = 0; index < names.length; index++) {

      if (!row) {
        row = [];
      }

      const name = names[index];

      let fontSize = 40;
      let margin = [0, 5];

      const length = name.length;
      if (length >= 10) {
        fontSize = 20;
        margin = [0, 23];
      } else if (length > 6 && length < 10) {
        fontSize = 30;
        margin = [0, 16];
      } else {
        fontSize = 40;
        margin = [0, 11];
      }

      row.push({ text: name.toUpperCase(), fontSize, margin, alignment: "center" });

      if ((index + 1) % maxColumns === 0) {
        body.push(row);
        row = null;
      }
    }

    if (row && row.length < maxColumns) {
      for (let i = row.length; i < maxColumns; i++) {
        row.push("");
      }
      body.push(row);
    }

    const widths = [];
    for (let i = 0; i < maxColumns; i++) {
      widths.push("*");
    }

    const docDefinitions: any = {
      pageOrientation: "landscape",
      pageMargins: [80, 20],
      content: [
        {
          table: {
            dontBreakRows: true,
            widths,
            body,
          },
        },
      ],
    };

    return docDefinitions;
  }

  private renderLayout4(names: string[]): any {

    const letters: string[] = [];
    names.forEach((name) => {
      // tslint:disable-next-line:prefer-for-of
      for (let l = 0; l < name.length; l++) {
        const letter = name[l];
        letters.push(letter);
      }
    });

    const maxColumns = 15;

    const body = [];
    let row: any = null;
    for (let index = 0; index < letters.length; index++) {

      if (!row) {
        row = [];
      }

      const name = letters[index];

      let fontSize = 40;
      let margin = [0, 5];

      const length = name.length;
      if (length >= 10) {
        fontSize = 20;
        margin = [0, 23];
      } else if (length > 6 && length < 10) {
        fontSize = 30;
        margin = [0, 16];
      } else {
        fontSize = 40;
        margin = [0, 11];
      }

      row.push({ text: name.toUpperCase(), fontSize, margin, alignment: "center" });

      if ((index + 1) % maxColumns === 0) {
        body.push(row);
        row = null;
      }
    }

    if (row && row.length < maxColumns) {
      for (let i = row.length; i < maxColumns; i++) {
        row.push("");
      }
      body.push(row);
    }

    const widths = [];
    for (let i = 0; i < maxColumns; i++) {
      widths.push("*");
    }

    const docDefinitions: any = {
      pageOrientation: "landscape",
      content: [
        {
          table: {
            dontBreakRows: true,
            widths,
            body,
          },
        },
      ],
    };

    return docDefinitions;
  }
}
