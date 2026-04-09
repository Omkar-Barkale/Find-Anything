import { jest } from '@jest/globals';

const mockRepo = {
  readBooks: jest.fn(),
  getBookByKeyword: jest.fn(),
  deleteBooks: jest.fn(),
  updateBook: jest.fn(),
  createBook: jest.fn()
};

jest.unstable_mockModule('../../src/modules/books/book.repository.js', () => mockRepo);

const {
  getAllBooks,
  getBookByKeyword,
  addBook,
  updateBook,
  deleteBooks
} = await import('../../src/modules/books/books.service.js');

describe('Book Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBooks', () => {
    it('should return all books from repo', async () => {
      const mockBooks = [
        { name: 'Book1', image: true, imgType: 'image/png', savedPath: '/img1' },
        { name: 'Book2' }
      ];

      mockRepo.readBooks.mockResolvedValue(mockBooks);

      const result = await getAllBooks();

      expect(mockRepo.readBooks).toHaveBeenCalled();
      expect(result).toEqual(mockBooks);
    });
  });

  describe('getBookByKeyword', () => {
    it('should return books matching keyword', () => {
      const mockResult = [{ name: 'React Guide' }];

      mockRepo.getBookByKeyword.mockReturnValue(mockResult);

      const result = getBookByKeyword('react');

      expect(mockRepo.getBookByKeyword).toHaveBeenCalledWith('react');
      expect(result).toEqual(mockResult);
    });
  });

  describe('deleteBooks', () => {
    it('should call repo deleteBooks with id', () => {
      mockRepo.deleteBooks.mockReturnValue('deleted');

      const result = deleteBooks('123');

      expect(mockRepo.deleteBooks).toHaveBeenCalledWith('123');
      expect(result).toBe('deleted');
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      mockRepo.updateBook.mockResolvedValue('updated');

      const result = await updateBook('1', 'New Name', 'Author', 'Desc');

      expect(mockRepo.updateBook).toHaveBeenCalledWith('1', 'New Name', 'Author', 'Desc');
      expect(result).toBe('updated');
    });
  });

  describe('addBook', () => {
    it('should create a book with image', async () => {
      const mockResponse = { id: '1' };
      mockRepo.createBook.mockResolvedValue(mockResponse);

      const file = { path: '/file.pdf' };
      const coverFile = { data: Buffer.from('img'), contentType: 'image/png' };
      const bookInput = { name: 'Test Book', author: 'Author', description: 'Desc' };

      const result = await addBook(bookInput, file, coverFile, 'user1');

      expect(mockRepo.createBook).toHaveBeenCalled();
      const calledWith = mockRepo.createBook.mock.calls[0][0];

      expect(calledWith).toMatchObject({
        name: 'Test Book',
        author: 'Author',
        description: 'Desc',
        user: 'user1',
        filepath: '/file.pdf',
        imgType: 'image/png'
      });

      expect(calledWith.image).toEqual({ data: coverFile.data, contentType: 'image/png' });

      expect(result).toEqual(mockResponse);
    });

    it('should create a book without image', async () => {
      mockRepo.createBook.mockResolvedValue({ id: '2' });
      const file = { savedPath: '/file.pdf' };

      await addBook({ name: 'No Image', author: 'A', description: 'D' }, file, null, 'user2');

      const calledWith = mockRepo.createBook.mock.calls[0][0];

      expect(calledWith.image).toBeNull();
      expect(calledWith.imgType).toBeNull();
      expect(calledWith.filepath).toBe('/file.pdf');
    });
  });
});