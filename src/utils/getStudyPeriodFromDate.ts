export const getStudyPeriodFromDate = (date: Date): number => {
  const month = date.getMonth() + 1;

  if (month >= 8 && month <= 10) {
    return 1;
  } else if (month >= 8 && month <= 12) {
    return 2;
  } else if (month >= 1 && month <= 3) {
    return 3;
  } else if (month >= 3 && month <= 7) {
    return 4;
  } else {
    return -1;
  }
};
