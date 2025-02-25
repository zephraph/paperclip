import {
  DependencyContent,
  LoadedData,
  LoadedDataEmitted
} from "paperclip-utils";
import {
  getSuggestionContext,
  SuggestContextKind,
  HTMLAttributeStringValueContext
} from "paperclip-autocomplete";
import { Suggestion } from "./base";

type Content = {
  data: LoadedData;
  ast: DependencyContent;
  imports: Record<string, LoadedData>;
};

export const getSuggestions = (
  text: string,
  data: LoadedData,
  ast: DependencyContent,
  imports: Record<string, LoadedData>
) => {
  const content: Content = { data, ast, imports };

  const context = getSuggestionContext(text);

  switch (context.kind) {
    case SuggestContextKind.HTML_STRING_ATTRIBUTE_VALUE:
      return getAttrValueSuggestions(content, context);
  }

  return [];
};

const getAttrValueSuggestions = (
  content: Content,
  context: HTMLAttributeStringValueContext
) => {
  if (/^(class|className)$/.test(context.attributeName)) {
    return getClassNameSuggestions(content);
  }

  return [];
};

const getClassNameSuggestions = (content: Content): Suggestion[] => {
  return [
    {
      label: "A",
      insertText: "A",
      location: { start: 0, end: 10 }
    }
  ];
};
