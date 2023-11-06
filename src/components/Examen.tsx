import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonLabel, IonButton,
IonList, IonItem, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from '@ionic/react';
import InputSeleccion from './InputSeleccion';
import serviciosExamen from '../service/ExamenServicios'

const Formulario: React.FC = () => {
    const [formularioExamen, setFormulario] = useState({
        programa_id: '',
        resultado_aprendizaje_id: '',
        proyecto_integrador: '',
        evaluadores_ids: [] as string[],
        actividades_formativas: [] as { descripcion: string }[],
        estudiantes: [] as { NOMBRE: string }[],
    });

    const [resultadoAprendizaje, setResultadoAprendizaje] = useState<string>('');
    const [evaluadores, setEvaluadores] = useState<string[]>([]);
    const [nuevaActividad, setNuevaActividad] = useState<{ descripcion: string }>({
        descripcion: ''
      });
    const [nuevoEstudiante, setNuevoEstudiante] = useState<{ NOMBRE: string }>({
        NOMBRE: ''
      });

    const onPrograma = (event: any) => {
        setFormulario({
          ...formularioExamen,
          programa_id: event.target.value,
        });
      };

    const onResultado = (selectedId: string) => {
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
        setNuevaActividad({
          ...nuevaActividad,
          descripcion: value
        });
      };

    const agregarActividad = () => {
        if (nuevaActividad.descripcion) {
          const updatedActividades = [...formularioExamen.actividades_formativas, nuevaActividad];
          setFormulario({
            ...formularioExamen,
            actividades_formativas: updatedActividades,
          });
        }
      };
    
    const agregarEstudiante = () => {
        if (nuevoEstudiante.NOMBRE) {
          const updatedEstudiantes = [...formularioExamen.estudiantes, nuevoEstudiante];
          setFormulario({
            ...formularioExamen,
            estudiantes: updatedEstudiantes,
          });
        }
      };

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await serviciosExamen.traerResultado();
            setResultadoAprendizaje(data);
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
          } catch (error) {
            console.error('Error al obtener el evaluador:', error);
          }
        }
        fetchData();
      }, []);

    const onCargarExamen = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await serviciosExamen.GuardarExamen(formularioExamen);
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
                <IonList>
                <IonItem>
                    <IonLabel position="floating">Programa</IonLabel>
                    <IonInput 
                        type="text" 
                        value={formularioExamen.programa_id} 
                        onIonChange={onPrograma}
                    ></IonInput>            
                </IonItem>
                <IonItem>
                    <IonLabel>Resultados de Aprendizaje</IonLabel>
                    <InputSeleccion 
                        seleccionar={resultadoAprendizaje} 
                        idSeleccion={onResultado}
                        label='seleccione resultado'
                        variable='titulo'/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Proyecto Integrador</IonLabel>
                    <IonInput
                        type="text"
                        value={formularioExamen.proyecto_integrador}
                        onIonChange={(e) => onProyectoIntegrador(e.detail.value!)}
                    ></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel>Evaluadores</IonLabel>
                    <InputSeleccion
                        seleccionar={evaluadores}
                        idSeleccion={onEvaluadores}
                        label='seleccione evaluador'
                        variable='nombre_evaluador'
                    />
                </IonItem>
                <IonGrid>
                    <IonRow>
                    <IonCol>Evaluadores</IonCol>
                    </IonRow>
                    {evaluadores.map((evaluador, index) => (
                    <IonRow key={index}>
                        <IonCol>{evaluador}</IonCol>
                        <IonCol>
                        <IonButton onClick={() => eliminarEvaluador(index)}>Eliminar</IonButton>
                        </IonCol>
                    </IonRow>
                    ))}
                </IonGrid>
                <IonItem>
                    <IonLabel>Actividades</IonLabel>
                    <IonInput
                        type="text"
                        value={nuevaActividad.descripcion}
                        onIonChange={(e) => onActividadFormativa(e.detail.value!)}
                    ></IonInput>
                    <IonButton onClick={agregarActividad}>Agregar Actividad</IonButton>
                </IonItem>
                <IonGrid>
                    <IonRow>
                    <IonCol>Actividades</IonCol>
                    </IonRow>
                    {actividades.map((actividad, index) => (
                    <IonRow key={index}>
                        <IonCol>{actividad}</IonCol>
                        <IonCol>
                        <IonButton onClick={() => eliminarActividad(index)}>Eliminar</IonButton>
                        </IonCol>
                    </IonRow>
                    ))}
                </IonGrid>
                <IonItem>
                    <IonLabel>Estudiantes</IonLabel>
                    <IonInput
                        type="text"
                        value={nuevoEstudiante.NOMBRE}
                        onIonChange={(e) => onEstudiante(e.detail.value!)}
                    ></IonInput>
                    <IonButton onClick={agregarEstudiante}>Agregar Estudiante</IonButton>
                </IonItem>
                <IonGrid>
                    <IonRow>
                    <IonCol>Estudiantes</IonCol>
                    </IonRow>
                    {estudiantes.map((estudiante, index) => (
                    <IonRow key={index}>
                        <IonCol>{estudiante}</IonCol>
                        <IonCol>
                        <IonButton onClick={() => eliminarEstudiante(index)}>Eliminar</IonButton>
                        </IonCol>
                    </IonRow>
                    ))}
                </IonGrid>
                </IonList>
        </IonContent>
        </IonPage>
    );
};

export default Formulario;
