import { useState, useEffect } from "react";
import Link from "next/link";

interface NewsArticle {
    title: string;
    description: string;
    url: string;
    published: string;
}

export default function NewsFetcher() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [, setLoading] = useState(false);
    const [, setError] = useState<string | null>(null);

    const fetchNews = async () => {
        setLoading(true);
        try{
            const response = await fetch("/api/news");
            const data = await response.json();
            if (!response.ok) {
                setError('Failed to fetch news');
            }
            setArticles(data.news || data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unknown error');
            setArticles([]);
            return;

        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className="mt-5">
            {articles.map((article, index) => (
                <div key={index} className="mb-3 ml-3">
                    <Link
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl text-amber-950 font-bold"
                    >
                        {article.title}
                    </Link>
                    <p className="text-md">{article.description}</p>
                    <p className="text-sm text-gray-500">{new Date(article.published).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}