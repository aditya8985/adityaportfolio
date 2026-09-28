export type MomentShot = {
  src: string;
  label: string;
  caption: string;
  tone: "blue" | "coral" | "peach" | "sky" | "amber";
};

export const momentShots: MomentShot[] = [
  {
    src: "/moments/01-rickshaw.jpg",
    label: "Extremely Outside",
    caption: "city chaos",
    tone: "blue",
  },
  {
    src: "/moments/02-sketch.jpg",
    label: "NAILED IT!",
    caption: "desk daydream",
    tone: "coral",
  },
  {
    src: "/moments/03-yoo.jpg",
    label: "IRL HANGS",
    caption: "yoo energy",
    tone: "peach",
  },
  {
    src: "/moments/04-palms.jpg",
    label: "VACATION VIBES",
    caption: "sky doodles",
    tone: "sky",
  },
  {
    src: "/moments/05-coffee.jpg",
    label: "Food Food Food",
    caption: "late night sips",
    tone: "amber",
  },
  {
    src: "/moments/06-rickshaw-ride.jpg",
    label: "DAYS IN MY LIFE",
    caption: "lately",
    tone: "blue",
  },
  {
    src: "/moments/07-rain-walk.jpg",
    label: "Extremely Outside",
    caption: "puddle stroll",
    tone: "sky",
  },
  {
    src: "/moments/08-icecream.jpg",
    label: "Food Food Food",
    caption: "a day in my life",
    tone: "amber",
  },
];
