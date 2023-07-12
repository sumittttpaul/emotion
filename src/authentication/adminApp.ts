'use server';

import * as admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

export const verfyIdToken = async (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  }
  return await admin.auth().verifyIdToken(token);
};
