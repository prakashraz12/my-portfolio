/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/utils";
import { Category } from "@/lib/types/types";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const storedCategories = sessionStorage.getItem("categories");

      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
        setLoading(false);
      } else {
        try {
          const querySnapshot = await getDocs(collection(db, "categories"));
          const categoryList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Category[];

          // Store the fetched categories in session storage
          sessionStorage.setItem("categories", JSON.stringify(categoryList));

          setCategories(categoryList);
        } catch (err:any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
