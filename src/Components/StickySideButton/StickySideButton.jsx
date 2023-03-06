import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const StickySideButton = ({ children, onClick }) => {
  return (
    <Box
      sx={{
        // vertically center
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        // position
        position: "fixed",
        top: "45%",
        zIndex: "1000",
        left: "-0.8rem",

        "&:hover": {
          left: "-0.3rem",
        },
      }}
    >
      <Button
        onClick={onClick}
        variant="contained"
        sx={{
          backgroundColor: "#343434",
          borderRadius: "0",
          borderBottomRightRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
          padding: "0.8rem",

          "&:hover, &:focus, &.Mui-focusVisible": {
            backgroundColor: "#343434",
          },
        }}
      >
        {children}
      </Button>
    </Box>
  );
};

export default StickySideButton;
