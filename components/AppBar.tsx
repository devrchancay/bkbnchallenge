import MaterialAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export default function AppBar() {
  const route = useRouter();
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 4 }}>
      <MaterialAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Code Challenge
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              route.push("/contact/create");
            }}
          >
            Add Contact
          </Button>
        </Toolbar>
      </MaterialAppBar>
    </Box>
  );
}
