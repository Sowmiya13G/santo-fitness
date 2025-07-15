import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

export const GradientIcon = ({ Icon, size = 24 }) => {
  const [svgMarkup, setSvgMarkup] = useState("");

  useEffect(() => {
    const loadSvg = async () => {
      let markup = "";

      if (typeof Icon === "function") {
        markup = ReactDOMServer.renderToStaticMarkup(
          <Icon size={size} color="black" />,
        );
      } else if (typeof Icon === "string") {
        if (Icon.startsWith("data:image/svg+xml,")) {
          markup = decodeURIComponent(Icon.replace("data:image/svg+xml,", ""));
        } else if (Icon.endsWith(".svg")) {
          try {
            const res = await fetch(Icon);
            markup = await res.text();
          } catch (err) {
            console.error("Failed to fetch SVG:", err);
          }
        }
      }

      if (markup) {
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
