Decentralized Concepts
=====

There are two ways for a _decentralized list_ to be imbued with additional structure: organization of list items into a graph, and a property tree which specifies the format of individual list items. In this NIP, we introduce the notion of a _decentralized concept_ as a _decentralized list_ with these structures in place. We present a formal definition of a _concept_ in terms of a specialized path called a _class thread_. Most importantly, we outline how to establish relationships between concepts. The result is a framework for a _personalized knowledge graph_ (KG) that is curated by one's web of trust (WoT). 

# Building Blocks and Primitives

This NIP expands upon the following NIPs:
- [Decentralized Lists](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqymyv43k2mn5wfskc6t6v4jz6mrfwd68xnwasck): how to delegate curation of a list to your WoT
- [Graphical Organization of Decentralized List Items](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqvn8wfshq6rfvdskctt0wfnkzmnf0fshg6t0dckk7e3dv3jkxetww3exzmrf0fjkgttvd9ehgttfw3jk6uc9u9tvf): how to organize list items into sets and subsets (managed by WoT)
- [Properties for Decentralized Lists](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qy28wumn8ghj7un9d3shjtnyv9kh2uewd9hsqgnswfhhqetjw35k2uedvehhyttyv43k2mn5wfskc6t6v4jz6mrfwd68xy0e5q2): how to manage expected properties of list items, i.e. that _breed_ is a required data field on the list of _dogs_ (managed by WoT)
