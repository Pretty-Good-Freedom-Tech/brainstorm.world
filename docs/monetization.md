Brainstorm product monetization
=====

# Models for monetization

## Subscription model

inspired by [nostr.build](https://nostr.build)

customers: average nostr user

Free tier:
- basic trust metric calculation: GrapeRank, hops, PageRank, etc
- infrequent updates

Paid tiers:
- more trust metrics (e.g. lists curated by one's web of trust)
- more frequent updates
- more methods to deliver metrics to nostr clients and platforms

## Hosting model

inspired by [Relay Tools](https://relay.tools)

customers: power users who want to run their own Brainstorm instance and calculate trust metrics for friends, families, or customers

# Open questions impacting monetization strategy and product design

- What are the minimum system requirements and anticipated monthly cost for a Brainstorm instance? Assume support for real time basic social graph synchronization and trust metric calculations. 2 million NostrUser nodes (currently only about 250 thousand connected), 25 million relationships, 1-10 updates per minute?
- How many customers can a single Brainstorm instance support? Each customer requires one NostrUserWotMetricsCard node per connected NostrUser node (currently about 250 thousand).
- How can we estimate the minimum system requirements for a Brainstorm instance as it scales up to support content, up to half a million notes per day (currently about 600 million notes in total)?