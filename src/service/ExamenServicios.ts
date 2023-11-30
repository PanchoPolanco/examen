import axios from 'axios';

const serviciosExamen = {
    guardarExamen: async(formularioExamen: object) => {
      console.log("envio formularioExamen", formularioExamen);
      try {
        return await axios.post('http://127.0.0.1:3001/examen/crear_examen', formularioExamen);
      } catch (error) {
        console.error('Error al enviar el examen:', error);
        throw error;
      }
    },

    traerResultado: async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3001/resultado_aprendizaje/traer_resultados');
          return response.data.data;
        } catch (err) {
          console.error(err);
          throw err;
        }
      },
    
      traerEvaluador: async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3001/evaluador/traer_evaluadores');
          return response.data.data;
        } catch (err) {
          console.error(err);
          throw err;
        }
      },

      async traerPrograma() {
        try {
          const response = await axios.get('http://127.0.0.1:3001/programa/');
          return response.data.data;
        } catch (err) {
          console.error(err);
        }
      }
  };
  
export default serviciosExamen;