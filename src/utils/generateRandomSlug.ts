const characters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const generateRandomSlug = (length: number): string => {
  let slug = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    slug += characters[randomIndex];
  }
  return slug;
};
