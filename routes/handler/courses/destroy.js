const apiAdapter = require('../../apiAdapter');

const {
  URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await api.delete(`/api/courses/${id}`);
    return res.json(course.data);
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