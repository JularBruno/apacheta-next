import Card from "@/app/ui/card";
import Form from "@/app/ui/dashboard/new-tag";
import { getCategoriesByUser } from '@/app/lib/actions/categories';
// import { Suspense } from 'react';

export default async function Page() {

  const categories = await getCategoriesByUser();

  return (
    <main className="h-screen w-full flex flex-col gap-8 text-center justify-center items-center">
        <Card>
            {/* <Suspense fallback={<div className='bg-white shadow-sm rounded-lg mt-4 h-full text-black'>Loading...</div>}> */}
                <Form categories={categories}></Form>
            {/* </Suspense> */}
        </Card>
    </main>
  );
}
