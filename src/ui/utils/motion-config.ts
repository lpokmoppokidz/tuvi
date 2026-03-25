export const fadeIn = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  exit:       { opacity: 0 },
  transition: { duration: 0.15 },
};

export const slideUp = {
  initial:    { opacity: 0, y: 4 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: 4 },
  transition: { duration: 0.15, ease: "easeOut" },
};

export const slideUpFull = {
  initial:    { y: "100%" },
  animate:    { y: 0 },
  exit:       { y: "100%" },
  transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
};

export const scaleIn = {
  initial:    { opacity: 0, scale: 0.97 },
  animate:    { opacity: 1, scale: 1 },
  exit:       { opacity: 0, scale: 0.97 },
  transition: { duration: 0.15, ease: "easeOut" },
};

export const tapScale = {
  whileTap:   { scale: 0.97 },
  transition: { duration: 0.08 },
};

export const staggerItem = (index: number) => ({
  initial:    { opacity: 0, y: 4 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.12, delay: index * 0.01, ease: "easeOut" },
});

export const navActive = {
  transition: { type: "spring", bounce: 0.15, duration: 0.3 },
};

export const pageTransition = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  exit:       { opacity: 0 },
  transition: { duration: 0.15, ease: "easeInOut" },
};
