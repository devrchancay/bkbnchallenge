import { Button, Stack, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useRouter } from "next/router";
import { useDeleteContactMutation, useGetContactQuery } from "services/contact";

function Delete() {
  const route = useRouter();
  const id = route.query.id as string;

  const { data, isLoading, isError } = useGetContactQuery({ id });
  const [deletePost, { isLoading: isDeleting }] = useDeleteContactMutation();

  if (isLoading) {
    return null;
  }

  if (isError) {
    return (
      <Container maxWidth="sm">
        <Typography>Contacto no encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Stack height="100vh" justifyContent="center" alignItems="center">
        <Typography>
          Esta seguro de eliminar a {data.firstName} {data.lastName} ?
        </Typography>
        <Stack direction="row">
          <Box mr={1} py={2}>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                deletePost({ id });
                route.push("/");
              }}
            >
              Si eliminar
            </Button>
          </Box>
          <Box mr={1} py={2}>
            <Button
              variant="text"
              onClick={() => {
                route.back();
              }}
            >
              Cancelar
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Delete;
