
import React from "react";
import ReactDOMServer from "react-dom/server";

export const GradientIcon = ({ Icon, size = 21 }) => {
  const svgMarkup = ReactDOMServer.renderToStaticMarkup(
    <Icon size={size} color="black" />
  );

  const encoded = encodeURIComponent(svgMarkup);

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundImage: "linear-gradient(45deg, #E54D4D, #9C0707)",
        WebkitMaskImage: `url("data:image/svg+xml;utf8,${encoded}")`,
        maskImage: `url("data:image/svg+xml;utf8,${encoded}")`,
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
