export const parseFatValue = (val) => {
  const match = val.match(/^(\d+(\.\d+)?)/);
  console.log('match[0]: ', match[0]);
  return match[0];
};
