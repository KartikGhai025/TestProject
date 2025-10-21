import NewsForm from "@/modules/news/components/NewsForm";

export default function NewsCreatePage() {
  return (
    <main>
    <div>
      <h1 className="text-2xl font-bold mb-4">Create News</h1>
      <NewsForm />
    </div>
    </main>
  );
}