import { Button, FormItem, FormLayout, Input, PanelHeader, PanelHeaderClose, Title } from "@vkontakte/vkui";
import React, { FC, useState } from "react";


interface ILoginPanelProps {
    onClose: () => void,
    onSubmit: (value?: string) => void,
  };
  
  export const LoginPanel: FC<ILoginPanelProps> = ({ onClose, onSubmit }) => {
    const [username, setUsername] = useState<string>("");
    return (<>
      <PanelHeader
        left={<PanelHeaderClose onClick={onClose} />}
      >
        Добро пожаловать на борт
      </PanelHeader>
      <Title level='1' style={{ marginBottom: "20px" }}>
        Привет!
        Начнём?
      </Title>
      <FormLayout style={{ marginBottom: "20px" }}>
        <FormItem top="Ваше потрясающее имя">
          <Input onChange={(ev) => setUsername(ev.target.value)} type="text" placeholder="VkUser3000" />
        </FormItem>
      </FormLayout>
      <Button
        size="l"
        style={{ marginBottom: "10px" }}
        onClick={() => onSubmit(username)}
      >Приступить</Button>
      <Button
        mode="tertiary"
        size="l"
        onClick={() => onSubmit()}
      >Продолжить как гость</Button>
    </>
    );
  }