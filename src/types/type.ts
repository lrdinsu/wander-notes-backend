export type Tour = {
  id: number;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: string[];
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  photo: string;
  password: string;
};
