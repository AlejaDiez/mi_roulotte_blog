import { timeAgo } from "@utils/datetime";
import { render } from "preact";

interface Props {
    id: string;
    username: string;
    lastUpdatedAt?: Date;
    content: string;
    children?: preact.ComponentChildren;
}

export const MountReplyBanner = (id: string, username: string) => {
    const wrapper = document.createElement("template");
    const form = document.body.querySelector(".comments-form")!;

    const clickCallback = () => {
        form.querySelector("& > .reply-banner")?.remove();
    };

    clickCallback();
    render(
        <blockquote
            role="region"
            className="reply-banner bg-blue-10 dark:bg-blue-90 border-blue-20 dark:border-blue-70 relative w-full border-l-1 px-3 py-4"
            aria-label={`En respuesta a ${username}`}
            aria-live="polite">
            En respuesta a {username}
            <button
                onClick={clickCallback}
                className="button button-accent absolute top-0 right-0"
                aria-label="Cerrar respuesta"
                tabindex={-1}>
                <i className="ibm-close" aria-hidden="true"></i>
            </button>
            <input type="hidden" name="repliedTo" value={id} readonly />
        </blockquote>,
        wrapper
    );
    form.insertBefore(wrapper.children[0] as HTMLElement, form.firstChild);
};

const Component = ({ id, username, lastUpdatedAt, content, children }: Props) => {
    return (
        <div
            id={id}
            role="listitem"
            className="comment border-border group relative flex w-full scroll-m-(--space-y) flex-col items-start justify-start border">
            <div className="comment-header text-normal text-foreground w-full px-4 pt-3 pb-2 font-light select-none">
                <strong className="font-semibold">{username}</strong>&nbsp;
                <span>{lastUpdatedAt ? timeAgo(lastUpdatedAt) : "ahora"}</span>
            </div>
            <p className="comment-content text-normal w-full px-4 pb-3 text-justify whitespace-pre-line">
                {content}
            </p>
            <div
                role="group"
                children={children}
                className="comment-replies border-border before:font-[IBM Plex Sans] relative mt-[0.46875rem] flex w-full flex-col items-start justify-start gap-[calc(var(--space)*2)] border-t-1 px-4 py-3 pt-[calc(0.46875rem+0.75rem)] before:absolute before:top-0 before:left-2 before:translate-y-[-50%] before:bg-[var(--color-background)] before:px-2 before:text-[0.75rem] before:leading-[calc(1/0.75)] before:font-normal before:tracking-[0.1em] before:text-[var(--color-muted-foreground-variant)] before:content-['Respuestas'] empty:hidden"
                aria-label="Respuestas"
            />
        </div>
    );
};

export const mount = ({ id, username, lastUpdatedAt, content, children }: Props) => {
    const wrapper = document.createElement("template");

    render(
        <Component
            id={id}
            username={username}
            lastUpdatedAt={lastUpdatedAt}
            content={content}
            children={children}
        />,
        wrapper
    );
    return wrapper.children[0] as HTMLElement;
};

export default Component;
