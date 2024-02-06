import React, { useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  customBg: string;
  handleColorChange: (color: string) => void;
  handleClose: () => void;
  toggleButtonRef: React.RefObject<HTMLButtonElement>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  customBg,
  handleColorChange,
  handleClose,
  toggleButtonRef,
}) => {
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose, toggleButtonRef]);

  return (
    <div
      ref={colorPickerRef}
      style={{ position: "absolute", bottom: 200, right: 50 }}
    >
      <HexColorPicker color={customBg} onChange={handleColorChange} />
    </div>
  );
};

export default ColorPicker;
