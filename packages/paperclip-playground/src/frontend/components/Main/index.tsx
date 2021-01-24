import React, { memo, useMemo, useRef, useState } from "react";
import { MainBase as DesignModeMainBase } from "paperclip-designer/src/components/Main";
import { AppStoreContext as DesignModeAppStoreContext } from "paperclip-designer/src/contexts";
import history from "paperclip-designer/src/dom-history";
import { withAppStore } from "../../hocs/withAppStore";
import { useAppStore } from "../../hooks/useAppStore";
import { MainToolbar } from "./Toolbar";
import * as styles from "./index.pc";
import { CodeMode } from "./CodeMode";
import { APP_LOCATIONS, canEditFile, canPreviewFile, canUpload, matchesLocationPath } from "../../state";
import { Projects } from "./Projects";
import { Route, Router, Switch } from "react-router";
import { filesDropped } from "../../actions";
import { isPaperclipFile } from "paperclip-utils";
import mime from "mime-types";

export const Main = withAppStore(() => {
  const store = useAppStore();
  const { compact, playgroundUi } = store.state;
  if (compact) {
    return <Editor />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route path={APP_LOCATIONS.PROJECT}>
          <Editor />
        </Route>
        <Route path={APP_LOCATIONS.PROJECTS}>
          <Projects />
        </Route>
        <Route path="/">
          <Editor />
        </Route>
      </Switch>
    </Router>
  );
});

const Editor = memo(() => {
  const [draggingFileOver, setDraggingFileOver] = useState(false);
  const ref = useRef<HTMLDivElement>();
  const store = useAppStore();
  const { dispatch, state } = store;
  const { compact } = state;
  const onDragEnter = (event: React.DragEvent<any>) => {
    setDraggingFileOver(true);
    event.preventDefault();
    return false;
  };
  const onDrop = (event: React.DragEvent<any>) => {
    event.preventDefault();
    const allowed = canUpload(event.dataTransfer.files);
    setDraggingFileOver(false);
    if (!allowed) {
      return alert(
        `Whoops, can't upload that. Make sure you're only uploading images that are under 2 MB`
      );
    }

    if (allowed) {
      dispatch(filesDropped(event.dataTransfer.files));
    }
  };

  const onFileDropClick = () => {
    setDraggingFileOver(false);
  };

  const onDragLeave = (event: React.DragEvent<any>) => {
    setDraggingFileOver(false);
  };
  return (
    <styles.Container
      ref={ref}
      onDragOver={onDragEnter}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      {!compact && <MainToolbar />}
      <styles.EditorContainer compact={compact}>
        <CodeMode />
        <DesignModeAppStoreContext.Provider value={store}>
          <Preview />
        </DesignModeAppStoreContext.Provider>
      </styles.EditorContainer>
      <styles.FileDrop
        onClick={onFileDropClick}
        visible={draggingFileOver}
        cantUpload={false}
      />
    </styles.Container>
  );
});


const Preview = () => {
  const {state} = useAppStore();

  const currentUri = state.designer.ui.query.currentFileUri;

  const content: Blob = state.shared.documents[currentUri] as Blob;

  const objectUrl = useMemo(() => {
    if (content instanceof Blob) {
      return canPreviewFile(currentUri) && !isPaperclipFile(currentUri) && URL.createObjectURL(content);
    } else {
      return `data:${mime.lookup(currentUri)};utf8,${encodeURIComponent(content)}`;
    }
  }, [content]);

  if (!canPreviewFile(currentUri)) {
    return <styles.MediaPreview>
      <span>Unable to preview this file</span>
    </styles.MediaPreview>
  }

  if (isPaperclipFile(currentUri))  {
    return <DesignModeMainBase />
  }


  return <styles.MediaPreview>
    <img src={objectUrl} />
  </styles.MediaPreview>
}