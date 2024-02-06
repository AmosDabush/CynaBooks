import React from "react";
import { Pagination as MuiPagination } from "@mui/material";
interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "10px" }}
    >
      <MuiPagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
      />
    </div>
  );
};

export default Pagination;
