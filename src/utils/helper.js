import { clearToken } from "@/features/auth/auth-slice";

export const parseFatValue = (val) => {
  const match = val.match(/^(\d+(\.\d+)?)/);
  return match[0];
};

export const logoutUser = (dispatch) => {
  dispatch(clearToken(""));
  window.location.href = "/login";
};

export function base64ToFile(dataUrl, filename) {
  const arr = dataUrl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
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
