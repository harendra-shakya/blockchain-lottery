const aQuestions = [
    "How did you hear about us?",
    "Can you describe the unique features of Chain Warz that excite you the most and why?",
    "What criteria do you use to evaluate the potential of a new project or investment opportunity, and how would you apply it to Chain Warz?",
    "Why do you think Chain Warz can be a long term hold?",
    "Tell us what kind of utility do you appreciate in an NFT project",
    "What are some examples of projects that you have held post mint? What was the reason for your conviction?",
    "Can you share a personal story of your dedication and long-term commitment to a project or cause?",
    "Name one project you currently hold and why",
    "Do you have any work experience in web2, if so what are they?",
    "What do you do for a living and what are your hobbies?",
    "Why do you believe that you deserve to be allow listed?",
    "How much do you think the mint cost should be and why?",
    "Tell us about yourself",
    "Please provide the link to the tweet where you mentioned applying for our allow list application form.",
];

export const allowlistQuestions = [
    ...aQuestions.map(question => ({
        registerKey: question,
        question: question,
        placeholder: "Write your answer (Text must be more than 10 characters)",
        minimumNumberOfCharacters: "10",
        required: true,
    })),
    {
        registerKey: "referralCodeEntered",
        question: "Referral Code",
        placeholder: "Enter Referral Code (Optional)",
        minimumNumberOfCharacters: "0",
        required: false,
    },
];

export const testAllowlistQuestions = [
    {
        registerKey: aQuestions[0],
        question: aQuestions[0],
        placeholder: "Write your answer (Text must be more than 10 characters)",
        minimumNumberOfCharacters: "10",
        required: true,
    },
    {
        registerKey: aQuestions[1],
        question: aQuestions[1],
        placeholder: "Write your answer (Text must be more than 10 characters)",
        minimumNumberOfCharacters: "10",
        required: true,
    },
    {
        registerKey: "referralCodeEntered",
        question: "Referral Code",
        placeholder: "Enter Referral Code (Optional)",
        minimumNumberOfCharacters: "0",
        required: false,
    },
];

export const faqs = [
    {
        faqQuestion: "What is Chain Warz?",
        faqAnswer:
            "Chain Warz is an innovative blockchain-based lottery where each lottery ticket morphs into a fierce fighting bot, ready for battle.",
    },
    {
        faqQuestion: "How does Chain Warz work?",
        faqAnswer:
            "Participants have the freedom to acquire as many fighting bots as they desire to engage in an exciting clash. After the dust settles, our smart contract randomly crowns a champion, who then rejoices in the form of an ETH reward.",
    },

    {
        faqQuestion: "What purpose do battle leaderboards serve?",
        faqAnswer:
            "Our battle leaderboards are our way of honoring our active and spirited community members. They are an essential part of our mission to make the platform engaging and thrilling. Be a consistent part of the battles and stay tuned for some rewarding surprises. Hint: Think Airdrops!",
    },
    {
        faqQuestion: "What is the significance of the allow list?",
        faqAnswer:
            "The allow list is our exclusive gateway to engage more deeply with our community and reward their loyalty. This grants them a Founder's Key NFT, unlocking a treasure trove of exclusive rewards and perks.",
    },
    {
        faqQuestion: "How can I participate in a Chain Warz battle?",
        faqAnswer:
            "Joining a Chain Warz battle is a breeze. All you need to do is purchase a bot for the desired battle. The more bots you enter, the higher your chances of emerging victorious.",
    },
    {
        faqQuestion: "How is the champion of each battle determined?",
        faqAnswer:
            "The hero of each battle is chosen at random by the smart contract, with the help of Chainlink VRF. This ensures an equitable and transparent selection process. For verification, this process is recorded on-chain to guarantee provable fairness.",
    },
    {
        faqQuestion: "What fate awaits my bots if they don't win a battle?",
        faqAnswer:
            "Sadly, any bot that doesn't secure victory in a battle is retired permanently and cannot participate in future skirmishes.",
    },
    {
        faqQuestion: "How do I withdraw my winnings?",
        faqAnswer:
            "Claiming your spoils of war is simple. Just connect your wallet and follow the on-screen instructions. Our smart contracts will promptly deliver your winnings to your account, from where you can transfer them to your connected web3 wallet.",
    },
    {
        faqQuestion: "What are the fees associated with using Chain Warz?",
        faqAnswer:
            "A gas fee is applicable when depositing or withdrawing ETH from your account. But worry not, once your account is funded, each bot purchase is logged on a decentralized relayer, rendering each entry to any battle gasless.",
    },
    {
        faqQuestion: "Which blockchain does Chain Warz utilize?",
        faqAnswer: "Chain Warz operates on the solid, reliable infrastructure of the Ethereum Blockchain.",
    },
];
