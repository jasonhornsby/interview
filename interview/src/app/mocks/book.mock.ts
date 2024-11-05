import { faker } from "@faker-js/faker";
import { Book, BookGenre } from "../models/book"

export function getMockBook(override?: Partial<Book>): Book {
    const written = faker.date.past();
    const existing: Book = {
      id: faker.string.uuid(),
      name: faker.book.title(),
      pages: [],
      author: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        age: faker.number.int({ min: 15, max: 87}),
        height: faker.number.int({ min: 140, max: 210 })
      },
      genres: [faker.helpers.enumValue(BookGenre)],
      source: "library",
      dateWritten: written,
      datePublished: faker.date.between({ from: written, to: new Date()})
    }
    return Object.assign(existing, override || {});
}
