"use client";

import { Box, Paper } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import DataTable from "./DataTable";
import { useCreateItemsMutation, useGetItemsQuery } from "@/api/ItemService";
import CreateItems from "./CreateItems";
import { useGetCategoriesQuery } from "@/api/CategoryService";
import withAuth from "@/hoc/withAuth";

const headCells = [
  {
    name: "name",
    label: "Full name",
  },
  {
    name: "price",
    label: "Price",
  },
  {
    name: "Category.name",
    label: "Category",
  },
  {
    name: "image",
    label: "Image",
  },
];

const UserTable = () => {
  const { data: itemList, refetch } = useGetItemsQuery({});
  const { data: categoryList } = useGetCategoriesQuery({});
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [path, setPath] = useState("table");
  const [refetchData, setRefetchData] = useState<boolean>(false);
  const [valueList, setValueList] = useState<any>();
  const [createItems] = useCreateItemsMutation();
  const [toClear, setToClear] = useState<boolean>(false);

  const toCreateCategories = useCallback(async (items: any[]) => { 
    const itemList = await createItems({ items });
    console.log(itemList)
  }, [createItems]);

  useEffect(() => {
    if (refetchData) {
      refetch();
      setRefetchData(false);
    }
  }, [refetchData, refetch]);

  useEffect(() => {
    if (categoryList) {
      const data = categoryList.data;
      setCategories(data);
    }
  }, [categoryList]);

  useEffect(() => {
    if (itemList) {
      const data = itemList.data;
      setItems(data);
    }
  }, [itemList]);

  useEffect(() => {
    if (valueList) {
      toCreateCategories(valueList);
    }
  }, [valueList, toCreateCategories]);

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
        }}
      >
        <Box py={1}>
          <CreateItems
            valueList={setValueList}
            toClear={toClear}
            setToClear={setToClear}
            categoryList={categories}
          />
        </Box>
        <Box>
          {path === "table" && (
            <DataTable data={items} headCells={headCells} />
          )}
        </Box>
      </Paper>
    </>
  );
};

export default withAuth(UserTable);