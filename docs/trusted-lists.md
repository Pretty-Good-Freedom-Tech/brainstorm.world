Trusted Lists
=====

`draft` `optional`

A cross between Trusted Assertions and NIP-51.

We create only one new event kind: 30385 for the Trusted List. We will reuse kind 10040 from the Trusted Assertions NIP to declare Trusted Lists Service Providers.

The Trusted List event follows the format of a NIP-51 list, with the addition of an optional item in `p`, `e`, `t`, and `a` tags that represents the score. The `d` tag should provide a full specification of the trust metric, and is 

#### Example

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
    ["e", "<event id>", "<relay hint>", "100"],
    ["e", "<event id>", "", "89"],
    ["e", "<event id>", "", "86"],
    ["e", "<event id>", "", "84"]
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
    ["p", "<pubkey>", "<relay hint>", "100"],
    ["p", "<pubkey>", "", "89"],
    ["p", "<pubkey>", "", "86"],
    ["p", "<pubkey>", "", "84"]
  ]
}
```

## Declaring Trusted Lists Service Provider Preferences

Kind 10040 events will be used to record user preferences not only for Trusted Assertions Service Providers, but also for Trusted List Service Providers. For each Trusted List, the SP preference will be indicated with the tag: `["30385:<trusted-list-d-tag>", "<wot_sp_pubkey>", "<relay>"]`.

Example:

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

Note that the `d` tag in the Trusted List kind 30385 event exanples above match what is found in the kind 10040 event. 

