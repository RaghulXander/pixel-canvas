import { useState } from "react";
import classnames from "classnames";

export const Toolbar = () => {
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
  const [activeTool, setActiveTool] = useState("pen");
  return (
    <div className="w-full h-full p-2 border rounded-md">
      <h4>Toolbar</h4>
      <div className="flex gap-2">
        {tools.map((tool) => (
          <div
            className={classnames("p-2 border rounded-md", {
              "bg-green": activeTool === tool.id,
            })}
            onClick={() => setActiveTool(tool.id)}
            key={tool.id}
          >
            {tool.label}
          </div>
        ))}
      </div>
    </div>
  );
};
