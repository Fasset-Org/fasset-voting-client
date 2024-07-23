import React from "react";
import { useQuery } from "react-query";
import ApiQuery from "../ApiQuery";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const ResultDetailCategory = ({ categoryId }) => {
  let rows = [];

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["results", categoryId],
    queryFn: () => ApiQuery.getResults(categoryId),
    enabled: !!categoryId
  });

  if (isSuccess) {
    // console.log("Reached");
    rows = data?.votes?.map((vote) => {
      return {
        id: vote.id,
        FullName: vote.fullName,
        Position: vote.position,
        Votes: vote.Votes.length
      };
    });

    // console.log(rows);
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "FullName",
      headerName: "First Name",
      width: 150
    },
    {
      field: "Position",
      headerName: "Position",
      width: 150,
      editable: true
    },
    {
      field: "Votes",
      headerName: "Votes",
      width: 110
    }
  ];

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {rows.length > 0 && (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows.length > 0 ? rows : []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5
                }
              }
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true
              }
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </>
  );
};

export default ResultDetailCategory;
