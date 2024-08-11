"use client";

import FormUi from '@/app/edit-form/_components/FormUi';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema'; // Adjust this import based on your schema
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Define the type for params
interface Params {
  formid: string;
}

interface LiveAiFormProps {
  params: Params;
}

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

interface JsonForm {
  formTitle: string;
  formHeading: string;
  fields: FormField[];
}

interface Record {
  id: number;
  jsonform: string;
  background: string;
  theme: string;
  enabledSignIn: boolean;
  style: string; // Adjust based on your schema
}

function LiveAiForm({ params }: LiveAiFormProps) {
  const [record, setRecord] = useState<Record | null>(null);
  const [jsonForm, setJsonForm] = useState<JsonForm | null>(null);

  useEffect(() => {
    if (params) {
      GetFormData();
    }
  }, [params]);

  const GetFormData = async () => {
    const result = await db.select().from(JsonForms).where(eq(JsonForms.id, Number(params?.formid)));

    if (result && result.length > 0) {
      const fetchedRecord = result[0] as Record;
      
      setRecord(fetchedRecord);
      
      try {
        const parsedJsonForm = JSON.parse(fetchedRecord.jsonform) as JsonForm;
        setJsonForm(parsedJsonForm);
        console.log(result);
      } catch (error) {
        console.error('Error parsing JSON form data:', error);
      }
    }
  };

  return (
    <div
      className="p-10 flex justify-center items-center"
      style={{
        backgroundImage: record?.background
      }}
    >
      {record && jsonForm && (
        <FormUi
          jsonForm={jsonForm}
          onFieldUpdate={() => console.log}
          deleteField={() => console.log}
          selectedStyle={JSON.parse(record.style)}
          selectedTheme={record.theme}
          editable={false}
          formId={record.id}
          enabledSignIn={record.enabledSignIn}
        />
      )}
      <Link
        className="flex gap-2 items-center bg-black text-white px-3 py-1 rounded-full fixed bottom-5 left-5 cursor-pointer"
        href={'/'}
      >
        <Image src={'/logo.png'} width={26} height={26} alt="Logo" />
        Build your Own AI form
      </Link>
    </div>
  );
}

export default LiveAiForm;
