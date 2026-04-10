import { jest } from '@jest/globals';

const mockUserServices = {
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  getUserByEmail: jest.fn(),
  deleteUsers: jest.fn(),
  updateUser: jest.fn(),
  getLogs: jest.fn(),
  getAllLogs: jest.fn()
};

const mockBcrypt = {
  hash: jest.fn()
};

jest.unstable_mockModule('../../src/modules/auth/auth.services.js', () => mockUserServices);
jest.unstable_mockModule('bcrypt', () => ({ default: mockBcrypt }));

const authController = await import('../../src/modules/auth/auth.controller.js');

describe('Auth Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    jest.clearAllMocks();
    
    req = {
      params: {},
      body: {},
      file: null
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
  });

  describe('getAllUsers', () => {
    it('should return all users with 200 status', async () => {
      const mockUsers = [
        { id: 1, username: 'user1', email: 'user1@example.com' },
        { id: 2, username: 'user2', email: 'user2@example.com' }
      ];
      mockUserServices.getAllUsers.mockResolvedValue(mockUsers);

      await authController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle empty user list', async () => {
      mockUserServices.getAllUsers.mockResolvedValue([]);

      await authController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle service errors gracefully', async () => {
      const error = new Error('Database error');
      mockUserServices.getAllUsers.mockRejectedValue(error);

      await expect(authController.getAllUsers(req, res)).rejects.toThrow('Database error');
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
      req.params.id = 1;
      mockUserServices.getUserById.mockResolvedValue(mockUser);

      await authController.getUserById(req, res);

      expect(mockUserServices.getUserById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should handle string ID parameter', async () => {
      const mockUser = { id: 1, username: 'testuser', email: 'test@example.com' };
      req.params.id = '1';
      mockUserServices.getUserById.mockResolvedValue(mockUser);

      await authController.getUserById(req, res);

      expect(mockUserServices.getUserById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return null when user not found', async () => {
      req.params.id = 999;
      mockUserServices.getUserById.mockResolvedValue(null);

      await authController.getUserById(req, res);

      expect(res.json).toHaveBeenCalledWith(null);
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user when email exists', async () => {
      const mockUser = { id: 1, email: 'test@example.com', username: 'testuser' };
      req.body.email = 'test@example.com';
      mockUserServices.getUserByEmail.mockResolvedValue(mockUser);

      await authController.getUserByEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 when user does not exist', async () => {
      req.body.email = 'nonexistent@example.com';
      mockUserServices.getUserByEmail.mockResolvedValue(null);

      await authController.getUserByEmail(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    it('should handle email lookup correctly', async () => {
      const email = 'user@example.co.uk';
      const mockUser = { id: 1, email: email, username: 'testuser' };
      req.body.email = email;
      mockUserServices.getUserByEmail.mockResolvedValue(mockUser);

      await authController.getUserByEmail(req, res);

      expect(mockUserServices.getUserByEmail).toHaveBeenCalledWith(email);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('deleteUsers', () => {
    it('should delete a user and return 200 status', async () => {
      req.params.id = 1;
      mockUserServices.deleteUsers.mockResolvedValue(true);

      await authController.deleteUsers(req, res);

      expect(mockUserServices.deleteUsers).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 404 when deletion fails', async () => {
      req.params.id = 999;
      mockUserServices.deleteUsers.mockResolvedValue(false);

      await authController.deleteUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Could not delete any users'
      });
    });

    it('should handle falsy deletion response', async () => {
      req.params.id = 1;
      mockUserServices.deleteUsers.mockResolvedValue(null);

      await authController.deleteUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('updateUser', () => {
    it('should update a user with valid email and password', async () => {
      // Reset mocks
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      const hashedPassword = 'hashedpassword123';
      mockBcrypt.hash.mockResolvedValue(hashedPassword);

      req.body = {
        id: 1,
        email: 'updated@example.com',
        username: 'updateduser',
        password: 'NewPassword123!',
        confirmPassword: 'NewPassword123!'
      };

      const updatedUser = { id: 1, email: 'updated@example.com', username: 'updateduser' };
      mockUserServices.updateUser.mockResolvedValue(updatedUser);

      await authController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Update successful',
        user: updatedUser
      });
    });

    it('should reject invalid email format', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      req.body = {
        id: 1,
        email: 'invalid-email',
        username: 'updateduser',
        password: '',
        confirmPassword: ''
      };

      await authController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid email format'
      });
    });

    it('should reject invalid password format', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      req.body = {
        id: 1,
        email: 'test@example.com',
        username: 'updateduser',
        password: 'short',
        confirmPassword: 'short'
      };

      await authController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Invalid password format'
      });
    });

    it('should reject mismatched passwords', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      req.body = {
        id: 1,
        email: 'test@example.com',
        username: 'updateduser',
        password: 'ValidPassword123!',
        confirmPassword: 'DifferentPassword123!'
      };

      await authController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Passwords do not match'
      });
    });

    it('should update user without password when password is empty', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      req.body = {
        id: 1,
        email: 'updated@example.com',
        username: 'updateduser',
        password: '',
        confirmPassword: ''
      };

      const updatedUser = { id: 1, email: 'updated@example.com', username: 'updateduser' };
      mockUserServices.updateUser.mockResolvedValue(updatedUser);

      await authController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(mockUserServices.updateUser).toHaveBeenCalledWith(
        1,
        'updated@example.com',
        'updateduser',
        '',
        null,
        null
      );
    });

    it('should handle file upload with update', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      const mockBuffer = Buffer.from('image data');
      req.file = {
        buffer: mockBuffer,
        mimetype: 'image/png'
      };

      req.body = {
        id: 1,
        email: 'updated@example.com',
        username: 'updateduser',
        password: '',
        confirmPassword: ''
      };

      const updatedUser = { id: 1, email: 'updated@example.com', username: 'updateduser' };
      mockUserServices.updateUser.mockResolvedValue(updatedUser);

      await authController.updateUser(req, res);

      expect(mockUserServices.updateUser).toHaveBeenCalledWith(
        1,
        'updated@example.com',
        'updateduser',
        '',
        mockBuffer,
        'image/png'
      );
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should hash password when provided', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      const hashedPassword = 'hashedpassword123';
      mockBcrypt.hash.mockResolvedValue(hashedPassword);

      req.body = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        password: 'ValidPassword123!',
        confirmPassword: 'ValidPassword123!'
      };

      const updatedUser = { id: 1, email: 'test@example.com', username: 'testuser' };
      mockUserServices.updateUser.mockResolvedValue(updatedUser);

      await authController.updateUser(req, res);

      expect(mockBcrypt.hash).toHaveBeenCalledWith('ValidPassword123!', 10);
      expect(mockUserServices.updateUser).toHaveBeenCalledWith(
        1,
        'test@example.com',
        'testuser',
        hashedPassword,
        null,
        null
      );
    });
  });

  describe('getLogs', () => {
    it('should return logs for a search type', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      const mockLogs = [
        { id: 1, type: 'login', message: 'User logged in' },
        { id: 2, type: 'login', message: 'User logged in' }
      ];
      req.params.search = 'login';
      mockUserServices.getLogs.mockResolvedValue(mockLogs);

      await authController.getLogs(req, res);

      expect(mockUserServices.getLogs).toHaveBeenCalledWith('login');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockLogs);
    });

    it('should return 400 when no logs found', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      req.params.search = 'nonexistent';
      mockUserServices.getLogs.mockResolvedValue(null);

      await authController.getLogs(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'No Logs found' });
    });

    it('should return 400 when service throws error', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      const error = new Error('Database error');
      req.params.search = 'login';
      mockUserServices.getLogs.mockRejectedValue(error);

      await authController.getLogs(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
    });

    it('should handle empty logs array gracefully', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      req.params.search = 'login';
      mockUserServices.getLogs.mockResolvedValue([]);

      await authController.getLogs(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe('getAllLogs', () => {
    it('should return all logs with 200 status', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      const mockLogs = [
        { id: 1, type: 'login', message: 'User logged in' },
        { id: 2, type: 'logout', message: 'User logged out' },
        { id: 3, type: 'error', message: 'Error occurred' }
      ];
      mockUserServices.getAllLogs.mockResolvedValue(mockLogs);

      await authController.getAllLogs(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockLogs);
    });

    it('should return 400 when no logs found', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      mockUserServices.getAllLogs.mockResolvedValue(null);

      await authController.getAllLogs(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'No Logs found' });
    });

    it('should return 400 when service throws error', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      const error = new Error('Failed to retrieve logs');
      mockUserServices.getAllLogs.mockRejectedValue(error);

      await authController.getAllLogs(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to retrieve logs' });
    });

    it('should handle empty logs array', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      mockUserServices.getAllLogs.mockResolvedValue([]);

      await authController.getAllLogs(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('should handle large datasets of logs', async () => {
      res.status = jest.fn().mockReturnThis();
      res.json = jest.fn().mockReturnThis();

      const mockLogs = Array.from({ length: 500 }, (_, i) => ({
        id: i + 1,
        type: 'log',
        message: `Log entry ${i + 1}`
      }));
      mockUserServices.getAllLogs.mockResolvedValue(mockLogs);

      await authController.getAllLogs(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockLogs);
      expect(res.json.mock.calls[0][0]).toHaveLength(500);
    });
  });
});
