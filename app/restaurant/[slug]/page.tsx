import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MenuItemCard from "@/app/components/MenuItemCard";

type RestaurantPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RestaurantPage({
  params,
}: RestaurantPageProps) {
  const { slug } = await params;

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    include: {
      menus: {
        include: {
          categories: {
            include: {
              items: {
                include: {
                  media: true,
                },
                orderBy: {
                  name: "asc",
                },
              },
            },
            orderBy: {
              name: "asc",
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!restaurant) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link
            href="/"
            className="mb-6 inline-flex text-sm font-medium text-gray-600 hover:text-black"
          >
            ← Retour à l’accueil
          </Link>

          <div className="space-y-4">
            <span className="inline-flex rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
              Plate3D Demo
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900">
              {restaurant.name}
            </h1>
            <p className="max-w-2xl text-lg text-gray-600">
              Découvrez le menu digital du restaurant et préparez l’intégration
              des plats en 3D.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        {restaurant.menus.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
            Aucun menu disponible pour ce restaurant.
          </div>
        ) : (
          <div className="space-y-14">
            {restaurant.menus.map((menu) => (
              <div key={menu.id} className="space-y-10">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{menu.name}</h2>
                </div>

                {menu.categories.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-gray-500">
                    Aucune catégorie dans ce menu.
                  </div>
                ) : (
                  <div className="space-y-12">
                    {menu.categories.map((category) => (
                      <div key={category.id} className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-black" />
                          <h3 className="text-2xl font-semibold text-gray-900">
                            {category.name}
                          </h3>
                        </div>

                        {category.items.length === 0 ? (
                          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-gray-500">
                            Aucun plat dans cette catégorie.
                          </div>
                        ) : (
                          <div className="grid gap-6">
                            {category.items.map((item) => (
                              <MenuItemCard
                                key={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                isAvailable={item.isAvailable}
                                media={item.media}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}