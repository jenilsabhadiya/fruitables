import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";

function Heading({ title }) {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography
        variant="h3"
        fontSize={50}
        // color="primary"
        //    sx={{ color: theme.palette.primary.main }}
        sx={{ color: colors.primary[200] }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default Heading;
