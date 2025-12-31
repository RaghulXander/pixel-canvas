import { useRef, useEffect, useCallback } from "react";

export const CustomCanvas = ({ activeColor = "#000", pixelDensity = 8 }) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const evenColor = "#f0f0f0";
  const oddColor = "#d3d3d3";

  const drawCheckerboard = useCallback((ctx, width, height) => {
    for (let i = 0; i < height; i += pixelDensity) {
      for (let j = 0; j < width; j += pixelDensity) {
        const isEven = ((i + j) / pixelDensity) % 2 === 0;
        ctx.fillStyle = isEven ? evenColor : oddColor;
        ctx.fillRect(i, j, pixelDensity, pixelDensity);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 600;
    canvas.height = 600;

    const ctx = canvas.getContext("2d");
    drawCheckerboard(ctx, canvas.width, canvas.height);
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

      const ctx = canvasRef.current.getContext("2d");
      const { x, y } = getCell(e);

      ctx.fillStyle = activeColor;
      ctx.fillRect(x, y, pixelDensity, pixelDensity);
    },
    [activeColor]
  );

  const handleMouseDown = useCallback((e) => {
    if (!canvasRef.current || isDrawing.current) return;
    isDrawing.current = true;
    handleMouseMove(e);
  }, []);

  const handleMouseUp = useCallback((e) => {
    if (!canvasRef.current || !isDrawing.current) return;
    isDrawing.current = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="border"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseDownCapture={handleMouseDown}
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
    />
  );
};
