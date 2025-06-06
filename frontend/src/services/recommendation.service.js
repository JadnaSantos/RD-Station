// getRecommendations.js

const getRecommendations = (
  formData,
  products
) => {

  const {
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType,
  } = formData;

  const productsScore = products.map((product) => {
    const preferencesMatch = selectedPreferences.filter((preference) => product.preferences.includes(preference)).length
    const featuresMatch = selectedFeatures.filter((feature) => product.features.includes(feature)).length

    return {
      ...product,
      score: preferencesMatch + featuresMatch
    }
  })


  const filteredProducts = productsScore.filter((product) => product.score > 0)

  if (selectedRecommendationType === "SingleProduct") {
    return [filteredProducts.reduce((max, current) => max.score > current.score ? max : current, {})]
  }

  if (selectedRecommendationType === "MultipleProducts") {
    return filteredProducts
  }

  return []
};

export default { getRecommendations };
