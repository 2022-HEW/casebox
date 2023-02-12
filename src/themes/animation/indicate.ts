export const transition = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
  transition: { duration: 0.5 },
};

export const bound = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: {
    default: {
      duration: 0.2,
      ease: [0, 0.5, 0.2, 0],
    },
    scale: {
      type: "spring",
      damping: 7,
      stiffness: 50, //変形のしづらさ
      restDelta: 0.001,
    },
  },
};

export const slideLeft = {
  animate: {
    x: [500, 0],
  },
  transition: {
    duration: 0.5,
  },
};

export const slideRight = {
  animate: {
    x: [-500, 0],
  },
  transition: {
    duration: 0.5,
  },
};

export const slideModal = {
  initial: { y: 150,},
  animate: { y: 0,scale:[0,0,1]},
  exit: { y: 150 },
  transition: {
    duration: 0.4,
    times:[0,0,0.4]
  },
};
