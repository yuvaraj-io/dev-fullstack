"use client";

import { useEffect, useState } from "react";

type Topic = {
  id: number;
  name: string;
};

type SelectTopicsProps = {
  topicSend: (topic: Topic) => void;
};

function SelectTopics({ topicSend }: SelectTopicsProps) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/topics");
        const data = await res.json();
        setTopics(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load topics", err);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const selectTopic = (t: Topic) => {
    topicSend(t);
    setActiveTopic(t);
  };

  let content: React.ReactNode = null;
  if (loading) {
    content = (
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-transparent" />
        loading...
      </div>
    );
  } else {
    content = topics.map((n) => (
      <button
        key={n.id}
        className={
          activeTopic?.id === n.id
            ? "bg-purple-500 p-2 text-slate-100"
            : "p-2 text-slate-200 hover:text-gray-300"
        }
        onClick={() => selectTopic(n)}
        type="button"
      >
        {n.name}
      </button>
    ));
  }

  return (
    <div className="flex gap-3">
      <div className="flex items-center gap-2 text-lg">
        <div className="bg-slate-400 p-2 text-black">Select:-</div>
        {content}
      </div>
    </div>
  );
}

export default SelectTopics;
