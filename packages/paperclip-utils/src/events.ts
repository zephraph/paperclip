// TODO  - move all non-specific event stuff to payload, or data prop so that
// event can remain ephemeral.

import { Node } from "./ast";
import { SourceLocation } from "./base-ast";
import { Mutation } from "./virt-mtuation";
import { VirtualNode } from "./virt";
import { PCExports } from "./exports";

export enum EngineEventKind {
  Loading = "Loading",
  Loaded = "Loaded",
  Updating = "Updating",
  Evaluated = "Evaluated",
  Error = "Error",
  NodeParsed = "NodeParsed",
  Diffed = "Diffed",
  AddedSheets = "AddedSheets"
}

export enum EngineErrorKind {
  Graph = "Graph",
  Runtime = "Runtime"
}

export enum ParseErrorKind {
  EndOfFile = "EndOfFile"
}

type BaseEngineEvent<KKind extends EngineEventKind> = {
  kind: KKind;
};

export type EvaluatedEvent = {
  uri: string;
  allDependencies: string[];
  sheet: any;
  preview: VirtualNode;
  exports: PCExports;
  imports: Record<string, PCExports>;
} & BaseEngineEvent<EngineEventKind.Evaluated>;

export type DiffedEvent = {
  uri: string;
  allDependencies: string[];

  // TODO - needs to be sheetMutations
  sheet: any;

  mutations: Mutation[];
} & BaseEngineEvent<EngineEventKind.Diffed>;

export type NodeParsedEvent = {
  uri: string;
  node?: Node;
} & BaseEngineEvent<EngineEventKind.NodeParsed>;

export type AddedSheetsEvent = {
  uri: string;
  sheets: Record<string, any>;
  allDependencies: string[];
} & BaseEngineEvent<EngineEventKind.AddedSheets>;

export type BaseEngineErrorEvent<TErrorType extends EngineErrorKind> = {
  uri: string;
  errorKind: TErrorType;
} & BaseEngineEvent<EngineEventKind.Error>;

export enum GraphErrorInfoType {
  Syntax = "Syntax",
  IncludeNotFound = "IncludeNotFound",
  NotFound = "NotFound"
}

type BaseGraphErrorInfo<KKind extends GraphErrorInfoType> = {
  kind: KKind;
};

export type SyntaxGraphErrorInfo = {
  kind: ParseErrorKind;
  message: string;
  location: SourceLocation;
} & BaseGraphErrorInfo<GraphErrorInfoType.Syntax>;

export type IncludNotFoundErrorInfo = {
  uri: string;
  message: string;
  location: SourceLocation;
} & BaseGraphErrorInfo<GraphErrorInfoType.IncludeNotFound>;

export type GraphErrorInfo = SyntaxGraphErrorInfo | IncludNotFoundErrorInfo;

export type GraphErrorEvent = {
  info: GraphErrorInfo;
  message: String;
} & BaseEngineErrorEvent<EngineErrorKind.Graph>;

export type RuntimeErrorEvent = {
  uri: string;
  message: string;
  location: SourceLocation;
} & BaseEngineErrorEvent<EngineErrorKind.Runtime>;

export type LoadingEvent = {
  uri: string;
} & BaseEngineEvent<EngineEventKind.Loading>;

export type LoadedEvent = {
  uri: string;
  sheet: any;
  preview: VirtualNode;
  allDependencies: string[];
  imports: Record<string, PCExports>;
  importedSheets: Record<string, any>;
} & BaseEngineEvent<EngineEventKind.Loaded>;

export type UpdatingEvent = {
  uri: string;
} & BaseEngineEvent<EngineEventKind.Updating>;

export type EngineErrorEvent = GraphErrorEvent | RuntimeErrorEvent;
export type EngineEvent =
  | EvaluatedEvent
  | EngineErrorEvent
  | AddedSheetsEvent
  | NodeParsedEvent
  | LoadingEvent
  | LoadedEvent
  | UpdatingEvent
  | DiffedEvent;
