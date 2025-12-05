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

  const filteredData = data.filter((v) =>
    keys.some((v1) =>
      //   item[v1]?.toString().toLowerCase().includes(debusearch.toLowerCase())
      typeof v[v1] === "string"
        ? v[v1].toLowerCase().includes(debusearch.toLowerCase())
        : v[v1].toString().includes(debusearch)
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
