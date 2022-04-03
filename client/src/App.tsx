import { AdaptivityProvider, AppRoot, ConfigProvider, ModalRoot, Panel, SplitCol, SplitLayout, View } from '@vkontakte/vkui';
import "@vkontakte/vkui/dist/vkui.css";
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CreatePostModal } from './components/CreatePostModal';
import { LoginPanel } from './components/LoginPanel';
import { PostsPanel } from './components/PostsPanel';
import { ErrorAlert } from './components/UI/ErrorAlert';
import { useClient } from './hooks/useClient';
import { AppActionTypes } from './redux/actions';
import { IAppState } from './redux/reducer';
import { AppDispatch, RootState } from './redux/store';


function App() {
  const [activePanel, setActivePanel] = useState<string>("greetings");
  const [activeModal, setActiveModal] = useState<string>();

  const client = useClient()
  const { posts, username, popup } = useSelector<RootState, IAppState>((state) => state)
  const [popupShown, setPopupShown] = useState<boolean>(false);

  useEffect(() => {
    client.refresh()
    client.updatePosts()
  }, [])

  useEffect(() => {
    if (activePanel === "greetings" && username) setActivePanel("posts")
  }, [username])

  useEffect(() => {
    setPopupShown(true)
  }, [popup])

  return (
    <ConfigProvider>
      <AdaptivityProvider >
        <AppRoot>
          <View activePanel={activePanel}>
            <Panel id="posts">
              <SplitLayout popout={
                popupShown && popup ? <ErrorAlert {...popup} onClose={() => setPopupShown(false)} /> : null
              }
                modal={
                  <ModalRoot
                    activeModal={activeModal}>
                    <CreatePostModal
                      id="create-post"
                      onClose={() => setActiveModal(undefined)}
                      onSubmit={(content) => {
                        setActiveModal(undefined)
                        client.createPost(content)
                      }} />
                  </ModalRoot>}>
                <SplitCol>
                  <PostsPanel
                    posts={posts}
                    username={username}
                    onLoginButton={() => setActivePanel("greetings")}
                    onLogoutButton={() => client.logout()}
                    onCreateButton={() => setActiveModal("create-post")} />
                </SplitCol>
              </SplitLayout>
            </Panel>
            <Panel id="greetings" centered>
              <LoginPanel
                onClose={() => {
                  client.updatePosts()
                  setActivePanel("posts")
                }}
                onSubmit={(username) => {
                  username && client.login(username)
                  setActivePanel("posts")
                }}
              />
            </Panel>
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider >
  );
}

export default App;

