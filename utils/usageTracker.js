let usageStats = {
  totalTokens: 0,
  totalRequests: 0,
  estimatedCost: 0
};

const PRICING_PER_1K_TOKENS = {
  'gpt-4': 0.10,
  'gpt-4o': 0.005,
  'gpt-4-turbo': 0.01,
  'gpt-3.5-turbo': 0.002
};

export function trackUsage({ model = 'gpt-4o', tokens = 0 }) {
  const costPer1k = PRICING_PER_1K_TOKENS[model] || 0;
  const cost = (tokens / 1000) * costPer1k;

  usageStats.totalTokens += tokens;
  usageStats.totalRequests += 1;
  usageStats.estimatedCost += cost;

  return {
    ...usageStats,
    lastRequest: {
      model,
      tokens,
      cost: parseFloat(cost.toFixed(4))
    }
  };
}

export function getUsageSummary() {
  return {
    ...usageStats,
    estimatedCost: `$${usageStats.estimatedCost.toFixed(4)}`
  };
}
