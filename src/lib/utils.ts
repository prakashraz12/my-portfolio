import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { BlogPost, FirestoreTimestamp, ProjectPost } from "./types/types";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const db = getFirestore(firebase_app);
export const storage = getStorage(firebase_app);
const provider = new GoogleAuthProvider();
const auth = getAuth(firebase_app);

// slug-generator
export const slugGenerator = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export function formatTimestamp(timestamp: FirestoreTimestamp): string {
  const createdAt = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  const now = new Date();

  const elapsedSeconds = Math.floor(
    (now.getTime() - createdAt.getTime()) / 1000
  );

  let timeString: string;

  if (elapsedSeconds < 60) {
    timeString = `${elapsedSeconds} sec${elapsedSeconds !== 1 ? "s" : ""} ago`;
  } else if (elapsedSeconds < 3600) {
    const minutes = Math.floor(elapsedSeconds / 60);
    timeString = `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  } else if (elapsedSeconds < 86400) {
    const hours = Math.floor(elapsedSeconds / 3600);
    timeString = `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (elapsedSeconds < 604800) {
    // Less than a week
    const days = Math.floor(elapsedSeconds / 86400);
    timeString = `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (elapsedSeconds < 2592000) {
    // Less than a month
    const weeks = Math.floor(elapsedSeconds / 604800);
    timeString = `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (elapsedSeconds < 31536000) {
    // Less than a year
    const months = Math.floor(elapsedSeconds / 2592000);
    timeString = `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    timeString = createdAt
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .replace(/ /g, "-");
  }

  return timeString;
}

// Function to fetch paginated blog posts

export async function fetchBlogPosts(
  pageSize: number,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
) {
  const blogPostsRef = collection(db, "blogs");
  const postsQuery = lastDoc
    ? query(
        blogPostsRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(pageSize)
      )
    : query(blogPostsRef, orderBy("createdAt", "desc"), limit(pageSize));

  const querySnapshot = await getDocs(postsQuery);

  const blogPosts: BlogPost[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogPost[];

  const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { blogPosts, lastVisibleDoc };
}


// get post by slug
export const getBlogPostBySlug = async (slug: string) => {
  const projectPostsRef = collection(db, "blogs");
  const postsQuery = query(
    projectPostsRef,
    where("slug", "==", slug),
    limit(1)
  );

  const querySnapshot = await getDocs(postsQuery);

  if (!querySnapshot.empty) {
    const projectPost = querySnapshot.docs[0];
    return { id: projectPost.id, ...projectPost.data() };
  } else {
    return null;
  }
};

export const getProjectPostBySlug = async (slug: string) => {
  const projectPostsRef = collection(db, "project");
  const postsQuery = query(
    projectPostsRef,
    where("slug", "==", slug),
    limit(1)
  );

  const querySnapshot = await getDocs(postsQuery);

  if (!querySnapshot.empty) {
    const projectPost = querySnapshot.docs[0];
    return { id: projectPost.id, ...projectPost.data() };
  } else {
    return null;
  }
};

// Function to add a comment to a blog post
export const addCommentToPost = async (
  postId: string,
  commentData: { fullName: string; email: string; comment: string },
  collectionName: string
) => {
  try {
    const commentsRef = collection(db, collectionName, postId, "comments");
    const docRef = await addDoc(commentsRef, {
      ...commentData,
      createdAt: new Date(),
    });
    return { id: docRef.id, ...commentData };
  } catch (error) {
    throw new Error("Could not add comment", error as Error);
  }
};


export const fetchCommentsForPost = async (postId: string, collectionName:string) => {
  const commentsRef = collection(db, collectionName, postId, "comments");
  const commentsQuery = query(commentsRef);
  const querySnapshot = await getDocs(commentsQuery);

  const comments = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return comments;
};

export const fetchComments = async (
  postId: string,
  pageSize: number,
  lastDoc: QueryDocumentSnapshot | null = null,
  collectionName: string
) => {
  const commentsRef = collection(db, collectionName, postId, "comments");
  const commentsQuery = lastDoc
    ? query(
        commentsRef,
        orderBy("createdAt", "desc"),
        limit(pageSize),
        startAfter(lastDoc)
      )
    : query(commentsRef, orderBy("createdAt", "desc"), limit(pageSize));

  const querySnapshot = await getDocs(commentsQuery);

  const comments = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { comments, lastVisibleDoc };
};

//claps
export const incrementClaps = async (id: string, collectionName:string) => {
  const postRef = doc(db, collectionName, id);

  try {
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      console.error("Document does not exist:", id);
      return;
    }
    await updateDoc(postRef, { claps: increment(1) });
    console.log("Claps incremented successfully for:", id);
  } catch (error) {
    console.error("Error incrementing claps:", error);
  }
};
// get projects;
export async function fetchProjects(
  pageSize: number,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
) {
  const projectRef = collection(db, "project");
  const projectQuery = lastDoc
    ? query(
        projectRef,
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(pageSize)
      )
    : query(projectRef, orderBy("createdAt", "desc"), limit(pageSize));

  const querySnapshot = await getDocs(projectQuery);

  const projectPost: ProjectPost[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectPost[];

  const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

  return { projectPost, lastVisibleDoc };
}

export async function loginWithGoogle() {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    throw error;
  }
}
