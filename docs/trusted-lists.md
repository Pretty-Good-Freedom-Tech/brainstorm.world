Trusted Lists
=====

`draft` `optional`

A cross between Trusted Assertions and NIP-51.

We create two new event kinds: 30385 for the Trusted List. We will reuse kind 10040 from the Trusted Assertions NIP to declare Trusted Lists Service Proivders.

#### Example

Trending 24 Hour Content

```json
{
  "id": "567b41fc9060c758c4216fe5f8d3df7c57daad7ae757fa4606f0c39d4dd220ef",
  "pubkey": "d6dc95542e18b8b7aec2f14610f55c335abebec76f3db9e58c254661d0593a0c",
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
  ],
  "sig": ""
}
```

Top Bluegrass Musicians

```json
{
  "id": "",
  "pubkey": "d6dc95542e18b8b7aec2f14610f55c335abebec76f3db9e58c254661d0593a0c",
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
  ],
  "content": "",
  "sig": "<sig>"
}
```

## Declaring Trusted Lists Service Providers

```json
{
  "kind": 10040,
  "tags": [
    ["30382:rank", "4fd5e210530e4f6b2cb083795834bfe5108324f1ed9f00ab73b9e8fcfe5f12fe", "wss://nip85.nostr.band"],
    ["30382:rank", "3d842afecd5e293f28b6627933704a3fb8ce153aa91d790ab11f6a752d44a42d", "wss://nostr.wine"],
    ["30382:zap_amt_sent", "4fd5e210530e4f6b2cb083795834bfe5108324f1ed9f00ab73b9e8fcfe5f12fe", "wss://nip85.nostr.band"],
    ["30385:Trending-24-Hour-Content", "<pubkey>", "wss://nip85.nostr.band"],
  ],
  "content": nip44Encrypt(JSON.stringify([
    ["30383:rank", "4fd5e210530e4f6b2cb083795834bfe5108324f1ed9f00ab73b9e8fcfe5f12fe", "wss://nip85.nostr.band"],
    ["30384:rank", "4fd5e210530e4f6b2cb083795834bfe5108324f1ed9f00ab73b9e8fcfe5f12fe", "wss://nip85.nostr.band"],
    ["30385:Top-Bluegrass-Musicians", "<pubkey>", "wss://nip85.nostr.band"],
  ]),
  //...
}
```
