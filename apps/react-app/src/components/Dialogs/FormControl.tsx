import { Earthquake } from '@/types/earthquake';
import React, { InputHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';

interface FormControlProps {
  name: keyof Earthquake
  inputProps: InputHTMLAttributes<HTMLInputElement>
  errors: FieldErrors<Earthquake>
}

const FormControl = ({ inputProps, name, errors }: FormControlProps) => (
  <div className="form-control mb-4">
    <label className="label">
      <span className="label-text">{name.toLocaleUpperCase()}</span>
    </label>
    <input
      type="text"
      className="input input-bordered"
      placeholder={`Enter ${name}`}
      {...inputProps}
    />
    {errors[name] && (
      <span className="text-red-500">{errors[name]?.message}</span>
    )}
  </div>
);

export default FormControl
