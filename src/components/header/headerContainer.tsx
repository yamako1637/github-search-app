import HeaderPresentation from "./headerPresentor";

export default function HeaderContainer({ title }: { title: string }) {
    return <HeaderPresentation title={title} />;
}