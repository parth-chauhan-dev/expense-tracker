import { useCallback, useEffect, useState } from "react";

const Database = {
  name: "expense_tracker",
  version: 1,
  transactionTable: "transactions-table",
};

export const useIndexedDb = (databaseName, tableNames) => {
  const [db, setDb] = useState(null);
  const [isDbConnecting, setIsDbConnecting] = useState(true);

  useEffect(() => {
    const initDb = () => {
      const request = indexedDB.open(databaseName, Database.version);

      request.onupgradeneeded = function () {
        const database = request.result;
        tableNames.forEach((tableName) => {
          if (!database.objectStoreNames.contains(tableName)) {
            database.createObjectStore(tableName, {
              autoIncrement: true,
              keyPath: "id",
            });
          }
        });
      };

      request.onsuccess = () => {
        setDb(request.result);
        setIsDbConnecting(false);
      };

      request.onerror = () => {
        console.error("Failed to connect to DB");
        setIsDbConnecting(false);
      };
    };

    if (!db) {
      initDb();
    }
  }, [databaseName, tableNames, db]);

  const getTransaction = (tableName, mode) => {
    if (!db) {
      throw new Error("Database is not initialized");
    }
    return db.transaction(tableName, mode).objectStore(tableName);
  };

  const putValue = (tableName, value) => {
    return new Promise((resolve, reject) => {
      try {
        const store = getTransaction(tableName, "readwrite");
        const request = store.put(value);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      } catch (err) {
        reject(err);
      }
    });
  };

  const getValue = useCallback(
    (tableName, id) => {
      return new Promise((resolve, reject) => {
        try {
          const store = getTransaction(tableName, "readwrite");
          const request = store.get(id);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        } catch (err) {
          reject(err);
        }
      });
    },
    [db]
  );

  const getAllValue = useCallback(
    (tableName) => {
      return new Promise((resolve, reject) => {
        try {
          const store = getTransaction(tableName, "readwrite");
          const request = store.getAll();
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        } catch (err) {
          reject(err);
        }
      });
    },
    [db]
  );

  return {
    isDbConnecting,
    putValue,
    getValue,
    getAllValue,
  };
};
