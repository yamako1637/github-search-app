import { GitHubRepository } from '@/types/github';
import {
    Container,
    TextInput,
    Button,
    Group,
    Card,
    Text,
    Stack,
    Avatar,
    Grid,
    Center,
    Skeleton,
    Pagination
} from '@mantine/core';
import Link from 'next/link';

interface SearchPresenterProps {
    query: string;
    loading: boolean;
    results: GitHubRepository[];
    error: string | null;
    activePage: number;
    totalPages: number;
    onSearch: () => void;
    onQueryChange: (val: string) => void;
    onPageChange: (page: number) => void;
}

export default function SearchPresentation({
    query,
    loading,
    results,
    activePage,
    totalPages,
    error,
    onQueryChange,
    onSearch,
    onPageChange
}: SearchPresenterProps) {
    return (
        <Container size="md" py="sm">
            <Stack gap="md">
                {/* 検索バーおよびボタン */}
                <SearchInput
                    query={query}
                    onQueryChange={onQueryChange}
                    onSearch={onSearch}
                    loading={loading}
                />

                {/* エラー表示 */}
                {error && <Text c="red">{error}</Text>}

                {/* 検索結果 */}
                <Grid>
                    <Grid.Col span={{ base: 12 }}>
                        {loading ? (
                            <SearchSkeleton />
                        ) : (
                            <SearchList results={results} />
                        )}

                        {/* 結果がある場合のみページネーションを表示 */}
                        {results.length > 0 && totalPages > 1 && (
                            <Center my="lg">
                                <SearchPagination
                                    activePage={activePage}
                                    totalPages={totalPages}
                                    onPageChange={onPageChange}
                                />
                            </Center>
                        )}
                    </Grid.Col>
                </Grid>

            </Stack >
        </Container >
    );
}

// SearchPresenterPropsからquery, onQueryChange, onSearch, loadingのみを抜き取った型
type SearchInputProps = Pick<SearchPresenterProps,
    "query" | "onQueryChange" | "onSearch" | "loading"
>;
export function SearchInput({ query, onQueryChange, onSearch, loading }: SearchInputProps) {
    return (
        <Group align="flex-end">
            <TextInput
                size={"md"}
                placeholder="リポジトリ名を検索してください"
                value={query}
                onChange={(e) => onQueryChange(e.currentTarget.value)}
                style={{ flex: 1 }}
                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
            <Button
                size={"md"}
                w={120}
                onClick={onSearch}
                loading={loading}
            >
                検索
            </Button>
        </Group>
    );
}

// SearchPresenterPropsからresultsのみを抜き取った型
type SearchListProps = Pick<SearchPresenterProps, 'results'>;
export function SearchList({ results }: SearchListProps) {
    return (
        <>
            {
                results.map((repo: GitHubRepository) => (
                    <>
                        <Card
                            key={repo.id}
                            shadow="none"
                            padding="lg"
                            radius="md"
                            withBorder
                            component={Link}
                            href={`/repo/${repo.owner.login}/${repo.name}`}
                            my={"lg"}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s ease',
                            }}
                        >
                            <Group wrap="nowrap" gap="lg">
                                {/* オーナーのアバター */}
                                <Avatar
                                    src={repo.owner.avatar_url}
                                    size={60}
                                    radius="xl"
                                    color="blue"
                                    alt={`${repo.owner.login}'s avatar`}
                                />

                                {/* リポジトリ名 */}
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <Text
                                        fw={500}
                                        size="lg"
                                        truncate
                                    >
                                        {repo.name}
                                    </Text>
                                </div>
                            </Group>
                        </Card>
                    </>
                ))
            }
        </>
    )
}

type PaginationProps = Pick<SearchPresenterProps, 'activePage' | 'totalPages' | 'onPageChange'>;
export function SearchPagination({ activePage, totalPages, onPageChange }: PaginationProps) {
    return (
        <Center my="lg">
            <Pagination
                total={totalPages}
                value={activePage}
                onChange={onPageChange}
            />
        </Center>
    )
}

export function SearchSkeleton({ count = 5 }: { count?: number }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Card key={index} shadow="none" padding="lg" radius="md" withBorder my="lg">
                    <Group wrap="nowrap" gap="lg">
                        {/* アバター部分のスケルトン */}
                        <Skeleton height={60} circle />

                        {/* テキスト部分のスケルトン */}
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                            <Skeleton height={24} width="60%" radius="xl" />
                        </div>
                    </Group>
                </Card>
            ))}
        </>
    );
}