---
title: The Drizzle - ep 03 - Building for 2026
date: 2025-12-19
authors:
    - kylifornication
tags:
    - coding
    - drizzle
---
<figure markdown="span">
![AI Content Analyzer](/img/drizzle/drizzle-ep03.png)
  <figcaption>Courtesy of my mad Canva skills + ChatGPT</figcaption>
</figure>

:::info The Drizzle: ep 03 - Building for 2026
    ### 🗓️ Short Forecast

    A drizzle of the holidays and enough caffeine to get through them and the projects I have been thinking up. 

    **The last few weeks of projects:** 

    - Rebuilding Disney's 10yr old Open Source Program site in React/TS - I'll share this once it's approved for deployment!
    - [Open Sourcing my Career Walking Site](https://astro.build/themes/details/career-walking-site-bento-box-theme/)
    - [Building and open sourcing a Disney name tag template](#)
    - Deck building in my backyard
:::

<!-- truncate -->

## 💦 Previous 21-day Forecast

### Why Open Source is still the Future*: 

I believe that AI is the engine of open source. AI utilizes the open web to train on and you can think of open source projects as the backbone of it. 

I think more companies should be contributing to OSS and understanding how it could affect the AI landscape. Companies have become smarter about rate limiting AI scrapers or monetizing it, [Cloudflare said that they've blocked 416B AI bot requests to sites](https://www.computerworld.com/article/4105182/cloudflare-has-blocked-416-billion-requests-from-ai-bots-in-the-last-six-months.html?utm_source=chatgpt.com). Some AI companies have even tried to [find ways around the rate limiting](https://techcrunch.com/2025/08/04/perplexity-accused-of-scraping-websites-that-explicitly-blocked-ai-scraping/?utm_source=chatgpt.com). If this trends continues, we'll likely see some large deals between CDNs and the AI companies, but this makes the training data on public sites and open source projects even more vital to how we'll all be using the newest LLMs. 

This is why, I've set a goal for myself to open source 5 projects by the end of the year. Below is what I worked on to close out the year! 

:::tip My Personal Open Source Releases

    Below are a couple projects I open sourced recently!

    - [3d Disney-like Name tag](#)
    - [Career Walking Site](https://astro.build/themes/details/career-walking-site-bento-box-theme/)
:::

### The IDE Wars in 2026: 

When I was starting out in tech, my coworkers and I would often get into esoteric debates, we'd debate hosting your DNS whenever someone would complain about their site going down, tabs vs spaces, - vs _, and emacs vs vim. Nowadays it's more about what IDE or model you're using. If you go on any social media platform where engineers frequent you'll see new claims every other week, "Model X just beat all other models in the benchmarks". Ngl, these claims means very little to me, so you won't see me me placating or adding to the hype. In my opinion, the benchmarks are ways we can evaluate the market competition, not the real usage/value of the models and products they live in, like IDEs. In the last year, companies like AWS and Google have forked and rebuilt their own versions of VSCODE. It makes you wonder, is this a cash cow or a loss leader? My hot take is that it'll be a loss leader to get people to use their models or to get them more embedded in their platform/system ecosystem. 

I've asked my team and others at Disney and it seems like most are using a combination of different IDEs/CLIs with models running in them. Right now, I'm mostly using a mixture of Cursor (+Specify), KIRO, and I've started experimenting with Codex and Figma Make, too. _Where I'm really interested, is understanding how this will impact team work and development._

Building products or a project is a team sport and the IDE has been an agnostic place where engineers can bring their own and work with their team regardless of ecosystem. Now, when you use an AI based IDE you'll be indoctrinated into dot files with actions, steering docs, and team standards. While I think this type of development (through spec files) is the future of team development, old habits die hard, and each IDE treats these differently. Using an `AGENTS.md` is probably as close as I've seen to standardizing this approach so you agent has a steering doc that is mostly portable between agents based environments. 

For now, I think it's evolving too quickly to go all-in on an approach. I've had my team start looking at making standard spec files/directories for our approved tools at work and I'm going to keep playing with anything that provides me free tokens/credits. Below is a table, that will probably be outdated in a few weeks but gives you snapshot overview of what I've been able to come up with based on my experience. 

| Tool                                                           | Strength                             | Best for                          |
|----------------------------------------------------------- | ------------------------------------ | --------------------------------- |
| **GitHub Copilot**                                             | Broad support & workflow integration | Everyday coding                   |
| **Cursor**                                                     | Deep contextual code understanding   | Complex project tasks             |
| **CodeWhisperer / AWS Kiro**                                   | Cloud & AWS environment coding       | AWS heavy stacks                  |
| **Tabnine**                                                    | Enterprise governance & privacy      | Enterprise teams                  |
| **Antigravity**                                                | Agent-driven task automation         | Experimental & advanced workflows |

??? note "My Cursor 2025 Wrapped"
    <figure markdown="span">
    ![Cursor 2025 Wrapped](/img/drizzle/cursor-2025.png)
    <figcaption></figcaption>
    </figure>

### Deferring is always an option: 

I was told early in my life, "not doing anything is a decision", and I didn't realize how true it was until being an adult and even more so as a people leader. I'm reminded of this often when someone comes to me and tells me about this other teams' important dependency, requirement, or feature they need from us. While I want to help others, I'm always looking for my teams priorities to stay on track and find out what happens if we defer to a later date. I mean, what's the worst that can happen? You ask this to the right person and you'll get them to pause and think hard. This method of deferring your decision can sometimes be a huge benefit to finding out critical info or researching. Sometimes it's hard to give yourself an option C, especially under the pressure of delivering for a customer, but it's such a key way of managing expectations and managing your roadmap. 

A way this is exercised outside of the workplace that I've had a fun time analyzing is NFL teams as they compete in overtime. Week 16 in the NFL had multiple overtime games that ended in some crazy outcomes. In 2022 the overtime rules changed to allow each team a possession in overtime. This created a different strategy for coaches like deferring (or kicking off first), to get more info on how the other team responds and work on offense. This [ESPN article](https://www.espn.com/nfl/story/_/id/46150828/nfl-new-regular-season-ot-rules-coin-toss-two-point-conversion) breaks it down pretty good. Because this is a one quarter, winner takes all match, the stakes are high and coaches take more risks. This means going for it on 4th down, pulling out trick plays, and going for two; usually strategies that coaches use seldomly in the season. 

Here's a quick timeline summary on the rules changes:

| Year     | Major Change                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| **1974** | Sudden-death OT (first score wins) added to regular season.                                                                 |
| **2010** | "Modified sudden death": first TD still ended game, but field goals gave the other team a chance.                         |
| **2012** | Modified rule adopted for regular season.                                                                                   |
| **2017** | Regular season OT shortened from 15 to 10 minutes.                                                                         |
| **2022** | Playoffs changed to guarantee a possession for both teams.                                                                  |
| **2025** | Regular season now also guarantees both teams a possession.                                                                |


### Transformations + Productization*: 

A lot of initiatives in a corporate environment are wrapped in the wording "Transformation". I won't take too many digs at this, because I'm definitely guilty of doing it but I've learned more often than not language matters to get buy-in. The newest shift we're seeing is with everything in IT becoming a product. 

I've had peers think that this shift is just wording or buzzwords being added to things. On one hand, there's some truth to it; without action it's just words and rhetoric. On the other, spending most of my career in product has made me believe "This is the Way". I went through being the only product owner, sole product manager, and first product engineer in my orgs. I almost feel like my career is an mirror of what I've seen in the industry shifting to Forward Deployment Engineers (Palantir) and how most startups now hire Product Engineers as the swiss army knife for their org to connect with customers. 

Below is how I've been thinking about how to think about these terms as a way that it fits into an organization.
    - Product thinking → organizational strategy
    - Digital transformation → product operating models
    - Business model shifts → product-centric or platform-led business designs


## 🖇️ Digital Drizzle: Interesting Links/Stories

- [Simpson deck builder](https://www.strongtie.com/products/go/software/deckplanner) - If you're a DIYer and want to build a deck this tool is awesome.
- 3d printing Tools you should try, especially if you like trying AI products:
    - [Create a custom 3d printable STL file with AI models using image to 3d model](https://makerworld.com/en/makerlab/imageTo3d?from=makerlab)
    - [Create flat printable STL files with different AI models using Chroma Canvas](https://makerworld.com/en/makerlab/chromaCanvas?from=makerlab)
    - [Create your own figurine from a photo of you](https://makerworld.com/en/makerlab/printU?from=makerlab)
    - [Build your own Xmas ornament](https://makerworld.com/en/makerlab/christmasOrnamentMaker)
- If you like MkDocs Material, the project is being retired and I'll be rebuilding this site in their new project, [Zensical](https://zensical.org/). Just waiting for blog support! :D
- If you like EDM (club mixes), I recently found [Syber on Youtube](https://www.youtube.com/watch?v=-P-V7t3Cnu0&list=RD-P-V7t3Cnu0&start_radio=1) and you might like it too! 

---

<div class="buy-me-coffee-container">
  <div class="buy-me-coffee-text">**Like what I do and want to support me?**</div>
  <a href="https://buymeacoffee.com/kylifornication" target="_blank" rel="noopener noreferrer" class="buy-me-coffee-button">
    <span class="coffee-icon">☕</span>
    <span>Buy me a Coffee</span>
  </a>
</div>