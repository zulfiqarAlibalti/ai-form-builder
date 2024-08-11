import { Delete, Edit, Trash } from 'lucide-react';
import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Update the FormField type to include 'file'
interface FormField {
  fieldType: 'select' | 'radio' | 'checkbox' | 'text' | 'file';
  fieldName: string;
  label: string;
  placeholder?: string;
  options?: { label: string }[];
  required?: boolean;
  type?: string;
}

interface FieldEditProps {
  defaultValue: FormField;
  onUpdate: (updatedField: FormField) => void;
  deleteField: () => void;
}

function FieldEdit({ defaultValue, onUpdate, deleteField }: FieldEditProps) {
  const [label, setLabel] = useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

  return (
    <div className='flex gap-2'>
      <Popover>
        <PopoverTrigger><Edit className='h-5 w-5 text-gray-500' /></PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div>
            <label className='text-xs'>Label Name</label>
            <Input
              type="text"
              value={label ?? ''} // Use value instead of defaultValue
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          {/* Conditionally render placeholder input if not a file type */}
          {defaultValue.fieldType !== 'file' && (
            <div>
              <label className='text-xs'>Placeholder Name</label>
              <Input
                type="text"
                value={placeholder ?? ''} // Use value instead of defaultValue
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </div>
          )}
          
          <Button
            size="sm"
            className="mt-3"
            onClick={() => onUpdate({
              ...defaultValue,
              label: label ?? defaultValue.label,
              placeholder: placeholder ?? defaultValue.placeholder
            })}
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger>
          <Trash className='h-5 w-5 text-red-500' />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your field.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteField()}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FieldEdit;
