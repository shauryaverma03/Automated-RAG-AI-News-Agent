import { useState, useEffect } from 'react';

const SUBCATEGORIES = [
    { name: 'Artificial Intelligence', keywords: ['ai', 'machine learning', 'neural', 'deep learning', 'nlp', 'gpt', 'llm'] },
    { name: 'Software Development', keywords: ['programming', 'coding', 'software', 'development', 'framework', 'react', 'javascript', 'python'] },
    { name: 'Hardware', keywords: ['hardware', 'devices', 'laptop', 'smartphone', 'chip', 'processor', 'nvidia', 'amd'] },
    { name: 'Cybersecurity', keywords: ['cybersecurity', 'privacy', 'hack', 'security', 'breach', 'malware'] },
    { name: 'Cloud & DevOps', keywords: ['cloud', 'aws', 'azure', 'google cloud', 'docker', 'kubernetes', 'serverless'] },
    { name: 'Blockchain & Web3', keywords: ['blockchain', 'crypto', 'web3', 'bitcoin', 'ethereum', 'nft', 'defi'] },
    { name: 'Data Science', keywords: ['big data', 'data science', 'analytics', 'visualization', 'pandas'] },
    { name: 'Future Tech', keywords: ['emerging', 'future', 'quantum', 'robotics', 'space', 'biotech'] },
    { name: 'Business & Startups', keywords: ['startup', 'business', 'ipo', 'funding', 'venture', 'market'] },
];

export const useNewsData = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/knowledge_base.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const json = await response.json();

                // Process Data
                const processedData = json.map((article) => ({
                    ...article,
                    id: article.id || Math.random().toString(36).substr(2, 9),
                    timestamp: article.date ? new Date(article.date).getTime() : Date.now(),
                }));

                // Categorize
                const newCategories = SUBCATEGORIES.reduce((acc, cat) => {
                    acc[cat.name] = [];
                    return acc;
                }, {});
                newCategories['General'] = [];

                processedData.forEach((article) => {
                    const content = (article.title + ' ' + article.summary).toLowerCase();
                    const matched = SUBCATEGORIES.find((cat) =>
                        cat.keywords.some((k) => content.includes(k))
                    );

                    if (matched) {
                        newCategories[matched.name].push(article);
                    } else {
                        newCategories['General'].push(article);
                    }
                });

                // Sort by date (newest first) but here checking if dates are valid, else keeping as is
                // Assuming knowledge_base.json might have various date formats or none. 
                // We assigned timestamp above.

                setData(processedData);
                setCategories(newCategories);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, categories, loading, error };
};
