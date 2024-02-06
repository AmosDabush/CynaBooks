

# CynaBooks - Book Catalog Application
CynaBooks leverages React for its front-end, offering a dynamic and responsive user interface. React Query is used for efficient data fetching and state management, enabling robust caching mechanisms that enhance performance. The back-end is powered by Node.js, with Express serving as the framework for creating the API. MongoDB is chosen for the database, providing a flexible, document-oriented storage solution. Docker facilitates easy setup and deployment by containerizing the application environment. This tech stack ensures a scalable, maintainable, and user-friendly application experience.

## Introduction

CynaBooks is a web-based book catalog application that allows users to browse, search, add, update, and remove books from the catalog. It provides an intuitive and user-friendly interface for managing your book collection.

## Features

- **Browse and Search**: Explore a vast collection of books and search for specific titles, authors, or genres.

- **Add New Books**: Easily add new books to your catalog with detailed information.

- **Update Existing Books**: Edit book details, such as title, description, author, publication date, genre, price, and color.

- **Remove Books**: Remove books from your catalog when they are no longer needed.

- **Book Details**: View detailed information about each book, including its cover color.

- **Pagination**: Navigate through a large catalog with pagination support.

- **Color Picker**: Use a color picker to choose a unique color for each book.

- **Caching with React Query**: Utilize React Query for efficient data fetching and caching to enhance application performance.

## Prerequisites

Before running the CynaBooks application, make sure you have the following installed:

- Node.js and npm (Node Package Manager)
- Docker (for setting up the development environment)

## Getting Started

Follow these steps to set up and run the CynaBooks application:

1. Clone the CynaBooks repository to your local machine.

2. Install dependencies for the UI and API:

   ```bash
   # Run the setup script
   # this will setup front and back
   npm run setup
   npm run dev

   or 

   yarn setup
   yarn dev
   ```

   OR (if you dont like my setup script)
   ```bash
   # Change directory to the UI folder
   cd cynabooks-ui
   npm install

   # Change directory to the API folder
   cd ../cynabooks-api
   npm install

   # Start the development environment
   npm run dev
   ```

3. Access the CynaBooks application in your web browser at `http://localhost:80`.

## Generating Sample Books

To generate new json with fresh fake book, you can use the provided book generator script. This script creates random books and saves them to a JSON file.
the json will import to db in next build or if restart mongo-seed container
```bash
# Run the book generator script
node book-generator.js
```

This will generate book entries and save them to `cynabooks-api/scripts/generated_books.json`.

## Seeding the Database (Note this step is not mandatory and there is already a json fill with real books object for the seeding process).

To seed will execute in each new build of the app make collection id empty to avoid duplications the db is empty your MongoDB database with the generated books, use the provided MongoDB seed script. Make sure your MongoDB server is running.


This will populate your database with the books from `cynabooks-api/scripts/generated_books.json`.

## Usage

- Browse and search for books in the catalog.

- Click on a book to view its details.

- Use the "Create Book" button to add new books to the catalog.

- Click the "Edit" button on a book's details page to update its information.

- To remove a book, click the "Delete" button on its details page.

## Caching with React Query

CynaBooks uses React Query for efficient data fetching and caching. This helps improve the application's performance by reducing unnecessary network requests and providing a smooth user experience.

React Query caches API responses by default and automatically updates the cache when data changes. It also provides tools for manual cache management and data synchronization.

## Contact

For any inquiries or feedback, please contact us at [gs2Dabu@gmail.com](mailto:gs2Dabu@gmail.com).

Happy code review! 📚🌟
```


cynabooks-api
 |____scripts
 |____src
 | |   |____app
 | |   | |   |____routes
 | |   | |   |____interfaces
 | |   | |   |____controllers
 | |   | |   |____utils
 | |   | |   |____models
 | |   | |   |____configs
 | |   |____logs
scripts
 |____mockBooks.json
 |____import-script.sh
bookGenerator
fin-books-api
 |____src
 | |   |____app
 | |   | |   |____scripts
cynabooks-ui
 |____src
 | |   |____styles
 | |   |____context
 | |   |____assets
 | |   |____http
 | |   |____partials
 | |   | |   |____Loader
 | |   | |   |____ColorPicker
 | |   | |   |____DarkModeSwitch
 | |   |____hooks
 | |   |____utils
 | |   |____components
 | |   | |   |____Pagination
 | |   | |   |____DialogForm
 | |   | |   |____SearchBar
 | |   | |   |____Header
 | |   |____theme
 | |   |____constants
 | |   |____types
 | |   |____pages
 | |   | |   |____BookCatalogPage
 | |   | |   | |   |____BookItem
 | |   | |   |____BookPage
 | |   | |   |____NotFoundPage
 |____public
```