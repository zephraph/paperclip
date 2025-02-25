import { AppState, IS_WINDOWS, updateShared } from "../state";
import { produce } from "immer";
import Automerge from "automerge";
import { Action, ActionType, ExternalActionType } from "../actions";

export const sharedReducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case ExternalActionType.CONTENT_CHANGED: {
      if (!state.shared.documents[action.payload.fileUri]) {
        return state;
      }
      return updateShared(state, {
        documents: produce(state.shared.documents, documents => {
          for (const { rangeOffset, rangeLength, text } of action.payload
            .changes) {
            const doc = String(documents[action.payload.fileUri]);
            documents[action.payload.fileUri] =
              doc.substr(0, rangeOffset) +
              text +
              doc.substr(rangeOffset + rangeLength);
          }
        })
      });
    }
    case ActionType.PC_FILE_OPENED: {
      if (state.shared.documents[action.payload.uri]) {
        return state;
      }
      return updateShared(state, {
        documents: produce(state.shared.documents, documents => {
          documents[action.payload.uri] = action.payload.document;
        })
      });
    }
  }
  return state;
};
