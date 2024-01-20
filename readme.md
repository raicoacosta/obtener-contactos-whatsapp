# WhatsApp Web.js Script

Este script escrito en JavaScript utiliza la biblioteca `whatsapp-web.js` para interactuar con WhatsApp Web mediante Node.js. El script realiza las siguientes acciones:

## Propósito General

El objetivo principal de este script es autenticarse con WhatsApp Web, generar y mostrar un código QR para la autenticación del usuario, listar los chats individuales y crear un archivo CSV con información de contacto en formato vCard.

## Acciones del Script

1. **Iniciar el Script:**
   - Muestra un mensaje en la consola indicando que el script se está iniciando.

2. **Importar Dependencias:**
   - Importa las dependencias necesarias, incluyendo `whatsapp-web.js`, `qrcode-terminal`, y `fs`.

3. **Configuración del Cliente de WhatsApp:**
   - Utiliza la clase `Client` de `whatsapp-web.js` y configura el cliente con la estrategia de autenticación local (`LocalAuth`).

4. **Generar y Mostrar el Código QR:**
   - Emite un evento para generar y mostrar el código QR en la consola.

5. **Autenticación Exitosa:**
   - Imprime un mensaje cuando la autenticación es exitosa.

6. **Listar Chats Individuales:**
   - Obtiene todos los chats (incluyendo grupos) y filtra solo los chats individuales.

7. **Generar Lista de Chats:**
   - Imprime en la consola el nombre y el ID de cada chat individual.

8. **Generar Lista de Miembros en Formato vCard:**
   - Genera vCards para cada miembro del chat individual y los guarda en un archivo CSV.

9. **Finalizar el Script:**
   - Destruye la instancia del cliente y muestra un mensaje indicando que el script ha finalizado.

10. **Inicialización del Cliente:**
    - Inicializa el cliente para comenzar a escuchar y procesar eventos.

---

Este script facilita la interacción con WhatsApp Web y proporciona funcionalidades básicas de administración de chats individuales y generación de contactos en formato vCard.