import { Skeleton, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import ContactForm from "forms/contact";
import { useRouter } from "next/router";
import { useGetContactQuery } from "services/contact";
import { FormAction } from "types";

function Contact() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, isLoading, isError } = useGetContactQuery({ id });

  if (isLoading) {
    return (
      <Container maxWidth="sm">
        <Stack justifyContent="center" height="100vh">
          <Skeleton height={40} width="100%" />
          <Skeleton height={40} width="100%" />
          <Skeleton height={40} width="100%" />
          <Skeleton height={40} width="100%" />
        </Stack>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="sm">
        <Typography textAlign="center">Contacto no encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <ContactForm {...data} action={FormAction.Edit} />
    </Container>
  );
}

export default Contact;
