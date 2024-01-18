import { Button } from "@/components/ui/button";
import { toastError } from "@/lib/toast/toast";
import { convertToLocaleDateTime } from "@/lib/utils";
import React from "react";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";

const DownloadExcel = ({ data }: { data: any }) => {
  const download = () => {
    if (data.length <= 0) {
      toastError("No data to export");
      return;
    }
    const rows = data.map((payment: any) => ({
      Phone: payment.student_phone,
      Date: convertToLocaleDateTime(payment.created_at),
      Batch: payment.batches.batch_name,
      Full: payment.batch_price,
      Paid: payment.current,
      Balance: payment.batch_price - payment.current,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Phone", "Date", "Batch", "Full", "Paid", "Balance"],
    ]);

    XLSX.writeFile(workbook, `${uuidv4()}.xlsx`, { compression: true });
  };
  return (
    <div>
      <Button onClick={download}>Export Excel</Button>
    </div>
  );
};

export default DownloadExcel;
