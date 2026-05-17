"use client";

import { useState } from "react";

type ImageBlock = {
  id: number;
  type: "image";
  image?: string;
  assetId?: string;
  link?: string;
  btn?: string;
};

type ImageEditorProps = {
  value: ImageBlock;
  index: number;
  remove: (id: number) => void;
  onUpdate: (id: number, data: Partial<ImageBlock>) => void;
};

export default function ImageEditor({
  value,
  index,
  remove,
  onUpdate,
}: ImageEditorProps) {
  const [previewImage, setPreviewImage] = useState(value.image || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/assets", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Failed to upload image");
      }

      setPreviewImage(data.asset.url);
      onUpdate(index, {
        image: data.asset.url,
        assetId: data.asset.id,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }

    event.target.value = "";
  };

  return (
    <div className="mt-4">
      <button
        className="rounded border border-red-400 p-2"
        onClick={() => remove(index)}
        type="button"
      >
        Remove
      </button>{" "}
      {index}

      <div className="mt-3 flex flex-col items-center gap-2 border border-green-200 p-4">
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg, image/webp"
          onChange={handleImageUpload}
          disabled={uploading}
        />

        {uploading && <div className="text-sm text-slate-500">Uploading image...</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}

        {previewImage && (
          <img
            src={previewImage}
            className="h-[350px] w-[500px] object-cover border border-gray-300"
            alt="Preview"
          />
        )}

        <input
          type="text"
          className="w-full border p-2 text-black"
          placeholder="Enter Image Link"
          value={value.link || ""}
          onChange={(e) => onUpdate(index, { link: e.target.value })}
        />

        <input
          type="text"
          className="w-full border p-2 text-black"
          placeholder="Enter Button Text"
          value={value.btn || ""}
          onChange={(e) => onUpdate(index, { btn: e.target.value })}
        />

        {value.link && value.btn && (
          <a href={value.link} target="_blank" rel="noopener noreferrer">
            <button className="rounded bg-blue-500 px-4 py-2 text-white" type="button">
              {value.btn}
            </button>
          </a>
        )}
      </div>
    </div>
  );
}
