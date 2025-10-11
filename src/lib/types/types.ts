export interface BlogPost {
  id: string;
  title: string;
  content: string;
  tags: string[];
  shortDescription: string;
  createdAt: FirestoreTimestamp;
  bannerImageUrl: string;
  slug: string;
  claps: number;
  category: string;
}
export interface ProjectPost {
  id: string;
  title: string;
  content: string;
  tech_stacks: string[];
  shortDescription: string;
  createdAt: FirestoreTimestamp;
  bannerImageUrl: string;
  slug: string;
  claps: number;
  project_link: string;
  github_link: string;
}

export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Comment {
  fullName: string;
  email: string;
  comment: string;
  id: string | number;
  createdAt: FirestoreTimestamp;
}

export interface Experience {
  type: string;
  title: string;
  company: string;
  description: string;
  jobs: string[];
  documentLink: string;
  duration: string;
  period: string;
  website: string;
  keyResponsibilities: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  companyLogo: string;
}

export interface FIREBASE_USER {
  displayName: string;
  email: string;
}

export interface Category {
  title: string;
  id: string;
}
