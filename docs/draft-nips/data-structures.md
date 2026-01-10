KNOWLEDGE GRAPH: DATA STRUCTURES
=====

What are the data structures within a Brainstorm Knowledge Graph, and what are the stages in their life cycle? We propose 5 data structures and 3 stages of processing:

5 data structures: **lists, structured lists, object oriented lists, concepts, knowledge graphs**

3 processing stages: **decentralized, curated, trusted**

This gives us 5 x 3 = 15 data structures at various stages of their life cycles: Decentralized Lists, Curated Lists, Trusted Lists, Curated Structured Lists, Trusted Concepts, etc. These are described in a variety of Custom NIPs:
- (work in progress)

# Data structures

1. _Simple Lists_, aka _Lists_: [Decentralized Lists Custom NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qyt8wumn8ghj7un9d3shjtnwdaehgu3wvfskueqqzdjx2cm9de68yctvd9ax2epdd35hxarn4nteah)
2. _Structured Lists_: a (simple) list organized into sets and subsets using the [Graphical Organization of Decentralized List Items Custom NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qyt8wumn8ghj7un9d3shjtnwdaehgu3wvfskueqqxfnhyctsdp5kxctv94hhyempde5h5ct5d9hkutt0vckkgetrv4h8gunpd35h5ety94kxjum5945hgetdwv0pgvsy)
3. _Object Oriented Lists_: a (simple) list imbued with a Property Tree as specified in the [Properties for Decentralized Lists Custom NIP](https://nostrhub.io/naddr1qvzqqqrcvypzpef89h53f0fsza2ugwdc3e54nfpun5nxfqclpy79r6w8nxsk5yp0qyt8wumn8ghj7un9d3shjtnwdaehgu3wvfskueqqyfc8ymmsv4e8g6t9wvkkvmmj94jx2cm9de68yctvd9ax2epdd35hxarnmn4xp0) 
4. _Concepts_: a simple list that is both _structured_ as well as _object oriented_ (still in draft format)
5. _Knowledge Graphs_: a graph with multiple concepts that are integrated vertically as well as horizontally as described in the Knowledge Graph Custom NIP (still in draft format)

# Processing stages

These data structures are not complete until they reach the final stage in the life cycle.

1. _decentralized_: generation of raw data, e.g. kind (3)9998 list headers, kind (3)9999 list items, kind 7 reactions
2. _curated_: processing of raw data into a compact list, using trust metrics to filter out raw data authored by untrusted entities
3. _trusted_: a processed list that has been published in some compact format (e.g. NIP-51-like) for consumption elsewhere
