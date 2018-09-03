import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as _ from 'lodash';
import * as pdfFonts from '../../../vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfCreatorService {

  constructor() {
    this._initializeFonts();
  }

  private _initializeFonts(): void {
    _.assign(pdfMake, { vfs: pdfFonts.pdfMake.vfs });
    _.assign(pdfMake, {
      fonts: {
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Bold.ttf'
        },
        ScriptCol: {
          normal: 'SCRIPTCO.TTF'
        }
      }
    });
  }

  public create(definition: any): pdfMake.TCreatedPdf {
    definition.styles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 20],
        alignment: 'center'
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
    };
    return pdfMake.createPdf(definition);
  }
}

export function writeTextRotate(text: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 50;
  canvas.height = 270;
  const ctx = canvas.getContext('2d');
  ctx.font = '36pt Arial';
  ctx.save();
  ctx.translate(36, 270);
  ctx.rotate(-0.5 * Math.PI);
  ctx.fillStyle = '#000';
  ctx.fillText(text, 0, 0);
  ctx.restore();
  return canvas.toDataURL();
}
