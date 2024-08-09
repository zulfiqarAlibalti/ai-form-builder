"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import FormListItem from './FormListItem';

interface Form {
    id: number;
    jsonform: string;
    theme?: string;
    background?: string;
    style?: string;
    createdBy: string;
    createdAt: string;
    enabledSignIn?: boolean;
}

function FormList() {
    const { user } = useUser();
    const [formList, setFormList] = useState<Form[]>([]);

    useEffect(() => {
        if (user) GetFormList();
    }, [user]);

    const GetFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id));

        setFormList(result as Form[]); // Type assertion
    }

    return (
        <div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5'>
            {formList.map((form) => (
                <div key={form.id}>
                    <FormListItem 
                        jsonForm={JSON.parse(form.jsonform)}
                        formRecord={form}
                        refreshData={GetFormList}
                    />
                </div>
            ))}
        </div>
    );
}

export default FormList;
