"use client";

import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FormUi from '../_components/FormUi';
import { toast } from 'sonner';
import Controller from '../_components/Controller';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RWebShare } from 'react-web-share';

// Define the type for params
interface EditFormParams {
  params: {
    formId?: string;
  };
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
  style: string;
  enabledSignIn: boolean;
}

function EditForm({ params }: EditFormParams) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState<JsonForm | null>(null);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState<number | undefined>();
  const [record, setRecord] = useState<Record | null>(null);

  const [selectedTheme, setSelectedTheme] = useState<string>('light');
  const [selectedBackground, setSelectedBackground] = useState<string | undefined>();
  const [selectedStyle, setSelectedStyle] = useState<any>();

  useEffect(() => {
    if (user && params?.formId) {
      GetFormData();
    }
  }, [user, params?.formId]);

  const GetFormData = async () => {
    if (!params?.formId) return;

    const result = await db.select().from(JsonForms)
      .where(and(
        eq(JsonForms.id, params.formId),
        eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
      ));

    if (result.length > 0) {
      const fetchedRecord = result[0] as Record;
      setRecord(fetchedRecord);
      try {
        const parsedJsonForm = JSON.parse(fetchedRecord.jsonform) as JsonForm;
        setJsonForm(parsedJsonForm);
        setSelectedBackground(fetchedRecord.background);
        setSelectedTheme(fetchedRecord.theme);
        setSelectedStyle(JSON.parse(fetchedRecord.style));
      } catch (error) {
        console.error('Error parsing JSON form data:', error);
      }
    }
  };

  useEffect(() => {
    if (updateTrigger) {
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value: FormField, index: number) => {
    if (jsonForm) {
      const updatedFields = jsonForm.fields.map((field, idx) =>
        idx === index ? { ...field, ...value } : field
      );
      setJsonForm({ ...jsonForm, fields: updatedFields });
      setUpdateTrigger(Date.now());
    }
  };

  const updateJsonFormInDb = async () => {
    if (record && jsonForm) {
      const result = await db.update(JsonForms)
        .set({ jsonform: JSON.stringify(jsonForm) })
        .where(and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        ))
        .returning({ id: JsonForms.id });

      toast('Updated!!!');
      console.log(result);
    }
  };

  const deleteField = (indexToRemove: number) => {
    if (jsonForm) {
      const updatedFields = jsonForm.fields.filter((_, index) => index !== indexToRemove);
      setJsonForm({ ...jsonForm, fields: updatedFields });
      setUpdateTrigger(Date.now());
    }
  };

  const updateControllerFields = async (value: any, columnName: string) => {
    if (record) {
      const result = await db.update(JsonForms).set({ [columnName]: value })
        .where(and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        ))
        .returning({ id: JsonForms.id });

      toast('Updated!!!');
    }
  };

  return (
    <div className='p-10'>
      <div className='flex justify-between items-center'>
        <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold' onClick={() => router.back()}>
          <ArrowLeft /> Back
        </h2>
        <div className='flex gap-2'>
          <Link href={'/aiform/' + record?.id} target="_blank">
            <Button className="flex gap-2"><SquareArrowOutUpRight className='h-5 w-5' /> Live Preview</Button>
          </Link>
          <RWebShare
            data={{
              text: jsonForm?.formHeading + " , Build your form in seconds with AI form Builder ",
              url: process.env.NEXT_PUBLIC_BASE_URL + "/aiform/" + record?.id,
              title: jsonForm?.formTitle,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className="flex gap-2 bg-green-600 hover:bg-green-700"><Share2 /> Share</Button>
          </RWebShare>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='p-5 border rounded-lg shadow-md'>
          <Controller
            selectedTheme={(value: string) => {
              updateControllerFields(value, 'theme');
              setSelectedTheme(value);
            }}
            selectedBackground={(value: string) => {
              updateControllerFields(value, 'background');
              setSelectedBackground(value);
            }}
            selectedStyle={(value: any) => {
              setSelectedStyle(value);
              updateControllerFields(value, 'style');
            }}
            setSignInEnable={(value: any) => {
              updateControllerFields(value, 'enabledSignIn');
            }}
          />
        </div>
        <div className='md:col-span-2 border rounded-lg p-5 flex items-center justify-center'
          style={{ backgroundImage: selectedBackground }}>
          {jsonForm && record && (
            <FormUi
              jsonForm={jsonForm}
              selectedTheme={selectedTheme}
              selectedStyle={selectedStyle}
              onFieldUpdate={onFieldUpdate}
              deleteField={deleteField}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default EditForm;
