"use client";

type CollectionItem = {
  id: number;
  title: string;
};

type SectionCollectionGroup = {
  collections: { collectionId: number }[];
};

type CollectionsProps = {
  collections: CollectionItem[] | undefined;
  selectedCollections: number[];
  sectionCollectionData: SectionCollectionGroup[] | undefined;
  onToggle: (id: number) => void;
};

export default function Collections({
  collections,
  selectedCollections,
  sectionCollectionData,
  onToggle,
}: CollectionsProps) {
  let collectionFound: number[] = [];

  if (collections?.length && sectionCollectionData?.length) {
    collectionFound = sectionCollectionData
      .flatMap((c) => c?.collections || [])
      .map((item) => item?.collectionId)
      .filter((id): id is number => typeof id === "number");
  }

  return (
    <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
      {collections?.map((c) => (
        <div
          key={c.id}
          className={`text-left p-2 px-3 text-sm rounded-lg border transition cursor-pointer ${
            selectedCollections?.includes(c.id)
              ? "bg-blue-50 border-blue-200 text-blue-700 font-medium"
              : !collectionFound.includes(c.id)
              ? "bg-white border-slate-200 text-slate-400"
              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
          }`}
          onClick={() => onToggle(c.id)}
        >
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              checked={selectedCollections?.includes(c.id) ?? false}
              onChange={() => onToggle(c.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="truncate">{`${c.id}. ${c.title}`}</span>
          </label>
        </div>
      ))}
      {(!collections || collections.length === 0) && (
        <p className="text-xs text-slate-400 italic">No collections found.</p>
      )}
    </div>
  );
}
