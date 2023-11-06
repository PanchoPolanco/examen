import axios from 'axios';

const serviciosExamen = {
    GuardarExamen: async () => {
      try {
        const response = await axios.post('https://ejemplo.com/api/datos');
        return response.data;
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
      }
    },

    traerResultado: async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3001/programa/');
          return response.data.data;
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
    
      traerEvaluador: async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3001/programa/');
          return response.data.data;
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
  };
  
export default serviciosExamen;