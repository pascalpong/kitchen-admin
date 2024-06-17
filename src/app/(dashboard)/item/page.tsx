"use client";

import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { useCreateItemsMutation, useGetItemsQuery } from "@/api/ItemService";
import CreateItems from "./CreateItems";
import { useGetCategoriesQuery } from "@/api/CategoryService";

const headCells = [
  {
    name: "name",
    label: "Full name",
  },
  {
    name: "User.name",
    label: "Created by",
  },
];

const UserTable = () => {
  const { data: itemList, refetch } = useGetItemsQuery({});
  const { data: categoryList } = useGetCategoriesQuery({});
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [path, setPath] = useState("table");
  const [refetchData, setRefetchData] = useState<boolean>(false);
  const [valueList, setValueList] = useState<string[]>([]);
  const [createItems] = useCreateItemsMutation();
  const [toClear, setToClear] = useState<boolean>(false);

  useEffect(() => {
    if (refetchData) {
      refetch();
      setRefetchData(false);
    }
  }, [refetchData]);

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

  const toCreateCategories = async (items: any[]) => {
    console.log(items);
    // const categories = await createItems({ names });
    // if (categories.data.success) {
    //   setToClear(true);
    //   refetch();
    // }
  };

  useEffect(() => {
    if (valueList.length > 0) {
      toCreateCategories(valueList);
    }
  }, [valueList]);

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
            categories={categories}
          />
        </Box>
        <Box>
          {path === "table" && (
            <DataTable data={categories} headCells={headCells} />
          )}
        </Box>
      </Paper>
    </>
  );
};

export default UserTable;
