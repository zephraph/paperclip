import {
  AppState,
  mergeBoxesFromClientRects,
  centerTransformZoom,
  IS_WINDOWS
} from "../state";
import { produce, current } from "immer";
import { Action, ActionType } from "../actions";
import { clamp } from "lodash";

const PAN_SPEED = 0.01;
const ZOOM_SENSITIVITY = IS_WINDOWS ? 2500 : 250;
const PAN_X_SENSITIVITY = IS_WINDOWS ? 0.05 : 1;
const PAN_Y_SENSITIVITY = IS_WINDOWS ? 0.05 : 1;
const MIN_ZOOM = 1;
const MAX_ZOOM = 6400 / 100;

export default (state: AppState, action: Action) => {
  switch (action.type) {
    case ActionType.RENDERER_INITIALIZED: {
      return produce(state, newState => {
        newState.rendererElement = action.payload.element as any;
      });
    }
    case ActionType.RECTS_CAPTURED: {
      return produce(state, newState => {
        newState.boxes = mergeBoxesFromClientRects(
          newState.boxes,
          action.payload
        );
      });
    }
    case ActionType.CANVAS_PAN_START: {
      return produce(state, newState => {
        newState.canvas.panning = true;
      });
    }
    case ActionType.CANVAS_PAN_END: {
      return produce(state, newState => {
        newState.canvas.panning = false;
      });
    }
    case ActionType.CANVAS_PANNED: {
      const {
        delta: { x: deltaX, y: deltaY },
        metaKey,
        mousePosition,
        size
      } = action.payload;

      const delta2X = deltaX * PAN_X_SENSITIVITY;
      const delta2Y = deltaY * PAN_Y_SENSITIVITY;

      return produce(state, newState => {
        const transform = newState.canvas.transform;

        if (metaKey) {
          newState.canvas.transform = centerTransformZoom(
            newState.canvas.transform,
            {
              x: 0,
              y: 0,
              width: size.width,
              height: size.height
            },
            clamp(
              transform.z + (transform.z * deltaY) / ZOOM_SENSITIVITY,
              MIN_ZOOM,
              MAX_ZOOM
            ),
            mousePosition
          );
        } else {
          newState.canvas.transform.x = transform.x - delta2X; // clamp(transform.x - delta2X, 0, size.width * transform.z - size.width);
          newState.canvas.transform.y = transform.y - delta2Y; // clamp(transform.y - delta2Y, 0, size.height * transform.z - size.height);
        }

        newState.canvas.transform.x = clamp(
          newState.canvas.transform.x,
          -size.width * transform.z + size.width,
          size.width * transform.z - size.width
        );
        newState.canvas.transform.y = clamp(
          newState.canvas.transform.y,
          -size.height * transform.z + size.height,
          size.height * transform.z - size.height
        );
      });
    }
    case ActionType.RENDERER_CHANGED: {
      return produce(state, newState => {
        newState.virtualRootNode = action.payload.virtualRoot;
      });
    }
  }
  return state;
};
