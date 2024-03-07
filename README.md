# Prueba Técnica Desarrollador Front-End

Este proyecto se centra en desarrollar una aplicación web utilizando tecnologías modernas como React y Vite, cumpliendo con los requisitos de una prueba técnica para un desarrollador Front-End. A continuación, se detallan las tecnologías utilizadas y los requisitos del proyecto:

## Tecnologías Utilizadas

- **React**: Framework de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de compilación rápida para proyectos web modernos.
- **Emotion**: Biblioteca de estilos para React con soporte para CSS-in-JS.
- **Material-UI**: Biblioteca de componentes de React con diseño y estilos predefinidos.
- **React Query**: Biblioteca para manejar solicitudes de datos en aplicaciones React.
- **Axios**: Cliente HTTP para realizar solicitudes a servidores.
- **Formik**: Biblioteca para manejar formularios en React de manera sencilla.
- **Yup**: Biblioteca de validación de esquemas para JavaScript.
- **SweetAlert2**: Biblioteca para mostrar mensajes de alerta y confirmación con diseños atractivos.
- **React Input Mask**: Biblioteca para aplicar máscaras a campos de entrada de texto en React.

## Requisitos del Proyecto

### Primer Bloque

1. **Maquetación del Diseño**:

   - Todos los campos son requeridos.
   - La edición de los campos de tarjetas, fecha y nombre modifica el diseño de la tarjeta.
   - El campo de tarjeta solo puede contener números y un máximo de 16 caracteres.
   - El campo de fecha de vencimiento debe tener el formato mm/yy.
   - El campo de fecha solo acepta valores válidos para mes (01 a 12) y año (actual - 2 hasta actual + 5).
   - El campo de Nombre titular solo puede contener letras y letras con tildes, con un máximo de 20 caracteres.
   - En caso de que algún campo no sea válido, se debe mostrar un mensaje de error en rojo debajo del campo.

2. **Agregar Tarjeta**:

   - Al hacer clic en el botón "Agregar tarjeta", se debe agregar la tarjeta a un bloque que muestre los campos de tarjeta, nombre y fecha de vencimiento.
   - Cada registro debe tener un identificador único.
   - Se debe validar que el formulario sea válido, mostrando mensajes de error en los campos que no lo son.
   - El campo de número de tarjeta debe mostrarse enmascarado, mostrando solo los primeros 12 y los últimos 4 dígitos.

3. **Cancelar**:
   - Al hacer clic en el botón "Cancelar", se deben limpiar todos los campos del formulario.

## Instalación y Ejecución

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clonar el Repositorio**:

   ```bash
   git clone https://github.com/starlyn231/-technical-test.git



   #Acceder al Directorio:
   ```

1. \*\* cd proyecto-react-vite
1. \*\* npm install
1. \*\* npm run dev

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

###Contribución
Si deseas contribuir a este proyecto, por favor, abre un Issue para discutir tus ideas o envía un Pull Request con tus mejoras. ¡Todas las contribuciones son bienvenidas!
