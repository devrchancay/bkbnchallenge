import {
  Box,
  Button,
  Container,
  Divider,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useGetContactsQuery } from "services/contact";

import Stack from "@mui/material/Stack";

function Home() {
  const router = useRouter();
  const currentPage = parseInt(router.query.page as string, 10) || 1;

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetContactsQuery({ page: currentPage });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push(`/?page=${value}`, undefined, { shallow: true });
    setPage(value);
  };

  if (isLoading) {
    return Array.from({ length: 10 }).map((_, i) => (
      <Stack key={i} my={2} justifyContent="center" alignItems="center" px={3}>
        <Skeleton variant="rectangular" width="100%" height={118} />
      </Stack>
    ));
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="sm">
        <Stack divider={<Divider />}>
          {data.results.map((contact) => {
            return (
              <Stack key={contact.id} my={2} px={3}>
                <Stack spacing={1}>
                  <Typography>
                    {contact.firstName} {contact.lastName}
                  </Typography>
                  <Typography>{contact.email}</Typography>
                  <Typography>{contact.phone}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" py={1}>
                  <Box>
                    <Button
                      variant="contained"
                      onClick={() => {
                        router.push(`/contact/${contact.id}`);
                      }}
                    >
                      Editar
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        router.push(`/contact/delete/${contact.id}`);
                      }}
                    >
                      Eliminar
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            );
          })}
          <Stack py={3} spacing={4}>
            <Pagination
              count={data.totalPages}
              onChange={handleChange}
              size="large"
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}

export default Home;
