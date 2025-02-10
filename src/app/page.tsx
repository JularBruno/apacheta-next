import { ButtonLink } from "@/app/ui/buttons";

export default function Home() {
  return (
    // remmember you can do foother and headers
		<main className="h-screen w-full flex flex-col gap-8 text-center justify-center items-center">
			<h1>Apacheta</h1>
			<h3>Cambiá tu relación con el dinero</h3>
      		<ButtonLink href="/register">Registrate</ButtonLink>
		</main>
  );
}
