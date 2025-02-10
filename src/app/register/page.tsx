import Card from "@/app/ui/card";
import Form from "@/app/ui/register-form";

export default function Page() {
  return (
    // remmember you can do foother and headers
    <main className="h-screen w-full flex flex-col gap-8 text-center justify-center items-center">
        {/* <h1>Apacheta logo</h1> */}
        <Card>
          <Form></Form>
        </Card>
    </main>
  );
}
