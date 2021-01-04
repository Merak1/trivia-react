
# Descripción 
Pequeño proyecto de React para jugar trivia con esta [API](http://jservice.io) como muestra técnica para el equipo de Nubesk. 

Se obtienen los datos de la trivia a través de una llamada a la API y  se distribuyen los datos. 
De igual manera se mantiene un contador de todas las preguntas que ya han desplegado su respuesta.

# Posibilidades 

Si se quisiera hacer una copia más textual de Jeopardy, se podría implementar un par de botones que indique si la respuesta era correcta o no, incluso a partir de un imput comparar la respuesta con la que nos regresa la API (aún que por cuestiones de estilo y de especificidad podría escalar la complejidad del proyecto),  a partir de las respuestas correctas e incorrectas un marcador que dependiendo de el valor de las preguntas correctas y las incorrectas muestre el total al final de determinadas preguntas. 

# Notas

Los requerimientos del proyecto son lo suficientemente simples como para que ameriten una estructura más avanzada que un estado sencillo con los datos de la api, así como el uso de múltiples componentes.

Una de las razones por las que se puede mantener todo en un solo componente es el uso de el rendering condicional que nos permite no necesitar extra componentes para cosas como la pantalla inicial o los contenidos internos de la tabla de la trivia. 

De igual manera se pudo haber utilizado emotion  pero de nuevo el tamaño es demasiado pequeñocomo para ameritarlo. Quizás algún preprocesador si hubiera llegado a utlizar múltiples componentes. 

# 🐳