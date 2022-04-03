import { Alert } from "@vkontakte/vkui";
import React from "react";
import { FC } from "react";

interface IErrorAlertProps {
    header: string,
    text?: string,
    onClose: ()=> void
};

export const ErrorAlert: FC<IErrorAlertProps> = ({ header, text, onClose }) => {
    return (<Alert
        onClose={onClose}
        header={header}
        text={text}
        actions={[{
            title: "Ладно",
            mode: "cancel",
            autoclose: true,
        }]}
    />
    );
}