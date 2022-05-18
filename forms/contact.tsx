import { Button, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { FormAction } from "types";

function ContactForm({
  email = "",
  firstName = "",
  lastName = "",
  phone = "",
  id = "",
  action = FormAction.Add,
}) {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    if (action === FormAction.Add) {
      console.log(data);
    }
    if (action === FormAction.Edit) {
      console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} mt={2}>
        <Controller
          name="firstName"
          control={control}
          defaultValue={firstName}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label="First Name" />}
        />

        <Controller
          name="lastName"
          control={control}
          defaultValue={lastName}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label="Last Name" />}
        />

        <Controller
          name="email"
          control={control}
          defaultValue={email}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label="Email" />}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue={phone}
          rules={{ required: true }}
          render={({ field }) => <TextField {...field} label="Phone" />}
        />

        <Button type="submit" variant="outlined">
          Editar
        </Button>
      </Stack>
    </form>
  );
}

export default ContactForm;
