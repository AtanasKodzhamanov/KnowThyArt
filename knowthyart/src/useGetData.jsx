import { useState, useEffect } from 'react';

const useGetData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();

        const sortedData = jsonData.sort((a, b) => {
          const aRatio = a.correct_answer / (a.correct_answer + a.incorrect_answer);
          const bRatio = b.correct_answer / (b.correct_answer + b.incorrect_answer);
          return bRatio - aRatio;
        });

        setData(sortedData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useGetData;
