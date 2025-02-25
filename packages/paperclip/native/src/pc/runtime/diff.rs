use super::mutation::{
  Action, DeleteChild, InsertChild, Mutation, RemoveAttribute, ReplaceNode, SetAnnotations,
  SetAttribute, SetText, SourceChanged, UpdateSheet,
};
use super::virt::{Element, Fragment, Node, StyleElement, Text};
use crate::css::runtime::diff::diff as diff_css;
use std::cmp::{max, min};

/*
NOTE: diffing is pretty dumb now. May
want to make it smarter later on.

TODOS:

- [ ] need to diff & patch expression info
*/

struct Context<'a> {
  node_path: Vec<usize>,
  mutations: &'a mut Vec<Mutation>,
}

pub fn diff(a: &Node, b: &Node) -> Vec<Mutation> {
  let mut mutations: Vec<Mutation> = vec![];

  let mut context = Context {
    mutations: &mut mutations,
    node_path: vec![],
  };
  diff_node(a, b, &mut context);
  mutations
}

fn diff_node<'a>(a: &Node, b: &Node, context: &mut Context<'a>) {
  if let Node::Element(element1) = a {
    if let Node::Element(element2) = b {
      return diff_element(element1, element2, context);
    }
  } else if let Node::Fragment(fragment1) = a {
    if let Node::Fragment(fragment2) = b {
      return diff_fragment(fragment1, fragment2, context);
    }
  } else if let Node::Text(text1) = a {
    if let Node::Text(text2) = b {
      return diff_text(text1, text2, context);
    }
  } else if let Node::StyleElement(style_element1) = a {
    if let Node::StyleElement(style_element2) = b {
      return diff_style_element(style_element1, style_element2, context);
    }
  }

  context.mutations.push(Mutation::new(
    context.node_path.clone(),
    Action::ReplaceNode(ReplaceNode {
      replacement: b.clone(),
    }),
  ));
}

fn diff_element<'a>(a: &Element, b: &Element, context: &mut Context<'a>) {
  if (a.annotations != b.annotations) {
    context.mutations.push(Mutation::new(
      context.node_path.clone(),
      Action::SetAnnotations(SetAnnotations {
        value: b.annotations.clone(),
      }),
    ));
  }

  if a.tag_name != b.tag_name {
    context.mutations.push(Mutation::new(
      context.node_path.clone(),
      Action::ReplaceNode(ReplaceNode {
        replacement: Node::Element(b.clone()),
      }),
    ));
    return;
  }

  if a.source != b.source {
    context.mutations.push(Mutation::new(
      context.node_path.clone(),
      Action::SourceChanged(SourceChanged {
        property_name: "source".to_string(),
        new_source: b.source.clone(),
      }),
    ));
  }

  for (name, value) in a.attributes.iter() {
    let value2_option = b.attributes.get(name);

    match value2_option {
      Some(value2) => {
        if value != value2 {
          context.mutations.push(Mutation::new(
            context.node_path.clone(),
            Action::SetAttribute(SetAttribute {
              name: name.clone(),
              value: value2.clone(),
            }),
          ));
        }
      }
      None => {
        context.mutations.push(Mutation::new(
          context.node_path.clone(),
          Action::RemoveAttribute(RemoveAttribute { name: name.clone() }),
        ));
      }
    }
  }
  for (name, value) in b.attributes.iter() {
    let value1_option = a.attributes.get(name);

    match value1_option {
      None => {
        context.mutations.push(Mutation::new(
          context.node_path.clone(),
          Action::SetAttribute(SetAttribute {
            name: name.clone(),
            value: value.clone(),
          }),
        ));
      }
      _ => {}
    }
  }

  diff_children(&a.children, &b.children, context);
}
fn diff_fragment<'a>(a: &Fragment, b: &Fragment, context: &mut Context<'a>) {
  diff_children(&a.children, &b.children, context);
}

fn diff_text<'a>(a: &Text, b: &Text, context: &mut Context<'a>) {
  if (a.annotations != b.annotations) {
    context.mutations.push(Mutation::new(
      context.node_path.clone(),
      Action::SetAnnotations(SetAnnotations {
        value: b.annotations.clone(),
      }),
    ));
  }

  if a.source != b.source {
    context.mutations.push(Mutation::new(
      context.node_path.clone(),
      Action::SourceChanged(SourceChanged {
        property_name: "source".to_string(),
        new_source: b.source.clone(),
      }),
    ));
  }

  if a.value != b.value {
    context.mutations.push(Mutation::new(
      context.node_path.clone(),
      Action::SetText(SetText {
        value: b.value.clone(),
      }),
    ));
  }
}
fn diff_children<'a>(a: &Vec<Node>, b: &Vec<Node>, context: &mut Context<'a>) {
  for i in 0..min(a.len(), b.len()) {
    let mut node_path = context.node_path.clone();
    node_path.push(i);
    diff_node(
      &a[i],
      &b[i],
      &mut Context {
        node_path,
        mutations: context.mutations,
      },
    );
  }
  if a.len() > b.len() {
    for i in b.len()..a.len() {
      context.mutations.push(Mutation::new(
        context.node_path.clone(),
        Action::DeleteChild(DeleteChild { index: b.len() }),
      ))
    }
  } else if b.len() > a.len() {
    for i in a.len()..b.len() {
      context.mutations.push(Mutation::new(
        context.node_path.clone(),
        Action::InsertChild(InsertChild {
          index: i,
          child: b[i].clone(),
        }),
      ))
    }
  }
}

fn diff_style_element<'a>(a: &StyleElement, b: &StyleElement, context: &mut Context<'a>) {
  // skip if sheet is the same
  if (a.sheet == b.sheet) {
    if (a.source != b.source) {
      context.mutations.push(Mutation::new(
        context.node_path.clone(),
        Action::SourceChanged(SourceChanged {
          property_name: "source".to_string(),
          new_source: b.source.clone(),
        }),
      ));
    }

    return;
  }
  // let mutations = diff_css(&a.sheet, &b.sheet);

  // if (mutations.len() > 0) {
  //   context.mutations.push(Mutation::new(context.node_path.clone(), Action::UpdateSheet(UpdateSheet {
  //     mutations
  //   })))
  // }
  // will want to diff & patch styles later on
  context.mutations.push(Mutation::new(
    context.node_path.clone(),
    Action::ReplaceNode(ReplaceNode {
      replacement: Node::StyleElement(b.clone()),
    }),
  ));
}
