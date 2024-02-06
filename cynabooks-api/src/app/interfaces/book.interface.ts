export interface IBook extends Document {
  title: string;
  description: string;
  author: string;
  publicationDate: Date;
  genre: string;
  price: number;
  color: string;
  _id?: string;
}
