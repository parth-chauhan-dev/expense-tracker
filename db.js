const indexedDb =
  window.indexedDB ||
  window.mozIndexedDb ||
  window.webkitIndexedDb ||
  window.msIndexedDb ||
  window.shimIndexedDb;

const request = indexedDb.open("ExpenseTrackerDb", 1);

request.onerror = function (event) {
  console.log("An error occured with DB", event);
};

request.onupgradeneeded = function () {
  const db = request.result;
  const store = db.createObjectStore("transactions", { keyPath: "id" });
  store.createIndex("transaction_description", ["description"], {
    unique: true,
  });
  store.createIndex(
    "transaction_description_and_date",
    ["description", "date"],
    { unique: true }
  );
};

request.onsuccess = function () {
  const db = request.result;
  const transaction = db.transaction("transactions", "readwrite");
  const store = transaction.objectStore("transactions");
  const descriptionAndDateIndex = store.index(
    "transaction_description_and_date"
  );

  //store.put({id:1, description: 'food', date: new Date()})
  const getAllTransaction = store.getAll();

  getAllTransaction.onsuccess = function () {
    return getAllTransaction.result;
  };

  transaction.oncomplete = function () {
    db.close();
  };
};
