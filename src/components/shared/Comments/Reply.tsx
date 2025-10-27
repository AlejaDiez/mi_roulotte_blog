import { timeAgo } from "@utils/datetime";
import { render } from "preact";

interface Props {
    id: string;
    username: string;
    content: string;
    lastUpdatedAt?: Date;
}

const Component = ({ id, username, content, lastUpdatedAt }: Props) => {
    return (
        <div
            id={id}
            className="reply bg-muted flex w-full scroll-m-(--space-y) flex-col items-start justify-start">
            <div className="reply-header text-normal text-muted-foreground w-full px-4 pt-3 pb-2 font-light select-none">
                <strong className="font-semibold">{username}</strong>&nbsp;
                {lastUpdatedAt ? timeAgo(lastUpdatedAt) : "ahora"}
            </div>
            <p className="reply-content text-normal w-full px-4 pb-3 text-justify whitespace-pre-line">
                {content}
            </p>
        </div>
    );
};

export const mount = ({ id, username, content, lastUpdatedAt }: Props) => {
    const wrapper = document.createElement("template");

    render(
        <Component id={id} username={username} content={content} lastUpdatedAt={lastUpdatedAt} />,
        wrapper
    );
    return wrapper.children[0] as HTMLElement;
};

export default Component;
