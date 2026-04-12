---
title: The Infosec Wheel — Building a Map for the Next Generation of Security Professionals
date: 2026-04-11
authors:
    - kylifornication
tags:
    - coding
    - cybersecurity
    - leadership
---

<figure markdown="span">
![The Infosec Wheel](/img/infosec-wheel-cover.jpg)
  <figcaption>The Infosec Wheel — a map for the next generation of security professionals.</figcaption>
</figure>

## I wished something like this existed in 2015

In 2015, I was grinding through job applications trying to break into cybersecurity. I had some experience, some passion, and exactly zero clarity on what roles actually existed, what tools each team cared about, or how the industry was even structured. I was failing interviews and I didn't fully understand why.

So I did something that changed the trajectory of my career — I started asking. Not just applying and moving on, but literally asking hiring managers: _"What feedback would you give someone like me trying to land an entry level role?"_ and _"What advice would you give to make me stand out?"_

Most people don't ask. I did. And I got answers that I still reference today.

<!-- truncate -->

That willingness to ask uncomfortable questions, to be vulnerable about what I didn't know — that's what unlocked things for me. But I also got lucky. I got lucky that people answered. I got lucky that I met the right people at the right time. A lot of people trying to break into cyber don't get that same luck, and I think about that a lot.

---

## Mentorship isn't a checkbox

I've been fortunate to be embedded in Disney's mentorship programs for years now — as a mentor, a mentee, and a peer mentor. Those relationships aren't transactional for me. Over the last few years, the teams I've worked with have had early career folks who I was lucky enough to see go from interns and contractors to full-time roles at Disney. I meet regularly with people trying to figure out how to break in, how tech works, how to navigate the hiring process.

Every single time I meet with someone early in their journey, I think about 2015 Kyle. The one who didn't have a clear map. The one who had to learn the hard way that "cybersecurity" isn't one job — it's dozens of disciplines, each with its own toolsets, certifications, and culture.

And that's the problem I wanted to solve.

---

## The Infosec Color Wheel

Most people in security have heard of Red Teams and Blue Teams. Fewer people know about the full color wheel — a framework introduced by April C. Wright at Black Hat in 2017 that expands the Red/Blue model into seven distinct domains.

Each color represents a team, a mission, and a set of tools and roles:

| Team | Mission | Example Tools |
|------|---------|---------------|
| 🔴 Red | Offensive testing, adversary simulation | Metasploit, Cobalt Strike, Burp Suite |
| 🟠 Orange | Developer security training, awareness | OWASP WebGoat, HackTheBox, TryHackMe |
| 🟡 Yellow | Secure development, AppSec, DevSecOps | Semgrep, Snyk, SonarQube |
| 🟢 Green | Security automation, detection-as-code | Shuffle, XSOAR, Sigma |
| 🔵 Blue | Defense, incident response, threat hunting | Splunk, CrowdStrike, Zeek |
| 🟣 Purple | Red+Blue collaboration, control validation | MITRE Caldera, Atomic Red Team |
| ⬜ White | GRC, compliance, policy, oversight | Vanta, Drata, ServiceNow GRC |

> **Check out the live interactive version:** [the-infosec-wheel.vercel.app](https://the-infosec-wheel.vercel.app)

Click any segment and it shows you the tools, teams, and career roles that live in that domain. That's the map I wish I'd had in 2015.

---

## Why this matters for early career folks

When you're trying to break into cyber, the internet gives you the same three answers: get a Security+ cert, learn Python, do TryHackMe. That's not bad advice, but it's incomplete. It doesn't answer the question _where do I actually want to go?_

The color wheel answers that. You might be a builder at heart — that's Yellow/Green. You might love the puzzle of hunting for attackers — that's Blue. You might want to get paid to break things — that's Red. You might care more about policy and governance and organizational risk — that's White.

Knowing the landscape changes how you invest your time. Instead of studying everything and feeling overwhelmed, you can pick a color and go deep. Find the certifications that map to it. Find the tools to get hands-on with. Find the job titles to search for.

That's the point of this project — not just a tool directory, but a _compass_.

---

## How this was built — and why that's also part of the story

Here's the part I didn't plan to write about but felt too relevant to leave out.

This entire project — the research, the code, the deployment, every commit — was built **fully autonomously from my phone**. No laptop. No IDE. Just a Telegram chat with Claude Code running on my desktop in the background.

The conversation went from "let me do some research on the market first" to a fully deployed production app with:

- Deep market research on competing sites and existing catalogs
- A complete data model with 7 color teams, 70+ tools, roles, and certifications
- An interactive SVG wheel with click-to-expand and half/full view toggle
- Tool detail panels with tabs for Teams, Tools, and Roles
- A community submission flow backed by GitHub
- Git Flow with semantic commits, feature branches, develop, and main
- A Vercel deployment and a Semgrep CI security scan (0 findings)

All of it — from the first "Hey" to the last `npx vercel --prod` — happened in a single session, from my phone, via Telegram.

I'm not sharing this to be impressive about the technology. I'm sharing it because it changes what's possible. The gap between "I have an idea" and "there's a live product" is collapsing. That matters for builders. It especially matters for early career people who want to build a portfolio but feel blocked by the technical complexity of standing something up from scratch.

---

## This blog post was written with AI too

I'll be honest about this: this is my first blog post written with AI assistance. I gave Claude my previous posts, explained what I wanted to say, and answered a few questions about my own experiences. What came back was something I edited, shaped, and made mine — but the first draft wasn't blank.

I think about this the way I think about the infosec wheel project. It's not about replacing the human. It's about what becomes possible when you remove the friction. I still had the idea. I still had the story. I still had the 2015 experience and the Disney mentorship moments. The AI didn't invent any of that — it just helped me get it out of my head and onto the page faster.

That's the use case I wanted to demonstrate: building a product, writing documentation, writing a blog post. Three different kinds of creative and technical work, all done through a phone and a chat window.

---

## If you're early in your career in security

Ask for help. Ask the uncomfortable questions. Find the people who will actually answer and don't let those conversations be one-directional.

Pick a color. Not forever — just for now. Go deep on the tools and certs and community in that domain. Build something small. Write something. Ship something. The reps matter more than the credentials.

And if you're someone who's figured some of this out — pay it forward. The 2015 version of someone you know is out there, failing interviews, not sure why, too proud to ask.

Be the person who answers.

---

> 🎯 **[Explore The Infosec Wheel →](https://the-infosec-wheel.vercel.app)**
> 🐙 **[GitHub — the-infosec-wheel](https://github.com/kylifornication-code/the-infosec-wheel)**
> ➕ **[Submit a tool or role to the community catalog](https://the-infosec-wheel.vercel.app/submit)**
