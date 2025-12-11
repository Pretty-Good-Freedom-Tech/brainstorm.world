Curated Ratings
=====

This NIP used the [Curated Lists NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqqzdjx2cm9de68yctvd9ax2epdd35hxarnwrn9hx) to declare a list of Ratings.

# Declaration of the List

We declare the list of ratings using kind 9998 events, as per the Curated Lists NIP:

```
{
  "kind": 9998,
  "tags": [
    ["names", "rating", "ratings"],
    ["description", "lorem ipsum"],
    ["optional","context"],
    ["required","ratingType"],
    ["required","subject"],
    ["required","rating"]
  ],
  "id": <id_for_list_of_ratings>
}
```

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

# Examples

## Create Rating Types: 5-star, 0-100, or pairwise comparison

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_rating_types>],
    ["name", "5 star"],
    ["description", "For ratings in the category of 5-stars, the rating must be an integer between 0 and 5. Context is optional; if unspecified, context is intended to be something generic."]
  ],
  "id": <id_for_list_of_5star_ratings>
}
```

```
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_rating_types>],
    ["name", "pairwise comparison"],
    ["description", "For ratings in the category of pairwise comparison, there are two subjects; the rating is > or =."]
  ],
  "id": <id_for_list_of_pairwise_comparison_ratings>
}
```

Now rate Alice as a better back end programmer than Bob

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


