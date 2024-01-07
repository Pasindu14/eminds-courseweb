export type StudentMapping = {
  auto_id: number;
  student_auto_id: number | null;
  batch_auto_id: number | null;
  block_status: number;
  students: {
    name: string;
  };
  batches: {
    batch_name: string;
  };
};
