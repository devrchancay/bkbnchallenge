import { Container } from "@mui/system";
import ContactForm from "forms/contact";
import { FormAction } from "types";

function Create() {
  return (
    <Container>
      <ContactForm action={FormAction.Add} />
    </Container>
  );
}

export default Create;
