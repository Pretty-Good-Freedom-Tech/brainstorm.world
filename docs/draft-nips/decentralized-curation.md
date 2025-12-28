Decentralized Curation of a List
=====

This NIP expands upon the Decentralized Lists NIP by going into greater detail about list curation. 

We will rely upon the _GrapeRank_ method. In essence, the _GrapeRank_ method is any method for calculation of a metric that depends upon _personalized trust metrics_. This includes _weighted averages_ and _weighted sums_, where _weights_ are derived from contextual trust metrics. This algorithm simultaneously presumes the existence of personalized trust metrics and provides a method for their calculation.

# Overview

- all sums and averages must be _weighted_ wherever possible
- _weights_ are contextual and derived from information that is typically communicated using Trusted Assertions and/or Trusted Lists

# Prerequisites

- Decentralized Lists
- Trusted Assertions
- Trusted Lists

# Personalization

The end user can choose which personalized trust metrics to use for the curation of any individual list.

A concept is composed of a large number of decentralized lists. For each DL, the weights used for its curation are derived from a trust metric. Typically, those trust metrics are communicated via Trusted Assertions and/or Trusted Lists. We will refer to any individual trust metric as "a web of trust". The end user might select a different trust metric, i.e. a different WoT, for curation of each list in the concept.

Consider, for example, curation of the concept of musicians:

|**Decentralized List** | **web of trust (WoT)** |
|---|---|
| organization of musicians into a DAG | curated list of ontology experts |
| musical moods | OpenMike |
| musical genres | Bob |
| jazz musicians | jazz experts |
| bluegrass musicians | owner (me) |
| rock and roll musicians | my follows |
| rock and roll musicians | my Grapevine (`rank` score over 10) |

(this NIP is in progress)
