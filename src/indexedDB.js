import { openDB } from 'idb';

const dbPromise = openDB('tax-regime-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('tax-regimes')) {
      db.createObjectStore('tax-regimes', { keyPath: 'id', autoIncrement: true });
    }
  },
});

export const addTaxRegime = async (regime) => {
  const db = await dbPromise;
  await db.add('tax-regimes', regime);
};

export const getAllTaxRegimes = async () => {
  const db = await dbPromise;
  return await db.getAll('tax-regimes');
};

export const deleteTaxRegime = async (id) => {
  const db = await dbPromise;
  await db.delete('tax-regimes', id);
};
