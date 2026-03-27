export type Review = {
  id: string;
  name: string;         // customer name
  rating: number;       // 1–5
  amountSpent: number;  // in EUR
  text: string;         // the review message
  date: string;         // e.g. "2026-03-10"
  build?: string;       // optional — which build they got
  image?: string;       // optional — put the file in /public and use e.g. "/reviews/lucko.jpg"
};

export const REVIEWS: Review[] = [
  {
    id: "1",
    name: "roland",
    rating: 5,
    amountSpent: 1467,
    text: "idk it is good",
    date: "2026-02-6",
    build: "m-pcs",
    image: "/reviews/lucko.jpg",
  },
  // Add more reviews below like this:
  // {
  //   id: "2",
  //   name: "John",
  //   rating: 5,
  //   amountSpent: 1200,
  //   text: "Amazing build, super fast shipping!",
  //   date: "2026-03-20",
  //   build: "m-pcs",
  //   image: "/reviews/john.jpg",
  // },
];