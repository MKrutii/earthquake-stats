import React, { useRef, useEffect, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { Earthquake } from '@/types/earthquake';
import FormControl from '@/components/Dialogs/FormControl';

interface ManageEarthquakeDialogProps {
  onSubmit: (data: Earthquake) => void;
  defaultValues?: Earthquake;
  children: (props: { onClick: () => void }) => ReactNode;
}

const ManageEarthquakeDialog = ({ onSubmit, defaultValues, children }: ManageEarthquakeDialogProps) => {
  const editDialogRef = useRef<HTMLDialogElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Earthquake>({ defaultValues });

  useEffect(() => {
    if (defaultValues) {
      setValue('location', defaultValues.location)
      setValue('magnitude', defaultValues.magnitude)
      setValue('date', defaultValues.date.split('T')[0])
    }
  }, [defaultValues, setValue]);

  const handleFormSubmit = (data: Earthquake) => {
    onSubmit(data);
    editDialogRef.current?.close()
  }

  const openDialog = () => {
    editDialogRef.current?.showModal()
  }

  const closeDialog = () => {
    editDialogRef.current?.close();
  };

  return (
    <>
      {children({ onClick: openDialog })}

      <dialog className="modal" ref={editDialogRef}>
        <div className="modal-box">
          <form method="dialog" onSubmit={handleSubmit(handleFormSubmit)}>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeDialog}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">
              {defaultValues ? 'Edit' : 'Create'} Earthquake
            </h3>

            <div className="py-4">
              <FormControl
                name={'location'}
                inputProps={{
                  ...register('location', {
                    required: 'Location is required',
                  })
                }}
                errors={errors}
              />

              <FormControl
                name={'magnitude'}
                inputProps={{
                  type:"number",
                  step:"0.1",
                  ...register('magnitude', {
                    required: 'Magnitude is required',
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: 'Magnitude must be a positive number',
                    },
                  })
                }}
                errors={errors}
              />

              <FormControl
                name={'date'}
                inputProps={{
                  type: 'date',
                  ...register('date', { required: 'Date is required' })
                }}
                errors={errors}
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ManageEarthquakeDialog
