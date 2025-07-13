import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

export const GradientIcon = ({ Icon, size = 24 }) => {
  const [svgMarkup, setSvgMarkup] = useState("");

  useEffect(() => {
    const loadSvg = async () => {
      let markup = "";

      // Case 1: React component (e.g. FiUser)
      if (typeof Icon === "function") {
        markup = ReactDOMServer.renderToStaticMarkup(<Icon size={size} color="black" />);
      }

      // Case 2: Precompiled SVG string (data URI or raw XML string)
      else if (typeof Icon === "string") {
        // If it's already a data URI, decode and use as is
        if (Icon.startsWith("data:image/svg+xml,")) {
          markup = decodeURIComponent(Icon.replace("data:image/svg+xml,", ""));
        }
        // Else try to fetch the SVG from the path
        else if (Icon.endsWith(".svg")) {
          try {
            const res = await fetch(Icon);
            markup = await res.text();
          } catch (err) {
            console.error("Failed to fetch SVG:", err);
          }
        }
      }

      if (markup) {
        // Ensure proper fill/stroke for masking
        const cleaned = markup
          .replace(/stroke="currentColor"/g, 'stroke="black"')
          .replace(/fill="currentColor"/g, 'fill="black"');
        const encoded = encodeURIComponent(cleaned);
        setSvgMarkup(encoded);
      }
    };

    loadSvg();
  }, [Icon, size]);


  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: "linear-gradient(45deg, #E54D4D, #9C0707)",
        WebkitMaskImage: `url("data:image/svg+xml,${svgMarkup}")`,
        maskImage: `url("data:image/svg+xml,${svgMarkup}")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    />
  );
};
