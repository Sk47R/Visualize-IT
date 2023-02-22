import React from "react";
import Ring from "./Disk";

export default function Tower({ disks }) {
  return (
    <div className="Tower">
      <div className="tower-bg">
        <div className="tower-pillar"></div>
        <div className="tower-base"></div>
      </div>

      <div className="disks">
        {disks.map((disk) => {
          return <Ring number={disk} key={disk} />;
        })}
      </div>
    </div>
  );
}
