const mockStatement = {
  executeAsync: jest.fn().mockResolvedValue({ lastInsertRowId: 1, changes: 1 }),
  executeSync: jest.fn().mockReturnValue({ lastInsertRowId: 1, changes: 1 }),
  finalizeAsync: jest.fn().mockResolvedValue(undefined),
};

const mockDatabase = {
  execAsync: jest.fn().mockResolvedValue(undefined),
  runAsync: jest.fn().mockResolvedValue({ lastInsertRowId: 1, changes: 1 }),
  getAllAsync: jest.fn().mockResolvedValue([]),
  getFirstAsync: jest.fn().mockResolvedValue(null),
  prepareAsync: jest.fn().mockResolvedValue(mockStatement),
  withTransactionAsync: jest.fn(async (callback) => callback()),
};

export const openDatabaseAsync = jest.fn().mockResolvedValue(mockDatabase);