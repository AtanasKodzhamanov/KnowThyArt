import { useState } from 'react';

const useUpdateData = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [isError, setIsError] = useState(false);

  const executePatch = async (patchUrl, patchData) => {

    try {
      const response = await fetch(patchUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  };

  return {executePatch };
};

export default useUpdateData;
