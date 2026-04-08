import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MenuItemCard from "@/src/components/MenuItemCard";

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
    <main className="min-h-screen bg-[#fcfcfb]">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <Link
            href="/"
            className="mb-6 inline-flex text-sm font-medium text-gray-500 transition hover:text-black"
          >
            ← Retour
          </Link>

          <div className="max-w-3xl space-y-4">
            <span className="inline-flex rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
              Plate3D Demo
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
              {restaurant.name}
            </h1>

            <p className="text-lg leading-8 text-gray-600">
              Découvrez le menu du restaurant avec une expérience immersive :
              visualisation des plats, aperçu 3D et réalité augmentée sur
              mobile.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {restaurant.menus.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
            Aucun menu disponible.
          </div>
        ) : (
          <div className="space-y-14">
            {restaurant.menus.map((menu) => (
              <div key={menu.id} className="space-y-10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                      Menu
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                      {menu.name}
                    </h2>
                  </div>
                </div>

                {menu.categories.length === 0 ? (
                  <div className="rounded-[24px] border border-dashed border-gray-300 bg-white p-8 text-gray-500">
                    Aucune catégorie disponible.
                  </div>
                ) : (
                  <div className="space-y-12">
                    {menu.categories.map((category) => (
                      <div key={category.id} className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="h-2.5 w-2.5 rounded-full bg-black" />
                          <h3 className="text-2xl font-semibold text-gray-900">
                            {category.name}
                          </h3>
                        </div>

                        {category.items.length === 0 ? (
                          <div className="rounded-[24px] border border-dashed border-gray-300 bg-white p-8 text-gray-500">
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