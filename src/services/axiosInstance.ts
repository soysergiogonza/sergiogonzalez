import { NEXT_PUBLIC_API_URL } from '@/environments';
import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
