neo4j nostr relay
=====
a nostr relay paired with Neo4j Community Edition
-----

*Goal*: publication of an open source ETL pipeline to synchronize [Neo4j Community Edition](https://neo4j.com/product/community-edition/) with a local nostr relay such as the battle-tested [strfry](https://github.com/hoytech/strfry) (LMDB) or the customizable [khatru](https://github.com/fiatjaf/khatru) (SQL or LMDB)

*Background*: [Nostr](https://nostr.com/) is a decentralized social networking protocol with 10 to 20 thousand [active daily users](https://stats.nostr.band/). Content repositories, known as [relays](https://github.com/aljazceru/awesome-nostr#relays), are open source, with most implementations based on SQL or LMDB. Surprisingly, there are currently no graph database implementations of nostr relays other than our own [exploratory attempts](https://github.com/Pretty-Good-Freedom-Tech/brainstorm). Expansion of the nostr userbase requires integration of a performant, scalable, open source graph database into the nostr tech stack.

*Use case*: The open source neo4j nostr relay will form the backbone of the [Brainstorm](https://brainstorm.world), a service that will track personalized trust metrics for users of the nostr protocol.

### Phase 1: basic social graph

- nodes: NostrUser
- relationships: FOLLOWS, MUTES, REPORTS

_Challenge_: to maintain real-time synchronization. follow/unfollow, mute/unmute, or report updates should be reflected in the graph database within a reasonable amount of time, on the order of seconds to minutes. Given the existing nostr userbase, experience tells us to expect approximately 1 - 10 graph updates per minute. Current graph contains ~ 2 million NostrUser nodes and ~ 25 million relationships.

_Progress_: Our test implementation, [Brainstorm](https://straycat.brainstorm.social), synchronizes Neo4j with the battle-tested [strfry relay](https://github.com/hoytech/strfry) but does not maintain real time synchronization. Reconciliation runs once per day and takes hours to complete. Uses the [APOC plugin](https://neo4j.com/labs/apoc/).

### Phase 2: trust metrics

- store trust metrics in NostrUserWotMetricsCard nodes

_Challenge_: to calculate and update trust metrics in a performant manner

_Progress_: [Brainstorm](https://github.com/Pretty-Good-Freedom-Tech/brainstorm), the current product, calculates personalized web of trust (WoT) metrics for multiple users including PageRank, GrapeRank, hops, verified follower count, etc. Full updates take about half an hour per customer. Currently running on AWS ubuntu with 32GB of RAM and 8 cores. Uses the [Neo4j Graph Data Science library](https://neo4j.com/docs/graph-data-science/current/) for PageRank calculations.

### Phase 3: organization of nostr content as a knowledge graph

- additional nodes: NostrEvent
- additional relationships: AUTHORED, many others

_Challenge_: high volume of NostrEvent nodes, with [current stats](https://stats.nostr.band/) showing approximately half a million new events per day, half a billion events for all time.

_Progress_: not yet attempted
