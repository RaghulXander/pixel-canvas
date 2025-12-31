import { Header } from "../../components/header";
import { Toolbar } from "../../components/toolbar";
import { ColorPallette } from "../../components/colorpallette";
import { useState } from "react";
import { CustomCanvas } from "../../components/canvas";

export const PixelArtPage = () => {
  const [color, setActiveColor] = useState("#000");
  const [tool, setActiveTool] = useState("pen");

  const onColorChange = (event) => {
    setActiveColor(event.target.value);
  };

  return (
    <main className="flex flex-col item-start w-full h-full">
      <div className="w-full h-[50px] bg-gray-200 flex justify-center items-center">
        <Header />
      </div>
      <div className="flex-1 flex w-full h-full gap-3 p-2 bg-gray-100">
        <section id="toolbar" className="max-w-[70px] max-h-[300px]">
          <Toolbar
            onColorChange={onColorChange}
            onToolChange={(tool) => setActiveTool(tool)}
          />
        </section>
        <section id="canvasArea" className="flex-1">
          {tool === "eraser" && (
            <div className="flex w-full justify-center">
              Eraser not implemented
            </div>
          )}
          <CustomCanvas activeColor={color} activeTool={tool} />
        </section>
      </div>
    </main>
  );
};

export default PixelArtPage;
