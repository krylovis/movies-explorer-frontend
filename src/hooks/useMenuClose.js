import { useEffect } from "react";

export default function useMenuClose(menuIsOpen, handleCloseMenu) {
  useEffect(() => {
    if (!menuIsOpen) return;

    const handleOverlay = (event) => {
      if (event.target.classList.contains("navigation_opened")) handleCloseMenu();
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") handleCloseMenu();
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [menuIsOpen, handleCloseMenu]);
};