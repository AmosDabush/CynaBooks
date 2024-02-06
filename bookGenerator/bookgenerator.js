import { faker } from "@faker-js/faker";
import fs from "fs";

const genres = [
  "Science fiction",
  "Satire",
  "Drama",
  "Action",
  "Romance",
  "Mystery",
  "Horror",
];

const colors = [
  "#FF5733",
  "#3366FF",
  "#33FF57",
  "#FF3366",
  "#57FF33",
  "#FF5733",
  "#3366FF",
  "#33FF57",
  "#FF3366",
  "#57FF33",
];

const books = [];
const bookCount = 50;
for (let i = 0; i < bookCount; i++) {
  const book = {
    title: faker.word.words(3),
    description: faker.lorem.sentence(10),
    author: `${faker.person.firstName()} ${faker.person.lastName()}`,
    publicationDate: faker.date.past().toISOString(),
    genre: faker.helpers.arrayElement(genres),
    price: parseFloat(faker.finance.amount(9.99, 29.99, 2)),
    color: faker.helpers.arrayElement(colors),
  };
  books.push(book);
}

const jsonContent = JSON.stringify(books, null, 2);
const outputPath = "../cynabooks-api/scripts/generated_books.json";

fs.writeFileSync(outputPath, jsonContent);

console.log(
  `Generated ${bookCount} book entries and saved to "cynabooks-api/scripts/generated_books.json".`
);
