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
  const dataFormatted = data.map((item) => {
    const { _id, title, categories, price, rating, cover_image } = item;
    const formattedCategories = categories.split(";");
    return {
      id: _id.toString(),
      title,
      categories: formattedCategories,
      price,
      rating,
      coverImage: cover_image,
    };
  });

  const { totalItems } = meta[0];

  return {
    data: dataFormatted,
    meta: {
      page,
      perPage,
      totalItems,
    },
  };
};
