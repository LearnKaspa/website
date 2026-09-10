"use client";

import { useState, useEffect } from "react";
import BlockDAGVisualizer from "../components/BlockDAGVisualizer";

type Level = "beginner" | "crypto" | "dev";

interface QuestionItem {
  id: string;
  badge: string;
  question: string;
  beginner: {
    summary: string;
    body: string[];
    takeaway: string;
  };
  crypto: {
    summary: string;
    body: string[];
    takeaway: string;
  };
  dev: {
    summary: string;
    body: string[];
    takeaway: string;
  };
}

const QUESTIONS: QuestionItem[] = [
  {
    id: "what-is-kaspa",
    badge: "Identity",
    question: "What is Kaspa?",
    beginner: {
      summary:
        "The first ever cryptocurrency to achieve true scalability without sacrificing anything.",
      body: [
        "Usually to achieve speed others sacrifice decentralization or security, but Kaspa stayed true to the vision of the Bitcoin creator, by building new technology that allows near instant confirmation of payments across the globe with a zero trust verify vision and the same mining security as Bitcoin.",
        "Kaspa is fairly launched just like Bitcoin, and has the same consensus mechanism including the way it is mined across the globe.",
      ],
      takeaway: "True digital cash with near instant payments, built on the same mining security as Bitcoin.",
    },
    crypto: {
      summary:
        "A 100% fair-launch Proof-of-Work Layer-1 that scales without ditching Nakamoto consensus.",
      body: [
        "The crypto industry spent years pushing the narrative that Proof of Work cannot scale, forcing projects into Proof of Stake, centralized validator sets, or relying on Layer-2 bridges.",
        "Kaspa proves that was an architectural limitation of single-track blockchains, not Proof of Work. In Bitcoin, making blocks fast creates orphans which destroys security. Kaspa replaces the single chain with a blockDAG, ordering all parallel valid blocks instead of throwing them away.",
        "You get high throughput, sub-second confirmations, and zero orphan waste while keeping pure Proof of Work and 51% security intact.",
      ],
      takeaway: "Solves the blockchain trilemma on Layer-1 without sacrificing PoW decentralization.",
    },
    dev: {
      summary:
        "A generalization of Nakamoto Consensus operating as a Directed Acyclic Graph (blockDAG).",
      body: [
        "Kaspa generalizes the longest-chain rule into GHOSTDAG (Greedy Heaviest Observed Sub-DAG). Instead of discarding parallel blocks as orphans, GHOSTDAG forms a topological ordering of all concurrent valid blocks.",
        "It solves the k-cluster graph coloring problem to distinguish honest blocks created in parallel from adversarial delays, securing the network under physical propagation limits.",
        "Mainnet currently runs at 10 Blocks Per Second (BPS) on kHeavyHash with bounded pruning windows that preserve UTXO state integrity on consumer hardware.",
      ],
      takeaway: "Sub-second block production (λ = 100ms) with deterministic, mathematically proven DAG consensus.",
    },
  },
  {
    id: "who-created-kaspa",
    badge: "Origins",
    question: "Who created Kaspa?",
    beginner: {
      summary:
        "A community project fairly launched to the public on research from the most cited scalability researchers in crypto.",
      body: [
        "Kaspa is a community project, built and fairly launched to the public in the same style as Bitcoin, built without ICOs or VC capital backing on the research of Dr. Yonatan Sompolinsky who spent over a decade mathematically solving the scalability limits of Bitcoin.",
        "When Vitalik Buterin authored the Ethereum whitepaper in 2014, the very first mechanism cited to solve blockchain throughput was Yonatan Sompolinsky and Aviv Zohar's GHOST protocol.",
        "Kaspa is built directly on his blockDAG research, which created the mechanisms and breakthroughs that Kaspa utilizes to gain its speed without sacrificing anything.",
      ],
      takeaway: "No VCs, no pre-mine, no corporate foundation. Pure academic research built for the public.",
    },
    crypto: {
      summary:
        "Founded on a decade of peer-reviewed DAG research by Sompolinsky and Zohar; zero insider allocations.",
      body: [
        "Dr. Yonatan Sompolinsky and Prof. Aviv Zohar pioneered the DAG concept starting in 2013 with GHOST, followed by SPECTRE and PHANTOM/GHOSTDAG. Their work laid the foundation for Ethereum's early roadmap and nearly every parallel execution concept in the industry.",
        "Unlike modern Layer-1s that reserve 30% to 60% of tokens for VCs, foundations, and team insiders, Kaspa had zero pre-allocation. Every single coin was mined openly by the public from block zero.",
        "The project continues to evolve openly, led by core researchers and developers advancing consensus to DagKnight, a parameterless protocol that dynamically adapts to network latency.",
      ],
      takeaway: "The only high-throughput Layer-1 with true Bitcoin-grade fair distribution and academic roots.",
    },
    dev: {
      summary:
        "Researched by Harvard/HUJI cryptographers; engineered in clean-slate concurrent Rust.",
      body: [
        "Dr. Yonatan Sompolinsky completed his Postdoc at Harvard CRCS, dedicated to asynchronous consensus and parallel block networks.",
        "The reference implementation, Rusty-Kaspa, was engineered by Michael Sutton and open-source contributors. It is written in pure concurrent Rust, utilizing lock-free data structures and high-speed graph traversals to sustain 10 to 100 BPS throughput.",
        "The roadmap transitions from GHOSTDAG to DagKnight (Sompolinsky & Sutton), which removes the apriori latency parameter (k) and dynamically tunes confirmation time to instantaneous round-trip conditions.",
      ],
      takeaway: "Peer-reviewed algorithms implemented in safe, high-concurrency systems code.",
    },
  },
  {
    id: "how-fast-is-kaspa",
    badge: "Speed & Physics",
    question: "How fast is Kaspa, and how?",
    beginner: {
      summary:
        "10 blocks every single second. Transactions confirm almost instantly across the globe without cutting corners.",
      body: [
        "In Bitcoin, if two miners find a block at the exact same time, the network has to throw one of them away. This is called an orphan block. If you try to make Bitcoin fast, too many blocks get thrown away, which destroys the security of the network. This is why Bitcoin forces you to wait 10 minutes between blocks.",
        "Kaspa solved this problem completely. Instead of throwing parallel blocks in the trash, Kaspa lets blocks be mined simultaneously and weaves them together into a web called a blockDAG.",
        "Because nothing gets thrown away, Kaspa can safely produce 10 blocks every second right now, and testnets have already proven 100 blocks per second. Your transaction confirms in seconds while keeping the exact same proof-of-work security.",
      ],
      takeaway: "True instant payment confirmation at cash registers, backed by the raw power of global mining.",
    },
    crypto: {
      summary:
        "10 BPS mainnet with zero orphan waste; solves the propagation-versus-security trade-off in PoW.",
      body: [
        "In traditional linear PoW chains, block time is artificially restricted because network propagation delay causes high orphan rates. When orphan rates rise, an attacker with a minority of total hashrate can reliably outpace the honest chain, enabling double-spends.",
        "Kaspa's GHOSTDAG protocol accepts parallel blocks as valid references. Instead of competing for a single slot, parallel blocks support each other in a DAG structure.",
        "This completely eliminates the orphan rate penalty, enabling 10 blocks per second today with real-world throughput in the thousands of transactions per second, without relying on central validators or proof-of-stake compromises.",
      ],
      takeaway: "Delivers the raw confirmation speed of centralized chains without compromising 51% PoW security.",
    },
    dev: {
      summary:
        "Block interval λ = 100ms, sub-second mempool propagation, O(D) confirmation bounds.",
      body: [
        "Linear chains require the block interval λ to be significantly larger than the network propagation delay D (D ≪ λ) to prevent chain splits. In Kaspa, λ can safely be equal to or smaller than D.",
        "GHOSTDAG calculates the blue work for each block, determining whether it belongs in the honest selected subDAG (well-connected) or an attacker's offline branch (poorly connected), ordering them into a consistent linear sequence.",
        "Transaction inclusion happens in ~100ms, with high-confidence finality reached in seconds. State bloat is managed through automated pruning windows that retain only the active UTXO set and headers.",
      ],
      takeaway: "Scales Proof of Work to the physical limits of network bandwidth and propagation latency.",
    },
  },
  {
    id: "why-not-bitcoin-or-ethereum",
    badge: "Architecture",
    question: "Why didn't Bitcoin or Ethereum just do this?",
    beginner: {
      summary:
        "When Bitcoin was created in 2008, the math to safely weave blocks together in a web did not exist yet.",
      body: [
        "Satoshi Nakamoto built an incredible breakthrough with Bitcoin, but the only known way to keep everyone agreeing on the ledger back then was a single, slow line of blocks.",
        "Changing Bitcoin today into a blockDAG would require rewriting the entire network from scratch, which the Bitcoin community will never agree to do. Bitcoin prioritizes never changing over upgrading its speed.",
        "Ethereum tried to add smart contracts, but kept the same single blockchain bottleneck. When it got congested, Ethereum gave up on fixing the base layer with mining and switched to Proof of Stake, pushing users to complicated second layers. Kaspa was built from day one using modern math to scale directly on the base layer without giving up mining.",
      ],
      takeaway: "Kaspa is the technological continuation of Satoshi's original vision, built with modern math.",
    },
    crypto: {
      summary:
        "Bitcoin is culturally ossified, and Ethereum abandoned Layer-1 scaling for Proof of Stake and rollups.",
      body: [
        "Bitcoin is intentionally locked down. Its social consensus rejects hard forks, and its longest-chain rule cannot support high block rates without catastrophic orphaning.",
        "Ethereum pivoted away from scaling Layer-1. They abandoned Proof of Work for Proof of Stake and pushed users toward Layer-2 rollups, introducing fragmented liquidity, bridge exploits, and centralized sequencers.",
        "Kaspa did not take shortcuts. It was launched from genesis with GHOSTDAG natively at Layer-1, delivering raw settlement speed without outsourcing security to risky bridges or corporate validator sets.",
      ],
      takeaway: "You cannot rebuild a flying plane into a rocket; Kaspa was built from genesis for this exact throughput.",
    },
    dev: {
      summary:
        "Backwards compatibility limits in Bitcoin, and global execution state contention in Ethereum.",
      body: [
        "Rewriting Bitcoin into a DAG would invalidate 15 years of ASIC hardware pipelines, compact block relay protocols, and SPV validation logic.",
        "Ethereum's EVM is built around sequential single-block state transitions. Producing parallel blocks on a global shared state creates massive execution write-conflicts, which is why Ethereum abandoned execution sharding in favor of rollups.",
        "Kaspa retains a clean, parallelizable UTXO model decoupled from execution state contention, providing the fastest raw settlement engine in the space while remaining open to L2 execution environments.",
      ],
      takeaway: "A clean-slate UTXO architecture that solves consensus without EVM state bottlenecking.",
    },
  },
  {
    id: "how-big-is-kaspa",
    badge: "Hardware & Pruning",
    question: "How big is the Kaspa blockDAG?",
    beginner: {
      summary:
        "Despite producing blocks 6,000 times faster than Bitcoin, you can still run Kaspa on a standard consumer computer.",
      body: [
        "You would think that this is the catch—if it does 10 blocks per second, how does it remain decentralized? Wouldn't the chain gain too much weight for conventional hardware?",
        "Kaspa solves this by automatically pruning old data. Instead of forcing every computer to store every transaction since the beginning of time, the network safely deletes old, finalized block data after about 30 hours.",
        "Because of this, a standard Kaspa node only needs about 30 to 50 GB of free disk space. You do not need a massive corporate server to trust and verify the network.",
      ],
      takeaway: "Anyone with a normal computer and an SSD can host a node, keeping the network completely decentralized.",
    },
    crypto: {
      summary:
        "Kaspa utilizes a strict algorithmic pruning depth to prevent state bloat while maintaining full cryptographic security.",
      body: [
        "If a DAG produced 10 blocks per second indefinitely without pruning, storage growth would quickly centralize the node network. Kaspa enforces a pruning depth that determines how far back full block data is stored.",
        "At 10 BPS, the actual data retention period is 1,080,000 blocks, which equals exactly 30 hours. The network discards the old block bodies while cryptographically securing the UTXO set.",
        "A freshly synced node starts at roughly 4 GB and stabilizes around 30 to 50 GB, ensuring retail participants can still run full nodes and independently verify consensus.",
      ],
      takeaway: "State bloat is structurally bounded; node operation remains highly accessible on standard SSDs.",
    },
    dev: {
      summary:
        "Pruning depth relies on the maximum of the anticone finalization depth and the practical retention period.",
      body: [
        "The pruning formula calculates the maximum of two constraints: the anticone finalization depth and the retention period depth. At 10 BPS, the anticone finalization depth is 591,258 blocks, while the retention period is 1,080,000 blocks.",
        "The network uses the larger of the two (1,080,000 blocks) to determine when it is safe to delete old data. When the network validates new pruning points, it ensures the virtual state is at sufficient depth.",
        "This mathematical foundation ensures pruning is provably safe, accounting for all edge cases in anticone closure, maximum mergeset sizes, and fork transitions.",
      ],
      takeaway: "Provably safe DAG pruning keeps I/O operations and disk requirements well within standard NVMe tolerances.",
    },
  },
  {
    id: "how-does-kaspa-differ-from-bitcoin",
    badge: "Comparison",
    question: "How does Kaspa differ from Bitcoin?",
    beginner: {
      summary:
        "Kaspa shares Bitcoin's pure principles, but upgrades the speed and changes how the coin supply is released.",
      body: [
        "Not much is different conceptually. Both are fair launched, both use majority consensus to vote on upgrades, both use mining to create security, and both are truly decentralized.",
        "The main difference is speed. Kaspa is many times faster than Bitcoin, with fees being among the lowest in the world.",
        "Kaspa also has a faster, smoother coin issuance rate. Instead of Bitcoin's supply halving all at once every 4 years, Kaspa's block reward reduces gradually every month, totaling a halving every year.",
      ],
      takeaway: "It is Bitcoin's original decentralized ethos, but upgraded with instant speeds and a smooth monthly emission schedule.",
    },
    crypto: {
      summary:
        "Kaspa transitions from a linear blockchain to a blockDAG and replaces step-halvings with a chromatic emission schedule.",
      body: [
        "Structurally, Kaspa keeps the UTXO model, pure Proof of Work, and no pre-mine. However, it replaces Bitcoin's SHA-256 algorithm with kHeavyHash, an energy-efficient mining algorithm.",
        "While Bitcoin relies on the Longest Chain Rule, Kaspa uses GHOSTDAG, allowing it to process 10 blocks per second instead of 1 block every 10 minutes, entirely eliminating orphan block waste.",
        "Economically, Kaspa utilizes a 'chromatic halving' phase. Instead of severe supply shocks every four years, emission decreases smoothly each month by a factor of (1/2)^(1/12).",
      ],
      takeaway: "A technological evolution of Nakamoto consensus that optimizes both throughput topology and emission economics.",
    },
    dev: {
      summary:
        "GHOSTDAG topology vs. Longest Chain Rule, kHeavyHash, and high-frequency UTXO management.",
      body: [
        "The core divergence is the rejection of serial block execution. Bitcoin restricts the graph to a single path, while Kaspa orders a k-cluster graph.",
        "Because Kaspa produces blocks at λ = 100ms, the node architecture requires radically different memory management. Bitcoin processes state transitions slowly, while Kaspa's Rust node must perform concurrent UTXO validation and graph traversals instantly.",
        "The emission curve is a mathematically smooth geometric reduction, avoiding the step-function difficulty adjustments and mining death-spirals associated with traditional halving epochs.",
      ],
      takeaway: "A fundamentally different asynchronous topology operating over the same foundational UTXO and PoW paradigms.",
    },
  },
  {
    id: "what-about-programmability",
    badge: "Smart Contracts",
    question: "What about programmability?",
    beginner: {
      summary:
        "Smart contracts are coming, but they are built in a way that will never clog or slow down the main network.",
      body: [
        "Kaspa is actively working to bring a smarter, non-congested way of integrating smart contracts using zero-knowledge proofs. ",
        "Instead of forcing the main network to do all the heavy lifting, applications will do the math off-screen and just hand Kaspa the proof that it was done correctly. ",
        "This will not create clutter, it will work insanely fast, and remain entirely on the Layer-1 network. It will create a DeFi ecosystem to rival Ethereum, but without any bottlenecks or high fees—it will be true internet-latency DeFi.",
      ],
      takeaway: "High-speed programmable money and DeFi without ever clogging the base network.",
    },
    crypto: {
      summary:
        "Kaspa utilizes a Zero-Knowledge architecture where L1 acts as a traffic controller and sequencer, not an executor.",
      body: [
        "In networks like Ethereum, every node must recompute every smart contract transaction, creating massive state bloat and high gas fees.",
        "Kaspa's architecture fixes this by moving computation completely off-chain. Every application runs its own logic and simply submits cryptographic ZK proofs to the Kaspa L1.",
        "Kaspa acts as a universal sequencer and source of truth rather than an executor. This allows apps to remain fully composable (they can trustlessly interact with each other) while scaling horizontally without limit.",
      ],
      takeaway: "Ethereum-like composability combined with Solana-like performance, all anchored to Bitcoin-grade L1 simplicity.",
    },
    dev: {
      summary:
        "Off-chain vProgs submit ZK stitching proofs to the L1, completely isolating execution state from consensus.",
      body: [
        "The architecture introduces 'vProgs' (virtual programs). Each acts like a mini-blockchain for a single application, computing off-chain and generating ZK proofs for its transactions.",
        "These vProgs submit 'stitching proofs' to Kaspa, proving their new state root alongside the ZK proofs of their executed transactions.",
        "The Kaspa L1's only job is to verify these ZK proofs, track L1 'scope gas' to prevent DoS attacks between applications, and maintain a Computation DAG root that summarizes unproven states.",
      ],
      takeaway: "Full synchronous composability driven by ZK batch proofs, keeping the L1 state minimal and strictly dedicated to sequencing.",
    },
  },
  {
    id: "what-will-final-form-of-kaspa-look-like",
    badge: "The Endgame",
    question: "What will the final form of Kaspa look like?",
    beginner: {
      summary:
        "The first self-scaling cryptocurrency in history, capable of handling more transactions than all global payment processors and banks combined.",
      body: [
        "Kaspa is a fundamental upgrade over the existing infrastructure for cryptocurrencies with its own network. Whilst scaled to be 6,000 times faster than Bitcoin today, that is not the end.",
        "Kaspa developers are working on implementing, besides programmability, the DagKnight optimizations, which is another breakthrough research by Dr. Yonatan Sompolinsky and Michael Sutton. This could boost Kaspa's block rate to 100 blocks a second, making it 60,000 times faster than Bitcoin. But that is not it!",
        "The only limiting factor to Kaspa's throughput is internet speed and latency. With DagKnight optimizations, as the global internet infrastructure scales and goes up in speed, Kaspa adjusts its k block producing parameter to be higher and self-scales forever as long as the technology of internet speed advances. This makes Kaspa the first self-scaling crypto without developers needing to touch anything else.",
        "All this, paired with programmability, makes Kaspa the true Swiss Army knife of crypto. It will be the fastest and most secure settlement layer for payments, home to all Web3 traffic and decentralized financial applications, and able to transact more transactions than all the world's payment processors and banks combined.",
      ],
      takeaway: "A self-scaling base layer that continuously accelerates alongside global internet speeds, powering both instant global payments and decentralized finance.",
    },
    crypto: {
      summary:
        "Parameterless DagKnight consensus paired with zero-knowledge programmability, creating a self-adapting Layer-1 bounded only by global network latency.",
      body: [
        "Today, Kaspa's GHOSTDAG protocol operates with a fixed latency parameter (k). DagKnight, authored by Dr. Yonatan Sompolinsky and Michael Sutton, evolves this into an adaptive, parameterless consensus protocol.",
        "Instead of assuming a worst-case propagation delay, the network continuously inspects the real-time geometry of the blockDAG to determine instantaneous network speed. As optical routing, bandwidth, and global latency improve, Kaspa automatically increases its block production and confirmation speeds on its own, with zero hard forks required.",
        "When you take an auto-scaling Layer-1 operating at 100 blocks per second and pair it with native zero-knowledge programmability, you eliminate the need for centralized sequencers or risky bridging infrastructure. Kaspa becomes the foundational settlement engine for all decentralized finance and high-throughput global commerce.",
      ],
      takeaway: "The only Layer-1 designed to scale dynamically with physical internet hardware, securing high-speed settlement without compromising Proof of Work.",
    },
    dev: {
      summary:
        "DagKnight protocol removes the hardcoded k bound, establishing a latency-responsive network that scales with propagation speed D.",
      body: [
        "Traditional PoW requires fixing the block interval and latency tolerance upfront. In the DagKnight research by Sompolinsky and Sutton, the protocol dynamically solves the minimal k-cluster problem without setting k as a protocol constant.",
        "The node inspects the topological width of the DAG to measure actual network delay in real time. If global latency decreases, the protocol safely tightens confirmation windows and raises effective throughput without risk of chain splitting or security degradation.",
        "Combined with off-chain ZK execution (vProgs), the base Layer-1 acts as a pure, ultra-fast consensus and proof-verification engine, delivering the ultimate throughput ceiling bounded only by the physical speed of light across the internet.",
      ],
      takeaway: "A parameterless consensus breakthrough where throughput and confirmation times automatically track physical internet advances.",
    },
  },
  {
    id: "what-is-a-blockdag",
    badge: "Structure",
    question: "What is a blockDAG?",
    beginner: {
      summary:
        "Instead of a single slow line of blocks, Kaspa weaves parallel blocks together into a high-speed web.",
      body: [
        "BlockDAG refers to the structure of how blocks on the Kaspa network look like. In traditional blockchains, blocks are like a chain, they go one after the other.",
        "In the DAG structure, they are woven together like a web or a net. Instead of forcing everyone to wait in a single file line, multiple blocks can be created at the exact same time.",
        "Because of this blockDAG structure, Kaspa does not have to throw away blocks that are mined at the same time. It keeps all the data and organizes it, which is exactly how it reaches such massive speeds without losing security.",
      ],
      takeaway: "A web-like structure that allows multiple blocks to be created simultaneously without throwing any work away.",
    },
    crypto: {
      summary:
        "A Directed Acyclic Graph (DAG) of blocks that eliminates the longest-chain bottleneck and orphan waste.",
      body: [
        "In a traditional blockchain, miners compete to extend a single linear path. When two blocks are mined simultaneously, the network must orphan one of them to maintain consensus, wasting energy and strictly limiting throughput.",
        "A blockDAG (Directed Acyclic Graph) changes this topology. Blocks reference multiple previous blocks instead of just one parent. This means concurrent blocks are not discarded but are instead incorporated into the ledger.",
        "Kaspa uses the GHOSTDAG consensus protocol to cryptographically order this web of blocks, distinguishing between honest parallel blocks and delayed attacks. This structure enables Kaspa's massive throughput while remaining fully Proof of Work.",
      ],
      takeaway: "Replaces the single-chain bottleneck with a parallel DAG structure, completely eliminating orphan block waste.",
    },
    dev: {
      summary:
        "A topological graph structure where each block points to multiple parents, ordered by the GHOSTDAG algorithm.",
      body: [
        "A blockDAG is a Directed Acyclic Graph where vertices represent blocks and directed edges represent hash references to previous blocks. Unlike a blockchain where the out-degree is strictly 1, a blockDAG permits an out-degree greater than 1.",
        "This allows the network to safely decouple the block creation rate from the network propagation delay. The structure captures the entire history of block generation, forming the 'past' and 'future' cones for any given block.",
        "The GHOSTDAG algorithm traverses this topology. It calculates the connectivity (blue score) of the graph to securely order the blocks and resolve transaction conflicts across parallel branches.",
      ],
      takeaway: "A mathematical graph topology that safely decouples block emission rates from network propagation latency.",
    },
  },
  {
    id: "what-is-the-maximum-supply",
    badge: "Tokenomics",
    question: "What is the maximum supply of Kaspa?",
    beginner: {
      summary:
        "The supply is strictly capped at 28.7 billion coins, distributed fairly through public mining.",
      body: [
        "Kaspa maximum supply is capped to 28.7 billion coins with all coins being publicly mined.",
        "Just like Bitcoin, there is a hard limit to how many coins will ever exist, meaning Kaspa cannot be printed out of thin air to cause inflation.",
        "Fun fact: owning 1367 KAS is equivalent supply share to owning 1 BTC on the Bitcoin network (28.7 billion divided by 21 million).",
      ],
      takeaway: "A hard-capped, fully public supply with no hidden coins for insiders.",
    },
    crypto: {
      summary:
        "A hard cap of 28.7 billion KAS, emitted through a smooth chromatic halving schedule with zero insider allocations.",
      body: [
        "Kaspa has a maximum supply of exactly 28.7 billion coins. Unlike modern Proof of Stake networks that have infinite inflation or massive insider unlock schedules, Kaspa is entirely mined by the public.",
        "The emission schedule is unique. Instead of the massive supply shocks caused by Bitcoin's four-year halvings, Kaspa uses a smooth chromatic halving phase. The block reward decreases steadily every single month.",
        "This means the supply is distributed much faster in the early years. The network reaches its maximum supply cap organically, rewarding early miners while keeping the fully diluted valuation (FDV) highly transparent.",
      ],
      takeaway: "Zero VC unlocks, zero pre-mine, and a smooth deflationary emission curve ending at 28.7 billion coins.",
    },
    dev: {
      summary:
        "An asymptotic maximum supply of 28.7 billion, governed by a geometric monthly reduction formula.",
      body: [
        "The monetary policy is hardcoded to approach a 28.7 billion KAS limit. The block reward emission follows a geometric reduction based on the 12-note chromatic scale in music.",
        "Specifically, the block reward decreases by a factor of (1/2)^(1/12) every month. This means the reward halves exactly once per year, but the reduction is applied smoothly block-by-block and month-by-month.",
        "This high-frequency deflationary curve incentivizes rapid early network security bootstrapping while avoiding the hash-rate volatility typically seen around step-function halving epochs.",
      ],
      takeaway: "A deterministic, chromatic emission schedule that mathematically bounds the UTXO set at 28.7 billion KAS.",
    },
  },
];

