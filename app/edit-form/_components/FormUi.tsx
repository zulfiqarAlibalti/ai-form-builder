import { Input } from '@/components/ui/input';
import React, { useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from '@/components/ui/button';
import FieldEdit from './FieldEdit';
import { db } from '@/configs';
import { userResponses } from '@/configs/schema';
import moment from 'moment';
import { toast } from 'sonner';
import { SignInButton, useUser } from '@clerk/nextjs';

// Define types for jsonForm and props
interface FormField {
  fieldType: 'select' | 'radio' | 'checkbox' | 'text' | 'file'; // Added 'file'
  fieldName: string;
  label: string;
  placeholder?: string;
  options?: { label: string }[];
  required?: boolean;
  type?: string;
}

interface JsonForm {
  formTitle: string;
  formHeading: string;
  fields: FormField[];
}

interface FormUiProps {
  jsonForm: JsonForm;
  selectedTheme: string;
  selectedStyle: { key: string; value: string };
  onFieldUpdate: (value: FormField, index: number) => void;
  deleteField: (index: number) => void;
  editable?: boolean;
  formId?: number;
  enabledSignIn?: boolean;
}

function FormUi({
  jsonForm,
  selectedTheme,
  selectedStyle,
  onFieldUpdate,
  deleteField,
  editable = true,
  formId = 0,
  enabledSignIn = false
}: FormUiProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const { user, isSignedIn } = useUser();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files?.[0] // Assuming single file upload
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    try {
      const result = await db.insert(userResponses).values({
        jsonResponse: JSON.stringify(formData),
        createdBy: user?.id || 'anonymous',
        createdAt: moment().format('YYYY-MM-DD'),
        formRef: formId
      });

      if (result) {
        if (formRef.current) {
          formRef.current.reset();
        }
        setFormData({});
        toast('Response Submitted Successfully!');
      } else {
        toast('Error while saving your form!');
      }
    } catch (error) {
      console.error("Error inserting into userResponses:", error);
      toast('Error while saving your form!');
    }
  };

  const handleCheckboxChange = (fieldName: string, itemName: string, value: boolean) => {
    const list = formData[fieldName] ? [...formData[fieldName]] : [];

    if (value) {
      list.push(itemName);
    } else {
      const index = list.indexOf(itemName);
      if (index > -1) {
        list.splice(index, 1);
      }
    }

    setFormData({
      ...formData,
      [fieldName]: list
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={onFormSubmit}
      className='border p-5 md:w-[600px] rounded-lg'
      data-theme={selectedTheme}
      style={{
        boxShadow: selectedStyle?.key === 'boxshadow' ? '5px 5px 0px black' : undefined,
        border: selectedStyle?.key === 'border' ? selectedStyle.value : undefined
      }}
    >
      <h2 className='font-bold text-center text-2xl'>{jsonForm?.formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center'>{jsonForm?.formHeading}</h2>

      {jsonForm?.fields?.map((field, index) => (
        <div key={index} className='flex items-center gap-2'>
          {field.fieldType === 'select' ? (
            <div className='my-3 w-full'>
              <label className='text-xs text-gray-500'>{field.label}</label>
              <Select required={field?.required}
                onValueChange={(v) => handleSelectChange(field.fieldName, v)}>
                <SelectTrigger className="w-full bg-transparent">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>

                  <SelectContent>
                  {field.options?.map((item, index) => (
                    <SelectItem key={index} value={item?.label ?? item}>
                      {item?.label ?? item}
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
            </div>
          ) : field.fieldType === 'radio' ? (
            <div className='w-full my-3'>
              <label className='text-xs text-gray-500'>{field.label}</label>
              <RadioGroup required={field?.required}>
                {field.options?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={item.label} id={item.label}
                      onClick={() => handleSelectChange(field.fieldName, item.label)}
                    />
                    <Label htmlFor={item.label}>{item.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType === 'checkbox' ? (
            <div className='my-3 w-full'>
              <label className='text-xs text-gray-500'>{field?.label}</label>
              {field?.options ? field?.options?.map((item, index) => (
                <div key={index} className='flex gap-2 items-center'>
                  <Checkbox
                    onCheckedChange={(v) => handleCheckboxChange(field?.fieldName, item.label, Boolean(v))} />
                  <h2>{item.label}</h2>
                </div>
              )) : (
                <div className='flex gap-2 items-center'>
                  <Checkbox required={field.required} />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : field.fieldType === 'file' ? (
            <div className='my-3 w-full'>
              <Label className='text-xs text-gray-500' htmlFor={field.fieldName}>{field.label}</Label>
              <Input id={field.fieldName} type="file" name={field.fieldName}
                required={field?.required} onChange={handleFileChange} />
            </div>
          ) : (
            <div className='my-3 w-full'>
              <label className='text-xs text-gray-500'>{field.label}</label>
              <Input type={field?.type}
                placeholder={field.placeholder}
                name={field.fieldName}
                className="bg-transparent"
                required={field?.required}
                onChange={handleInputChange}
              />
            </div>
          )}

          {editable && (
            <div>
              <FieldEdit defaultValue={field}
                onUpdate={(value: FormField) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            </div>
          )}
        </div>
      ))}
      {!enabledSignIn ? (
        <button className='btn btn-primary'>Submit</button>
      ) : isSignedIn ? (
        <button className='btn btn-primary'>Submit</button>
      ) : (
        <Button>
          <SignInButton mode='modal'>Sign In before Submit</SignInButton>
        </Button>
      )}
    </form>
  );
}

export default FormUi;
