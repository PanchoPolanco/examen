import React, { useState } from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';

interface Opcion {
  id: string;
  [key: string]: any;
}

interface InputSeleccionProps {
  seleccionar: Opcion[];
  idSeleccion: (id: string) => void;
  label: string;
  variable: string;
}

const InputSeleccion: React.FC<InputSeleccionProps> = ({ seleccionar, idSeleccion, label, variable }) => {
  const [resultadoAprendizaje, setResultadoAprendizaje] = useState<string>();

  const onOpcionSeleccion = (event: CustomEvent) => {
    const selectedId = event.detail.value;
    setResultadoAprendizaje(selectedId);
    idSeleccion(selectedId);
    console.log(selectedId);
  };

  return (
    <>
      <IonItem>
        <IonLabel position="stacked">{label}</IonLabel>
        <IonSelect
          value={resultadoAprendizaje}
          placeholder={label}
          onIonChange={onOpcionSeleccion}
        >
          {seleccionar.map((opcion) => (
            <IonSelectOption key={opcion.id} value={opcion.id}>
              {opcion[variable]}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </>
  );
};

export default InputSeleccion;
