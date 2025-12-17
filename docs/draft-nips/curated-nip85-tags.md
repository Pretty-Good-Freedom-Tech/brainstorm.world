Curated Tags for Trusted Assertions
=====

The purpose of this NIP is to provide a method for the community to curate the list of tags that belong in [NIP-85: Trusted Assertions](https://nostrhub.io/naddr1qvzqqqrcvypzq3svyhng9ld8sv44950j957j9vchdktj7cxumsep9mvvjthc2pjuqy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqyn5wf6hxar9vskkzumnv4e8g6t0deesu5l7ne).

# Declaration of 

We will use the NIP for [Decentralized Lists](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqymyv43k2mn5wfskc6t6v4jz6mrfwd68xnwasck) to declare

```json
{
  "kind": 9998,
  "tags": [
    ["names", "tag for NIP-85: Trusted Assertions", "tags for NIP-85: Trusted Assertions"],
    ["description", "lorem ipsum"],
    ["required","name"],
    ["optional","kind"], // 30382, etc
    ["required","subject"], // pubkey, event_id, addressible_event
    ["optional","minimum"],
    ["optional","maximum"], // 
  ],
  "id": <id_for_list_of_tags_for_TAs>
}
```

We will begin by declaring two items on this list: _rank_ and _followers_.

```json
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_tags_for_TAs>],
    ["name", "rank"],
    ["description", "This is intended as a generic 0-100 Trust Score. The method for its calculation is up to the WoT Service Provider."],
    ["kind", "30382"],
    ["subject", "user"],
    ["minimum", "0"],
    ["maximum", "100"],
    ["type", "integer"]
  ],
  "id": <id_for_rank_TA_tag>
}
```

```json
{
  "kind": 9999,
  "tags": [
    ["z", <id_for_list_of_tags_for_TAs>],
    ["name", "followers"],
    ["description", "This is intended as a generic score for verified follower count of a user. The meaning of verified is up to the WoT Service Provider calculating the score and is not specified herein."],
    ["kind", "30382"],
    ["subject", "user"],
    ["minimum", "0"],
    ["maximum", "infinite"],
    ["type", "integer"]
  ],
  "id": <id_for_followers_TA_tag>
}
```
