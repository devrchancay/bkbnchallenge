import {
  Button,
  Stack,
  TextField,
  Alert,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

import { useForm, Controller } from "react-hook-form";
import {
  useAddContactMutation,
  useUpdateContactMutation,
} from "services/contact";
import { FormAction } from "types";

function ContactForm({
  email = "",
  firstName = "",
  lastName = "",
  phone = "",
  id = "",
  action = FormAction.Add,
}) {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [
    updateContact,
    {
      isLoading: isUpdating,
      isSuccess: isUpdated,
      isError: isUpdateError,
      error,
    },
  ] = useUpdateContactMutation();

  const [
    createContact,
    {
      isLoading: isCreating,
      isSuccess: isCreated,
      isError: isCreatedError,
      error: createErrors,
    },
  ] = useAddContactMutation();

  const formEdit = action === FormAction.Edit;
  const formAdd = action === FormAction.Add;

  const updateError: any = error;
  const createError: any = createErrors;

  const onSubmit = (data) => {
    if (formAdd) {
      createContact({ ...data });
    }
    if (formEdit) {
      updateContact({
        id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      });
    }
  };

  const isLoading = isUpdating || isCreating;

  const label = isLoading ? "" : formEdit ? "Actualizar" : "Agregar";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formEdit && isUpdated && (
        <Stack spacing={2} py={2}>
          <Alert severity="success">Contacto actualizado correctamente</Alert>
        </Stack>
      )}

      <Stack spacing={2} mt={2}>
        <Controller
          name="firstName"
          control={control}
          defaultValue={firstName}
          rules={{ required: "El nombre es un campo obligatorio" }}
          render={({ field, formState }) => (
            <TextField
              {...field}
              disabled={isLoading}
              error={!!formState.errors.firstName}
              helperText={formState?.errors?.firstName?.message}
              label="First Name"
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          defaultValue={lastName}
          rules={{ required: "El apellido es un campo obligatorio" }}
          render={({ field, formState }) => (
            <TextField
              {...field}
              disabled={isLoading}
              error={!!formState.errors.lastName}
              helperText={formState?.errors?.lastName?.message}
              label="Last Name"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue={email}
          rules={{ required: "El email es un campo obligatorio" }}
          render={({ field, formState }) => (
            <TextField
              {...field}
              disabled={isLoading}
              error={!!formState.errors.email}
              helperText={formState?.errors?.email?.message}
              label="Email"
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue={phone}
          rules={{
            required: "El telefono es un campo obligatorio",
          }}
          render={({ field, formState }) => (
            <TextField
              {...field}
              disabled={isLoading}
              error={!!formState.errors.phone}
              helperText={formState?.errors?.phone?.message}
              label="Phone"
            />
          )}
        />
        {isUpdateError && (
          <Stack spacing={2} mt={2}>
            <Alert severity="error">
              {updateError?.data?.data?.errors &&
                Object.values(updateError?.data?.data?.errors).map((error) => (
                  <Typography>{`${error}`}</Typography>
                ))}
            </Alert>
          </Stack>
        )}

        {isCreatedError && (
          <Stack spacing={2} mt={2}>
            <Alert severity="error">
              {createError?.data?.data?.errors &&
                Object.values(createError?.data?.data?.errors).map((error) => (
                  <Typography>{`${error}`}</Typography>
                ))}
            </Alert>
          </Stack>
        )}

        {isCreated && (
          <Stack spacing={2} mt={2}>
            <Alert severity="success">Contacto agregado correctamente</Alert>
          </Stack>
        )}

        <Button type="submit" variant="outlined" disabled={isUpdating}>
          {label}
          {isLoading && <CircularProgress size={20} />}
        </Button>
        {isCreated && (
          <Stack mt={2}>
            <Button
              onClick={() => {
                router.push("/");
              }}
            >
              Volver
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
}

export default ContactForm;
