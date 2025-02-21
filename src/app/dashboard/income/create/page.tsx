import Card from "@/app/ui/card";
import Form from "@/app/ui/dashboard/new-income";

export default async function Page() {

  return (
    <main className="h-screen w-full flex flex-col gap-8 text-center justify-center items-center">
        <Card>
            <Form></Form>
        </Card>
    </main>
  );
}
