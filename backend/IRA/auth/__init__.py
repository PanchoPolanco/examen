from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

jwt = JWTManager()
bcrypt = Bcrypt()