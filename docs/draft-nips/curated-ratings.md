Curated Ratings
=====

`draft`, `optional`

This NIP uses the [Curated Lists NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqqzdjx2cm9de68yctvd9ax2epdd35hxarnwrn9hx) to establish a simple, flexible, and powerful method to create _ratings_ that are organized into _rating_types_.

We will suggest three rating types: 5 star, 0-100, and pairwise comparision, and will show an example rating for each of these types.

# Declaration of the lists of Ratings and Rating Types

### Declation of the list of Ratings

We declare the list of ratings using a kind 9998 event, as per the Curated Lists NIP:

```
{
  "kind": 9998,
  "tags": [
    ["names", "rating", "ratings"],
    ["description", "lorem ipsum"],
    ["required","ratingType"],
    ["optional","context"]
  ],
  "id": <id_for_list_of_ratings>
}
```

Note the only universally required tag is the ratingType. As demonstrated below, declaration of a ratingType will typically specify additional tags (required, optional, etc). These details _should_ be made clear in the description.

Note also that the context tag is optional. It may use the action:category method or the plain context method, as discussed in the Curated Contexts NIP.

### Declaration of the list of Rating Types

We declare the list of rating types using a kind 9998 event, as per the Curated Lists NIP:

```
{
  "kind": 9998,
  "tags": [
    ["names", "rating type", "rating types"],
    ["description", "lorem ipsum"],
    ["required","description"]
  ],
  "id": <id_for_list_of_rating_types>
}
```

# Declaration of Rating Types: 5-star, 0-100, or pairwise comparison

### 5-star

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_rating_types>],
    ["name", "5 star"],
    ["description", "For ratings in the category of 5-stars, the rating must be an integer between 0 and 5. Context is optional. It may use the action:category method or the plain context method."]
  ],
  "id": <id_for_list_of_5star_ratings>
}
```

### 0-100

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_rating_types>],
    ["name", "0-100"],
    ["description", "For ratings in the category of 0-100, the rating must be an integer between 0 and 100. Context is optional. It may use the action:category method or the plain context method."]
  ],
  "id": <id_for_list_of_0_to_100_ratings>
}
```

### Pairwise Comparison

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_rating_types>],
    ["name", "pairwise comparison"],
    ["description", "For ratings in the category of pairwise comparison, there are two subjects; the rating is > or =. Context is optional. It may use the action:category method or the plain context method."]
  ],
  "id": <id_for_list_of_pairwise_comparison_ratings>
}
```

# Examples of individual Ratings

Rate Alice as a better back end programmer than Bob using the _pairwise comparison_ rating type.

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_ratings>],
    ["ratingType", <id_for_list_of_pairwise_comparison_ratings>],
    ["subject", "Alice", "Bob"],
    ["context", <id_for_to_program_action>:<id_for_back_end_programmer_category>],
    ["rating", ">"]
  ]
}
```

Now rate Panerra as a 4 out of 5 restaurant:

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_ratings>],
    ["ratingType", <id_for_list_of_5star_ratings>],
    ["subject", "Panerra"],
    ["rating", "4"]
  ]
}
```

Now rate Alice as 5 out of 5 stars in her ability to rate dramas

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_ratings>],
    ["ratingType", <id_for_list_of_5star_ratings>],
    ["subject", <pubkey_Alice>],
    ["context", <id_for_to_rate>:<id_for_dramas>],
    ["rating", "5"]
  ]
}
```


