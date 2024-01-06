import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DEV = true
const BASE_URL = DEV?"http://localhost:8000/api/":""; 

// Fetch helper function
const fetchHelper = async ({ url, method = "GET", body = null, headers = {} }) => {
  try {
    const fullUrl = `${BASE_URL}${url}`;

    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData?.msg || "Something went wrong");
      throw new Error(errorData?.msg || "Error in API request");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchHelper:", error.message);
    // throw error;
  }
};

export default fetchHelper;