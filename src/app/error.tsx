"use client";

import { useEffect } from "react";
import {
    Container,
    Stack,
    Button
} from "@mantine/core";
import ErrorCardContainer from "@/components/errorCard";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // エラーをログに記録する
        console.error(error);
    }, [error]);

    return (
        <Container size="sm" py="xl" mt={"xl"}>
            <Stack gap="md">
                <ErrorCardContainer
                    errorMessage={"問題が発生しました"}
                    component={
                        <Button w={"100%"} onClick={() => reset()} variant="outline" mt="md">
                            再実行
                        </Button>
                    }
                />
            </Stack>

        </Container>
    );
}