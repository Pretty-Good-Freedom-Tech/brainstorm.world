Curated Trust Contexts
=====

This NIP proposes a simple, powerful and versatile method to categorize trust contexts using two fields: the _action_ field and the _category_ field. 

Each Trust Context is composed of one _action_ and one _category_.

Examples of _actions_ are: to review, to write, to direct. Examples of _categories_ are: movies, dramas, comedies. Using different combinations of actions and categories, we are able to convey, for example, that we trust Alice to direct comedies, Bob to write science fiction, and Charlie to review movies.

# Curation of Actions and Categories

We will use Curated Lists to maintain a list of Actions and a list of Categories.

## Declaration of Action and Category lists:

We declare the lists of actions and categories using kind 9998 events, as per the Curated Lists NIP:

```
{
  "kind": 9998,
  "tags": [
    ["names", "action", "actions"],
    ["description", "This list of actions is intended to be used as one of two components in Trust Contexts, as per NIP-xx, the other component being categories."]
  ],
  "id": <id_for_list_of_actions>
}
```

```
{
  "kind": 9998,
  "tags": [
    ["names", "category", "categories"],
    ["description", "This list of categories is intended to be used as one of two components in Trust Contexts, as per NIP-xx, the other component being actions."]
  ],
  "id": <id_for_list_of_categories>
}
```

## Declaring specific Actions and Categories

Declare _to direct_ as an item on the list of actions:

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_actions>],
    ["name", "to direct"],
    ["description", "lorem ipsum"]
  ],
  "id": <id_for_action_to_direct>
}
```
Do likewise for other actions: _to write_, _to review_, etc.

Declare _movies_ as an item on the list of categories:

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_categories>],
    ["name", "movies"],
    ["description", "lorem ipsum"]
  ],
  "id": <id_for_category_movies>
}
```

Do likewise for other categories: _comedies_, _dramas_, etc.

# Organization of Actions and Categories into hierarchies

It will be important to maintain hierarchical relationships for Actions and Categories. For example, we will want to make use of the fact that dramas is a subset of movies. Therefore, if our web of trust tells us that Charlie is highly skilled at revieweing movies, we will be able to assume that this skill applies to all subsets of movies, including dramas and comedies.

(section incomplete; need to discuss how to do this. Maybe make a list of relationships, with one relationship called subset; make a list of category relationships; and users can declare dramas as a subset of movies by adding an item to the list of category relationships.)

We first create a list of relationship types:

```
{
  "kind": 9998,
  "tags": [
    ["names", "relationship type", "relationship types"],
    ["description", "lorem ipsum"],
    ["required", "direction"] // directions: forward, reverse, bidirectional, none; specify these details in the description
  ],
  "id": <id_for_list_of_relationship_types>
}
```

Then we create a relationship type called _subset_:

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_relationship_types>],
    ["name", "subset"],
    ["description", "lorem ipsum"],
    ["direction", "forward"],
    ["required", "nodeFrom"],
    ["required", "nodeTo"]
  ],
  "id": <id_for_subset>
}
```

Create the list of relationships:

```
{
  "kind": 9998,
  "tags": [
    ["names", "relationship", "relationships"],
    ["description", "lorem ipsum"],
    ["required", "nodeFrom"],
    ["required", "relationship_type"],
    ["required", "nodeTo"]
  ],
  "id": <id_for_list_of_relationships>
}
```

Finally, here's how we add that dramas is a subset of movies:

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_relationships>],
    ["relationship_type", <id_for_subset>],
    ["description", "lorem ipsum"],
    ["nodeFrom", <id_for_dramas>],
    ["nodeTo", <id_for_movies>]
  ]
}
```

# Utilization

(to be completed. Create a way for Alice to rate Bob along a given context. We will need to create a new list called attestations or ratings or something like that, with fields: rater, ratee, rating, context. Probably also a field for ratingType, which specifies whether rating is binary, 0-5 star, etc.)
