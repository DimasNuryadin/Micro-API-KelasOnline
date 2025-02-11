const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_ORDER_PAYMENT
} = process.env;

const api = apiAdapter(URL_SERVICE_ORDER_PAYMENT);

module.exports = async (req, res) => {
  try {
    const { id } = req.user.data;
    const orders = await api.get('/api/orders', {
      params: {
        user_id: id
      }
    });
    return res.json(orders.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ status: 'error', message: 'service unavailable' })
    }
    if (error.response) {
      const { status, data } = error.response;
      return res.status(status).json(data);
    }
    return res.status(404).json({ status: 'error', message: error.message });
  }
}