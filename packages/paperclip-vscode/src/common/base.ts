export type BaseAction<TType extends string, TPayload = undefined> = {
  type: string;
  payload: TPayload;
};

export const actionCreator = <TAction extends BaseAction<any, any>>(
  type: TAction["type"]
) => (payload: TAction["payload"]) => ({
  type,
  payload
});
