import { useRef, useEffect, useCallback } from "react";
import classnames from "classnames";

export const CustomCanvas = ({
  activeColor = "#000",
  pixelDensity = 8,
  activeTool,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const evenColor = "#f0f0f0";
  const oddColor = "#d3d3d3";

  useEffect(() => {
    return () => {
      if (canvasRef.current) {
        // canvasRef.current.getContext("2d");
      }
    };
  }, []);

  const drawPixelInCanvas = useCallback((context, width, height) => {
    for (let i = 0; i < height; i += pixelDensity) {
      for (let j = 0; j < width; j += pixelDensity) {
        const isEven = ((i + j) / pixelDensity) % 2 === 0;
        context.fillStyle = isEven ? evenColor : oddColor;
        context.fillRect(i, j, pixelDensity, pixelDensity);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 300;
    canvas.height = 300;

    const context = canvas.getContext("2d");
    drawPixelInCanvas(context, canvas.width, canvas.height);
  }, []);

  const getCell = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    return {
      x: Math.floor(x / pixelDensity) * pixelDensity,
      y: Math.floor(y / pixelDensity) * pixelDensity,
    };
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!canvasRef.current || !isDrawing.current) return;

      const context = canvasRef.current.getContext("2d");
      const { x, y } = getCell(e);

      context.fillStyle = activeColor;
      context.fillRect(x, y, pixelDensity, pixelDensity);
    },
    [activeColor]
  );

  const handleMouseDown = useCallback((e) => {
    if (!canvasRef.current || isDrawing.current) return;
    isDrawing.current = true;
    // context.moveTo(e.clientX, e.clientY);
    // context.lineTo(e.clientY, e.clientY);
    // context.lineTo(200, 100)
    // context.stroke();
    // context.moveTo(e.clientX, e.clientY);
    // context.lineTo(e.clientX, e.clientY);
    //  console.log("context", context);
    handleMouseMove(e);
  }, []);

  const handleMouseUp = useCallback((e) => {
    if (!canvasRef.current || !isDrawing.current) return;
    isDrawing.current = false;
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={classnames({
          "disabled bg-gray-400 pointer-events-none cursor-disabled":
            activeTool === "eraser",
        })}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseDownCapture={handleMouseDown}
        onPointerDown={handleMouseDown}
        onPointerUp={handleMouseUp}
      />
    </>
  );
};
