import { models } from "../models";
import { generatePdf, cmToPoints } from "../services/pdf";
import { IGenerator, IGeneratorResult } from "./interface";

// tslint:disable-next-line:no-var-requires
const ChartNode = require("chartjs-node");

export default class MonthPyramidGenerator implements IGenerator {
  public async generate(options: { classId: string }): Promise<IGeneratorResult> {

    const docDefinition: any = {
      pageSize: "A4",
      pageMargins: cmToPoints(1),
      content: [],
    };

    const datas = await this.getDatas(options.classId);

    const barChartData = {
      labels: this.getLabels(),
      datasets: [
        {
          label: "Garçon",
          backgroundColor: "rgba(188, 220, 255, 0.5)",
          borderColor: "#bcdcff",
          borderWidth: 1,
          data: datas.boy,
        },
        {
          label: "Fille",
          backgroundColor: "rgba(255, 188, 220, 0.5)",
          borderColor: "#ffbcdc",
          borderWidth: 1,
          data: datas.girl,
        },
      ],
    };

    const chartOptions = {
      type: "bar",
      data: barChartData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 20,
              stepSize: 2,
            },
          }],
        },
      },
    };

    const chart = new ChartNode(800, 600);
    await chart.drawChart(chartOptions);
    const buffer = await chart.getImageBuffer("image/png");

    docDefinition.content.push({ text: "Pyramide des mois", style: "header" });
    docDefinition.content.push({
      image: "data:image/png;base64," + buffer.toString("base64"),
      width: cmToPoints(19),
    });

    chart.destroy();

    const content = await generatePdf(docDefinition);

    return { content };
  }

  private getLabels() {
    return [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
  }

  private async getDatas(classId: string): Promise<{ [key: string]: number[] }> {

    const c = await models.class.findById(classId);

    if (!c) {
      throw new Error("Class not found");
    }

    const students = c.students;

    const data = {
      boy: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      girl: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    students.forEach((student) => {

      if (!student.birthday || !student.sex || student.sex === "UNKNOW") {
        return;
      }

      const month = student.birthday.getMonth();
      const sex = student.sex === "MALE" ? "boy" : "girl";
      data[sex][month]++;
    });

    return data;
  }
}
