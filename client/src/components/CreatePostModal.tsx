import { Button, ButtonGroup, FormItem, ModalPage, ModalPageHeader, Textarea } from "@vkontakte/vkui";
import React, { FC, useState } from "react";

interface ICreatePostModalProps {
    onClose: () => void
    onSubmit: (content: string) => void
    id: string
};

export const CreatePostModal: FC<ICreatePostModalProps> = ({ id, onClose, onSubmit }) => {
    const [content, setContent] = useState<string>("");
    return (
        <ModalPage
            style={{ padding: 20 }}
            id={id}
            onClose={onClose}
            settlingHeight={100}
            header={
                <ModalPageHeader>Создание поста</ModalPageHeader>
            }
        >
            <FormItem>
                <Textarea value={content} onChange={(ev) => setContent(ev.target.value)} rows={300} placeholder="Важные мысли мирового маштаба" />
            </FormItem>
            <ButtonGroup style={{ margin: 20 }}>
                <Button mode="secondary" onClick={onClose}>Отмена</Button>
                <Button mode="primary" onClick={() => onSubmit(content.split('\n').join('<br>'))}>Опубликовать</Button>
            </ButtonGroup>
        </ModalPage>
    );
}