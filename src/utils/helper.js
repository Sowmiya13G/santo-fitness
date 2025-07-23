export const parseFatValue = (val) => {
  const match = val.match(/^(\d+(\.\d+)?)/);
  return match[0];
};
