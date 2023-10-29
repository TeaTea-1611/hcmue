import { FieldError } from '../types/field-error';

export const length = (
  field: string,
  value: string,
  min: number,
  max: number,
): FieldError | null => {
  const len = value.length;

  if (len < min || len > max) {
    return {
      field,
      message: `The length of ${field} must be between ${min} and ${max}`,
    };
  }

  return null;
};
