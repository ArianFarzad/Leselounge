import Book from '../models/Book';

const findBookInDatabase = async (bookId: string) => {
  return await Book.findOne({ bookId });
};

const fetchBookFromAPI = async (bookId: string) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/works/${bookId}.json`,
    );
    const bookData = await response.json();

    const book = new Book({
      bookId: bookData.key,
      title: bookData.title,
      author: bookData.authors?.[0]?.name || 'Unknown',
      description:
        bookData.description?.value ||
        bookData.description ||
        'No description available',
      coverImageUrl: bookData.covers
        ? `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-M.jpg`
        : null,
    });

    await book.save();
    return book;
  } catch (error) {
    console.error('Error fetching book from API:', error);
    return null;
  }
};

export const getOrFetchBook = async (bookId: string) => {
  let book = await findBookInDatabase(bookId);

  if (!book) {
    book = await fetchBookFromAPI(bookId);
  }

  return book;
};

const findBookByTitleInDatabase = async (title: string) => {
  return await Book.findOne({ title: { $regex: title, $options: 'i' } });
};

const fetchBookByTitleFromAPI = async (title: string) => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`,
    );
    const searchData = await response.json();

    if (searchData.docs && searchData.docs.length > 0) {
      const bookData = searchData.docs[0];

      const book = new Book({
        bookId: bookData.key,
        title: bookData.title,
        author: bookData.author_name?.[0] || 'Unknown',
        description: bookData.first_sentence?.[0] || 'No description available',
        coverImageUrl: bookData.cover_i
          ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-M.jpg`
          : null,
      });

      await book.save();
      return book;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching book from API:', error);
    return null;
  }
};

export const getOrFetchBookByTitle = async (title: string) => {
  let book = await findBookByTitleInDatabase(title);

  if (!book) {
    book = await fetchBookByTitleFromAPI(title);
  }

  return book;
};