export default function HomePage() {
  const DONATION_GOAL = 197940;
  const CURRENT_DONATIONS = 5000; 
  const progressPercent = Math.min((CURRENT_DONATIONS / DONATION_GOAL) * 100, 100);

  const [globalLevel, setGlobalLevel] = useState<Level>("beginner");
  const [questionLevels, setQuestionLevels] = useState<Record<string, Level>>({});

  const getLevel = (id: string): Level => questionLevels[id] || globalLevel;

  const [activeId, setActiveId] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" } 
    );

    QUESTIONS.forEach((q) => {
      const el = document.getElementById(q.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setQuestionLevel = (id: string, level: Level) => {
    setQuestionLevels((prev) => ({ ...prev, [id]: level }));
  };

  return (
    <div className="flex-1 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: QUESTIONS.map((q) => ({
              "@type": "Question",
              name: q.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${q.beginner.summary} ${q.beginner.body.join(" ")}`,
              },
            })),
          }),
        }}
      />

      <aside aria-label="Community notice" className="bg-kaspa-surface border-b border-kaspa-border text-xs px-4 py-2">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-kaspa animate-pulse"></span>
            <span className="font-mono text-neutral-300">learnkaspa.com</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400">Pure Public Education.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-neutral-400 hidden sm:flex items-center gap-1.5">
              Recovery: <strong className="text-kaspa">{CURRENT_DONATIONS.toLocaleString()} / {DONATION_GOAL.toLocaleString()} KAS</strong>
            </span>
            <a
              href="#fund"
              className="bg-kaspa text-black font-semibold px-2 py-0.5 rounded text-[11px] hover:bg-kaspa-light transition"
            >
              Donate
            </a>
          </div>
        </div>
      </aside>

      {/* Navigation */}
      <header className="border-b border-obsidian-800 bg-obsidian-950/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center drop-shadow-[0_0_8px_rgba(112,199,186,0.3)]">
              <img src="/logo.png" alt="LearnKaspa logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">LEARN</span>
              <span className="font-bold tracking-tight text-kaspa text-base">KASPA</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center space-x-6 text-xs font-mono text-neutral-400">
            <a href="#questions" className="hover:text-kaspa transition">Explanations</a>
            {/* <a href="#matrix" className="hover:text-kaspa transition">Blog</a> */} 
            <a href="#fund" className="hover:text-kaspa transition">Donations</a>
          </nav>

          <div className="flex items-center space-x-2">
            <a
              href="https://x.com/LearnKaspa"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-neutral-400 border border-obsidian-700 hover:border-kaspa px-3 py-1 rounded transition"
            >
              X.com ↗
            </a>
            <a
              href="https://github.com/LearnKaspa"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex text-xs font-mono text-neutral-400 border border-obsidian-700 hover:border-kaspa px-3 py-1 rounded transition"
            >
              GitHub ↗
            </a>
            
            {/* Mobile Burger Menu Icon (Hidden on screens sm and larger) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden text-neutral-400 hover:text-white p-1 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <nav className="sm:hidden bg-obsidian-950/95 border-t border-obsidian-800 flex flex-col px-4 py-4 space-y-4 text-xs font-mono text-neutral-400">
            <a href="#questions" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-kaspa transition w-full">Explanations</a>
          {/*  <a href="#matrix" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-kaspa transition w-full">Blog</a>*/}
            <a href="#fund" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-kaspa transition w-full">Donations</a>
          </nav>
        )}
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10 space-y-12">
        
        <section className="space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What is Kaspa? <br />
            <span className="text-kaspa">
              Explained for everybody.
            </span>
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            LearnKaspa is an open-source educational manifesto dedicated to breaking down the world's fastest Proof-of-Work network. Whether you are an everyday person looking for plain-English basics, a crypto investor comparing architectures, or a developer diving into blockDAG consensus, choose your experience level below to get the exact explanations you need.
          </p>

          <div className="pt-6 border-t border-obsidian-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <span className="text-sm font-mono uppercase tracking-wider text-neutral-400 font-bold">
                Explanation Mode:
              </span>
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 bg-transparent sm:bg-obsidian-900 sm:border sm:border-obsidian-800 sm:p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setGlobalLevel("beginner");
                    setQuestionLevels({});
                  }}
                  className={`px-4 py-3 sm:py-1.5 rounded text-sm font-medium transition cursor-pointer touch-manipulation ${
                    globalLevel === "beginner"
                      ? "bg-kaspa text-black font-semibold border border-kaspa sm:border-transparent"
                      : "bg-obsidian-900 sm:bg-transparent border border-obsidian-800 sm:border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  Average Joe
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGlobalLevel("crypto");
                    setQuestionLevels({});
                  }}
                  className={`px-4 py-3 sm:py-1.5 rounded text-sm font-medium transition cursor-pointer touch-manipulation ${
                    globalLevel === "crypto"
                      ? "bg-kaspa text-black font-semibold border border-kaspa sm:border-transparent"
                      : "bg-obsidian-900 sm:bg-transparent border border-obsidian-800 sm:border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  Crypto Native
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGlobalLevel("dev");
                    setQuestionLevels({});
                  }}
                  className={`px-4 py-3 sm:py-1.5 rounded text-sm font-medium transition cursor-pointer touch-manipulation ${
                    globalLevel === "dev"
                      ? "bg-kaspa text-black font-semibold border border-kaspa sm:border-transparent"
                      : "bg-obsidian-900 sm:bg-transparent border border-obsidian-800 sm:border-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  Developer & Academic
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* The Questions */}
        <section id="questions" className="space-y-6 relative">
          
          {/* Dynamic Quick Jump Sidebar */}
          <aside className="hidden min-[1350px]:block absolute top-0 bottom-0 -left-48 w-40">
            <div className="sticky top-[25vh]">
              <div className="border-l-2 border-obsidian-800 space-y-1">
                <h3 className="text-[15px] font-mono text-neutral-500 uppercase tracking-widest mb-3 pl-4">
                  Quick Jump
                </h3>
                {QUESTIONS.map((q) => (
                  <a
                    key={q.id}
                    href={`#${q.id}`}
                    className={`block text-[15px] leading-relaxed transition-all duration-300 py-1.5 ${
                      activeId === q.id
                        ? "text-kaspa font-bold -ml-[2px] border-l-2 border-kaspa pl-4"
                        : "text-neutral-500 hover:text-neutral-500 pl-4"
                    }`}
                  >
                    {q.question}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {QUESTIONS.map((q) => {
            const currentLevel = getLevel(q.id);
            const data = q[currentLevel];

          return (
              <article
                key={q.id}
                id={q.id}
                className="scroll-mt-32 border border-obsidian-800 bg-obsidian-900/60 rounded-xl p-6 transition space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-kaspa uppercase font-bold tracking-wider">
                      {q.badge}
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
                      {q.question}
                    </h2>
                  </div>

                {/* Individual Switch */}
                <div className="flex flex-wrap items-center gap-1 self-start sm:self-auto bg-obsidian-950 border border-obsidian-800 rounded p-1 mt-2 sm:mt-0">
                  {(["beginner", "crypto", "dev"] as Level[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setQuestionLevel(q.id, lvl)}
                      className={`px-3 py-2 sm:py-1 text-xs font-mono rounded uppercase transition cursor-pointer touch-manipulation ${
                        currentLevel === lvl
                          ? "bg-kaspa text-black font-bold"
                          : "text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      {lvl === "beginner" ? "Plain" : lvl === "crypto" ? "Crypto" : "Dev"}
                    </button>
                  ))}
                </div>
                </div>

                {/* Summary Box */}
                <div className="bg-kaspa-surface/60 border-l-2 border-kaspa p-3 rounded-r text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed">
                  {data.summary}
                </div>

                {/* Body Text */}
                <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {data.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Bottom Takeaway */}
                <div className="pt-3 border-t border-obsidian-800 flex items-baseline gap-2 text-xs font-mono">
                  <span className="text-kaspa font-bold uppercase">The Bottom Line:</span>
                  <span className="text-neutral-400">{data.takeaway}</span>
                </div>
              </article>
            );
          })}
        </section>

          <BlockDAGVisualizer />

        {/* Fact Matrix */}
        <section id="matrix" className="space-y-4">
          <div className="flex items-center justify-between border-b border-obsidian-800 pb-2">
            <h2 className="text-base font-bold font-mono text-white uppercase tracking-wider">
              Technical Comparison Matrix
            </h2>
            <span className="text-xs font-mono text-neutral-500">Pure Architecture</span>
          </div>

          <div className="overflow-x-auto border border-obsidian-800 rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-obsidian-950 border-b border-obsidian-800 text-neutral-400 font-mono">
                  <th className="p-3">Feature</th>
                  <th className="p-3">Bitcoin</th>
                  <th className="p-3">Proof of Stake (Solana / others)</th>
                  <th className="p-3 text-kaspa font-bold bg-kaspa-surface/60">Kaspa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-obsidian-800 text-neutral-300">
                <tr>
                  <td className="p-3 font-semibold text-white">Block Time</td>
                  <td className="p-3 font-mono">10 minutes</td>
                  <td className="p-3 font-mono">~0.4s (Voted slots)</td>
                  <td className="p-3 text-kaspa font-mono font-bold bg-kaspa-surface/30">0.1s (10 Blocks / Sec)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Consensus Type</td>
                  <td className="p-3">Proof of Work (SHA-256)</td>
                  <td className="p-3">Proof of Stake (Validators)</td>
                  <td className="p-3 text-kaspa font-medium bg-kaspa-surface/30">Proof of Work (kHeavyHash)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Launch Style</td>
                  <td className="p-3">100% Fair Launch</td>
                  <td className="p-3">Heavy VC & Insider Allocations</td>
                  <td className="p-3 text-kaspa font-bold bg-kaspa-surface/30">100% Fair Launch (Zero Pre-mine)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Parallel Blocks</td>
                  <td className="p-3">Discarded as Orphans</td>
                  <td className="p-3">Not applicable</td>
                  <td className="p-3 text-kaspa font-medium bg-kaspa-surface/30">Weaved into BlockDAG (0% waste)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Hardware to Run Node</td>
                  <td className="p-3">Consumer PC</td>
                  <td className="p-3">Data center server hardware</td>
                  <td className="p-3 text-kaspa font-medium bg-kaspa-surface/30">Consumer PC & standard SSD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Community Goal */}
        <section id="fund" className="border border-kaspa bg-kaspa-surface/50 rounded-xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-4 max-w-xl w-full">
              <div>
                <span className="text-xs font-mono text-kaspa uppercase font-bold tracking-wider">
                  Developer Recovery Fund
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Target Goal: {DONATION_GOAL.toLocaleString()} KAS</h3>
              </div>

              {/* Dynamic Progress Bar */}
              <div className="w-full space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-kaspa font-bold">{CURRENT_DONATIONS.toLocaleString()} KAS Raised</span>
                  <span className="text-neutral-400">{progressPercent.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-obsidian-950 rounded-full h-3 border border-obsidian-800 overflow-hidden relative">
                  <div 
                    className="bg-kaspa h-full absolute left-0 top-0 transition-all duration-1000 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed pt-2">
                learnkaspa.com is completely free, open source. I built this platform to educate the world about Kaspa. Back in 2023, I was mining and supporting the network early on. Because Kaspa lacked hardware wallet integration at the time, my funds had to remain in a hot wallet. Malware on one of my miners swept the wallet clean, stealing exactly {DONATION_GOAL.toLocaleString()} KAS. A kind community member already donated 5,000 KAS a few years back. If you find my work on this platform useful, donations to my secure hardware wallet are deeply appreciated to help recover what was lost.
              </p>
            </div>
            
            <div className="bg-obsidian-950 border border-obsidian-800 p-5 rounded-xl font-mono text-left md:text-right flex-shrink-0 self-start md:self-center">
              <div className="text-xs text-neutral-400">Hardware Wallet Address (KAS)</div>
              <div className="text-kaspa text-xs sm:text-sm font-bold select-all mt-1 break-all max-w-[280px]">
                kaspa:qzvg08f682cw4sdwjly70rxlmtwsxuvpzaqw4axk6j78237fxt35xu5l2xu5a
              </div>
              <a 
                href="https://kaspa.stream/addresses/kaspa:qzvg08f682cw4sdwjly70rxlmtwsxuvpzaqw4axk6j78237fxt35xu5l2xu5a" 
                target="_blank" 
                rel="noreferrer" 
                className="block text-[10px] text-neutral-500 mt-2 hover:text-kaspa transition"
              >
                100% auditable on the Kaspa block explorer ↗
              </a>
            </div>
          </div>
      </section>
      </main>

      <footer className="border-t border-obsidian-800 bg-obsidian-950 py-6 text-xs text-neutral-500 font-mono">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-center sm:text-left">
            learnkaspa.com • Written for clarity.
          </div>
          <div className="flex space-x-4">
            <a href="#questions" className="hover:text-kaspa transition">Top</a>
            <a href="https://x.com/LearnKaspa" target="_blank" rel="noreferrer" className="hover:text-kaspa transition">X.com</a>
            <a href="https://github.com/LearnKaspa" target="_blank" rel="noreferrer" className="hover:text-kaspa transition">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
