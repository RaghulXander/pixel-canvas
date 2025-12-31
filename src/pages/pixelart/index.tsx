import { Header } from "../../components/header";
import { Toolbar } from "../../components/toolbar";
import { ColorPallette } from "../../components/colorpallette";
import { useState } from "react";
import { CustomCanvas } from "../../components/canvas";

export const PixelArtPage = () => {
  const [color, setActiveColor] = useState("#000");

  const onColorChange = () => {};

  return (
    <main className="flex flex-col item-start w-full h-full">
      <div className="w-full h-[50px]">
        <Header />
      </div>
      <div className="flex-1 flex w-full h-full">
        <section id="toolbar" className="max-w-[120px]">
          <Toolbar />
        </section>
        <section id="canvasArea" className="flex-1">
          <CustomCanvas />
        </section>
      </div>
    </main>
  );
};

export default PixelArtPage;
