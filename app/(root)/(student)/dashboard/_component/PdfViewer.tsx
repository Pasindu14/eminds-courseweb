import React from "react";

type Props = { url: string };

const PDFViewer = ({ url }: Props) => {
  return <iframe src={url} className="w-full h-full"></iframe>;
};

export default PDFViewer;
