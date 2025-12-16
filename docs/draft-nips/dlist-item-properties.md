DList Item Properties
=====

We augment the [Decentralized Lists NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqqzdjx2cm9de68yctvd9ax2epdd35hxarnwrn9hx) with a method to curate the properties that individual list items are expected to have. The list of properties will itself be a decentralized list.

# Background and motivation

According to the Decentralized Lists NIP, declaration of a list may include specification of one or more tags that are required (or optional) in list items. For example, the declaration of the list of _dogs_ might specify that _name_ ("Spot") and _breed_ ("Irish Setter") are required tags when adding items to this list:

```json
{
  "kind": 9998,
  "tags": [
    ["names", "dog", "dogs"],
    ["required", "name"],
    ["required", "breed"]
  ],
  "id": <id_for_list_of_digs>
}
```

These two tags, name and breed, are expected to be strings. This method has several disadvantages:
- Tag values can only be strings; there is no clear method to specify when to use non-string data types (number, boolean, object, array, null)
- The list of tags is fixed, not able to grow over time
- There is no method for the web of trust to curate the list of tags for a given list
- Tags are not reusable

This NIP addresses these disadvantages through the use of items on the list of _properties_ in place of the kind 9998 _required_ tag. A relationship using the specialized relationship type, _is a property of_, is used to associate specific properties with specific lists.

# The list of p_properties_ and the relationship type: _is a property of_

Declare the list of Properties:

```json
{
  "kind": 9998,
  "tags": [
    ["names", "property", "properties"],
    ["description", "type must be one of the standard json types: string, number, boolean, null, object, array."],
    ["required", "name"],
    ["required", "type"],
    ["optional", "allowed_value"]
  ],
  "id": <id_for_list_of_properties>
}
```

Create a relationship type called _is a property of_

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_relationship_types>],
    ["name", "is a property of"],
    ["description", "lorem ipsum"],
    ["direction", "forward"],
    ["required", "nodeFrom"],
    ["required", "nodeTo"]
  ],
  "id": <id_for_is_a_property_of>
}
```

# Example: Add _breed_ as a property to the list of _dogs_

Suppose the list of _dogs_ is declared with name and breed as the only required tags, as in the example above.

As alternative to including breed as a required tag, as in the above example, is to declare breed as a property, as in the example below:

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_properties>],
    ["type", "string"],
    ["name", "breed"],
    ["allowed_value", "Irish Setter"],
    ["allowed_value", "Golden Retriever"],
    ["allowed_value", "poodle"]
  ],
  "id": <id_for_breed>
}
```

Attach the _breed_ property to the list of _dogs_

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_relationships>],
    ["relationship_type", <id_for_is_a_property_of>],
    ["description", "lorem ipsum"],
    ["nodeFrom", <id_for_breed>],
    ["nodeTo", <id_for_dogs>]
  ]
}
```
