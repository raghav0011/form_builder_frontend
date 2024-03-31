import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import CardComponent from '../sharedComponents/CardComponent';
import CardComponentOrg from '../sharedComponents/CardComponentOrg';

const OrgDashboardTab2 = ({ handleMutation, userFormSubmission }) => {
  useEffect(() => {
    handleMutation("getUserSubmission");
  }, []);
    return (
      <>
        <Box
          display={"flex"}
          flexWrap="wrap"
          justifyContent="flex-start"
          gap={2}>
          {Object.keys(userFormSubmission).length != 0 &&
            userFormSubmission.map((item, index) => (
              <Box key={index}>
                <CardComponentOrg
                  formName={item?.form_name}
                  userId={item?.id}
                />
              </Box>
            ))}
        </Box>
      </>
    );
};

export default OrgDashboardTab2
