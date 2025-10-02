neo4j nostr relay
=====
a nostr relay paired with Neo4j Community Edition
-----

*Goal*: publication of an open source ETL pipeline to synchronize [Neo4j Community Edition](https://neo4j.com/product/community-edition/) with a local nostr relay such as the battle-tested [strfry](https://github.com/hoytech/strfry) (LMDB) or the customizable [khatru](https://github.com/fiatjaf/khatru) (SQL or LMDB)

*Background*: [Nostr](https://nostr.com/) is a decentralized social networking protocol with 10 to 20 thousand [active daily users](https://stats.nostr.band/). Content repositories, known as relays, are open source, with most implementations based on SQL or LMDB. Surprisingly, there are currently no graph database implementations of nostr relays other than our own [initial attempts](https://github.com/Pretty-Good-Freedom-Tech/brainstorm). We believe nostr is the best foundation upon which to build truly decentralized social networking communities. Its primary deficiency is a system for personalized ratings, reputation, and recommendations. This requires integration of graph databases into the nostr tech stack.

### Phase 1: basic social graph

- nodes: NostrUser
- relationships: FOLLOWS, MUTES, REPORTS

_Challenge_: to maintain real-time synchronization. follow/unfollow, mute/unmute, or report updates should be reflected in the graph database within a reasonable amount of time, on the order of seconds to minutes. Current throughput is approximately 1 - 10 graph updates per minute on a graph of ~ 2 million NostrUser nodes and ~ 25 million relationships.

_Progress_: Our test implementation, [Brainstorm](https://straycat.brainstorm.social), synchronizes Neo4j (initial sync and periodic reconciliation) with the battle-tested [strfry relay](https://github.com/hoytech/strfry) but does not maintain real time synchronization, with reconciliation taking hours to complete.

### Phase 2: trust metrics

- schema: (NostrUser)-[:WOT_METRICS]->(NostrUserWotMetricsCard)-[:SPECIFIC_INSTANCE]->(SetOfNostrUserWotMetricsCard)

_Challenge_: to update trust metrics in a performant manner

_Progress_: [Brainstorm](https://github.com/Pretty-Good-Freedom-Tech/brainstorm), the current product, calculates personalized web of trust (WoT) metrics for multiple users including PageRank, GrapeRank, hops, verified follower count, etc. Currently running on AWS ubuntu with 32GB of RAM and 8 cores.

### Phase 3: content graph

- nodes: NostrEvent
- relationships: AUTHORED, many others

_Challenge_: high volume of NostrEvent nodes, on the order of 1 million new NostrEvents per day

_Progress_: not yet attempted

## Progress 

[Brainstorm](https://github.com/Pretty-Good-Freedom-Tech/brainstorm)
- attempts Phase 1 and Phase 2
- pairs strfry with neo4j
- ETL pipeline is functional but does not maintain real-time synchronization and has suboptimal memory management. Nevertheless is functions well enough to have undergone preliminary beta testing for purposes of product validation.

## Tech stack



strfry: advantages: well built, the powerhouse of nostr; and it is well suited for full data synchronization with wss://wot.grapevine.network, via negentropy. Possible disadvantage is that it is LMDB based and there are no LMDB-neo4j ETL sync tools that I know of.

khatru: advantage is that it can be SQL based, which might benefit from neo4j ETL tools.

## Features:

1. Maintain real-time relay synchronization of kinds 0, 3, 1984, and 10000 events of the local relay with external relay wss://wot.grapevine.network (external relay, single source of truth)

As of Sep 2025, initial sync takes 2-3 hours for full synchronization from scratch, using negentropy.
- kind 0: __ total; __ per hour
- kind 3: __ total; __ per hour
- kind 1984: __ total; __ per hour
- kind 10000: __ total; __ per hour

2. Maintain real-time graph database synchronization of kinds 0, 3, 1984, and 10000 events of local neo4j database with the local strfry relay.

If local relay is strfry, can use standard strfry command-line tools. (Probably khatru has them too?)

## ETL pipeline modules
1. batch load (from scratch)
2. real-time synchronization
3. reconciliation

## Neo4j schema

### Nodes
- NostrUser

### Relationships
- FOLLOWS
- MUTES
- REPORTS report_type: impersonation, spam, profanity, etc
