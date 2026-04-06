import ErrorCardPresenter from "./errorCardPresenter";

/**
 * エラメッセージを表示するコンポーネント
 * @param  errorMessage string - エラーメッセージ
 * @returns 
 */
export default function ErrorCardContainer({ errorMessage, component }: { errorMessage: string, component?: React.ReactNode }) {
    return <ErrorCardPresenter errorMessage={errorMessage} component={component} />
}