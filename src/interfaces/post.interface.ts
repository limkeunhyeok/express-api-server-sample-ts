export interface Post {
  _id: string;
  userId: string;
  categoryId: string;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}