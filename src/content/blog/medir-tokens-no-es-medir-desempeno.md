---
title: "Medir tokens no es medir desempeño"
description: "Tokens consumidos, PRs abiertos, comentarios en reviews: métricas fáciles de contar que no dicen nada sobre cómo trabaja un equipo. Medir el desempeño importa, y justamente por eso hay que hacerlo bien."
author: "Luciano Perez Ruiz"
pubDate: 2026-09-23
tags: ["equipos", "métricas", "gestión", "liderazgo", "ia"]
lang: "es"
draft: false
coverImage: "./metricas-desarrollo-cover.jpg"
coverImageAlt: "Ilustración de un desarrollador que apunta con arco y flecha al centro de una diana dibujada en una pantalla, sin mirar que a su lado una estructura de bloques y engranajes se está desmoronando."
---

Cada tanto aparece una nueva métrica "de moda" para evaluar a los equipos de desarrollo. La última es el consumo de tokens: cuánto usa cada desarrollador las herramientas de IA, quién está arriba del ranking, quién "todavía no adoptó". Y como suele pasar con estas métricas, tiene algo muy atractivo: es fácil de contar, viene en un dashboard prolijo y da la sensación de que se está midiendo algo.

El problema es que no mide lo que se cree que mide.

Aclaro que este no es un artículo en contra de medir. Medir el desempeño de un equipo es importante: es la forma de saber si el equipo mejora, dónde se traba y si las inversiones que se hacen (en herramientas, en procesos, en personas) están dando resultado. Justamente porque importa, vale la pena hacerlo bien. Y hacerlo bien casi nunca coincide con medir lo que es más fácil de contar.

## Los tokens son una métrica de uso, no de desempeño

El consumo de tokens tiene sentido como dato. Sirve para entender cuánto se usan las herramientas, para controlar costos, para detectar si un equipo necesita capacitación o si una licencia está siendo aprovechada. Como métrica de uso, perfecto.

Pero cuando ese número pasa a formar parte de la evaluación de un desarrollador o de un equipo, se vuelve tóxico. Que alguien consuma muchos tokens no dice si resolvió bien un problema, si lo resolvió rápido, si lo que entregó funciona o si generó tres bugs nuevos en el camino. Puede significar que es muy productivo con la IA, o que le está costando llegar a una solución y está iterando a ciegas. El número es el mismo en los dos casos.

Y hay algo peor: en cuanto la gente entiende que eso se evalúa, empieza a cumplir con el número. No por mala fe, sino porque se lo plantearon como un objetivo más a cumplir. Se usa la herramienta para cosas que no la necesitan, se generan consultas para "sumar", y la métrica sube mientras el trabajo real sigue igual. En ese momento el dashboard deja de informar y empieza a mentir.

## Ya vimos esta película: PRs y comentarios en reviews

Esto no es nuevo con la IA. En mi experiencia vi usar como métricas de desempeño individual la cantidad de pull requests abiertos, la cantidad de reviews hechas y la cantidad de comentarios dejados en los PRs de otros compañeros.

La intención detrás era razonable: fomentar la colaboración y las revisiones de código. El resultado fue el esperable. Empezaron a aparecer comentarios del tipo "lo veo ok", que no aportan nada pero suman uno más al contador. Las aprobaciones empezaron a hacerse para cumplir con la cantidad, no porque el código se hubiera revisado de verdad.

Y después están los más sutiles en el arte de engañar a la métrica: los que preguntan sobre el PR sin conocer el contexto ni las reglas de negocio detrás del cambio. A primera vista parece participación genuina, pero en la práctica la discusión deja de ser sobre el código y pasa a ser sobre el análisis: alguien tiene que frenar para explicar por qué el requerimiento es como es, algo que ya se había definido antes. El comentario suma en el tablero y le resta tiempo al equipo.

Mientras tanto, quien dedicaba una hora a revisar a fondo un PR complejo (y dejaba dos comentarios que evitaban un bug en producción) quedaba peor parado que quien dejaba diez observaciones superficiales en diez PRs distintos.

Ninguna de esas métricas reflejaba el aporte real de cada persona. Y lo que es peor, empujaban a la gente a trabajar para el número en lugar de trabajar para el producto. Cuando una métrica se convierte en objetivo, deja de ser una buena métrica.

## Métricas de relleno

Mi lectura es que muchas de estas métricas no aparecen porque alguien concluyó que eran la mejor forma de medir desempeño. Aparecen porque definir cómo medir el desempeño es difícil, lleva tiempo y requiere conocer bien el trabajo del equipo. Entonces se completa el "colchón" de objetivos con lo que está a mano: tokens, PRs, comentarios, horas cargadas. Cosas que se pueden sacar de un sistema sin tener que pensar demasiado.

