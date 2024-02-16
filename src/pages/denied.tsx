import type { NextPage } from "next";
import Link from "next/link";
import { Button } from "~/components/ui/button";

const UnauthorizedPage: NextPage = () => {
  return (
    <>
      <div className="grid flex-grow place-items-center">
        <section className="flex flex-col items-center gap-12">
          <h1 className="text-5xl">Obehörig</h1>
          <p className="text-bala max-w-2xl text-center text-xl">
            Du är inloggad, men du har inte den berhörigheten som krävs för att
            se denna sida.
          </p>
          <Button variant="link" asChild>
            <Link className="text-3xl underline" href="/">
              Åter till startsidan
            </Link>
          </Button>
        </section>
      </div>
    </>
  );
};

export default UnauthorizedPage;
