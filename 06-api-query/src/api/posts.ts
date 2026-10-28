import { API_PAGE_SIZE } from '@/constants/api';
import { postSchema, postsSchema } from '@/schemas/post';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error('EXPO_PUBLIC_API_URL이 설정되지 않았어요');
}

export const fetchPosts = async (page: number) => {
  const res = await fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=${API_PAGE_SIZE}`,
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return postsSchema.parse(json);
};

export const fetchPost = async (id: number) => {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return postSchema.parse(json);
};
