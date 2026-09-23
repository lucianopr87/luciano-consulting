---
title: "Measuring Tokens Is Not Measuring Performance"
description: "Tokens consumed, PRs opened, review comments left: metrics that are easy to count and say nothing about how a team actually works. Measuring performance matters — which is exactly why it's worth doing right."
author: "Luciano Perez Ruiz"
pubDate: 2026-09-23
tags: ["teams", "metrics", "management", "leadership", "ai"]
lang: "en"
draft: false
coverImage: "./metricas-desarrollo-cover.jpg"
coverImageAlt: "Illustration of a developer aiming a bow and arrow at the bullseye of a target drawn on a screen, oblivious to the structure of blocks and gears crumbling right next to him."
---

Every so often a new "trending" metric shows up for evaluating development teams. The latest one is token consumption: how much each developer uses AI tools, who's at the top of the leaderboard, who "hasn't adopted it yet." And like most metrics of this kind, it has something very appealing about it: it's easy to count, it comes in a clean dashboard, and it gives the feeling that something is being measured.

The problem is that it doesn't measure what people think it measures.

To be clear, this isn't an argument against measuring. Measuring a team's performance matters: it's how you know whether the team is improving, where it gets stuck, and whether the investments you're making — in tools, in processes, in people — are paying off. Precisely because it matters, it's worth doing well. And doing it well almost never lines up with measuring whatever is easiest to count.

## Tokens are a usage metric, not a performance metric

Token consumption makes sense as a data point. It helps you understand how much the tools are being used, keep costs under control, and spot whether a team needs training or whether a license is actually being put to use. As a usage metric, it's fine.

But once that number becomes part of how a developer or a team is evaluated, it turns toxic. Someone burning through a lot of tokens tells you nothing about whether they solved the problem well, whether they solved it quickly, whether what they shipped works, or whether they introduced three new bugs along the way. It could mean they're highly productive with AI — or that they're struggling to find a solution and iterating blindly. The number looks the same either way.

And it gets worse: as soon as people understand it's being evaluated, they start hitting the number. Not out of bad faith, but because it was framed as one more target to meet. The tool gets used for things that don't need it, prompts get fired off just to "add up," and the metric climbs while the real work stays the same. At that point the dashboard stops informing and starts lying.

## We've seen this movie before: PRs and review comments

None of this is new with AI. In my experience, I've seen the number of pull requests opened, the number of reviews done, and the number of comments left on teammates' PRs used as individual performance metrics.

The intent behind it was reasonable: encourage collaboration and code review. The result was predictable. Comments like "looks good to me" started showing up — adding nothing, but bumping the counter by one. Approvals started happening to meet the quota, not because the code had actually been reviewed.

Then there are the subtler artists of gaming the metric: the ones who ask questions on a PR without knowing the context or the business rules behind the change. At first glance it looks like genuine engagement, but in practice the conversation stops being about the code and turns into a debate about the analysis — someone has to stop and explain why the requirement is the way it is, something that was already settled beforehand. The comment scores on the leaderboard and costs the team time.

Meanwhile, the person who spent an hour thoroughly reviewing a complex PR — and left two comments that prevented a production bug — came out looking worse than someone who left ten shallow remarks across ten different PRs.

None of those metrics reflected what each person actually contributed. Worse, they pushed people to work for the number instead of for the product. When a metric becomes a target, it stops being a good metric.

## Filler metrics

My read is that many of these metrics don't show up because someone concluded they were the best way to measure performance. They show up because figuring out how to measure performance is hard, takes time, and requires really understanding the team's work. So the list of objectives gets padded with whatever is at hand: tokens, PRs, comments, logged hours. Things you can pull out of a system without having to think too hard.

But having metrics for the sake of having them — or because nobody's clear on how to measure — doesn't solve the problem. It hides it. The team starts optimizing numbers that don't matter, leaders make decisions based on information that doesn't reflect reality, and the people who actually add value can end up rated lower than the ones who learned to play the scoreboard.

Defining performance properly takes time. And that time is part of the job of leading a team, not a box to tick with the first thing the tool offers.

## So what should you measure? What the team delivers

If you look at the stages of the software development lifecycle — planning, design, building, testing, deployment and operations — what really matters isn't how much effort went into each stage but what came out of it. The useful question isn't "how much did the team work?" but "what did it deliver, at what quality, and how fast?"

A few questions that actually tell you something:

- **How long does it take for something to reach production?** From the moment it's decided until it's in users' hands.
- **How often do you deploy?** A team that ships frequently and in small increments usually carries less risk and learns faster.
- **How much rework comes from mistakes?** How much of the team's time goes into fixing what was already delivered.
- **How many bugs make it to production?** Not how many bugs get found overall, but how many slip past the process and get discovered by a user.
- **How fast do you respond when something breaks?** An incident, a vulnerability, a critical failure: the time between detection and resolution.

These metrics measure the team, not the individual, and that's intentional. Software is built by teams, and individual performance is better understood within that context than on an activity leaderboard.

## AI should show up in the results, not in the consumption

This is where the token question becomes obvious. AI is an excellent tool for speeding up development, and I have no doubt it does. But if it speeds things up, that should show in what the team produces:

- Are there more deploys? More frequent ones?
- Has the time it takes a feature to reach production gone down?
- Is there less rework from mistakes?
- Are failures and vulnerabilities getting fixed faster?

If token consumption goes up but none of those answers improve, AI isn't making the team more effective — it's just being used. And if those answers do improve, token consumption becomes a cost detail, not the headline indicator. Either way, the number that matters is in the results.

(The impact of AI on each stage of the development lifecycle deserves a lot more space, and I'll dig into it in an upcoming post.)

## The human side doesn't fit in a dashboard

There's something no metric fully captures: the way each person chooses to solve a problem. The one who takes a bit longer to understand the context before writing code, the one who notices a requirement is poorly framed and raises it in time, the one who spends an afternoon unblocking a teammate. None of that shows up in a PR count or a token tally, and it's often exactly what makes a team work.

Outcome metrics help you see whether the team is delivering value. But evaluating people still takes something that can't be automated: knowing their work, talking to them and to their team, and understanding the context behind each decision.

## Measure — but measure well

If you're a CEO, a founder or a team lead thinking about how to measure your development team's performance: do it. It's one of the best ways to catch problems early and to justify (or challenge) the investments you're making. But before adding a metric to the dashboard, ask yourself three questions:

1. **Does this measure an outcome or an activity?** If it measures activity — how much something was used, how many comments, how many hours — it probably says nothing about performance.
2. **What happens if the team starts optimizing for this number?** If the answer is "they'll inflate it without changing anything real," it's a bad metric.
3. **What decision will I make with this data?** If there isn't one, that's statistics, not management.

A few well-chosen metrics focused on what the team delivers are worth far more than a dashboard full of numbers nobody knows how to read. What really matters is the outcome. Everything else is noise dressed up as a chart.

If you're figuring out how to measure your team's performance and don't want a dashboard full of numbers that say nothing, [let's talk](/en/#contact).
