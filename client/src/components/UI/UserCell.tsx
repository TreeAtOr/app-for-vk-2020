import { calcInitialsAvatarColor, InitialsAvatar, SimpleCell } from "@vkontakte/vkui";
import React, { FC } from "react";

interface IUserCellProps {
    username: string;
    description?: string
};

export const UserCell: FC<IUserCellProps> = ({ username, description }) => {
    return (
        <SimpleCell
            description={description}
            before={<InitialsAvatar
                size={44}

                gradientColor={calcInitialsAvatarColor(username.length)}>
                {username.slice(0, 2)}
            </InitialsAvatar>}>
            {username}
        </SimpleCell>
    );
}