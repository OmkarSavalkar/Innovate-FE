import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const PendingList = (props: any) => {
  const { pendingData, approvedData, setDirectExpertOpen } = props;
  const [newListData, setNewListData] = useState<any>([]);
  const [showNoData, setShowNoData] = useState<boolean>(false);
  useEffect(() => {
    if (pendingData?.length == 0 && approvedData?.length == 0) {
      setShowNoData(true);
    }
    pendingData?.length > 0
      ? setNewListData(pendingData)
      : setNewListData(approvedData);
  }, [approvedData, pendingData]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          {showNoData
            ? "Expert List"
            : pendingData?.length > 0
            ? "Pending Expert List"
            : "Approved Expert List"}
        </Typography>
      </Box>
      <Grid
        container
        p={2}
        spacing={1}
        sx={{ height: "200px", overflow: "auto" }}
      >
        {!showNoData ? (
          newListData &&
          newListData?.map((item: any, index: number) => {
            return (
              <>
                <Grid item md={12} key={index}>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => setDirectExpertOpen(index)}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ padding: "2px 0px", fontWeight: "bold" }}
                    >
                      {item?.fullName}
                    </Typography>
                  </Card>
                </Grid>
              </>
            );
          })
        ) : (
          <>
            <h5>No Pending or Approved Expert</h5>
          </>
        )}
      </Grid>
    </>
  );
};
export default PendingList;
