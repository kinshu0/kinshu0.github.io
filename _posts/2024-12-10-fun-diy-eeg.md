---
layout: post
title:  "Fun DIY EEG (draft)"
date:   2024-12-10 03:14:32 -0400
categories: jekyll update
excerpt: Doing some brain hacking
---

I'd always been interested in neuroscience instrumentation and analyzing "brain waves". My last attempt at this was in middle school when I first tried building my own EEG using the [openeeg resources](https://openeeg.sourceforge.net/). Building it was a pain – waiting on shipments of random electronic parts, soldering components incorrectly and running through several prototyping boards (since breadboards were extremely prone to noise and interference), all just to have been unable to receive a proper signal due to some random hardware issues (most likely due to my poor soldering or some weird issue with component tolerance specs that were introducing too much noise in the amp).

Recently, however, there've been several DIY affordable neuroscience kits that make it super easy to jump right in, and I decided to get one to play around with over winter break!

Some resources I looked into:

- [backyard brains](https://backyardbrains.com/products/) - Seemed like a great DIY kit and one of the first! Best if you want to jump right in with minimal setup, but there were definitely cheaper options like the one I used
- [upside down labs](https://upsidedownlabs.tech/) - The kit that I personally got, much cheaper and ready to go since I already had an Arduino, just had to solder some header pins and a socket for the electrodes. [link for US and CA shipping](https://www.mouser.ca/manufacturer/upside-down-labs/).

<div style="text-align: center;">
    <img src="/assets/eeg/upsidedown.jpg" alt="upside down" style="max-width: 100%; height: auto; margin: 1.5rem;">
    <p style="font-size: 16px; color: #555;">Just solder the header pins and the electrodes sockets and it's good to go</p>
</div>

Can't wait to read more about neural signal processing related to EEGs and experiment with a few robotics-related BCI tasks. Also interested in some clustering, and training neural nets on this.