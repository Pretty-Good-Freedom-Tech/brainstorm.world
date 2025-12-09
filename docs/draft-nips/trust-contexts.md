Trust Contexts
=====

This NIP proposes a simple, powerful and versatile method to categorize trust contexts using two fields: the _action_ field and the _category_ field. 

Each Trust Context is composed of one Trust Category and one Trust Context.

Examples of Trust Categories are: movies, dramas, comedies. Examples of Trust Actions are: to review, to write, to direct. Using different combinations of actions and categories, we are able to convey, for example, that we trust Alice to direct comedies, Bob to write science fiction, and Charlie to review movies.

# Curation of Actions and Categories

We will use Curated Lists to maintain a list of Actions and a list of Categories.

## Declaration of Actions:

```
{
  "kind": 9998,
  "tags": [
    ["names", "action", "actions"],
    ["description", "This list of actions is intended to be used as one of two components in Trust Contexts, as per NIP-xx, the other component being dategories."]
  ]
}
```

## Declaration of Categories:

```
{
  "kind": 9998,
  "tags": [
    ["names", "action", "actions"],
    ["description", "This list of actions is intended to be used as one of two components in Trust Contexts, as per NIP-xx, the other component being dategories."]
  ]
}
```

# Organization of Actions and Categories into graphs

It will be important to maintain hierarchical relationships for Actions and Categories. For example, we will want to make use of the fact that dramas is a subset of movies. Therefore, if our web of trust tells us that Charlie is highly skilled at revieweing movies, we will be able to assume that this skill applies to all subsets of movies, including dramas and comedies.

