import React, { useEffect, useState } from 'react'
import { 
  IonContent, IonHeader, IonPage, IonTitle, 
  IonToolbar, IonInput, IonLabel, IonButton,
  IonList, IonItem, IonGrid, IonRow, IonCol 
} from '@ionic/react'
import InputSeleccion from './InputSeleccion'
import serviciosExamen from '../service/ExamenServicios'

type FormularioExamen = {
  programa_id: number;
  resultado_aprendizaje_id: number;
  proyecto_integrador: string;
  evaluadores_ids: string[];
  actividades_formativas: { descripcion: string }[];
  estudiantes: { NOMBRE: string }[];
};

 const ExploreContainer: React.FC = () => {
    const [formularioExamen, setFormulario] = useState<FormularioExamen>({
      programa_id: 0,
      resultado_aprendizaje_id: 0,
      proyecto_integrador: '',
      evaluadores_ids: [],
      actividades_formativas: [],
      estudiantes: [],
   });
    const [programa, setPrograma] = useState<string[]>([]);    
    const [resultadoAprendizaje, setResultadoAprendizaje] = useState<string[]>([]);
    const [evaluadores, setEvaluadores] = useState<string[]>([]);
    const [nuevaActividad, setNuevaActividad] = useState<{ descripcion: string }>({
        descripcion: ''
    });
    const [nuevoEstudiante, setNuevoEstudiante] = useState<{ NOMBRE: string }>({
        NOMBRE: ''
      });

      const onPrograma = (seleccionId: number) => {
        setFormulario({
          ...formularioExamen,
          programa_id: seleccionId,
        });
      };

    const onResultado = (selectedId: number) => {
        setFormulario({
          ...formularioExamen,
          resultado_aprendizaje_id: selectedId,
        });
      };

    const onProyectoIntegrador = (event: any) => {
        setFormulario({
          ...formularioExamen,
          proyecto_integrador: event.target.value,
        });
      };
    
    const onEvaluadores = (selectedId: string) => {
        setFormulario({
          ...formularioExamen,
          evaluadores_ids: [...formularioExamen.evaluadores_ids, selectedId],
        });
      };

    const onActividadFormativa = (value: string) => {
        setNuevaActividad({
          ...nuevaActividad,
          descripcion: value
        });
      };
    
    const onEstudiante = (value: string) => {
        setNuevoEstudiante({
          ...nuevoEstudiante,
          NOMBRE: value
        });
      };

    const agregarActividad = () => {
        if (nuevaActividad.descripcion) {
          const agregarActividad = [...formularioExamen.actividades_formativas, nuevaActividad];
          setFormulario({
            ...formularioExamen,
            actividades_formativas: agregarActividad,
          });
        }
      };
    
    const agregarEstudiante = () => {
        if (nuevoEstudiante.NOMBRE) {
          const agregarEstudiante = [...formularioExamen.estudiantes, nuevoEstudiante];
          setFormulario({
            ...formularioExamen,
            estudiantes: agregarEstudiante,
          });
        }
      };

      const eliminarEvaluador = (index: number) =>{
        const nuevoFormulario = {...formularioExamen};
        const eliminarFormulario = [...nuevoFormulario.evaluadores_ids];
        eliminarFormulario.splice(index, 1);
        nuevoFormulario.evaluadores_ids = eliminarFormulario;
        setFormulario(nuevoFormulario);
      }

    const eliminarActividad = (index: number) =>{
      const nuevoFormulario = {...formularioExamen};
      const eliminarFormulario = [...nuevoFormulario.actividades_formativas];
      eliminarFormulario.splice(index, 1);
      nuevoFormulario.actividades_formativas = eliminarFormulario;
      setFormulario(nuevoFormulario);
    }

    const eliminarEstudiante = (index: number) => {
      const nuevoFormulario = {...formularioExamen};
      const eliminarFormulario = [...nuevoFormulario.estudiantes];
      eliminarFormulario.splice(index, 1);
      nuevoFormulario.estudiantes = eliminarFormulario;
      setFormulario(nuevoFormulario);
    }

    useEffect(() => {
      async function fetchData() {
        try {
          const data = await serviciosExamen.traerPrograma();
          setPrograma(data);
        } catch (error) {
          console.error("Error al obtener el programa:", error);
        }
      }
      fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await serviciosExamen.traerResultado();
            setResultadoAprendizaje(data);
            console.log("Mis resulatados de aprendizaje: ", data)
          } catch (error) {
            console.error('Error al obtener el resultado de aprendizaje:', error);
          }
        }
        fetchData();
      }, []);
    
    useEffect(() => {
        async function fetchData() {
          try {
            const data = await serviciosExamen.traerEvaluador();
            setEvaluadores(data);
            console.log("Mis evaluadores: ", data)
          } catch (error) {
            console.error('Error al obtener el evaluador:', error);
          }
        }
        fetchData();
      }, []);

    const onCargarExamen = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("mi formulario examen",formularioExamen);
        try {
            await serviciosExamen.guardarExamen(formularioExamen);
        } catch (error) {
            console.error('Error al enviar los datos del examen:', error);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Crear Examen</IonTitle>
                </IonToolbar>
            </IonHeader>
        <IonContent>
          <form onSubmit={onCargarExamen}>
                <IonList>
                  <IonItem>
                      <IonLabel style={{whiteSpace: 'normal'}}>Programa</IonLabel>
                      <InputSeleccion 
                          seleccionar={programa} 
                          idSeleccion={onPrograma}
                          label='seleccione programa'
                          variable='nombre'
                      />
                      {/* <IonInput 
                          type="text" 
                          value={formularioExamen.programa_id} 
                          onIonChange={onPrograma}
                      ></IonInput>             */}
                  </IonItem>
                  <IonItem className="item">
                      <IonLabel style={{whiteSpace: 'normal'}}>Resultados de Aprendizaje</IonLabel>
                      <InputSeleccion 
                          seleccionar={resultadoAprendizaje} 
                          idSeleccion={onResultado}
                          label='seleccione resultado'
                          variable='titulo'
                      />
                  </IonItem>
                  <IonItem>
                      <IonLabel position="floating">Proyecto Integrador</IonLabel>
                      <IonInput
                          type="text"
                          value={formularioExamen.proyecto_integrador}
                          onIonChange={onProyectoIntegrador}
                      ></IonInput>
                  </IonItem>
                  <IonItem className="item">
                      <IonLabel style={{whiteSpace: 'normal'}}>Evaluadores</IonLabel>
                      <InputSeleccion
                          seleccionar={evaluadores}
                          idSeleccion={onEvaluadores}
                          label='seleccione evaluador'
                          variable='nombre_evaluador'
                      />
                  </IonItem>
                  <IonGrid>
                      <IonRow>
                      <IonCol>Lista de Evaluadores</IonCol>
                      </IonRow>
                      {formularioExamen.evaluadores_ids.map((evaluadorId, index) => (
                        // const evaluador = evaluadores.find((e) => e.id === evaluadorId);
                        // if (!evaluador) {
                        //   return null;
                        // }
                        // return (
                          <IonRow key={index}>
                            <IonCol>{evaluadorId}</IonCol>
                            <IonCol>
                              <IonButton onClick={() => eliminarEvaluador(index)}>Eliminar</IonButton>
                            </IonCol>
                          </IonRow>
                        // );
                      ))}
                  </IonGrid>
                  <IonItem>
                    <IonItem>
                      <IonLabel position="floating" style={{whiteSpace: 'normal'}}>Actividades</IonLabel>
                        <IonInput
                            style={{width: '59vw'}}
                            type="text"
                            value={nuevaActividad.descripcion}
                            onIonChange={(e) => onActividadFormativa(e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonButton onClick={agregarActividad} style={{height: '35px', whiteSpace: 'normal'}}>Agregar Actividad</IonButton>
                    </IonItem>
                  </IonItem>
                  <IonGrid>
                      <IonRow>
                      <IonCol>Lista de Actividades</IonCol>
                      </IonRow>
                      {formularioExamen.actividades_formativas.map((actividad, index) => (
                      <IonRow key={index}>
                          <IonCol>{actividad.descripcion}</IonCol>
                          <IonCol>
                            <IonButton onClick={() => eliminarActividad(index)}>Eliminar</IonButton>
                          </IonCol>
                      </IonRow>
                      ))}
                  </IonGrid>
                  <IonItem>
                    <IonItem>
                      <IonLabel position="floating" style={{whiteSpace: 'normal'}}>Estudiantes</IonLabel>
                        <IonInput
                            style={{width: '59vw'}}
                            type="text"
                            value={nuevoEstudiante.NOMBRE}
                            onIonChange={(e) => onEstudiante(e.detail.value!)}
                        ></IonInput>
                    </IonItem>
                    <IonItem>
                      <IonButton onClick={agregarEstudiante} style={{height: '35px', whiteSpace: 'normal'}}>Agregar Estudiante</IonButton>
                    </IonItem>
                  </IonItem>
                  <IonGrid>
                      <IonRow>
                      <IonCol>Lista de Estudiantes</IonCol>
                      </IonRow>
                      {formularioExamen.estudiantes.map((estudiante, index) => (
                      <IonRow key={index}>
                          <IonCol>{estudiante.NOMBRE}</IonCol>
                          <IonCol>
                          <IonButton onClick={() => eliminarEstudiante(index)}>Eliminar</IonButton>
                          </IonCol>
                      </IonRow>
                      ))}
                  </IonGrid>
                </IonList>
                <IonButton type='submit'>
                  Crear Examen
                </IonButton>
          </form>
        </IonContent>
        </IonPage>
    );
};

export default ExploreContainer;






// import './ExploreContainer.css';

// interface ContainerProps {
//   name: string;
// }

// const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
//   return (
//     <div id="container">
//       <strong>{name}</strong>
//       <p>Explore Prueba <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
//     </div>
//   );
// };

// export default ExploreContainer;
