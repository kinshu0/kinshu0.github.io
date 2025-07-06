---
layout: post
title:  "Pose Estimation for Physical Therapy"
date:   2025-01-02 02:50:00 -0400
categories: jekyll update
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/s2pflHL8NqQ?si=gSnZ0o2-H4scAHP2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
[Link to DevPost](https://devpost.com/software/ez-pt)

### Inspiration
We've all faced challenges with recreational sports injuries and have struggled to access physical therapy services due to complex schedules. Finding a reliable, guided recovery program has been difficult, especially through online sources. Our project aims to tackle this by empowering users to be their own trainers, supported by both trained professionals and our latest technologies.

### What it does
EZ-PT provides guided, self-led, and professionally aided physical therapy from anywhere in the world, leveraging modern machine learning and computer vision techniques.

### Challenges we ran into
We tried several tech implementations, including optimizing video streaming, which slowed us down due to its complexity. Initially, we attempted to run the pose estimation model in the browser for better latency, but eventually had to shift all our logic to the backend, which drained a lot of time.

### Accomplishments we are proud of
We've never seen a database like ours that stores exercise pose vectors, and we're proud of implementing this complex model, translating real-time results and feedback.

### How we built it
We utilized TensorFlow, NumPy, and a pre-trained ResNet model (MoveNet) for pose estimation. Video frames were streamed to the Python backend via WebSockets for classification using KNN, and a vector database was used to store pose embeddings. We connected this with server-side rendering via Next.js, using an ORM (Prisma) to communicate with our MySQL database hosted on Railway. Our frontend was hosted on Vercel.

### What's next for EZ-PT
Prioritizing our focus on streaming and pose estimation on the web. Additionally, we are expanding our dataset to cover a wider range of physical therapy routines and enhancing the connection between professionals and their patients.

### Built With
mysql, nextjs, numpy, opencv, python, railway, tensorflow, vercel