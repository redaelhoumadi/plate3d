import { prisma } from "@/lib/prisma";
import RestaurantCard from "@/src/components/RestaurantCard";

export default async function HomePage() {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="mb-12 max-w-3xl space-y-5">
          <span className="inline-flex rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
            Plate3D
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            Le menu digital qui donne faim avant même la commande
          </h1>

          <p className="text-lg leading-8 text-gray-600">
            Visualise les plats d’un restaurant en 3D, sur mobile, directement
            depuis un menu digital nouvelle génération.
          </p>
        </div>

        {restaurants.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
            Aucun restaurant trouvé.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                slug={restaurant.slug}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}