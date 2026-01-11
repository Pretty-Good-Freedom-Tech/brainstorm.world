Decentralized Knowledge Graphs
=====

# Prerequisites

This NIP expands upon the following NIPs:
- [Decentralized Lists](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqymyv43k2mn5wfskc6t6v4jz6mrfwd68xnwasck): how to delegate curation of a list to your WoT
- [Graphical Organization of Decentralized List Items](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqvn8wfshq6rfvdskctt0wfnkzmnf0fshg6t0dckk7e3dv3jkxetww3exzmrf0fjkgttvd9ehgttfw3jk6uc9u9tvf): how to organize list items into sets and subsets (managed by WoT)
- [Properties for Decentralized Lists](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqgnswfhhqetjw35k2uedvehhyttyv43k2mn5wfskc6t6v4jz6mrfwd68xy0e5q2): how to manage expected properties of list items, i.e. that _breed_ is a required data field on the list of _dogs_ (managed by WoT)
- Decentralized Concepts

# Curated Knowledge Graphs: Organizational Principles

Any given CKG is said to be personalized to an _owner_, identified by a nostr npub or pubkey.

A Knowledge Graph is a _graph database_ -- a collection of _nodes_ connected by _edges_, as defined and implemented by open source graph databases such as [neo4j](https://github.com/neo4j) -- organized according to a set of rules. We consider two sets of rules:
1. _WoT-independent_: a small set of core principles that are immutable (not subject to the WoT), the most important of which is the _class thread principle_.
2. _WoT-dependent_: Organization of data into _concepts_. The list of concepts within a KG, as well as the structure of any given concept, can in principle be determined in full by one's WoT, although in practice the _owner_ will likely want to take over curation of at least some aspects of the KG.

## Nodes

Each node belongs to one or more node types (which in neo4j are called labels). Using Decentralized Lists, we will define the following node types:
- NostrEvent
- NostrUser
- NostrRelay
- NostrEventTag
- TrustedList
- Set
- JSONSchema
- Property

## Relationships

Using Decentralized Lists, we will define the following relationship types as _prerequisites_ for construction of a concept:
- CLASS_THREAD_INITIATION, a.k.a. IS_THE_CONCEPT_FOR
- CLASS_THREAD_PROPAGATION, a.k.a. IS_A_SUPERSET_OF
- CLASS_THREAD_TERMINATION, a.k.a. HAS_ELEMENT
- ENUMERATES
- IS_A_PROPERTY_OF
- IS_THE_JSON_SCHEMA_FOR

The list of relationships should have a field for the relationship type as well as a field for each of the two nodes being connected.

# Concepts: Vertical and Horizontal Integration

(may transfer or duplicate text from the decentralized concepts NIP to here)

# Knowledge Graph Structure

Brainstorm Knowledge Graph can be divided into two sets: core knowledge, which is (mostly) fixed, and WoT-derived knowledge, which is malleable. (Need better names for these?) Core knowledge is intended to be compact, limited, manageable. WoT-derived knowledge is intended to have the potential to grow without limit. In some cases, WoT-derived knowledge may alter core functionality, but this does not necessarily need to occur.

## Core knowledge

Prime example of core knowledge: the class thread rule. This requires us to pre-program basic concepts including nodes, node types, relationships, relationship types, and paths, with CLASS_THREAD_INITIATION, CLASS_THREAD_PROPAGATION, and CLASS_THREAD_TERMINATION being elements of the concept of relationship types.

Unlike the knowledge graphs of symbolic AI such as Cyc, the number of pieces of knowledge that must be added manually by scientists, ontologists, grad students, etc is quite limited. Cyc accumulated 25 million pieces of knowledge (need reference) via manual curation, at great expense, with no practical or theoretical threshold when the laborious and expensive process of manual knowledge accumulation would ever be complete.

Brainstorm, on the other hand, requires a very limited amount of core knowledge before it becomes functional. This is because Brainstorm is designed to learn from its trusted network of peers. In this way, Brainstorm solves the _knowledge acquisition bottleneck_ that has (up until now) plagued the symbolic AI program.

## WoT-derived knowledge

The technique of [Decentralized Curation of a List](https://github.com/Pretty-Good-Freedom-Tech/brainstorm.world/blob/main/docs/draft-nips/decentralized-list-curation.md) enables Brainstorm to acquire new knowledge from its trusted network of peers. This NIP, therefore, should be part of the Core Knowledge built into Brainstorm.

# Knowledge Graphs

A collection of interconnected concepts into a single graph database defines a _Curated Knowledge Graph_.

Concepts can be interconnected using two methods: _vertical integration_ and _horizontal integration_. Both types of interconnections are reliant upon specialized relationship types and are illustrated in this example:

![Integration of Concepts](https://i.nostr.build/7RkIiv0ecseq8n49.png)

## Vertical integration

Two types of vertical integration, each reliant on a specialized relationship type:
1. _IS_A_SUPERSET_OF_, e.g. _The Superset of Dogs_ is a superset of _The Superset of Irish Setters_
2. _HAS_ELEMENT_, e.g. _The Superset of Dog Breeds_ has element: _Irish Setter_

## Horizontal integration

Horizontal integration is based on the ENUMERATES relationship. Example: _The Superset of Dog Breeds_ enumerates the _Breed Property_ of the concept: _Dog_.

## Knowledge Graph Explorer

Similar to the Concept Graph Explorer
- graphical view: bigger picture that shows concepts and their interconnections (vertical and horizontal integrations, see below) without details of individual concepts
- ability to add new integrations between concepts

# External References

These ideas are described in more detail in [this article](https://prettygoodproject.substack.com/p/for-web-of-trust-to-succeed-it-must), [this article](https://prettygoodproject.substack.com/p/the-tapestry-model) and [this other article](https://prettygoodproject.substack.com/p/short-pitch-for-the-concept-graph). All 3 of these articles are somewhat out of date, but get across the basic ideas behind class threads and concepts.

(This NIP is a work in progress.)

