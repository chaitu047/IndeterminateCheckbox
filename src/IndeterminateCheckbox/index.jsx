import { useState } from "react";
import Checkbox from "./Checkbox";

export default function IndeterminateCheckbox({ chechBoxData, handleChange }) {
  return (
    <div>
      {chechBoxData.map((data) => {
        return (
          <div style={{ marginLeft: "1rem", padding: "0.5rem" }}>
            <Checkbox
              key={data.id}
              id={data.id}
              label={data.label}
              status={data.status}
              handleChange={handleChange}
            />
            {data.children && data.children.length > 0 && (
              <IndeterminateCheckbox
                chechBoxData={data.children}
                handleChange={handleChange}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
