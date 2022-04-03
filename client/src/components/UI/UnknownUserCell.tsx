import { Avatar, SimpleCell } from "@vkontakte/vkui";
import React, { FC } from "react";

interface IUnknownUserCellProps { };

export const UnknownUserCell: FC<IUnknownUserCellProps> = (props) => {
  return (
    <SimpleCell
      before={<Avatar
        size={44}
        src="https://www.svgrepo.com/show/80265/spy.svg">
      </Avatar>}>
      Таинственный незнакомец
    </SimpleCell>
  );
}