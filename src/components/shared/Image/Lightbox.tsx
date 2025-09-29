import { render } from "preact";

interface Props {
    url: string;
    caption?: string;
}

const Component = ({ url, caption }: Props) => {
    const clickCallback = (ev: any) => {
        const lightbox = (ev.currentTarget as HTMLElement).closest(".lightbox")!;

        document.body.removeChild(lightbox);
        document.body.style.overflow = "";
    };

    return (
        <div className="lightbox bg-background fixed top-0 left-0 z-[90] flex h-full w-full cursor-default flex-col items-center justify-center gap-2 overflow-hidden p-(--space-y) select-none">
            <div className="animate-clip-bottom animation-delay-500 block w-full content-center overflow-hidden">
                <img
                    src={url}
                    alt={caption}
                    decoding="async"
                    className="img bg-muted mx-auto aspect-auto h-auto max-h-full w-auto max-w-full object-contain"
                />
            </div>
            {caption && (
                <span className="caption text-normal text-foreground-variant animate-fade animation-delay-[375ms] text-center">
                    {caption}
                </span>
            )}
            <button
                onClick={clickCallback}
                className="button button-fill-primary animate-clip-left absolute top-3 right-3">
                <i className="ibm-close"></i>
            </button>
        </div>
    );
};

export const mount = ({ url, caption }: Props) => {
    const wrapper = document.createElement("template");

    render(<Component url={url} caption={caption} />, wrapper);
    return wrapper.children[0] as HTMLElement;
};

export default Component;
