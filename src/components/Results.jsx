import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  LinearProgress,
  Stack
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import ApiQuery from "../ApiQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ResultDetailCategory from "./ResultDetailCategory";

const Results = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return ApiQuery.getAllCategories();
    }
  });

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Stack spacing={2}>
      {data?.categories?.map((category) => {
        return (
          <Accordion key={category.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {category.category}
            </AccordionSummary>
            <AccordionDetails>
              {category?.id && (
                <ResultDetailCategory categoryId={category.id} />
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Stack>
  );
};

export default Results;
