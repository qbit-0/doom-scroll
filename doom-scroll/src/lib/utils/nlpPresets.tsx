export const NlpPresets = {
    best: {
        minSentiment: 0.01,
        maxSentiment: 5,
        minRatio: 0.95,
        maxRatio: 1,
    },
    worst: {
        minSentiment: -5,
        maxSentiment: -0.01,
        minRatio: 0,
        maxRatio: 0.97,
    },
    neutral: {
        minSentiment: 0,
        maxSentiment: 0,
        minRatio: 0,
        maxRatio: 1,
    },
    reset: {
        minSentiment: -5,
        maxSentiment: 5,
        minRatio: 0,
        maxRatio: 1,
    },
};
