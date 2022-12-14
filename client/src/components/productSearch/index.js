import React, { Fragment, useState } from "react";
import PageLayout from "../panel/layout/PageLayout";
import { HistoryTable } from "./HistoryTable";
import ProductDetails from "./ProductDetails";
import SearchForm from "./SearchForm";
import Timeline from "./timeline/Timeline";

const SearchProduct = () => {
  const [history, setHistory] = useState(null);
  return (
    <PageLayout page="Sipariş Akışı Sorgula">
      <SearchForm setHistory={setHistory} />
      {history && history.length > 0 && (
        <Fragment>
          <ProductDetails product={history[0]} />
          <Timeline items={history} />
          <HistoryTable history={history} />
        </Fragment>
      )}
    </PageLayout>
  );
};

export default SearchProduct;
