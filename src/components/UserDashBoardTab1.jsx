import React, { useEffect } from "react";
import CardComponent from "../sharedComponents/CardComponent";
import { Box } from "@mui/material";

const UserDashBoardTab1 = ({
  userHandleMutation,
  orgForm,
  handlePost,
  userId,
}) => {
  useEffect(() => {
    userHandleMutation("getOrgFormData");
  }, []);
  return (
    <>
      <Box display={"flex"} flexWrap="wrap" justifyContent="flex-start" gap={2}>
        {Object.keys(orgForm).length != 0 &&
          orgForm.map((item, index) => (
            <Box key={index}>
              <CardComponent
                item={item}
                handlePost={handlePost}
                userId={userId}
              />
            </Box>
          ))}
      </Box>
    </>
  );
};

export default UserDashBoardTab1;
