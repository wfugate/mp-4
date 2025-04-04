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
        try {
            const response = await fetch("/api/news");
            if (!response.ok) {
                setError('Failed to fetch news');
            }
            const data = await response.json();

            const newsData = Array.isArray(data.news) ? data.news :
                Array.isArray(data) ? data : [{
                    title: "ERROR",
                    description: 'Error fetching news, you may be out of API requests.',
                    url: "#",
                    published: new Date().toISOString()
                }];
            setArticles(newsData);
        } catch (error) {
            console.error(error);
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