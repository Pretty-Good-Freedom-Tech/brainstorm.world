Curated Widgets
=====

This NIP illustrates the use of the [Decentralized Lists Custom NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqymyv43k2mn5wfskc6t6v4jz6mrfwd68xnwasck) to declare a list of Widgets, to organize them into Widget Types, and for users to declare items on the list of Widgets.

# Declaration of the list of Widgets

```
{
  "kind": 9998,
  "tags": [
    ["names", "widget", "widgets"],
    ["description", "lorem ipsum"],
    ["required", "widgetType"],
    ["required", "owner"]
  ],
  "id": <id_for_list_of_widgets>
}
```

# Declaration of the list of Widget Types

```
{
  "kind": 9998,
  "tags": [
    ["names", "widget type", "widget types"],
    ["description", "lorem ipsum"],
    ["required","name"],
    ["optional","description"]
  ],
  "id": <id_for_list_of_widget_types>
}
```

# Declaration of the Orange and Purple Widget Types

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_widget_types>],
    ["name", "orange widgets"],
    ["description", "lorem ipsum"]
  ],
  "id": <id_for_the_orange_widget_type>
}
```

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_widget_types>],
    ["name", "purple widgets"],
    ["description", "lorem ipsum"]
  ],
  "id": <id_for_the_purple_widget_type>
}
```

# Declaration of a Specific Widget

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_widgets>],
    ["name", "Alice's purple widget"],
    ["widgetType", <id_for_the_purple_widget_type>],
    ["owner", <pubkey_Alice>],
  ],
  "id": <id_for_list_of_purple_widgets>
}
```
