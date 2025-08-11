export const convertImageToFormat = (file, outputType = "image/jpeg") => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const convertedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, "") +
                  (outputType === "image/png" ? ".png" : ".jpg"),
                {
                  type: outputType,
                }
              );
              resolve(convertedFile);
            } else {
              reject(new Error("Image conversion failed"));
            }
          },
          outputType,
          0.9 // quality for JPEG
        );
      };
      img.src = event.target.result;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};
