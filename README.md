Este proyecto el backend esta contruido con flask y su fronend con ionic, debe tener encuenta que la versionde python debe ser 3.11.5 y la version de node debe sr 2.18.17.1 ya que podria causas fallas en isntalacion de dependencias, para poder correr el proyecto debe tener encuenta que debe tener las siguientes variables de entorno ya que actua con un orm y en este caso para desarrollo se utilizo una db postgrest, tambien parael backend se recomioenda crear un entorno virtual apra la instalcion de depedencias las cuales estan en el archibvo requirements.txt.

# Variables de entorno
SECRET_KEY=
DATABASE_URL=
DEBUG=True


Para el fronend debe solo estar en la carpeta rpinciapl y ejecutar el comando npm install para isntalar dependencias y ya podra correr el programa.