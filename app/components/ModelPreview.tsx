type ModelPreviewProps = {
  media?: {
    type: string;
    url: string;
  }[];
};

export default function ModelPreview({ media = [] }: ModelPreviewProps) {
  const model3D = media.find((item) => item.type.toLowerCase().includes("3d"));
  const image = media.find((item) => item.type.toLowerCase().includes("image"));

  if (model3D) {
    return (
      <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center">
        <div className="space-y-2 px-4">
          <p className="text-sm font-semibold text-gray-700">Modèle 3D détecté</p>
          <p className="text-xs break-all text-gray-500">{model3D.url}</p>
          <button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
            Voir en 3D
          </button>
        </div>
      </div>
    );
  }

  if (image) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <img
          src={image.url}
          alt="Aperçu du plat"
          className="h-56 w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500">
      Aucun média pour ce plat
    </div>
  );
}