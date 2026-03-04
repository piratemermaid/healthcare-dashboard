import type {
  Control,
  FieldArray,
  FieldArrayPath,
  FieldValues,
  Path,
} from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

type AddableTextFieldListProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldArrayPath<T>;
  label?: string;
  addButtonLabel: string;
};

export function AddableTextFieldList<T extends FieldValues>({
  control,
  name,
  label,
  addButtonLabel,
}: AddableTextFieldListProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <Stack spacing={1}>
      {label && (
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      )}
      {fields.map((field, index) => (
        <Stack
          key={field.id}
          direction="row"
          spacing={1}
          alignItems="flex-start"
        >
          <TextField
            {...control.register(`${name}.${index}.value` as Path<T>)}
            fullWidth
            size="small"
          />
          <IconButton
            onClick={() => remove(index)}
            color="error"
            size="small"
            sx={{ mt: 0.5 }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={() => append({ value: '' } as FieldArray<T, typeof name>)}
        variant="outlined"
        size="small"
      >
        {addButtonLabel}
      </Button>
    </Stack>
  );
}
