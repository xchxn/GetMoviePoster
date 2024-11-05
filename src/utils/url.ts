import axios from "axios";

export const fetchMovies = async (url: string): Promise<any> => {
  const response = await axios.get(url);
  return response.data;
}