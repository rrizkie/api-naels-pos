import { BadRequestException, Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';

@Injectable()
export class ExportService {
  constructor() {}

  async exportFile(data: any, fileName: string) {
    const rows = [];

    data.forEach((el: any) => {
      rows.push(Object.values(el));
    });

    const book = new Workbook();

    const sheet = book.addWorksheet('sheet1');

    rows.unshift(Object.keys(data[0]));

    sheet.addRows(rows);

    const file = await new Promise((resolve, reject) => {
      tmp.file(
        {
          discardDescriptor: true,
          prefix: fileName,
          postfix: '.xlxs',
          mode: parseInt('0600', 8),
        },
        async (err, file) => {
          if (err) {
            throw new BadRequestException();
          }

          book.xlsx
            .writeFile(file)
            .then(() => {
              resolve(file);
            })
            .catch((err) => {
              reject(err);
              throw new BadRequestException();
            });
        },
      );
    });

    return file;
  }
}
