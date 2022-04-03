import { Card,Text } from "@vkontakte/vkui";
import React, { FC } from "react";
import { IPost } from "../../interfaces";
import { UserCell } from "./UserCell";

interface IPostCardProps extends IPost { };

export const PostCard: FC<IPostCardProps> = ({ author, content, createTime }) => {
    return (
        <Card mode="shadow">
            <div style={{ minHeight: 96, padding: 16 }}>
                <UserCell username={author} description={createTime.toLocaleString()} />
                <Text weight="regular" style={{ marginBottom: 16, paddingLeft: 16 }}>
                    {content.split('<br>').map((line) => <React.Fragment>{line}<br/></React.Fragment>)}
                </Text>

            </div>
        </Card>
    );
}