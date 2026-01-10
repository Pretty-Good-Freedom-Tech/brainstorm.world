Decentralized Knowledge Graphs
=====

# Prerequisites

This NIP expands upon the following NIPs:
- [Decentralized Lists](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqymyv43k2mn5wfskc6t6v4jz6mrfwd68xnwasck): how to delegate curation of a list to your WoT
- [Graphical Organization of Decentralized List Items](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqvn8wfshq6rfvdskctt0wfnkzmnf0fshg6t0dckk7e3dv3jkxetww3exzmrf0fjkgttvd9ehgttfw3jk6uc9u9tvf): how to organize list items into sets and subsets (managed by WoT)
- [Properties for Decentralized Lists](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqgnswfhhqetjw35k2uedvehhyttyv43k2mn5wfskc6t6v4jz6mrfwd68xy0e5q2): how to manage expected properties of list items, i.e. that _breed_ is a required data field on the list of _dogs_ (managed by WoT)
- Decentralized Concepts

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

(This NIP is a work in progress.)

