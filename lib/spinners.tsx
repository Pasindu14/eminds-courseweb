"use client";

import ClipLoader from "react-spinners/ClipLoader";

interface LoaderProps {
  size: number;
  color?: string;
}

export function LoaderFull({ size, color = "white" }: LoaderProps) {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[50vh]">
      <div className="sweet-loading">
        <ClipLoader
          color={color}
          loading={true}
          size={size}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export function Loader({ size, color = "white" }: LoaderProps) {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading={true}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
