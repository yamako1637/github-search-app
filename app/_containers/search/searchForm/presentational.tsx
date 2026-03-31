"use client";
import { Grid, Text } from '@mantine/core';

export default function SearchFormPresentation() {
    return (
        <Grid w="100%">
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <Text>Search Form</Text>
            </Grid.Col>
        </Grid>
    );
}