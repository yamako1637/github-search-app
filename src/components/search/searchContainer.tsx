// import SearchPresentation from "./presentational";
'use client';

import { useState } from 'react';
import SearchPresentation from './searchPresenter';
import { GitHubRepository, GitHubSearchResponse } from '@/types/github';

export default function SearchFormContainer() {
    // 入力データの管理
    const [query, setQuery] = useState('');

    // APIからのレスポンス管理
    const [results, setResults] = useState<GitHubRepository[]>([]);

    // ローディング管理
    const [loading, setLoading] = useState(false);

    // エラー管理
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        // クエリが空白のみの場合は検索しない
        if (!query.trim()) return;

        // ローディング開始
        setLoading(true);

        // エラーリセット
        setError(null);

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_GITHUB_API_URL}/search/repositories`;
            const params = { q: query };
            const queryParams = new URLSearchParams(params);

            const option = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const res = await fetch(`${apiUrl}?${queryParams}`, option);
            
            if (!res.ok) throw new Error('Failed to fetch repositories');
            const data: GitHubSearchResponse = await res.json();
            setResults(data.items || []);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SearchPresentation
            query={query}
            loading={loading}
            results={results}
            error={error}
            onQueryChange={setQuery}
            onSearch={handleSearch}
        />
    );
}