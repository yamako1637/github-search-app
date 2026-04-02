import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MantineProvider } from "@mantine/core";
import HeaderPresentation from "./presentational";

// MantineProviderでラップ
const renderWithProvider = (ui: React.ReactNode) => {
    return render(
        <MantineProvider>
            {ui}
        </MantineProvider>
    );
};

// ヘッダーのタイトル
const headerTitle = "Github Search App";
const topPath = "/search";

describe("headerPresentation", () => {
    it("渡されたタイトルが正しくレンダリングされること", () => {
        renderWithProvider(<HeaderPresentation title={headerTitle} />);

        // headerTitleの内容が画面内に存在するか
        const headerElement = screen.getByText(headerTitle);
        expect(headerElement).toBeInTheDocument();
    });

    it("headerタグが適切なクラスを持っていること", () => {
        const { container } = renderWithProvider(<HeaderPresentation title={headerTitle} />);

        // header要素を取得（querySelectorまたはroleで取得）
        const headerTag = container.querySelector("header");

        // headerタグが存在するか
        expect(headerTag).toBeInTheDocument();

        // CSS Modulesのクラスが適用されているか
        expect(headerTag).toHaveClass("header");
    });

    it("ヘッダーのリンクが正しいhref属性を持っていること", () => {
        renderWithProvider(<HeaderPresentation title={headerTitle} />);

        // リンク要素を取得
        const linkElement = screen.getByRole("link", { name: headerTitle });

        // リンクが存在するか
        expect(linkElement).toBeInTheDocument();

        // href属性が正しいか
        expect(linkElement).toHaveAttribute("href", topPath);
    });
});