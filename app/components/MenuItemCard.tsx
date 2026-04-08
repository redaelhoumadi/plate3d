import ModelPreview from "./ModelPreview";

type Media = {
  id: string;
  type: string;
  url: string;
};

type MenuItemCardProps = {
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
  media: Media[];
};

export default function MenuItemCard({
  name,
  description,
  price,
  isAvailable,
  media,
}: MenuItemCardProps) {
  return (
    <div className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
            <p className="mt-2 text-gray-600">
              {description || "Aucune description disponible."}
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-extrabold text-gray-900">
              {price.toFixed(2)} €
            </p>
            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isAvailable ? "Disponible" : "Indisponible"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white">
            Voir le plat
          </button>
          <button className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-800">
            Commander
          </button>
        </div>
      </div>

      <ModelPreview media={media} />
    </div>
  );
}