/**
 * Handles the search response and formats the data.
 *
 * @param {Object} params - The parameters object.
 * @param {Array} params.response - The response array containing data and meta information.
 * @param {number} params.page - The current page number.
 * @returns {Object} The formatted response object containing data and meta information.
 * @returns {Array} returns.data - The formatted data array.
 * @returns {Object} returns.meta - The meta information object.
 * @returns {number} returns.meta.page - The current page number.
 * @returns {number} returns.meta.totalItems - The total number of items.
 */
export const handleSearchResponse = ({ response, page, perPage }) => {
  const { data, meta } = response[0];
  const { totalItems = 0 } = meta[0] ?? {};

  return {
    data,
    meta: {
      page: parseInt(page),
      perPage,
      totalItems,
    },
  };
};

export const formatCsvRowData = (data) => {
  const { categories, price, rating, ...rest } = data;
  const formattedCategories = categories.split(";");
  const formattedPrice = parseInt(price);
  const formattedRating = parseFloat(rating);

  return {
    ...rest,
    categories: formattedCategories,
    price: formattedPrice,
    rating: formattedRating,
  };
};
