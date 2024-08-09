import { Button } from '@/components/ui/button';
import { db } from '@/configs';
import { userResponses } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

// Define the types for jsonForm and formRecord
interface JsonForm {
    formTitle: string;
    formHeading: string;
    // Add other properties if necessary
}

interface FormRecord {
    id: number;
    // Add other properties if necessary
}

interface FormListItemResponsesProps {
    jsonForm: JsonForm;
    formRecord: FormRecord;
}

function FormListItemResponses({ jsonForm, formRecord }: FormListItemResponsesProps) {
    const [loading, setLoading] = useState(false);
    const [responseCount, setResponseCount] = useState(0);

    useEffect(() => {
        fetchResponseCount();
    }, []);

    const fetchResponseCount = async () => {
        try {
            const result = await db.select().from(userResponses)
                .where(eq(userResponses.formRef, formRecord.id));
            setResponseCount(result.length);
        } catch (error) {
            console.error('Error fetching response count:', error);
        }
    };

    const ExportData = async () => {
        let jsonData: any[] = []; // You might want to define a more specific type here
        setLoading(true);

        try {
            const result = await db.select().from(userResponses)
                .where(eq(userResponses.formRef, formRecord.id));

            if (result) {
                result.forEach((item) => {
                    const jsonItem = JSON.parse(item.jsonResponse);
                    jsonData.push(jsonItem);
                });
                setLoading(false);
                exportToExcel(jsonData);
            } else {
                setLoading(false);
                console.log('No data found');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    const exportToExcel = (jsonData: any[]) => { // You might want to define a more specific type here
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        XLSX.writeFile(workbook, jsonForm?.formTitle + ".xlsx");
    };

    return (
        <div className='border shadow-sm rounded-lg p-4 my-5'>
            <h2 className='text-lg text-black'>{jsonForm?.formTitle}</h2>
            <h2 className='text-sm text-gray-500'>{jsonForm?.formHeading}</h2>
            <hr className='my-4'></hr>
            <div className='flex justify-between items-center'>
                <h2 className='text-sm'><strong>{responseCount}</strong> Responses</h2>
                <Button className="" size="sm"
                    onClick={() => ExportData()}
                    disabled={loading}
                >
                    {loading ? <Loader2 className='animate-spin' /> : 'Export'}
                </Button>
            </div>
        </div>
    );
}

export default FormListItemResponses;
