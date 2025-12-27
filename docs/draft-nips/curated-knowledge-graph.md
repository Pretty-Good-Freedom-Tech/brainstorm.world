Curated Knowledge Graphs
=====

This NIP describes a mechanism to construct a _personalized knowledge graph_ (KG) that is curated by one's web of trust (WoT).

The WoT curates not only the data inside the CKG, but also the organization of that data into functional units referred to as _concepts_. Much of this NIP is concerned with the formal definition of a concept, starting with a specialized path called a _class thread_.

# Building Blocks and Primitives

This NIP expands upon the following NIPs:
- [Decentralized Lists](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqymyv43k2mn5wfskc6t6v4jz6mrfwd68xnwasck): how to delegate curation of a list to your WoT
- [Graphical Organization of Decentralized List Items](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqvn8wfshq6rfvdskctt0wfnkzmnf0fshg6t0dckk7e3dv3jkxetww3exzmrf0fjkgttvd9ehgttfw3jk6uc9u9tvf): how to organize list items into sets and subsets (managed by WoT)
- [Properties for Decentralized Lists](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqgnswfhhqetjw35k2uedvehhyttyv43k2mn5wfskc6t6v4jz6mrfwd68xy0e5q2): how to manage expected properties of list items, i.e. that _breed_ is a required data field on the list of _dogs_ (managed by WoT)

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

Using Decentralized Lists, we will define the following relationship types:
- CLASS_THREAD_INITIATION, a.k.a. SUPERSET
- CLASS_THREAD_PROPAGATION, a.k.a. SUBSET
- CLASS_THREAD_TERMINATION, a.k.a. ELEMENT
- ENUMERATES
- IS_A_PROPERTY_OF

# Concepts

A concept can be thought of as a decentralized list that is imbued with a property tree and structured into a directed acyclic graph (DAG).

(insert example image of a Concept)

An individual concept is a subset of a CKG. It is a collection of nodes and edges. Each concept is organized around a _class header_ node. Given an individual class header node, a concept is defined as the set of all nodes and all relationships traversed by the set of all class threads that emanate from the class header node. If a property tree and JSON Schema node are associated with a class header, those nodes and edges are also included within the definition of a concept.

(This NIP is a work in progress)
