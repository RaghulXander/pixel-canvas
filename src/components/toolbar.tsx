import { useState } from "react";
import classnames from "classnames";

const tools = [
  {
    id: "pen",
    label: "🖊️",
  },
  {
    id: "eraser",
    label: "◻️",
  },
];

export const Toolbar = ({ onColorChange, onToolChange }) => {
  const [activeTool, setActiveTool] = useState("pen");
  console.log("activeTool", activeTool);
  return (
    <div className="w-full h-full border rounded-md flex flex-col gap-1">
      <h4>Toolbar</h4>
      <hr />
      <div className="flex gap-2 flex-wrap justify-center items-center p-2">
        {tools.map((tool) => (
          <div
            className={classnames("p-2 border rounded-md", {
              "bg-green-100": activeTool === tool.id,
            })}
            onClick={() => {
              onToolChange(tool.id);
              setActiveTool(tool.id);
            }}
            key={tool.id}
          >
            {tool.label}
          </div>
        ))}
        <div
          className={classnames(
            "min-h-[16px] max-w-[50px] border rounded-md p-2 flex"
          )}
        >
          <input
            type="color"
            id="input"
            className={classnames("max-w-[42px]", {
              "bg-green-100": activeTool === "color",
            })}
            onChange={(e) => {
              onToolChange("color");
              setActiveTool("color");
              onColorChange(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};
