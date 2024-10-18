export interface Trip {
  _id?: string; // Optional _id field for MongoDB ID
  code: string;
  name: string;
  resort: string;
  length: number;
  perPerson: number;
  image: string;
  description: string;
  start: Date;
}


