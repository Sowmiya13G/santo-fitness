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
