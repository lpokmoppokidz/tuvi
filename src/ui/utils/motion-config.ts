export const fadeIn = {
  initial:    { opacity: 0 },
  animate:    { opacity: 1 },
  exit:       { opacity: 0 },
  transition: { duration: 0.2 },
};

export const slideUp = {
  initial:    { opacity: 0, y: 8 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: 8 },
  transition: { duration: 0.2, ease: "easeOut" },
};

export const slideUpFull = {
  initial:    { y: "100%" },
  animate:    { y: 0 },
  exit:       { y: "100%" },
  transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
};

export const scaleIn = {
  initial:    { opacity: 0, scale: 0.95 },
  animate:    { opacity: 1, scale: 1 },
  exit:       { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: "easeOut" },
};

export const tapScale = {
  whileHover: { scale: 1.03 },
  whileTap:   { scale: 0.97 },
  transition: { duration: 0.1 },
};

export const staggerItem = (index: number) => ({
  initial:    { opacity: 0, y: 6 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.18, delay: index * 0.015, ease: "easeOut" },
});

export const navActive = {
  transition: { type: "spring", bounce: 0.2, duration: 0.4 },
};

export const pageTransition = {
  initial:    { opacity: 0, y: 6 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -6 },
  transition: { duration: 0.2, ease: "easeInOut" },
};
