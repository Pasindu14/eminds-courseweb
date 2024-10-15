export type SpecialSession = {
  auto_id: number;
  batch_auto_id: number | null;
  title: string;
  video_link: string;
  batches: {
    batch_name: string;
  };
};
