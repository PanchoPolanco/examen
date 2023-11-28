from ...db import db
from flask import Blueprint, request, jsonify
from ...controller.calificacion.calificacion_controller import guardar_calificacion_db,actividades_examen,enum_calificacion,calificaciones_by_id_db

calificaciones_blueprint = Blueprint('calificaciones', __name__)


@calificaciones_blueprint.route('/guardar_calificacion', methods=['POST'])
def guardar_calificacion():
    return guardar_calificacion_db(data=request.json)

@calificaciones_blueprint.route('/actividades_examen/<int:id_examen>', methods=['GET'])
def obtener_actividades_formativas_por_id_examen(id_examen):
    return actividades_examen(id_examen)
    
@calificaciones_blueprint.route('/enum_calificacion', methods=['GET'])
def obtener_enum_calificacion():
    return jsonify(enum_calificacion())

@calificaciones_blueprint.route('/calificaciones_by_id/<int:id_examen>', methods=['GET'])
def obtener_calificaciones_by_id(id_examen):
    return calificaciones_by_id_db(id_examen)
    

    
    


