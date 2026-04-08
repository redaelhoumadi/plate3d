import Link from "next/link";

type RestaurantCardProps = {
  id: string;
  name: string;
  slug: string;
};

export default function RestaurantCard({
  name,
  slug,
}: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurant/${slug}`}
      className="group block rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="space-y-4">
        <span className="inline-flex rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
          Demo restaurant
        </span>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {name}
          </h2>
          <p className="mt-2 text-sm text-gray-500">{slug}</p>
        </div>

        <div className="pt-2">
          <span className="inline-flex rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition group-hover:bg-black group-hover:text-white">
            Voir le menu
          </span>
        </div>
      </div>
    </Link>
  );
}