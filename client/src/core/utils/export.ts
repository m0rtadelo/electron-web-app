const toExcel = require('to-excel').toExcel;

export const exportExcel = (data: any, headers: any = []): void => {
  if (data?.length) {
    if (!headers.length) {
      Object.keys(data[0]).forEach((hdr) => {
        headers.push({
          label: hdr,
          field: hdr,
        });
      });
    }
    toExcel.exportXLS(data, headers);
  }
};
