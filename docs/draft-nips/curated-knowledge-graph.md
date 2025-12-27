Curated Knowledge Graphs
=====

This NIP describes a mechanism to construct a _personalized knowledge graph_ (KG) that is curated by one's web of trust (WoT).

The WoT curates not only the data inside the CKG, but also the organization of that data into functional units referred to as _concepts_. Most of this NIP is concerned with the formal definition of a concept, starting with a specialized path called a _class thread_.

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

Using Decentralized Lists, we will define the following relationship types as _prerequisites_ for construction of a concept:
- CLASS_THREAD_INITIATION, a.k.a. IS_THE_CONCEPT_FOR
- CLASS_THREAD_PROPAGATION, a.k.a. IS_A_SUPERSET_OF
- CLASS_THREAD_TERMINATION, a.k.a. HAS_ELEMENT
- ENUMERATES
- IS_A_PROPERTY_OF
- IS_THE_JSON_SCHEMA_FOR

The list of relationships should have a field for the relationship type as well as a field for each of the two nodes being connected.

# Concepts

A concept can be thought of as a decentralized list that is imbued with a property tree and structured into a directed acyclic graph (DAG).

An individual concept is a collection of nodes and edges and is a subgraph embedded into a curated knowledge graph. Each concept is organized around a _class header_ node. Given an individual class header node, a concept is defined as the set of all nodes and all relationships traversed by the set of all class threads that emanate from the class header node. If a property tree and JSON Schema node are associated with a class header, those nodes and edges are also included within the definition of a concept.

Consider the following example of the concept of a dog:

![An example of a Concept](https://i.nostr.build/KdQtV0XsX4nThYt0.png)

In the above figure, the blue node, representing the kind 9998 list header for the list of Dogs, is the _class header_ node. 

## Class Threads

The blue class header node has a single class thread emanating from it, traversing the nodes for the set of all dogs, the set of Irish Setters, and Spot.

A class thread is a specialized directed path through a graph. It is defined in terms of three relationship types:
- CLASS_THREAD_INITIATION, a.k.a. IS_THE_CONCEPT_FOR
- CLASS_THREAD_PROPAGATION, a.k.a. IS_A_SUPERSET_OF
- CLASS_THREAD_TERMINATION, a.k.a. HAS_ELEMENT

Each class thread starts with a single CLASS_THREAD_INITIATION edge and a single CLASS_THREAD_TERMINATION edge. In between, there can be any number of CLASS_THREAD_PROPAGATION edges, from none to any positive integer.

## Curation of a Concept by WoT

The fundamental building block of a Concept is the Decentralized List. Therefore, curation of a Concept is achieved via curation of each list individually. The same WoT may be used to curate all details of a given concept. However, it is also possible, and probably often desirable, to delegate different lists to different WoTs. Consider, for example, curation of the concept of musicians:

|**List(s)** | **web of trust (WoT)** |
|---|---|
| organization of musicians into a DAG | curated list of ontology experts |
| musical moods | OpenMike |
| musical genres | Bob |
| jazz musicians | jazz experts |
| bluegrass musicians | owner (me) |
| rock and roll musicians | my follows |
| rock and roll musicians | my Grapevine (`rank` score over 10) |

In this table, a "web of trust (WoT)" simply means any list of nostr users that the CKG owner entrusts with the delegation of any given list.

## Concept Graph Explorer

A sandbox nostr "Concept Graph Explorer" app might have the following features:
- The list of available concepts is the list of all kind 9998 events from which at least one class thread emanates.
- The app would require specification of the event id or naddr of the following (with the ability to update in settings):
  - the kind 9999 event for each one of the prerequisite relationship types discussed above (CLASS_THREAD_INITIATION, CLASS_THREAD_PROPAGATION, CLASS_THREAD_TERMINATION, etc).
  - the lists of relationships and relationship types
- Visualization of the Concept as a pair of graphs (the property tree graph and the organization of list items into a DAG)
- a tool to generate the JSON schema automatically from the property tree
- a tool to generate a property tree automatically given a JSON schema (low priority feature)
- a tool to validate list items against the concept's JSON schema
- a tool to select which WoT to delegate curation of any particular aspect of the concept (as per the above table)
- a tool to facilitate creation of new concepts

# External References

These ideas are described in more detail in [this article](https://prettygoodproject.substack.com/p/for-web-of-trust-to-succeed-it-must), [this article](https://prettygoodproject.substack.com/p/the-tapestry-model) and [this other article](https://prettygoodproject.substack.com/p/short-pitch-for-the-concept-graph). All 3 of these articles are somewhat out of date, but get across the basic ideas behind class threads and concepts.
