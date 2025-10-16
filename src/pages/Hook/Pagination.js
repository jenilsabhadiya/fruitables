import React, { useMemo, useState } from "react";

function Pagination(fData, ItemprePage) {
  console.log(fData);

  const [cPage, setCPage] = useState(1);

  const totalPage = useMemo(
    () => Math.ceil(fData?.length / ItemprePage),
    [fData, ItemprePage]
  );
  // console.log(totalPage);

  const page = useMemo(() => Array.from({ length: totalPage }), [totalPage]);
  // console.log(page);
  // console.log(cPage);

  const handlePagination = () => {
    const startData = (cPage - 1) * ItemprePage;
    const endData = startData + ItemprePage;

    const pData = fData.slice(startData, endData);
    // console.log(pData);

    return pData;
  };

  const pdata = handlePagination();

  const handlePrev = () => {
    if (cPage > 1) {
      setCPage(cPage - 1);
    }
  };

  const handleNext = () => {
    if (cPage < totalPage) {
      setCPage(cPage + 1);
    }
  };
  return {
    pdata,
    handleNext,
    handlePrev,
    setCPage,
    page,
    cPage,
  };
}

export default Pagination;
