const API_URL = "";
const API_KEY = "";

const getData = async () => {
  const request = await fetch(`${API_URL}${API_KEY}`);
  const data = await request.json();
  
  return data;
}