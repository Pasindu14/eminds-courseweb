type PaymentLines = {
  payments_line_auto_id: number;
  amount: number;
  image_url: string | null;
  is_admin: number;
  approve_status: number;
  created_at: Date;
  payments: {
    student_phone: string;
    batch_auto_id: number;
    created_at: Date;
    batches: {
      batch_no: string;
      batch_name: string;
    };
  };
};
