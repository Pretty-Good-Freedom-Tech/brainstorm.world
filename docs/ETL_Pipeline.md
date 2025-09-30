nostr graph database relay
=====

## Tech stack

Single instance that runs both a well established nostr relay, either strfry or khatru, and neo4j community edition.

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
