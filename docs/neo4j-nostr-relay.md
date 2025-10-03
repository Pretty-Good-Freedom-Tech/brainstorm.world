neo4j nostr relay
=====
a nostr relay paired with Neo4j Community Edition
-----

*Goal*: development of an open source ETL pipeline to synchronize [Neo4j Community Edition](https://neo4j.com/product/community-edition/) with a local nostr relay such as the battle-tested [strfry](https://github.com/hoytech/strfry) (LMDB) or the customizable [khatru](https://github.com/fiatjaf/khatru) (SQL or LMDB)

*Background*: [Nostr](https://nostr.com/) is a decentralized social networking protocol with 10 to 20 thousand [active daily users](https://stats.nostr.band/). Content repositories, known as [relays](https://github.com/aljazceru/awesome-nostr#relays), are open source, with most implementations based on SQL or LMDB. Surprisingly, there are currently no graph database implementations of nostr relays other than our own [exploratory attempts](https://github.com/Pretty-Good-Freedom-Tech/brainstorm). Without the possibilities unlocked by a performant, scalable, open source graph database such as Neo4j, the nostr userbase is likely to remain constrained.

*Use case*: The open source neo4j nostr relay will form the backbone of the [Brainstorm](https://brainstorm.world), a service that will track personalized trust metrics for users of the nostr protocol. Eventually this will form the basis for organization of selected nostr content into a personalized knowledge graph.

### Phase 1: basic social graph

Keep track of the nostr social graph with nodes: NostrUser and relationships: FOLLOWS, MUTES, REPORTS.

The challenge will be to maintain real-time synchronization. follow/unfollow, mute/unmute, or report updates should be reflected in the graph database within a reasonable amount of time, on the order of seconds to minutes. Given the existing nostr userbase, there are approximately 1 - 10 graph updates per minute. Current graph contains ~ 2 million NostrUser nodes and ~ 25 million relationships.

_Progress_: Our test implementation, [Brainstorm](https://straycat.brainstorm.social), synchronizes Neo4j with a local [strfry relay](https://github.com/hoytech/strfry) but does not maintain real time synchronization. Reconciliation runs once per day and takes hours to complete. Uses the [APOC plugin](https://neo4j.com/labs/apoc/).

### Phase 2: trust metrics

Track personalized trust metrics, including personalized PageRank and custom centrality algorithms like GrapeRank, in a performant manner.

_Progress_: [Brainstorm](https://github.com/Pretty-Good-Freedom-Tech/brainstorm), the current product, calculates personalized web of trust (WoT) metrics for multiple users including PageRank, GrapeRank, hops, verified follower count, etc. Metrics are stored in NostrUserWotMetricsCard nodes. Full updates take about half an hour per customer. Currently running on AWS ubuntu with 32GB of RAM and 8 cores, which may be overkill. Uses the [Neo4j Graph Data Science library](https://neo4j.com/docs/graph-data-science/current/) for PageRank calculations.

### Phase 3: organization of nostr content as a knowledge graph

Add content gradually and incorporate it using new neo4j nodes, including NostrEvent, and new relationships, including AUTHORED. Content will be filtered using trust metrics and organized into a knowledge graph.

The challenge will be the high volume of data, with [current stats](https://stats.nostr.band/) showing approximately half a million new nostr notes per day, 600 million accumulated notes for all time.

_Progress_: not yet attempted
