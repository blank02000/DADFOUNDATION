/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, query, limit, Timestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';
import { SAMPLE_EVENTS, SAMPLE_BLOGS } from '../sampleData';

interface FirebaseContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
  login: () => Promise<User>;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  logout: async () => {},
  login: async () => { throw new Error('Not implemented'); },
});

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Boostrap check for matching admin email
        const isEmailAdmin = 
          currentUser.email === 'shiyadshubh2000@gmail.com' || 
          currentUser.email?.endsWith('@dadfoundation.org');
        setIsAdmin(!!isEmailAdmin);

        // Perform first-boot hydration safely under administrative authority
        if (isEmailAdmin) {
          try {
            await hydrateCollectionsIfNeeded();
          } catch (e) {
            console.warn('Hydration skipped or handled:', e);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (e: any) {
      if (e?.code === 'auth/popup-closed-by-user' || e?.message?.includes('popup-closed-by-user')) {
        console.warn('Google sign-in popup was closed by the user.');
        return null as any;
      }
      if (e?.code === 'auth/cancelled-popup-request') {
        console.warn('Google sign-in popup request cancelled.');
        return null as any;
      }
      throw e;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  // Safe checks and inserts to initialize empty Firestore database instances
  const hydrateCollectionsIfNeeded = async () => {
    // 1. Events hydration check
    const eventsRef = collection(db, 'events');
    const eventsSnap = await getDocs(query(eventsRef, limit(1)));
    if (eventsSnap.empty) {
      console.log('Hydrating events collections in Firestore...');
      for (const ev of SAMPLE_EVENTS) {
        await setDoc(doc(db, 'events', ev.id), {
          title: ev.title,
          description: ev.description,
          date: ev.date,
          time: ev.time,
          location: ev.location,
          image: ev.image,
          category: ev.category,
          registrants: ev.registrants,
          capacity: ev.capacity,
          createdAt: Timestamp.fromDate(ev.createdAt)
        });
      }
    }

    // 2. Blogs hydration check
    const blogsRef = collection(db, 'blogs');
    const blogsSnap = await getDocs(query(blogsRef, limit(1)));
    if (blogsSnap.empty) {
      console.log('Hydrating blogs collections in Firestore...');
      for (const b of SAMPLE_BLOGS) {
        await setDoc(doc(db, 'blogs', b.id), {
          title: b.title,
          summary: b.summary,
          content: b.content,
          category: b.category,
          authorName: b.authorName,
          authorId: b.authorId,
          image: b.image,
          createdAt: Timestamp.fromDate(b.createdAt)
        });
      }
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, loading, isAdmin, logout, login }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => useContext(FirebaseContext);
