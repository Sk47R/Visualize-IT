import React from "react";

export default function Disk({ number }) {
  const MIN_WIDTH = 20;
  const INC_WIDTH = 25;

  const width = MIN_WIDTH + INC_WIDTH * number;

  return (
    <div className="Disk" style={{ width }}>
      {number}
    </div>
  );
}
