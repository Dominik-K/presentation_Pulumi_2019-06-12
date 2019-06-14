## Kubernetes & cloud configuration with Pulumi

#### Dominik Kolmann

##### Hannover Kubernetes/Cloud-Native Meetup - 2019-06

---

## "Some Open, Hard Problems"

> "Of all the problems we have confronted, the ones over which the most brainpower, ink, and code have been spilled are related to managing *configurations* [...]"

"[Borg, Omega, and Kubernetes -- Lessons learned from three container-management systems over a decade](https://queue.acm.org/detail.cfm?id=2898444)", B. Burns, B. Grant, D. Oppenheimer, E. Brewer, and J. Wilkes (Google Inc.), System Evolution, Vol. 14 (1), **2016**

Note:

* "Configurations: the set of values supplied to applications, rather than hard-coded into them. In truth, we could have devoted this entire article to the subject and still have had more to say."
* Title is original paper's section title.

---

## About me

@ul
* 3 years DevOps/SRE engineer @ Graphmasters in Hannover
* Graphmasters develops & utilizes graphs for good
  * Optimizations of big depots & tours -> Hermes & EDEKA
  * Traffic management for events -> Hannover, Hamburg, Cologne
  * Navigation with traffic forecasting
  * Generic graph engine

@ulend


Note:

* Depots: ca. 30% savings
* Tours: with 100+ stops
* Events: Big concerts & trade fairs
* Traffic: x million probes per day

---

## Motivation

@ul

* K8s => "YAML engineers"
  * Sick of "indentation errors"
  * Much boilerplate
  * What's going on if you `kubectl apply`?
* Few IDE support
* Reusable config?
* Different tools for Kubernetes & cloud
* Multi-cloud support?

@ulend

---

## What is Pulumi?

@ul

* [3 years old, published as free software 2018](http://joeduffyblog.com/2018/06/18/hello-pulumi/)
* developed by Pulumi, Inc., Seattle, Washington (15 developers [[Github](https://github.com/orgs/pulumi/people)]) <!-- (founders: Microsoft & AWS engineer) -->
* CLI & website portal
* Write configuration in real, modern programming languages/frameworks:
  * Node.js (TypeScript & JavaScript)
  * Python
  * Go
  * .NET Core (C#, experimental)

@ulend

---

## Workflow for Pulumi

@ul

* Program resources in code
* Refresh single source of truth (state database in cloud or local)
* Preview changes compared to state
* Apply the changes
* Pulumi updates state on success

@ulend

Note:

* Pulumi does not refresh state by default

---

## Demo 1: Nginx deployed on Minikube

Based on Pulumi's [tutorial #1](https://pulumi.io/quickstart/kubernetes/tutorial-exposed-deployment/).

Note:

* Refactor `Deployment` name
* Change image in code => diff
* Change image in live => no change detected
* Refresh state => change detected

---

## Demo 1: Things to note

@ul

* Dependency handled: `Deployment` before `Service`
* Easy diff overview
* Refactoring simple (as usual for typed language)

* State not refreshed with live state by default

@ulend

---

## Bugs & open feature requests (selection)

@ul

* Importing existing resources: [issue #1635](https://github.com/pulumi/pulumi/issues/1635)
* Applying a single resource (with its dependencies): [issue #2317](https://github.com/pulumi/pulumi/issues/2317)
* Using diff from (Terraform) providers: [issue #2453](https://github.com/pulumi/pulumi/issues/2453)

@ulend

---

## Other nice features & tools

* [Unit testing the infrastructure](https://blog.pulumi.com/testing-your-infrastructure-as-code-with-pulumi)
* [Github actions with Pulumi](https://blog.pulumi.com/continuous-delivery-to-any-cloud-using-github-actions-and-pulumi) (Pull request integration with approval)

* [`kubespy`](https://github.com/pulumi/kubespy) (K8s live updates used in Pulumi)

---

## Interesting Resources

* Paul Jones: [Infrastructure as Software](https://kccnceu19.sched.com/event/MPXQ), KubeCon 2019  (also presents AWS' CDK)
* Joe Beda: [Kubernetes config with Pulumi](https://github.com/heptio/tgik/tree/master/episodes/064), Heptio/VMware TGIK, Episode 64

---

## Thanks for your attention

Questions?

We're hiring. Btw ;-)
