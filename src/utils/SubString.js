const SubString = (val, size) => {
  if (val.length > size) {
    return val.substring(0, size) + "...";
  }
  return val;
};

export default SubString;
