export type BatchTimeSchedule = {
  auto_id: number | null;
  batch_auto_id: string;
  date: string;
  batches: {
    batch_no: string;
    batch_name: string;
  };
};
