"use client";

import { useEffect } from "react";

type Media = {
  id: string;
  type: string;
  url: string;
};

type ModelViewer3DProps = {
  media?: Media[];
  itemName: string;
};

export default function ModelViewer3D({
  media = [],
  itemName,
}: ModelViewer3DProps) {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  const model3D = media.find((item) =>
    item.type.toLowerCase().includes("3d")
  );

  const image = media.find((item) =>
    item.type.toLowerCase().includes("image")
  );

  if (!model3D) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 text-center">
        <div className="space-y-2 px-6">
          <p className="text-base font-semibold text-gray-700">
            Aucun modèle 3D disponible
          </p>
          <p className="text-sm text-gray-500">
            Ajoute un fichier `.glb` dans la table ItemMedia.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <model-viewer
        src={model3D.url}
        alt={itemName}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        poster={image?.url}
        shadow-intensity="1"
        exposure="1"
        loading="eager"
        style={{
          width: "100%",
          height: "320px",
          backgroundColor: "#f9fafb",
        }}
      />
    </div>
  );
}