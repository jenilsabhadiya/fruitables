import React, { useEffect, useState } from "react";

function useSearch(data, keys) {
  const [search, setSearch] = useState("");
  const [debusearch, setDeduSearch] = useState("");

  useEffect(() => {
    const time = setTimeout(() => {
      setDeduSearch(search);
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [search]);

  const filteredData = data.filter((item) =>
    keys.some((key) =>
      item[key]?.toString().toLowerCase().includes(debusearch.toLowerCase())
    )
  );

  //   let filteredData = data.filter(
  //     (v) =>
  //       v.name.toLowerCase().includes(search.toLowerCase()) ||
  //       v.description.toLowerCase().includes(search.toLowerCase()) ||
  //       v.price.toString().includes(search)
  //   );

  return {
    setSearch,
    filteredData,
  };
}

export default useSearch;
