import { jest } from '@jest/globals';

const mockRepository = {
  getAllUsers: jest.fn(),
  getUser: jest.fn(),
  getUserById: jest.fn(),
  deleteUsers: jest.fn(),
  updateUser: jest.fn(),
  getLogs: jest.fn(),
  getAllLogs: jest.fn()
};

jest.unstable_mockModule('../../src/modules/auth/auth.repository.js', () => mockRepository);

const authService = await import('../../src/modules/auth/auth.services.js');

describe('Auth Service', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users from the repository', () => {
      const mockUsers = [
        { id: 1, email: 'user1@example.com', username: 'user1' },
        { id: 2, email: 'user2@example.com', username: 'user2' }
      ];
      mockRepository.getAllUsers.mockReturnValue(mockUsers);

      const result = authService.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(mockRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no users exist', () => {
      mockRepository.getAllUsers.mockReturnValue([]);

      const result = authService.getAllUsers();

      expect(result).toEqual([]);
      expect(mockRepository.getAllUsers).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user when email exists', () => {
      const mockUser = { id: 1, email: 'test@example.com', username: 'testuser' };
      mockRepository.getUser.mockReturnValue(mockUser);

      const result = authService.getUserByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockRepository.getUser).toHaveBeenCalledWith('test@example.com');
      expect(mockRepository.getUser).toHaveBeenCalledTimes(1);
    });

    it('should return null when user does not exist', () => {
      mockRepository.getUser.mockReturnValue(null);

      const result = authService.getUserByEmail('nonexistent@example.com');

      expect(result).toBeNull();
      expect(mockRepository.getUser).toHaveBeenCalledWith('nonexistent@example.com');
      expect(mockRepository.getUser).toHaveBeenCalledTimes(1);
    });

    it('should return null when user is undefined', () => {
      mockRepository.getUser.mockReturnValue(undefined);

      const result = authService.getUserByEmail('test@example.com');

      expect(result).toBeNull();
      expect(mockRepository.getUser).toHaveBeenCalledTimes(1);
    });

    it('should handle email with special characters', () => {
      const email = 'user+tag@example.co.uk';
      const mockUser = { id: 1, email: email, username: 'testuser' };
      mockRepository.getUser.mockReturnValue(mockUser);

      const result = authService.getUserByEmail(email);

      expect(result).toEqual(mockUser);
      expect(mockRepository.getUser).toHaveBeenCalledWith(email);
    });
  });

  describe('getUserById', () => {
    it('should return a user when id exists', () => {
      const mockUser = { id: 1, email: 'test@example.com', username: 'testuser' };
      mockRepository.getUserById.mockReturnValue(mockUser);

      const result = authService.getUserById(1);

      expect(result).toEqual(mockUser);
      expect(mockRepository.getUserById).toHaveBeenCalledWith(1);
      expect(mockRepository.getUserById).toHaveBeenCalledTimes(1);
    });

    it('should return null when user does not exist', () => {
      mockRepository.getUserById.mockReturnValue(null);

      const result = authService.getUserById(999);

      expect(result).toBeNull();
      expect(mockRepository.getUserById).toHaveBeenCalledWith(999);
    });

    it('should handle string id by passing it to repository', () => {
      const mockUser = { id: 1, email: 'test@example.com', username: 'testuser' };
      mockRepository.getUserById.mockReturnValue(mockUser);

      const result = authService.getUserById('1');

      expect(result).toEqual(mockUser);
      expect(mockRepository.getUserById).toHaveBeenCalledWith('1');
    });
  });

  describe('deleteUsers', () => {
    it('should delete a user and return the result', () => {
      mockRepository.deleteUsers.mockReturnValue(true);

      const result = authService.deleteUsers(1);

      expect(result).toBe(true);
      expect(mockRepository.deleteUsers).toHaveBeenCalledWith(1);
      expect(mockRepository.deleteUsers).toHaveBeenCalledTimes(1);
    });

    it('should return false when user deletion fails', () => {
      mockRepository.deleteUsers.mockReturnValue(false);

      const result = authService.deleteUsers(999);

      expect(result).toBe(false);
      expect(mockRepository.deleteUsers).toHaveBeenCalledWith(999);
    });

    it('should handle deletion result of 0 or affected rows', () => {
      mockRepository.deleteUsers.mockReturnValue({ affectedRows: 1 });

      const result = authService.deleteUsers(1);

      expect(result).toEqual({ affectedRows: 1 });
      expect(mockRepository.deleteUsers).toHaveBeenCalledWith(1);
    });
  });

  describe('updateUser', () => {
    it('should update a user with all parameters', async () => {
      const updateResult = { id: 1, email: 'updated@example.com', username: 'updated' };
      mockRepository.updateUser.mockResolvedValue(updateResult);

      const avatarBuffer = Buffer.from('test');
      const result = await authService.updateUser(
        1,
        'updated@example.com',
        'updated',
        'newpassword',
        avatarBuffer,
        'image/png'
      );

      expect(result).toEqual(updateResult);
      expect(mockRepository.updateUser).toHaveBeenCalledWith(
        1,
        'updated@example.com',
        'updated',
        'newpassword',
        avatarBuffer,
        'image/png'
      );
      expect(mockRepository.updateUser).toHaveBeenCalledTimes(1);
    });

    it('should handle update without avatar', async () => {
      const updateResult = { id: 1, email: 'updated@example.com', username: 'updated' };
      mockRepository.updateUser.mockResolvedValue(updateResult);

      const result = await authService.updateUser(
        1,
        'updated@example.com',
        'updated',
        'newpassword',
        null,
        null
      );

      expect(result).toEqual(updateResult);
      expect(mockRepository.updateUser).toHaveBeenCalledWith(1, 'updated@example.com', 'updated', 'newpassword', null, null);
    });

    it('should reject with error when update fails', async () => {
      const error = new Error('Database error');
      mockRepository.updateUser.mockRejectedValue(error);

      await expect(
        authService.updateUser(1, 'test@example.com', 'test', 'password', null, null)
      ).rejects.toThrow('Database error');
    });

    it('should handle partial updates', async () => {
      const updateResult = { id: 1, email: 'test@example.com', username: 'newusername' };
      mockRepository.updateUser.mockResolvedValue(updateResult);

      const result = await authService.updateUser(1, null, 'newusername', null, null, null);

      expect(result).toEqual(updateResult);
      expect(mockRepository.updateUser).toHaveBeenCalledWith(1, null, 'newusername', null, null, null);
    });
  });

  describe('getLogs', () => {
    it('should return logs of specified type', async () => {
      const mockLogs = [
        { id: 1, type: 'login', timestamp: '2024-01-01', message: 'User logged in' },
        { id: 2, type: 'login', timestamp: '2024-01-02', message: 'User logged in' }
      ];
      mockRepository.getLogs.mockResolvedValue(mockLogs);

      const result = await authService.getLogs('login');

      expect(result).toEqual(mockLogs);
      expect(mockRepository.getLogs).toHaveBeenCalledWith('login');
      expect(mockRepository.getLogs).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no logs exist for type', async () => {
      mockRepository.getLogs.mockResolvedValue([]);

      const result = await authService.getLogs('nonexistent');

      expect(result).toEqual([]);
      expect(mockRepository.getLogs).toHaveBeenCalledWith('nonexistent');
    });

    it('should reject with error when database query fails', async () => {
      const error = new Error('Database query error');
      mockRepository.getLogs.mockRejectedValue(error);

      await expect(authService.getLogs('login')).rejects.toThrow('Database query error');
    });

    it('should handle different log types', async () => {
      const logTypes = ['login', 'logout', 'error', 'update'];
      
      for (const logType of logTypes) {
        mockRepository.getLogs.mockResolvedValue([{ type: logType }]);
        const result = await authService.getLogs(logType);
        expect(result).toEqual([{ type: logType }]);
        expect(mockRepository.getLogs).toHaveBeenCalledWith(logType);
      }
    });
  });

  describe('getAllLogs', () => {
    it('should return all logs', async () => {
      const mockLogs = [
        { id: 1, type: 'login', timestamp: '2024-01-01', message: 'User logged in' },
        { id: 2, type: 'logout', timestamp: '2024-01-02', message: 'User logged out' },
        { id: 3, type: 'error', timestamp: '2024-01-03', message: 'Error occurred' }
      ];
      mockRepository.getAllLogs.mockResolvedValue(mockLogs);

      const result = await authService.getAllLogs();

      expect(result).toEqual(mockLogs);
      expect(mockRepository.getAllLogs).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no logs exist', async () => {
      mockRepository.getAllLogs.mockResolvedValue([]);

      const result = await authService.getAllLogs();

      expect(result).toEqual([]);
      expect(mockRepository.getAllLogs).toHaveBeenCalledTimes(1);
    });

    it('should reject with error when database query fails', async () => {
      const error = new Error('Failed to retrieve logs');
      mockRepository.getAllLogs.mockRejectedValue(error);

      await expect(authService.getAllLogs()).rejects.toThrow('Failed to retrieve logs');
    });

    it('should handle large datasets of logs', async () => {
      const mockLogs = Array.from({ length: 1000 }, (_, i) => ({
        id: i + 1,
        type: 'log',
        timestamp: new Date().toISOString(),
        message: `Log entry ${i + 1}`
      }));
      mockRepository.getAllLogs.mockResolvedValue(mockLogs);

      const result = await authService.getAllLogs();

      expect(result).toHaveLength(1000);
      expect(result[0]).toEqual(mockLogs[0]);
      expect(result[999]).toEqual(mockLogs[999]);
    });
  });
});
