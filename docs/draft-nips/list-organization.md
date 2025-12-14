Graphical Organization of Decentralized List Items
=====

`draft`, `optional`

This NIP augments the [Decentralized Lists NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqqzdjx2cm9de68yctvd9ax2epdd35hxarnwrn9hx) with a mechanism to organize list items using a _directed acyclic graph_.

# Example: Organization of a list of cities

As an example, we will consider a decentralized list of cities which will be organized by geography and by continent.

![List Items Organized using a DAG](https://i.nostr.build/rrZ7OfeIGndEI73o.png)

# Sets, subsets, and specific instances

We require two new Lists: a list of _sets_ and a list of _relationship types_. And we will declare two specific types of relationships: _subest_ and _specific instance_. Note that the list of relationship types and the _subest_ relationship type are used to build hierarchies for other NIPs, such as the [Curated Dual Field Contexts NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqxmrw4exzar9vskkgatpdskkv6t9d3jz6cm0de6x27r5wv63qndn). Once these are declared for one purpose, they can and should be reused: _they do not need to be redeclared_.

If not already declared by someone else in our community, we declare these lists using kind 9998 events, as per the Decentralized Lists NIP:

```
{
  "kind": 9998,
  "tags": [
    ["names", "set", "sets"],
    ["description", "lorem ipsum"]
  ],
  "id": <id_for_list_of_relationship_types>
}
```

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

Then we create a relationship type called _specific instance_:

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_relationship_types>],
    ["name", "specific instance"],
    ["description", "lorem ipsum"],
    ["direction", "forward"],
    ["required", "nodeFrom"],
    ["required", "nodeTo"]
  ],
  "id": <id_for_specific_instance>
}
```

# Example: 

We will use the tools declared above to organize a list of cities into the hierarchy depicted in the image.

(NIP under construction.)
