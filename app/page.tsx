import { prisma } from "@/lib/prisma";
import RestaurantCard from "@/app/components/RestaurantCard";

export default async function HomePage() {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 space-y-4">
          <span className="inline-flex rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
            Plate3D
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
            Le menu digital nouvelle génération
          </h1>
          <p className="max-w-2xl text-lg text-gray-600">
            Visualisez les plats, parcourez les menus et préparez l’expérience
            3D pour les restaurants, fast-foods et dark kitchens.
          </p>
        </div>

        {restaurants.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
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