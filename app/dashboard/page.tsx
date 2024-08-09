import React from 'react';
import CreateForm from './_components/CreateForm';
import FormList from './_components/FormList';

function Dashboard() {
    return (
        <div className='p-4 sm:p-6 md:p-10 ml-64 sm:ml-48 md:ml-64 '>
            <h2 className='font-bold text-2xl sm:text-2xl md:text-3xl flex items-center justify-between'>
                Dashboard
                <CreateForm />
            </h2>
            {/* List of all AI Generated forms */}
            <FormList />
        </div>
    );
}

export default Dashboard;
