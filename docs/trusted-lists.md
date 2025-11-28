Trusted Lists
=====

`draft` `optional`

A cross between Trusted Assertions and NIP-51.

We create only one new event kind: 30385 for the Trusted List. We will reuse kind 10040 from the Trusted Assertions NIP to declare Trusted Lists Service Providers. The Trusted List event follows the format of a NIP-51 list, with the addition of an optional item in `p`, `e`, `t`, and `a` tags that represents the relevant trust metric.

## Trusted Lists

### Trust Context

The _context_ of the Trusted List is indicated by the `d` tag. The `d` tag is a string that could be human readable (perhaps similar to the title) or could be non-human-readable such as an event id pointing to an event that provides details about the context, including the range and interpretation of the trust metric. The `d` tags of kine 30385 events should correspond exactly to the strings found in the kind 10040 events (below) (just after "30385:").

Unlike Trusted Assertions, which defines supported tags such as `rank` and `followers`, we do not specify a set of supported trust contexts; any string is allowed.

### Optional Trust Metric

We will update standard `e`, `p`, and `a` tags as described in NIP-01 to add an optional _trust metric _string element after the other optional elements. We will also support `t` tags. The range and interpretation of the trust metric will depend upon the trust context. 

The updated tags are as follows:

- The `e` tag, used to refer to an event: `["e", <32-bytes lowercase hex of the id of another event>, <recommended relay URL, optional>, <32-bytes lowercase hex of the author's pubkey, optional>, <trust metric, optional>]`
- The `p` tag, used to refer to another user: `["p", <32-bytes lowercase hex of a pubkey>, <recommended relay URL, optional>, <trust metric, optional>]`
- The `a` tag, used to refer to an addressable or replaceable event
    - for an addressable event: `["a", "<kind integer>:<32-bytes lowercase hex of a pubkey>:<d tag value>", <recommended relay URL, optional>, <trust metric, optional>]`
    - for a normal replaceable event: `["a", "<kind integer>:<32-bytes lowercase hex of a pubkey>:", <recommended relay URL, optional>, <trust metric, optional>]` (note: include the trailing colon)
- The `t` tag, used to refer to a string: `["t", <string>, <trust metric, optional>]`

We also introduce an optional tag: `metric`, which indicates the name of the _trust metric_.

### Example

Trending 24 Hour Content

```json
{
  "id": "<id>",
  "pubkey": "<pubkey_wot_sp1>",
  "created_at": 1695327657,
  "kind": 30385,
  "content": "",
  "tags": [
    ["d", "Trending-24-Hour-Content"],
    ["title", "Trending 24 Hour Content"],
    ["metric", "trending-score"],
    ["e", "<event id>", "<optional relay hint>", "<optional author pubkey>", "100"],
    ["e", "<event id>", "", "", "89"],
    ["e", "<event id>", "", "", "86"],
    ["e", "<event id>", "", "", "84"]
  ]
}
```

Top Bluegrass Musicians

```json
{
  "id": "<id>",
  "pubkey": "<pubkey_wot_sp2>",
  "created_at": 1695327657,
  "kind": 30385,
  "content": "",
  "tags": [
    ["d", "Top-Bluegrass-Musicians"],
    ["title", "Top Bluegrass Musicians"],
    ["metric", "musical-talent"],
    ["p", "<pubkey>", "<optional relay hint>", "100"],
    ["p", "<pubkey>", "", "89"],
    ["p", "<pubkey>", "", "86"],
    ["p", "<pubkey>", "", "84"]
  ]
}
```

Top Movies

```json
{
  "id": "<id>",
  "pubkey": "<pubkey_wot_sp3>",
  "created_at": 1695327657,
  "kind": 30385,
  "content": "",
  "tags": [
    ["d", "Best-Movies-of-All-Time"],
    ["title", "Best Movies of All Time"],
    ["metric", "rank"],
    ["t", "The Godfather", "100"],
    ["t", "The Godfather Part II", "99"],
    ["t", "The Shawshank Redemption", "", "96"]
  ]
}
```

Top pubkeys by `rank`

```json
{
  "id": "<id>",
  "pubkey": "<pubkey_wot_sp4>",
  "created_at": 1695327657,
  "kind": 30385,
  "content": "",
  "tags": [
    ["d", "Top-100-pubkeys-by-rank"],
    ["title", "Top 100 Pubkeys by Rank"],
    ["metric", "rank"],
    ["p", "<pubkey>", "<optional relay hint>", "100"],
    ["p", "<pubkey>", "", "89"],
    ["p", "<pubkey>", "", "86"],
    ["p", "<pubkey>", "", "84"]
  ]
}
```

## Declaring Trusted Lists Service Provider Preferences

Kind 10040 events will be used to record user preferences not only for Trusted Assertions Service Providers, but also for Trusted List Service Providers. For each Trusted List, the SP preference will be indicated with the tag: `["30385:<trusted-list-d-tag>", "<wot_sp_pubkey>", "<relay>"]`.

### Example:

```json
{
  "kind": 10040,
  "tags": [
    ["30382:rank", "4fd5e210530e4f6b2cb083795834bfe5108324f1ed9f00ab73b9e8fcfe5f12fe", "wss://nip85.nostr.band"],
    ["30382:rank", "3d842afecd5e293f28b6627933704a3fb8ce153aa91d790ab11f6a752d44a42d", "wss://nostr.wine"],
    ["30382:zap_amt_sent", "4fd5e210530e4f6b2cb083795834bfe5108324f1ed9f00ab73b9e8fcfe5f12fe", "wss://nip85.nostr.band"],
    ["30385:Trending-24-Hour-Content", "<pubkey_wot_sp1>", "wss://nip85.nostr.band"],
  ],
  "content": nip44Encrypt(JSON.stringify([
    ["30383:rank", "4fd5e210530e4f6b2cb083795834bfe5108324f1ed9f00ab73b9e8fcfe5f12fe", "wss://nip85.nostr.band"],
    ["30384:rank", "4fd5e210530e4f6b2cb083795834bfe5108324f1ed9f00ab73b9e8fcfe5f12fe", "wss://nip85.nostr.band"],
    ["30385:Top-Bluegrass-Musicians", "<pubkey_wot_sp2>", "wss://nip85.nostr.band"],
  ]),
  //...
}
```

Note that the `d` tag in the Trusted List kind 30385 event examples above match what is found in the kind 10040 event. 

