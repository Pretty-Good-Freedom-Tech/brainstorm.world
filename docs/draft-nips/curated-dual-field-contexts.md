Curated Dual Field Contexts
=====

This NIP proposes a simple, powerful and versatile method to categorize contexts using two fields: the _action_ field and the _category_ field. 

Each individual Dual Field Context is composed of one _action_ and one _category_. 

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

# Declarations of the list of Contexts and list of Context Types

Following the example of the [Curated Widgets NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqrmrw4exzar9vskhw6tyvajhguclexxk3), we can declare the list of Contexts, the list of Context Types, and two Context Types: _simple context type_ and _dual-field context type_. We will reserve a separate NIP, the Curated Contexts NIP, to go through this exercise.

# Utilization

## Contexts

Contexts have wide utility but are well illustrated by their role in the [Curated Contextual Ratings NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqxnrw4exzar9vskkxmmww3jhsar4v9kz6unpw35kuemne37t6y). A simple Context is referenced in the usual manner:

`["context", <id_for_some_specific_simple_context>],`

Whereas a dual-field context is referenced with a colon between the action and the category:

`["context", <id_for_to_program_action>:<id_for_back_end_programmer_category>],`

## Categories 

Categories can be used independently of dual field contexts to classify things: products, services, businesses, people, ideas, etc. 

