import { firebaseFirestore } from '@domain/_connections/firebase';

export const generateIdFirestore = (collectionName: string) => {
  return firebaseFirestore
    .collection(collectionName)
    .doc().id;
};
