import { Button, CardGrid, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import React, { FC } from "react";
import { IPost } from "../interfaces"
import { PostCard } from "./UI/PostCard";
import { UnknownUserCell } from "./UI/UnknownUserCell";
import { UserCell } from "./UI/UserCell";

interface IPostsPanelProps {
    posts: IPost[],
    username?: string,
    onLoginButton: () => void,
    onLogoutButton: () => void
    onCreateButton: () => void
};

export const PostsPanel: FC<IPostsPanelProps> = ({ posts, username, onLoginButton, onLogoutButton, onCreateButton }) => {
    const headerContent = username ? <UserCell username={username} /> : <UnknownUserCell />
    const headerButton = username ?
        <PanelHeaderButton style={{ marginLeft: "auto" }} onClick={onLogoutButton}>Выйти</PanelHeaderButton> :
        <PanelHeaderButton style={{ marginLeft: "auto" }} onClick={onLoginButton}>Войти</PanelHeaderButton>

    return (<>
        <PanelHeader left={headerContent}>
            {headerButton}
        </PanelHeader>
        <CardGrid size="l" style={{ padding: 16 }}>
            {username && <Button size='l' stretched mode="primary" onClick={onCreateButton}>Новый пост</Button>}
            {posts.map(post => <PostCard key={post.id} {...post} />)}
        </CardGrid>
    </>
    );
}