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
      className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-500">Restaurant</p>
        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        <p className="text-sm text-gray-600">Slug : {slug}</p>
        <div className="pt-2">
          <span className="inline-flex rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
            Voir le menu
          </span>
        </div>
      </div>
    </Link>
  );
}