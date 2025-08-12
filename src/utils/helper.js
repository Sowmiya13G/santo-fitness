import { clearToken } from "@/features/auth/auth-slice";

export const parseFatValue = (val) => {
  const match = val.match(/^(\d+(\.\d+)?)/);
  return match[0];
};

export const logoutUser = (dispatch) => {
  dispatch(clearToken(""));
  window.location.href = "/login";
};


export function getMimeTypeFromBase64(base64) {
  const match = base64.match(/^data:(.*);base64,/);
  return match ? match[1] : 'image/png';
}

export function base64ToFile(base64, nameWithoutExt, mimeType) {
  const ext = mimeType.split('/')[1];
  const filename = `${nameWithoutExt}.${ext}`;
  const base64Data = base64.split(',')[1];
  const binary = atob(base64Data);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new File([array], filename, { type: mimeType });
}

const mealsTypeData = [
  {
    type: "Breakfast",
    label: "Breakfast",
  },
  {
    type: "MorningSnack",
    label: "Morning Snack",
  },
  {
    type: "Lunch",
    label: "Lunch",
  },
  {
    type: "EveningSnack",
    label: "Evening Snack",
  },
  {
    type: "Dinner",
    label: "Dinner",
  },
];

export function getMealsLabel(type) {
  const mealsType = mealsTypeData?.find((x) => x?.type === type);
  return mealsType?.label;
}



export const getColorFromLetter = (letter) => {
  const colors = [
    "#FFD700",
    "#90EE90",
    "#87CEFA",
    "#FF7F50",
    "#9370DB",
    "#FFA07A",
    "#20B2AA",
    "#FF69B4",
    "#40E0D0",
  ];
  
  const index = (letter.charCodeAt(0) - 65) % colors.length;
  const baseColor = colors[index];

  // Helper: hex → RGB
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  // Helper: adjust brightness
  const adjustBrightness = (hex, factor) => {
    const { r, g, b } = hexToRgb(hex);
    return `rgb(${Math.min(255, r * factor)}, ${Math.min(255, g * factor)}, ${Math.min(255, b * factor)})`;
  };

  return {
    light: adjustBrightness(baseColor, 1.2), // 20% lighter
    dark: adjustBrightness(baseColor, 0.8),  // 20% darker
    base: baseColor
  };
};
