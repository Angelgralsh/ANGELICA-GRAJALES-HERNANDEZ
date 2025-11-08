# Lineamientos y Puntos por Testing de Guards  
### Guidelines and Scoring for Guards Testing

Este documento describe los requerimientos, lineamientos y pasos necesarios para completar las pruebas, documentación y contribuciones del proyecto.  
This document outlines the requirements, guidelines, and steps needed to complete the project's testing, documentation, and contributions.


## Requerimientos Principales | Main Requirements

- **Testing de todos los controladores**  
  **Testing of all controllers**
- **Testing de todos los servicios/providers**  
  **Testing of all services/providers**
- **Testing de todos los guards**  
  **Testing of all guards**
- **Documentación de todas las rutas** con sus tipos y respuestas  
  **Documentation of all routes**, including types and responses
- **Documentación de código con [Compodoc](https://compodoc.app/)**  
  > Se deben generar **al menos 10 archivos** con documentación **al 100%**  
  > Generate **at least 10 files** with **100% documentation coverage**
- **Elaborar el presente archivo `README.md`** con la información del proyecto  
  **Prepare this `README.md` file** containing project information


## Descripción del Stack del Proyecto | Project Stack Description

### ¿Cómo se instala? | How to Install

```bash
# Clonar el repositorio | Clone the repository
git clone https://github.com/tu-usuario/tu-repositorio.git

# Instalar dependencias | Install dependencies
npm install
```

### ¿Cómo se inicia? | How to Start

```bash
# Iniciar el servidor en modo desarrollo | Start the server in development mode
npm run start:dev
```

> ⚠️ Asegúrate de tener configuradas las variables de entorno (`.env`) antes de iniciar el proyecto.  
> ⚠️ Make sure the environment variables (`.env`) are properly configured before starting the project.


## ¿Cómo se usa? | How to Use

1. Accede a la aplicación desde tu navegador o herramienta API (por ejemplo, Postman).  
   Access the application from your browser or an API tool (e.g., Postman).  
2. Consulta la documentación generada por **Compodoc** en:  
   View the **Compodoc** documentation at:
   ```
   http://localhost:8080
   ```
3. Usa las rutas disponibles según la documentación de los endpoints.  
   Use the available routes as described in the API documentation.


## ¿Cómo se testea? | How to Test

```bash
# Ejecutar pruebas unitarias | Run unit tests
npm run test

# Ejecutar pruebas de integración | Run integration tests
npm run test:e2e

# Generar reporte de cobertura | Generate coverage report
npm run test:cov
```

### Cobertura esperada | Expected Coverage

Los tests deben cubrir **controladores**, **servicios/providers** y **guards**.  
Tests must cover **controllers**, **services/providers**, and **guards**.


## ¿Cómo se aporta al proyecto? | How to Contribute

### Roles | Roles

- **Backend Developer:** Responsable de controladores, servicios y guards.  
  **Backend Developer:** Responsible for controllers, services, and guards.
- **Documentación:** Encargado de Compodoc y del presente README.  
  **Documentation:** In charge of Compodoc and this README.
- **QA / Tester:** Encargado de validar los testings y asegurar la cobertura.  
  **QA / Tester:** Responsible for validating tests and ensuring full coverage.

### Pasos para contribuir | Contribution Steps

1. Crear una nueva rama:  
   Create a new branch:
   ```bash
   git checkout -b feature/nombre-rama
   ```
2. Realizar cambios y commits descriptivos.  
   Make changes and write descriptive commits.
3. Enviar un Pull Request a la rama principal (`main` o `develop`).  
   Submit a Pull Request to the main branch (`main` or `develop`).


## 🏁 Notas Finales | Final Notes

- Mantén la cobertura de código y la documentación siempre actualizadas.  
  Keep code coverage and documentation up to date at all times.  
- Sigue las convenciones del equipo para commits, ramas y estilos de código.  
  Follow the team conventions for commits, branches, and code style.  
- Cualquier nueva funcionalidad debe incluir sus tests y documentación.  
  Any new feature must include corresponding tests and documentation.
