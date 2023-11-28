from flask import Blueprint, request, jsonify
from ...controller.resultados_aprendizaje.resultados_aprendizaje_controller import crear_resultado_aprendizaje,  traer_resultados_aprendizaje, cambiar_estado_resultado_db




resultado_aprendizaje_blueprint = Blueprint('resultado_aprendizaje', __name__)


@resultado_aprendizaje_blueprint.route('/crear_resultado', methods=['POST'])
def crear_resultado():
    data= request.get_json()
    resultado = crear_resultado_aprendizaje(data)
    return resultado

@resultado_aprendizaje_blueprint.route('/traer_resultados', methods=['GET'])
def traer_resultados():
    resultados = traer_resultados_aprendizaje()
    return  jsonify(resultados)

@resultado_aprendizaje_blueprint.route('/cambiar_estado_resultado/<int:resultado_id>', methods=['PUT'])
def cambiar_estado_resultado(resultado_id):
    return cambiar_estado_resultado_db(resultado_id)







    