Pero tener métricas porque sí, o porque no está claro cómo medir, no soluciona el problema. Lo esconde. El equipo pasa a optimizar números que no importan, los líderes toman decisiones con información que no refleja la realidad, y quienes realmente aportan valor pueden terminar peor evaluados que quienes aprendieron a jugar con el tablero.

Definir el desempeño bien hecho lleva su tiempo. Y ese tiempo es parte del trabajo de liderar un equipo, no un trámite a resolver con lo primero que ofrece la herramienta.

## Qué medir entonces: lo que sale del equipo

Si se miran las etapas del ciclo de vida del desarrollo de software (planificar, diseñar, construir, probar, desplegar y operar), lo que realmente importa no es cuánto esfuerzo se puso en cada etapa sino qué salió de ella. La pregunta útil no es "cuánto trabajó el equipo" sino "qué entregó, con qué calidad y en cuánto tiempo".

Algunas preguntas que sí dicen algo:

- **¿Cuánto tarda algo en llegar a producción?** Desde que se decide hacerlo hasta que está en manos de los usuarios.
- **¿Con qué frecuencia se despliega?** Un equipo que entrega seguido y en partes chicas suele tener menos riesgo y aprende más rápido.
- **¿Cuánto retrabajo hay por errores?** Qué parte del tiempo del equipo se va en corregir lo que ya se había entregado.
- **¿Cuántos errores llegan a producción?** No cuántos bugs se encuentran en general, sino cuántos se le escapan al proceso y los descubre un usuario.
- **¿Cuánto se tarda en responder cuando algo falla?** Un incidente, una vulnerabilidad, una falla crítica: el tiempo entre que se detecta y se resuelve.

Estas métricas miden al equipo, no a la persona, y eso es intencional. El software lo construye un equipo, y el desempeño individual se entiende mejor dentro de ese contexto que en un ranking de actividad.

## La IA debería notarse en los resultados, no en el consumo

Acá es donde el tema de los tokens se vuelve más evidente. La IA es una herramienta excelente para acelerar el desarrollo, y no tengo dudas de que lo hace. Pero si acelera, eso tiene que verse en lo que el equipo produce:

- ¿Hay más deploys? ¿Más seguidos?
- ¿Bajó el tiempo que tarda una funcionalidad en llegar a producción?
- ¿Hay menos retrabajo por errores?
- ¿Se resuelven más rápido las fallas y vulnerabilidades?

Si el consumo de tokens sube pero ninguna de esas preguntas mejora, la IA no está haciendo al equipo más efectivo; solamente está siendo usada. Y si esas preguntas mejoran, el consumo de tokens pasa a ser un detalle de costos, no el indicador principal. En cualquiera de los dos casos, el número que importa está en los resultados.

(El impacto de la IA en cada etapa del ciclo de desarrollo da para bastante más, y lo voy a desarrollar en un próximo artículo).

## El componente humano no entra en un dashboard

Hay algo que ninguna métrica captura del todo: la forma en que cada persona decide resolver un problema. Quien se toma un rato extra para entender el contexto antes de escribir código, quien detecta que el requerimiento está mal planteado y lo discute a tiempo, quien le dedica una tarde a destrabar a un compañero. Nada de eso aparece en un conteo de PRs ni en un consumo de tokens, y muchas veces es exactamente lo que hace que un equipo funcione.

Las métricas de resultados ayudan a ver si el equipo está entregando valor. Pero evaluar a las personas sigue requiriendo algo que no se automatiza: conocer su trabajo, hablar con ellas y con su equipo, y entender el contexto de cada decisión.

## Medir sí, pero medir bien

Si sos CEO, founder o líder de un equipo, y estás pensando en cómo medir el desempeño de tu equipo de desarrollo: hacelo. Es una de las mejores formas de detectar problemas temprano y de justificar (o cuestionar) las inversiones que hacés. Pero antes de sumar una métrica al dashboard, vale la pena hacerse tres preguntas:

1. **¿Esto mide un resultado o una actividad?** Si mide actividad (cuánto se usó, cuánto se comentó, cuántas horas), probablemente no dice nada sobre el desempeño.
2. **¿Qué pasa si el equipo empieza a optimizar este número?** Si la respuesta es "lo van a inflar sin cambiar nada real", es una mala métrica.
3. **¿Qué decisión voy a tomar con este dato?** Si no hay ninguna, es estadística, no gestión.

Pocas métricas, bien elegidas y centradas en lo que el equipo entrega, valen mucho más que un tablero lleno de números que nadie sabe interpretar. Lo que realmente importa es el resultado. Todo lo demás es ruido con formato de gráfico.

Si estás definiendo cómo medir el desempeño de tu equipo y no querés llenar el tablero de números que no dicen nada, [hablemos](/#contact).
