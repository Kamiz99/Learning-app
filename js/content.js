/* =====================================================================
   CONTENIDO — AWS Certified Cloud Practitioner (CLF-C02)
   Tipos de ejercicio:
     choice : { t:'choice', q, o:[], a:idx, why }
     multi  : { t:'multi',  q, o:[], a:[idx,...], why }
     tf     : { t:'tf',     q, a:true|false, why }
     match  : { t:'match',  q, pairs:[[izq,der],...], why }
     fill   : { t:'fill',   q, s:'texto con ___', bank:[], a:['respuesta por hueco'], why }
     cat    : { t:'cat',    q, buckets:[], items:[[texto, idxBucket],...], why }
   ===================================================================== */
const CONTENT = { units: [] };

/* ============================== UNIDAD 1 ============================== */
CONTENT.units.push({
  id: 'u1', num: 1, icon: '☁️', color: '#58cc02', colorDark: '#48a800',
  title: 'Conceptos de la nube',
  domain: 'Dominio 1',
  weight: 24,
  intro: 'Qué es la nube, sus ventajas, modelos de servicio y de implementación.',
  lessons: [
  {
    id: 'u1l1', icon: '🌤️', title: 'Qué es la computación en la nube',
    tip: 'La nube es la entrega bajo demanda de recursos de TI por internet con pago por uso.',
    ex: [
      { t:'choice', q:'¿Cuál es la definición de computación en la nube según AWS?',
        o:['La entrega bajo demanda de recursos de TI por internet con precios de pago por uso',
           'Un centro de datos privado gestionado por un proveedor externo',
           'Un servidor físico alquilado por un plazo mínimo de 3 años',
           'Un software instalado localmente que se sincroniza con internet'],
        a:0, why:'La nube entrega cómputo, almacenamiento y bases de datos bajo demanda, sin comprar hardware, pagando solo por lo que usas.' },
      { t:'choice', q:'Una empresa puede aprovisionar 200 servidores en minutos y liberarlos por la noche. ¿Qué característica de la nube describe esto?',
        o:['Elasticidad','Durabilidad','Latencia','Adherencia'],
        a:0, why:'La elasticidad es adquirir y liberar recursos automáticamente para ajustarse a la demanda real.' },
      { t:'tf', q:'En la nube pagas por la capacidad que reservas, la uses o no, igual que en un centro de datos propio.',
        a:false, why:'El modelo es de pago por uso: pagas por lo que consumes. Esa es la diferencia clave con el CAPEX del centro de datos.' },
      { t:'fill', q:'Completa la frase clave del examen',
        s:'La nube convierte gastos de capital (___) en gastos ___.',
        bank:['CAPEX','variables','OPEX fijos','anuales'], a:['CAPEX','variables'],
        why:'Dejas de invertir por adelantado en centros de datos y servidores, y pagas un gasto variable según el consumo.' },
      { t:'multi', q:'Selecciona DOS características propias del autoservicio bajo demanda en AWS.',
        o:['El usuario aprovisiona recursos sin intervención humana del proveedor',
           'Los recursos están disponibles en minutos',
           'Se requiere firmar un contrato para cada instancia',
           'AWS envía un técnico a instalar el servidor'],
        a:[0,1], why:'Autoservicio bajo demanda: tú mismo aprovisionas por consola, CLI o API y lo tienes en minutos.' },
      { t:'match', q:'Empareja cada término con su significado',
        pairs:[['Escalabilidad','Capacidad de crecer para atender más carga'],
               ['Agilidad','Experimentar e innovar más rápido'],
               ['Alta disponibilidad','El sistema sigue operativo ante fallos'],
               ['Elasticidad','Ajustar recursos hacia arriba y hacia abajo']],
        why:'Escalabilidad es poder crecer; elasticidad es hacerlo automáticamente en ambos sentidos según la demanda.' }
    ]
  },
  {
    id: 'u1l2', icon: '💡', title: 'Las 6 ventajas de la nube',
    tip: 'Memoriza las 6 ventajas: son preguntas casi seguras en el examen.',
    ex: [
      { t:'choice', q:'Una startup evita comprar servidores y paga solo por lo que consume. ¿Qué ventaja de la nube es?',
        o:['Cambiar gastos de capital por gastos variables','Aumentar la velocidad y agilidad','Dejar de gastar en operar centros de datos','Ser global en minutos'],
        a:0, why:'Ventaja 1: trade capital expense for variable expense.' },
      { t:'choice', q:'AWS agrega el consumo de millones de clientes y por eso baja precios. ¿Qué ventaja describe esto?',
        o:['Beneficiarse de enormes economías de escala','Dejar de adivinar la capacidad','Ser global en minutos','Aumentar la agilidad'],
        a:0, why:'Ventaja 2: economías de escala; el uso agregado permite precios más bajos.' },
      { t:'choice', q:'Ya no hay que estimar cuántos servidores comprar por adelantado. ¿Qué ventaja es?',
        o:['Dejar de adivinar la capacidad','Economías de escala','Agilidad','Gastos variables'],
        a:0, why:'Ventaja 3: stop guessing capacity. Escalas hacia arriba o abajo según necesites.' },
      { t:'multi', q:'¿Cuáles de las siguientes SON ventajas oficiales de la nube según AWS? (elige DOS)',
        o:['Ser global en minutos','Aumentar la velocidad y la agilidad','Eliminar la necesidad de seguridad','Garantizar 100 % de disponibilidad'],
        a:[0,1], why:'Las seis son: gasto variable, economías de escala, no adivinar capacidad, velocidad y agilidad, no gastar en centros de datos, y globalizarse en minutos.' },
      { t:'tf', q:'Dejar de gastar dinero en operar y mantener centros de datos es una de las seis ventajas de la nube.',
        a:true, why:'Te concentras en tus clientes en lugar de en el racking, stacking y alimentación de servidores.' },
      { t:'fill', q:'Completa la ventaja',
        s:'Con AWS puedes desplegar tu aplicación en varias ___ del mundo en ___ y ofrecer menor latencia.',
        bank:['regiones','minutos','zonas de facturación','semanas'], a:['regiones','minutos'],
        why:'Ventaja 6: go global in minutes, desplegando en múltiples Regiones con unos clics.' }
    ]
  },
  {
    id: 'u1l3', icon: '🧱', title: 'IaaS, PaaS y SaaS',
    tip: 'IaaS = tú gestionas el SO. PaaS = gestionas tu código. SaaS = solo usas la app.',
    ex: [
      { t:'choice', q:'Amazon EC2 es el ejemplo clásico de:',
        o:['IaaS','PaaS','SaaS','FaaS gestionado por el cliente'],
        a:0, why:'EC2 entrega infraestructura (cómputo, red, almacenamiento) y tú gestionas el sistema operativo.' },
      { t:'choice', q:'Un modelo donde no gestionas la infraestructura subyacente y solo despliegas tu código es:',
        o:['PaaS','IaaS','SaaS','On-premises'],
        a:0, why:'PaaS (por ejemplo AWS Elastic Beanstalk) abstrae el SO y el aprovisionamiento; tú aportas la aplicación.' },
      { t:'choice', q:'Gmail o Amazon WorkMail, usados por el navegador sin instalar nada, corresponden a:',
        o:['SaaS','PaaS','IaaS','Colocation'],
        a:0, why:'SaaS es un producto terminado, gestionado y ejecutado por el proveedor.' },
      { t:'cat', q:'Clasifica cada servicio por su modelo',
        buckets:['IaaS','PaaS','SaaS'],
        items:[['Amazon EC2',0],['Amazon VPC',0],['AWS Elastic Beanstalk',1],['AWS Lambda',1],['Amazon Chime',2],['Amazon WorkDocs',2]],
        why:'EC2 y VPC son infraestructura; Beanstalk y Lambda abstraen la plataforma; Chime y WorkDocs son software listo para usar.' },
      { t:'tf', q:'En SaaS el cliente es responsable de parchear el sistema operativo del servidor.',
        a:false, why:'En SaaS el proveedor gestiona todo el stack; el cliente solo gestiona sus datos y accesos.' },
      { t:'match', q:'Empareja modelo con lo que gestiona el CLIENTE',
        pairs:[['IaaS','Sistema operativo, red virtual y aplicaciones'],
               ['PaaS','Solo la aplicación y los datos'],
               ['SaaS','Únicamente sus datos y usuarios']],
        why:'Cuanto más gestionado es el servicio, menos responsabilidad operativa tiene el cliente.' }
    ]
  },
  {
    id: 'u1l4', icon: '🏢', title: 'Modelos de implementación',
    tip: 'Nube, híbrido y on-premises (nube privada). Híbrido = conectar el centro de datos con AWS.',
    ex: [
      { t:'choice', q:'Una empresa mantiene su mainframe en su centro de datos y lo conecta con AWS por Direct Connect. ¿Qué modelo usa?',
        o:['Híbrido','Nube pública pura','On-premises puro','Multi-tenant'],
        a:0, why:'El modelo híbrido conecta recursos locales con recursos en la nube.' },
      { t:'choice', q:'Una aplicación creada íntegramente con servicios gestionados de AWS, sin servidores propios, es un despliegue:',
        o:['Basado en la nube (cloud-native)','Híbrido','On-premises','De colocation'],
        a:0, why:'Cloud-native: todo el sistema vive en la nube y aprovecha sus servicios gestionados.' },
      { t:'tf', q:'Ejecutar virtualización y gestión de recursos en el propio centro de datos se llama a veces nube privada.',
        a:true, why:'Es el modelo on-premises o private cloud, con recursos dedicados a una sola organización.' },
      { t:'choice', q:'¿Qué servicio permite ejecutar infraestructura de AWS dentro de tu propio centro de datos?',
        o:['AWS Outposts','AWS Direct Connect','Amazon EC2','AWS Snowball'],
        a:0, why:'Outposts lleva hardware y servicios de AWS a tus instalaciones: el caso híbrido por excelencia.' },
      { t:'multi', q:'Motivos habituales para elegir un modelo híbrido (elige DOS)',
        o:['Requisitos de residencia de datos o normativa local',
           'Sistemas heredados difíciles de migrar',
           'Reducir el número de Regiones de AWS disponibles',
           'Evitar el uso de cifrado'],
        a:[0,1], why:'Latencia, normativa y sistemas legacy son las razones típicas para mantener parte de la carga en local.' },
      { t:'fill', q:'Completa',
        s:'El modelo ___ combina recursos on-premises con recursos en la ___.',
        bank:['híbrido','nube','privado','sucursal'], a:['híbrido','nube'],
        why:'Definición directa de despliegue híbrido.' }
    ]
  },
  {
    id: 'u1l5', icon: '🚚', title: 'Migración y AWS CAF',
    tip: 'Las 7 R: Rehost, Replatform, Refactor, Repurchase, Retire, Retain, Relocate.',
    ex: [
      { t:'choice', q:'Mover una aplicación a EC2 tal cual, sin cambiar el código (lift and shift), se llama:',
        o:['Rehost','Refactor','Repurchase','Retire'],
        a:0, why:'Rehost es el lift and shift: la forma más rápida de migrar, sin modificar la aplicación.' },
      { t:'choice', q:'Sustituir un CRM propio por una solución SaaS de terceros es una estrategia de:',
        o:['Repurchase','Rehost','Retain','Relocate'],
        a:0, why:'Repurchase (drop and shop) es cambiar a un producto distinto, normalmente SaaS.' },
      { t:'match', q:'Empareja cada estrategia de migración con su descripción',
        pairs:[['Replatform','Optimizaciones menores, por ejemplo pasar a Amazon RDS'],
               ['Refactor','Rediseñar la aplicación con arquitectura cloud-native'],
               ['Retire','Apagar recursos que ya no se usan'],
               ['Retain','Dejar la aplicación donde está por ahora']],
        why:'Las 7 R del AWS Migration Framework aparecen con frecuencia en el examen.' },
      { t:'choice', q:'¿Cuántas perspectivas tiene el AWS Cloud Adoption Framework (CAF)?',
        o:['Seis: negocio, personas, gobernanza, plataforma, seguridad y operaciones','Cuatro','Tres','Ocho'],
        a:0, why:'Las seis perspectivas del CAF agrupan capacidades de negocio (negocio, personas, gobernanza) y técnicas (plataforma, seguridad, operaciones).' },
      { t:'choice', q:'¿Qué servicio ayuda a descubrir servidores on-premises y planificar su migración?',
        o:['AWS Application Discovery Service','AWS Config','Amazon Inspector','AWS Budgets'],
        a:0, why:'Application Discovery Service recopila datos de uso y dependencias del entorno local para planificar la migración.' },
      { t:'choice', q:'Se necesita transferir 80 TB desde una ubicación sin buena conectividad. ¿Qué opción es la adecuada?',
        o:['AWS Snowball Edge','Cargar por internet a S3','AWS Direct Connect en 1 hora','Amazon EFS'],
        a:0, why:'La familia Snow transporta grandes volúmenes de datos físicamente cuando la red no es viable.' }
    ]
  }
  ]
});

/* ============================== UNIDAD 2 ============================== */
CONTENT.units.push({
  id: 'u2', num: 2, icon: '🏛️', color: '#1cb0f6', colorDark: '#1899d6',
  title: 'Arquitectura bien diseñada',
  domain: 'Dominio 1',
  weight: 24,
  intro: 'Los pilares del Well-Architected Framework y los principios de diseño en la nube.',
  lessons: [
  {
    id: 'u2l1', icon: '🏗️', title: 'Los 6 pilares Well-Architected',
    tip: 'Excelencia operativa, Seguridad, Fiabilidad, Eficiencia del rendimiento, Optimización de costos y Sostenibilidad.',
    ex: [
      { t:'multi', q:'Selecciona DOS pilares del AWS Well-Architected Framework',
        o:['Fiabilidad','Sostenibilidad','Escalabilidad','Portabilidad'],
        a:[0,1], why:'Los seis pilares son: excelencia operativa, seguridad, fiabilidad, eficiencia del rendimiento, optimización de costos y sostenibilidad.' },
      { t:'choice', q:'Un equipo quiere reducir el impacto ambiental de sus cargas de trabajo. ¿Qué pilar aplica?',
        o:['Sostenibilidad','Fiabilidad','Seguridad','Excelencia operativa'],
        a:0, why:'El pilar de sostenibilidad, añadido en 2021, busca minimizar el impacto medioambiental.' },
      { t:'choice', q:'Diseñar para recuperarse automáticamente de un fallo de una zona de disponibilidad corresponde al pilar de:',
        o:['Fiabilidad','Eficiencia del rendimiento','Optimización de costos','Seguridad'],
        a:0, why:'Fiabilidad cubre la recuperación ante fallos, la escalabilidad horizontal y las pruebas de recuperación.' },
      { t:'match', q:'Empareja cada pilar con su objetivo',
        pairs:[['Excelencia operativa','Ejecutar y monitorizar sistemas y mejorar procesos'],
               ['Seguridad','Proteger datos, sistemas y activos'],
               ['Eficiencia del rendimiento','Usar los recursos de TI de forma eficiente al cambiar la demanda'],
               ['Optimización de costos','Evitar costos innecesarios y medir el gasto']],
        why:'Cada pilar tiene principios de diseño y preguntas asociadas en la AWS Well-Architected Tool.' },
      { t:'choice', q:'¿Qué herramienta gratuita permite revisar tus cargas de trabajo frente a las mejores prácticas del framework?',
        o:['AWS Well-Architected Tool','AWS Trusted Advisor','AWS Config','AWS Artifact'],
        a:0, why:'La Well-Architected Tool está en la consola y genera un plan de mejora tras responder un cuestionario.' },
      { t:'tf', q:'Elegir un tipo de instancia sobredimensionado durante meses afecta principalmente al pilar de optimización de costos.',
        a:true, why:'El right sizing es una práctica central del pilar de optimización de costos.' }
    ]
  },
  {
    id: 'u2l2', icon: '🧩', title: 'Principios de diseño en la nube',
    tip: 'Desacopla componentes, diseña para el fallo y automatiza todo lo posible.',
    ex: [
      { t:'choice', q:'Sustituir llamadas directas entre dos servicios por una cola de Amazon SQS es un ejemplo de:',
        o:['Desacoplamiento de componentes','Escalado vertical','Consistencia fuerte','Migración lift and shift'],
        a:0, why:'Las colas desacoplan productor y consumidor: si uno falla o se satura, el otro sigue funcionando.' },
      { t:'choice', q:'Añadir más instancias EC2 detrás de un balanceador en lugar de usar una instancia más grande es:',
        o:['Escalado horizontal','Escalado vertical','Failover','Caching'],
        a:0, why:'Escalado horizontal (scale out) es añadir nodos; vertical (scale up) es aumentar el tamaño de uno solo.' },
      { t:'tf', q:'Diseñar para el fallo significa asumir que cualquier componente puede caer y prever redundancia.',
        a:true, why:'Everything fails all the time: se diseña con redundancia entre varias zonas de disponibilidad.' },
      { t:'multi', q:'¿Qué prácticas mejoran la elasticidad de una aplicación? (elige DOS)',
        o:['Usar Auto Scaling groups','Usar servicios serverless como AWS Lambda','Aprovisionar el pico anual todo el año','Guardar el estado de sesión en el disco local de cada servidor'],
        a:[0,1], why:'Auto Scaling y serverless ajustan la capacidad a la demanda; guardar estado local impide reemplazar instancias.' },
      { t:'fill', q:'Completa el principio',
        s:'Las instancias deben ser ___ para poder reemplazarlas sin perder datos; el estado se guarda ___.',
        bank:['sin estado','fuera de la instancia','permanentes','en disco local'], a:['sin estado','fuera de la instancia'],
        why:'Servidores stateless con estado en DynamoDB, ElastiCache o S3 permiten escalar y auto-recuperarse.' },
      { t:'choice', q:'¿Qué principio describe tratar la infraestructura como código versionado y repetible?',
        o:['Automatización con infraestructura como código','Consistencia eventual','Conectividad híbrida','Federación de identidades'],
        a:0, why:'AWS CloudFormation permite definir infraestructura declarativa, versionada y reproducible.' }
    ]
  },
  {
    id: 'u2l3', icon: '🛟', title: 'Alta disponibilidad y recuperación',
    tip: 'RTO = cuánto tiempo puedo estar caído. RPO = cuántos datos puedo perder.',
    ex: [
      { t:'choice', q:'El tiempo máximo aceptable para restaurar el servicio tras una interrupción es el:',
        o:['RTO','RPO','SLA','MTTR contractual'],
        a:0, why:'Recovery Time Objective: cuánto tiempo puede estar caído el sistema. RPO es cuántos datos se pueden perder.' },
      { t:'match', q:'Empareja cada estrategia de recuperación ante desastres con su característica',
        pairs:[['Backup y restauración','La más barata y la más lenta de recuperar'],
               ['Pilot light','Núcleo mínimo siempre encendido, listo para escalar'],
               ['Warm standby','Copia reducida pero funcional siempre activa'],
               ['Multi-site activo-activo','La más cara y con RTO casi cero']],
        why:'A mayor coste, menor RTO y RPO. Es una comparación muy preguntada.' },
      { t:'choice', q:'Para lograr alta disponibilidad dentro de una Región, ¿cuál es la práctica recomendada?',
        o:['Desplegar en varias zonas de disponibilidad','Desplegar todo en una sola AZ con instancias grandes','Usar solo instancias Spot','Desactivar el balanceador de carga'],
        a:0, why:'Las AZ están aisladas físicamente y conectadas por baja latencia: es el patrón estándar de HA.' },
      { t:'tf', q:'Amazon RDS Multi-AZ crea una réplica en espera en otra zona de disponibilidad con conmutación automática.',
        a:true, why:'Multi-AZ es para alta disponibilidad; las réplicas de lectura son para rendimiento de lectura.' },
      { t:'choice', q:'Un negocio no puede perder más de 5 minutos de datos. Ese requisito define su:',
        o:['RPO','RTO','SLA','TCO'],
        a:0, why:'RPO (Recovery Point Objective) marca la pérdida de datos tolerable y por tanto la frecuencia de copias.' },
      { t:'choice', q:'¿Qué documento define el porcentaje de disponibilidad que AWS se compromete a ofrecer en un servicio?',
        o:['El Service Level Agreement (SLA)','El AWS Acceptable Use Policy','El modelo de responsabilidad compartida','El AWS Artifact Report'],
        a:0, why:'Cada servicio publica su SLA, con créditos de servicio si no se cumple.' }
    ]
  },
  {
    id: 'u2l4', icon: '🧭', title: 'AWS CAF y gobierno de la adopción',
    tip: 'CAF tiene 6 perspectivas: negocio, personas, gobernanza, plataforma, seguridad y operaciones.',
    ex: [
      { t:'cat', q:'Clasifica las perspectivas del CAF',
        buckets:['Capacidades de negocio','Capacidades técnicas'],
        items:[['Negocio',0],['Personas',0],['Gobernanza',0],['Plataforma',1],['Seguridad',1],['Operaciones',1]],
        why:'Negocio, personas y gobernanza son de negocio; plataforma, seguridad y operaciones son técnicas.' },
      { t:'choice', q:'¿Qué perspectiva del CAF se ocupa de la gestión del cambio cultural y de las competencias del personal?',
        o:['Personas','Plataforma','Operaciones','Gobernanza'],
        a:0, why:'La perspectiva de personas cubre formación, roles y cultura organizativa.' },
      { t:'choice', q:'Una empresa quiere calcular el ahorro total al migrar, incluyendo espacio, energía y personal. ¿Qué concepto aplica?',
        o:['TCO (coste total de propiedad)','SLA','RPO','MTBF'],
        a:0, why:'El TCO compara todos los costes directos e indirectos de on-premises frente a la nube.' },
      { t:'tf', q:'AWS Migration Hub permite seguir el progreso de las migraciones de aplicaciones en un único lugar.',
        a:true, why:'Migration Hub centraliza el seguimiento de migraciones realizadas con distintas herramientas.' },
      { t:'choice', q:'¿Qué servicio migra bases de datos hacia AWS con tiempo de inactividad mínimo?',
        o:['AWS Database Migration Service (DMS)','AWS DataSync','AWS Glue','Amazon Athena'],
        a:0, why:'DMS replica la base de datos origen mientras sigue operativa; puede además cambiar de motor con SCT.' },
      { t:'choice', q:'¿Qué servicio transfiere grandes volúmenes de ficheros entre on-premises y AWS de forma automatizada por red?',
        o:['AWS DataSync','AWS Snowmobile','Amazon S3 Glacier','AWS Batch'],
        a:0, why:'DataSync acelera y automatiza la transferencia de datos por red hacia S3, EFS o FSx.' }
    ]
  }
  ]
});

/* ============================== UNIDAD 3 ============================== */
CONTENT.units.push({
  id: 'u3', num: 3, icon: '🛡️', color: '#ff9600', colorDark: '#d97f00',
  title: 'Seguridad y cumplimiento',
  domain: 'Dominio 2',
  weight: 30,
  intro: 'El dominio con más peso del examen: responsabilidad compartida, IAM, cifrado y cumplimiento.',
  lessons: [
  {
    id: 'u3l1', icon: '🤝', title: 'Responsabilidad compartida',
    tip: 'AWS es responsable de la seguridad DE la nube; el cliente, de la seguridad EN la nube.',
    ex: [
      { t:'choice', q:'¿De qué es responsable AWS en el modelo de responsabilidad compartida?',
        o:['De la seguridad de la nube: hardware, software, red e instalaciones',
           'De cifrar los datos del cliente en S3',
           'De configurar los grupos de seguridad del cliente',
           'De gestionar los usuarios de IAM del cliente'],
        a:0, why:'AWS protege la infraestructura global: regiones, AZ, hardware y el software de los servicios gestionados.' },
      { t:'cat', q:'Clasifica cada tarea según quién es responsable',
        buckets:['AWS','Cliente'],
        items:[['Seguridad física de los centros de datos',0],['Parchear el sistema operativo invitado de EC2',1],
               ['Configurar grupos de seguridad',1],['Retirar de forma segura los discos averiados',0],
               ['Gestionar usuarios y permisos de IAM',1],['Mantener la infraestructura de virtualización',0]],
        why:'Regla práctica: si puedes tocarlo desde la consola, es tu responsabilidad.' },
      { t:'tf', q:'El cliente siempre es responsable de la clasificación de sus datos y del cifrado del lado del cliente.',
        a:true, why:'Los datos del cliente son siempre responsabilidad del cliente, en cualquier servicio.' },
      { t:'choice', q:'Con Amazon RDS, ¿quién aplica los parches del motor de base de datos?',
        o:['AWS, porque es un servicio gestionado','El cliente, conectándose por SSH','Nadie, no se parchea','Un partner obligatorio'],
        a:0, why:'En servicios gestionados AWS asume el parcheo del SO y del motor; el cliente configura y protege los datos.' },
      { t:'choice', q:'En Amazon EC2, ¿quién es responsable de instalar actualizaciones de seguridad del sistema operativo?',
        o:['El cliente','AWS','El fabricante del hardware','El proveedor de red'],
        a:0, why:'EC2 es IaaS: el sistema operativo invitado, sus parches y su firewall corresponden al cliente.' },
      { t:'fill', q:'Completa la frase del modelo',
        s:'AWS es responsable de la seguridad ___ la nube y el cliente de la seguridad ___ la nube.',
        bank:['de','en','sobre','bajo'], a:['de','en'],
        why:'Security OF the cloud (AWS) frente a security IN the cloud (cliente).' }
    ]
  },
  {
    id: 'u3l2', icon: '🔑', title: 'IAM: usuarios, grupos y roles',
    tip: 'Concede el mínimo privilegio y usa roles en lugar de claves de acceso siempre que puedas.',
    ex: [
      { t:'choice', q:'Una instancia EC2 necesita leer un bucket de S3. ¿Cuál es la práctica recomendada?',
        o:['Asignar un rol de IAM a la instancia','Guardar las claves de acceso en el código','Usar las credenciales del usuario root','Hacer el bucket público'],
        a:0, why:'Los roles entregan credenciales temporales rotadas automáticamente: nunca se incrustan claves.' },
      { t:'choice', q:'¿Qué elemento de IAM agrupa usuarios para aplicarles los mismos permisos?',
        o:['Grupo de IAM','Rol de IAM','Política de confianza','Organización'],
        a:0, why:'Los grupos simplifican la gestión: se adjuntan políticas al grupo y los usuarios las heredan.' },
      { t:'multi', q:'Buenas prácticas con el usuario root de la cuenta (elige DOS)',
        o:['Activar MFA en el usuario root','Usarlo solo para las tareas que lo requieren',
           'Compartir sus credenciales con el equipo de operaciones','Crear claves de acceso del root para automatizar despliegues'],
        a:[0,1], why:'El root debe tener MFA, no usarse a diario y no tener claves de acceso activas.' },
      { t:'tf', q:'Las políticas de IAM se escriben en formato JSON e incluyen Effect, Action y Resource.',
        a:true, why:'Una política define de forma explícita qué acciones se permiten o deniegan sobre qué recursos.' },
      { t:'choice', q:'Si una política permite una acción y otra la deniega explícitamente, ¿qué ocurre?',
        o:['Se deniega: el deny explícito siempre gana','Se permite: el allow es prioritario','Depende del orden alfabético','Se pide confirmación al usuario'],
        a:0, why:'IAM evalúa: deny explícito > allow explícito > deny implícito por defecto.' },
      { t:'choice', q:'¿Qué servicio permite a los usuarios de una empresa iniciar sesión en AWS con su directorio corporativo?',
        o:['AWS IAM Identity Center','Amazon Cognito para empleados internos únicamente','AWS KMS','AWS Config'],
        a:0, why:'IAM Identity Center (antes AWS SSO) centraliza el acceso federado a varias cuentas y aplicaciones.' },
      { t:'match', q:'Empareja cada elemento con su uso principal',
        pairs:[['Usuario de IAM','Identidad permanente para una persona o aplicación'],
               ['Rol de IAM','Identidad asumible con credenciales temporales'],
               ['Política de IAM','Documento JSON que define permisos'],
               ['Amazon Cognito','Identidad para usuarios de aplicaciones web y móviles']],
        why:'Cognito gestiona usuarios finales de tus apps; IAM gestiona el acceso a los recursos de AWS.' }
    ]
  },
  {
    id: 'u3l3', icon: '🔐', title: 'Autenticación y protección de credenciales',
    tip: 'MFA en todas las cuentas privilegiadas y rotación periódica de credenciales.',
    ex: [
      { t:'choice', q:'¿Qué añade la autenticación multifactor (MFA)?',
        o:['Un segundo factor además de la contraseña','Cifrado del disco','Un cortafuegos de red','Una copia de seguridad automática'],
        a:0, why:'MFA exige algo que sabes (contraseña) y algo que tienes (token o app), reduciendo el riesgo de credenciales robadas.' },
      { t:'choice', q:'¿Qué servicio almacena y rota automáticamente credenciales de bases de datos?',
        o:['AWS Secrets Manager','AWS Systems Manager Parameter Store sin cifrado','AWS KMS','Amazon Macie'],
        a:0, why:'Secrets Manager guarda secretos cifrados y puede rotarlos automáticamente; Parameter Store guarda parámetros con menos funciones de rotación.' },
      { t:'tf', q:'AWS recomienda revisar y eliminar periódicamente las credenciales y permisos no utilizados.',
        a:true, why:'El informe de credenciales de IAM y IAM Access Analyzer ayudan a detectar accesos innecesarios.' },
      { t:'choice', q:'¿Qué herramienta identifica recursos compartidos con entidades externas a tu cuenta u organización?',
        o:['IAM Access Analyzer','AWS Shield','AWS CloudHSM','Amazon GuardDuty'],
        a:0, why:'Access Analyzer detecta buckets, roles o claves accesibles desde fuera de tu zona de confianza.' },
      { t:'choice', q:'¿Qué política de contraseñas puede configurarse en IAM?',
        o:['Longitud mínima, complejidad y caducidad','El color del portal de acceso','El número de instancias EC2','La región por defecto'],
        a:0, why:'La password policy de la cuenta define requisitos de complejidad, caducidad y reutilización.' },
      { t:'choice', q:'Un desarrollador subió por error una clave de acceso a un repositorio público. ¿Qué debe hacer primero?',
        o:['Desactivar y eliminar esa clave de acceso de inmediato','Cambiar la región de la cuenta','Abrir un caso de facturación','Detener todas las instancias EC2'],
        a:0, why:'Revocar la credencial expuesta es la acción inmediata; después se revisa CloudTrail por uso indebido.' }
    ]
  },
  {
    id: 'u3l4', icon: '🧊', title: 'Cifrado y gestión de claves',
    tip: 'KMS para claves gestionadas, CloudHSM para módulos dedicados, ACM para certificados TLS.',
    ex: [
      { t:'choice', q:'¿Qué servicio crea y controla las claves de cifrado usadas por la mayoría de servicios de AWS?',
        o:['AWS KMS','AWS Artifact','AWS WAF','Amazon Inspector'],
        a:0, why:'AWS Key Management Service se integra con S3, EBS, RDS y muchos más para cifrado en reposo.' },
      { t:'choice', q:'Una normativa exige módulos de hardware dedicados de un solo cliente con control exclusivo de las claves. ¿Qué servicio usar?',
        o:['AWS CloudHSM','AWS KMS con claves gestionadas por AWS','AWS Secrets Manager','AWS Certificate Manager'],
        a:0, why:'CloudHSM ofrece HSM dedicados validados FIPS 140-2 nivel 3, con control total del cliente.' },
      { t:'choice', q:'¿Qué servicio aprovisiona y renueva certificados SSL/TLS gratuitos para usarlos con ELB y CloudFront?',
        o:['AWS Certificate Manager (ACM)','AWS KMS','Amazon Route 53','AWS Shield'],
        a:0, why:'ACM emite y renueva automáticamente certificados públicos para servicios integrados de AWS.' },
      { t:'match', q:'Empareja cada concepto de cifrado con su ejemplo',
        pairs:[['Cifrado en reposo','Cifrado de un volumen de Amazon EBS'],
               ['Cifrado en tránsito','HTTPS entre el navegador y el balanceador'],
               ['Cifrado del lado del cliente','El cliente cifra el objeto antes de subirlo a S3']],
        why:'El examen distingue claramente en reposo, en tránsito y del lado del cliente.' },
      { t:'tf', q:'Amazon S3 aplica cifrado en reposo del lado del servidor a los objetos nuevos de forma predeterminada.',
        a:true, why:'Desde 2023 S3 cifra por defecto con SSE-S3; el cliente puede elegir SSE-KMS o cifrado del lado del cliente.' },
      { t:'choice', q:'¿Quién es responsable de decidir qué datos se cifran y con qué claves?',
        o:['El cliente','AWS','El auditor externo','El proveedor de internet'],
        a:0, why:'La clasificación y protección de los datos siempre corresponde al cliente.' }
    ]
  },
  {
    id: 'u3l5', icon: '🚨', title: 'Detección y protección de amenazas',
    tip: 'GuardDuty detecta, Inspector escanea vulnerabilidades, Macie protege datos sensibles.',
    ex: [
      { t:'choice', q:'¿Qué servicio detecta actividad maliciosa analizando CloudTrail, VPC Flow Logs y registros DNS?',
        o:['Amazon GuardDuty','Amazon Inspector','AWS Config','AWS Trusted Advisor'],
        a:0, why:'GuardDuty es el servicio de detección de amenazas basado en aprendizaje automático y fuentes de inteligencia.' },
      { t:'choice', q:'¿Qué servicio descubre y clasifica datos sensibles como información personal en Amazon S3?',
        o:['Amazon Macie','Amazon GuardDuty','Amazon Detective','AWS Firewall Manager'],
        a:0, why:'Macie usa machine learning para localizar PII y datos sensibles en buckets de S3.' },
      { t:'choice', q:'¿Qué servicio analiza automáticamente instancias EC2 y contenedores en busca de vulnerabilidades conocidas?',
        o:['Amazon Inspector','Amazon Macie','AWS Shield','AWS Artifact'],
        a:0, why:'Inspector evalúa CVEs y exposición de red de forma continua.' },
      { t:'match', q:'Empareja cada servicio con su función',
        pairs:[['AWS WAF','Filtra tráfico web e inyecciones SQL o XSS'],
               ['AWS Shield','Protege frente a ataques DDoS'],
               ['AWS Network Firewall','Cortafuegos gestionado a nivel de VPC'],
               ['AWS Security Hub','Vista central del estado de seguridad y cumplimiento']],
        why:'WAF actúa en capa 7; Shield en capas 3 y 4 frente a DDoS.' },
      { t:'choice', q:'¿Qué nivel de AWS Shield está activado sin coste adicional para todos los clientes?',
        o:['Shield Standard','Shield Advanced','Shield Enterprise','Ninguno, siempre se paga'],
        a:0, why:'Shield Standard protege por defecto frente a los ataques DDoS más comunes; Advanced es de pago con soporte y protección de costes.' },
      { t:'choice', q:'¿Qué servicio ayuda a investigar la causa raíz de hallazgos de seguridad correlacionando eventos?',
        o:['Amazon Detective','AWS Config','Amazon CloudWatch Logs','AWS Budgets'],
        a:0, why:'Detective construye gráficos de comportamiento para analizar incidentes detectados por GuardDuty.' },
      { t:'tf', q:'Para hacer pruebas de penetración sobre ciertos servicios propios, AWS permite hacerlo sin aprobación previa dentro de su política.',
        a:true, why:'AWS permite pentesting sobre una lista de servicios permitidos siguiendo su política de pruebas.' }
    ]
  },
  {
    id: 'u3l6', icon: '📜', title: 'Cumplimiento y gobernanza',
    tip: 'Artifact para informes de cumplimiento, CloudTrail para auditoría, Config para conformidad.',
    ex: [
      { t:'choice', q:'¿Dónde se descargan los informes de cumplimiento de AWS como SOC 2 o ISO 27001?',
        o:['AWS Artifact','AWS Config','AWS Trusted Advisor','AWS Security Hub'],
        a:0, why:'Artifact es el portal de autoservicio con informes de auditoría y acuerdos como el BAA de HIPAA.' },
      { t:'choice', q:'¿Qué servicio registra quién hizo qué llamada a la API, cuándo y desde dónde?',
        o:['AWS CloudTrail','Amazon CloudWatch','AWS Config','Amazon Inspector'],
        a:0, why:'CloudTrail es el registro de auditoría de la actividad de la cuenta.' },
      { t:'choice', q:'¿Qué servicio evalúa de forma continua si la configuración de los recursos cumple unas reglas definidas?',
        o:['AWS Config','AWS CloudTrail','AWS Systems Manager','AWS Organizations'],
        a:0, why:'Config guarda el historial de configuración y comprueba conformidad con reglas.' },
      { t:'match', q:'Empareja el servicio con la pregunta que responde',
        pairs:[['AWS CloudTrail','Quién hizo esta acción'],
               ['Amazon CloudWatch','Cómo se está comportando mi sistema'],
               ['AWS Config','Está mi recurso configurado como debe'],
               ['AWS Trusted Advisor','Puedo mejorar coste, seguridad o rendimiento']],
        why:'Esta comparación de cuatro servicios aparece con mucha frecuencia en el examen.' },
      { t:'choice', q:'¿Qué permite aplicar límites de permisos a todas las cuentas de una unidad organizativa?',
        o:['Las políticas de control de servicios (SCP) de AWS Organizations','Las políticas de IAM de cada usuario','Los grupos de seguridad','Las NACL'],
        a:0, why:'Las SCP definen el máximo de permisos disponibles en las cuentas miembro, aunque IAM permita más.' },
      { t:'choice', q:'¿Qué servicio despliega un entorno multicuenta seguro con barreras de protección predefinidas?',
        o:['AWS Control Tower','AWS CloudFormation StackSets únicamente','AWS Systems Manager','AWS Directory Service'],
        a:0, why:'Control Tower crea una landing zone con Organizations, IAM Identity Center, Config y guardrails.' },
      { t:'tf', q:'AWS decide qué normativas debe cumplir el cliente y configura sus controles por él.',
        a:false, why:'AWS ofrece infraestructura certificada e informes, pero el cumplimiento de las cargas del cliente es del cliente.' }
    ]
  }
  ]
});

/* ============================== UNIDAD 4 ============================== */
CONTENT.units.push({
  id: 'u4', num: 4, icon: '🖥️', color: '#ce82ff', colorDark: '#a568cc',
  title: 'Infraestructura global y cómputo',
  domain: 'Dominio 3',
  weight: 34,
  intro: 'Regiones y zonas de disponibilidad, EC2, contenedores, serverless y escalado.',
  lessons: [
  {
    id: 'u4l1', icon: '🌍', title: 'Infraestructura global de AWS',
    tip: 'Región = conjunto de AZ. AZ = uno o más centros de datos aislados. Edge = caché cercana al usuario.',
    ex: [
      { t:'choice', q:'¿Qué es una zona de disponibilidad (AZ)?',
        o:['Uno o más centros de datos aislados dentro de una Región','Un continente entero','Un servidor físico','Una cuenta de AWS'],
        a:0, why:'Cada AZ tiene energía, refrigeración y red independientes, y está unida a las demás por baja latencia.' },
      { t:'multi', q:'Factores para elegir una Región de AWS (elige DOS)',
        o:['Cumplimiento y soberanía de datos','Proximidad a los usuarios para reducir latencia','El idioma de la consola','El color del logotipo'],
        a:[0,1], why:'Los cuatro factores clásicos son: cumplimiento, latencia, precio y disponibilidad del servicio.' },
      { t:'choice', q:'Las ubicaciones de borde (edge locations) se usan principalmente para:',
        o:['Entregar contenido en caché cerca del usuario con Amazon CloudFront','Ejecutar bases de datos relacionales','Almacenar copias de seguridad a largo plazo','Sustituir a las regiones'],
        a:0, why:'CloudFront cachea contenido en cientos de edge locations para reducir latencia.' },
      { t:'match', q:'Empareja cada elemento de la infraestructura con su propósito',
        pairs:[['AWS Local Zones','Acercar cómputo a grandes ciudades para latencia muy baja'],
               ['AWS Outposts','Ejecutar infraestructura de AWS en tu propio centro de datos'],
               ['AWS Wavelength','Desplegar en redes 5G de operadores'],
               ['Región de AWS','Área geográfica con varias zonas de disponibilidad']],
        why:'Estas extensiones de la infraestructura global aparecen con frecuencia en preguntas de escenario.' },
      { t:'tf', q:'Una arquitectura desplegada en una sola zona de disponibilidad se considera de alta disponibilidad.',
        a:false, why:'Se necesitan al menos dos AZ para tolerar el fallo de una de ellas.' },
      { t:'choice', q:'¿Cuántas zonas de disponibilidad tiene como mínimo una Región de AWS?',
        o:['Tres en las Regiones actuales, y siempre varias','Una','Diez','Depende del cliente'],
        a:0, why:'Las Regiones se diseñan con varias AZ aisladas, habitualmente tres o más.' }
    ]
  },
  {
    id: 'u4l2', icon: '⚙️', title: 'Amazon EC2 en profundidad',
    tip: 'La AMI define el software inicial; el tipo de instancia define CPU, memoria y red.',
    ex: [
      { t:'choice', q:'¿Qué es una AMI en Amazon EC2?',
        o:['Una plantilla con el sistema operativo y el software para lanzar instancias','Un tipo de almacenamiento en bloque','Un plan de facturación','Un tipo de red virtual'],
        a:0, why:'Amazon Machine Image es la imagen base desde la que se lanza cada instancia.' },
      { t:'match', q:'Empareja cada familia de instancias con su caso de uso',
        pairs:[['Optimizadas para cómputo (C)','Procesamiento por lotes y servidores de alto rendimiento'],
               ['Optimizadas para memoria (R, X)','Bases de datos en memoria y análisis grandes'],
               ['Optimizadas para almacenamiento (I, D)','Cargas con mucha E/S secuencial o aleatoria local'],
               ['Uso general (T, M)','Servidores web y aplicaciones equilibradas']],
        why:'La letra inicial del tipo de instancia indica su familia y por tanto su caso de uso.' },
      { t:'choice', q:'¿Qué opción ejecuta scripts al arrancar por primera vez una instancia EC2?',
        o:['User data','Metadata de facturación','Security group','Placement group'],
        a:0, why:'El user data permite automatizar la instalación de paquetes y la configuración inicial.' },
      { t:'tf', q:'Con Amazon EC2 el cliente controla el sistema operativo y puede instalar el software que quiera.',
        a:true, why:'EC2 es infraestructura como servicio: control total sobre el SO invitado.' },
      { t:'choice', q:'¿Qué actúa como cortafuegos virtual a nivel de instancia EC2?',
        o:['El grupo de seguridad','La NACL','La tabla de rutas','El Internet Gateway'],
        a:0, why:'Los grupos de seguridad son con estado y solo admiten reglas de permitir; las NACL actúan a nivel de subred.' },
      { t:'choice', q:'Se factura por segundo, sin compromiso, y es ideal para cargas impredecibles de corta duración:',
        o:['Instancias bajo demanda','Instancias reservadas de 3 años','Hosts dedicados','Savings Plans de cómputo'],
        a:0, why:'On-Demand es la opción sin compromiso, la más flexible y la más cara por hora.' }
    ]
  },
  {
    id: 'u4l3', icon: '💰', title: 'Opciones de compra de EC2',
    tip: 'Spot hasta 90 % de descuento pero interrumpible. Reserved y Savings Plans hasta 72 % con compromiso.',
    ex: [
      { t:'choice', q:'Una carga de análisis por lotes tolera interrupciones y busca el menor coste posible. ¿Qué elegir?',
        o:['Instancias Spot','Instancias bajo demanda','Hosts dedicados','Instancias reservadas de 3 años'],
        a:0, why:'Spot usa capacidad sobrante con hasta un 90 % de descuento, pero AWS puede reclamarla con 2 minutos de aviso.' },
      { t:'choice', q:'Una base de datos debe funcionar 24/7 durante los próximos 3 años. ¿Qué opción minimiza el coste?',
        o:['Instancias reservadas o Savings Plans a 3 años','Instancias Spot','Bajo demanda','Instancias dedicadas por hora'],
        a:0, why:'Con carga estable y previsible, el compromiso a 1 o 3 años ofrece hasta un 72 % de ahorro.' },
      { t:'choice', q:'Una normativa exige servidores físicos dedicados con visibilidad de sockets para licencias. ¿Qué opción usar?',
        o:['Dedicated Hosts','Dedicated Instances','Spot','Savings Plans'],
        a:0, why:'Dedicated Hosts dan un servidor físico completo y visibilidad de sockets y cores para licencias BYOL.' },
      { t:'cat', q:'Clasifica según requiera o no compromiso previo',
        buckets:['Con compromiso','Sin compromiso'],
        items:[['Instancias reservadas',0],['Savings Plans',0],['Bajo demanda',1],['Spot',1]],
        why:'Reserved y Savings Plans implican comprometer uso o gasto por 1 o 3 años.' },
      { t:'choice', q:'¿Qué diferencia principal tiene un Savings Plan de cómputo frente a una instancia reservada estándar?',
        o:['Es más flexible: aplica a EC2, Fargate y Lambda con cualquier familia o Región',
           'No ofrece descuento','Solo dura un mes','Solo aplica a bases de datos'],
        a:0, why:'El Compute Savings Plan compromete un gasto por hora y se aplica de forma flexible a varios servicios.' },
      { t:'tf', q:'AWS puede interrumpir una instancia Spot cuando necesita recuperar esa capacidad.',
        a:true, why:'Por eso Spot solo debe usarse en cargas tolerantes a interrupciones y sin estado.' }
    ]
  },
  {
    id: 'u4l4', icon: '📦', title: 'Contenedores y serverless',
    tip: 'Lambda y Fargate son sin servidor: no gestionas instancias.',
    ex: [
      { t:'choice', q:'¿Qué servicio ejecuta código sin aprovisionar ni gestionar servidores, pagando por milisegundos de ejecución?',
        o:['AWS Lambda','Amazon EC2','Amazon Lightsail','AWS Batch sobre EC2'],
        a:0, why:'Lambda ejecuta funciones en respuesta a eventos y factura por peticiones y duración.' },
      { t:'match', q:'Empareja cada servicio de contenedores con su descripción',
        pairs:[['Amazon ECS','Orquestador de contenedores propio de AWS'],
               ['Amazon EKS','Kubernetes gestionado'],
               ['AWS Fargate','Motor de cómputo sin servidor para contenedores'],
               ['Amazon ECR','Registro de imágenes de contenedor']],
        why:'ECS y EKS orquestan; Fargate es el modo sin servidor de ejecución; ECR guarda las imágenes.' },
      { t:'choice', q:'Un equipo quiere subir una aplicación web y que AWS gestione capacidad, balanceo y escalado automáticamente:',
        o:['AWS Elastic Beanstalk','Amazon EC2 manual','Amazon S3','AWS Batch'],
        a:0, why:'Beanstalk despliega y opera la aplicación por ti; sigues controlando los recursos subyacentes si quieres.' },
      { t:'choice', q:'¿Qué servicio ofrece servidores virtuales sencillos con precio mensual fijo, ideal para sitios pequeños?',
        o:['Amazon Lightsail','Amazon EC2 Spot','AWS Outposts','AWS Fargate'],
        a:0, why:'Lightsail agrupa cómputo, almacenamiento y red en planes simples de precio predecible.' },
      { t:'tf', q:'Con AWS Lambda pagas también por el tiempo en el que la función no se ejecuta.',
        a:false, why:'Solo pagas por número de solicitudes y tiempo de ejecución; sin uso, no hay coste.' },
      { t:'choice', q:'¿Qué servicio ejecuta trabajos por lotes gestionando automáticamente la capacidad de cómputo?',
        o:['AWS Batch','AWS Step Functions','Amazon EventBridge','AWS Glue DataBrew'],
        a:0, why:'Batch planifica y aprovisiona el cómputo necesario para trabajos por lotes de cualquier escala.' }
    ]
  },
  {
    id: 'u4l5', icon: '⚖️', title: 'Escalado y balanceo de carga',
    tip: 'Auto Scaling ajusta el número de instancias; ELB reparte el tráfico entre ellas.',
    ex: [
      { t:'choice', q:'¿Qué servicio añade o elimina instancias EC2 automáticamente según la demanda?',
        o:['Amazon EC2 Auto Scaling','Elastic Load Balancing','Amazon CloudFront','AWS Config'],
        a:0, why:'Auto Scaling mantiene la capacidad deseada y escala según métricas como el uso de CPU.' },
      { t:'match', q:'Empareja cada balanceador con su uso',
        pairs:[['Application Load Balancer','Tráfico HTTP y HTTPS con enrutamiento por ruta o host'],
               ['Network Load Balancer','TCP y UDP de altísimo rendimiento y latencia ultrabaja'],
               ['Gateway Load Balancer','Desplegar aplicaciones virtuales de seguridad de terceros']],
        why:'ALB trabaja en capa 7, NLB en capa 4 y GWLB en capa 3 para appliances.' },
      { t:'tf', q:'Un balanceador de carga puede distribuir tráfico entre instancias situadas en varias zonas de disponibilidad.',
        a:true, why:'Es la base del patrón de alta disponibilidad dentro de una Región.' },
      { t:'choice', q:'¿Qué comprobación usa el balanceador para dejar de enviar tráfico a una instancia caída?',
        o:['Health checks','Security groups','Route tables','Placement groups'],
        a:0, why:'Las comprobaciones de estado retiran del servicio los destinos que no responden correctamente.' },
      { t:'choice', q:'La capacidad de una aplicación para crecer y decrecer automáticamente según la carga se llama:',
        o:['Elasticidad','Redundancia','Latencia','Consistencia'],
        a:0, why:'La elasticidad evita pagar por capacidad ociosa y evita quedarse corto en los picos.' },
      { t:'fill', q:'Completa la arquitectura típica',
        s:'Los usuarios llegan a un ___ que reparte el tráfico entre las instancias de un ___.',
        bank:['balanceador de carga','grupo de Auto Scaling','bucket de S3','rol de IAM'],
        a:['balanceador de carga','grupo de Auto Scaling'],
        why:'ELB + Auto Scaling en varias AZ es el patrón web de referencia en AWS.' }
    ]
  }
  ]
});

/* ============================== UNIDAD 5 ============================== */
CONTENT.units.push({
  id: 'u5', num: 5, icon: '🗄️', color: '#00b8a9', colorDark: '#009184',
  title: 'Almacenamiento, datos y redes',
  domain: 'Dominio 3',
  weight: 34,
  intro: 'S3 y clases de almacenamiento, bases de datos, VPC, integración, analítica e IA.',
  lessons: [
  {
    id: 'u5l1', icon: '🪣', title: 'Amazon S3 y clases de almacenamiento',
    tip: 'S3 es almacenamiento de objetos con 11 nueves de durabilidad y capacidad prácticamente ilimitada.',
    ex: [
      { t:'choice', q:'¿Qué tipo de almacenamiento es Amazon S3?',
        o:['De objetos','De bloque','De archivos NFS','De cintas'],
        a:0, why:'S3 guarda objetos en buckets, cada uno con datos, metadatos y una clave única.' },
      { t:'match', q:'Empareja cada clase de S3 con su caso de uso',
        pairs:[['S3 Standard','Datos de acceso frecuente'],
               ['S3 Intelligent-Tiering','Patrón de acceso desconocido o cambiante'],
               ['S3 Glacier Flexible Retrieval','Archivo con recuperación en minutos u horas'],
               ['S3 Glacier Deep Archive','Archivo a muy largo plazo, el más barato']],
        why:'Intelligent-Tiering mueve objetos entre niveles automáticamente por una pequeña tarifa de monitorización.' },
      { t:'choice', q:'¿Qué mecanismo mueve objetos automáticamente a clases más baratas con el tiempo?',
        o:['Las políticas de ciclo de vida de S3','El versionado','La replicación entre regiones','El cifrado SSE-KMS'],
        a:0, why:'Las lifecycle policies aplican transiciones y expiraciones según la antigüedad del objeto.' },
      { t:'tf', q:'Amazon S3 ofrece una durabilidad del 99,999999999 % (once nueves).',
        a:true, why:'S3 replica los objetos en varias AZ dentro de la Región para lograr esa durabilidad.' },
      { t:'choice', q:'¿Qué función protege frente a borrados accidentales guardando copias anteriores de un objeto?',
        o:['El versionado de S3','El bloqueo de acceso público','La transferencia acelerada','La replicación de logs'],
        a:0, why:'Con versionado activado, cada sobrescritura o borrado conserva las versiones previas.' },
      { t:'choice', q:'Una empresa debe conservar registros de forma inmutable por requisitos legales. ¿Qué usar?',
        o:['S3 Object Lock en modo WORM','S3 Transfer Acceleration','S3 Select','CloudFront'],
        a:0, why:'Object Lock impide borrar o modificar objetos durante un periodo de retención.' },
      { t:'choice', q:'¿Qué opción acelera las cargas de usuarios lejanos hacia un bucket usando la red de borde de AWS?',
        o:['S3 Transfer Acceleration','S3 Standard-IA','AWS Snowcone','Amazon EFS'],
        a:0, why:'Transfer Acceleration usa las edge locations de CloudFront como punto de entrada.' }
    ]
  },
  {
    id: 'u5l2', icon: '💾', title: 'Bloque, archivos y transferencia',
    tip: 'EBS = disco de una instancia. EFS = NFS compartido y elástico. FSx = sistemas de archivos de terceros.',
    ex: [
      { t:'choice', q:'¿Qué servicio ofrece volúmenes de almacenamiento en bloque que se adjuntan a una instancia EC2?',
        o:['Amazon EBS','Amazon S3','Amazon EFS','AWS Storage Gateway'],
        a:0, why:'Un volumen EBS se comporta como un disco duro de red persistente para una instancia.' },
      { t:'choice', q:'Varias instancias Linux necesitan un sistema de archivos compartido que crezca automáticamente:',
        o:['Amazon EFS','Amazon EBS','Instance Store','Amazon S3 Glacier'],
        a:0, why:'EFS es NFS gestionado, elástico y accesible desde muchas instancias y AZ a la vez.' },
      { t:'tf', q:'El almacén de instancia (instance store) es efímero: sus datos se pierden al detener la instancia.',
        a:true, why:'Es almacenamiento físicamente adjunto al host, muy rápido pero no persistente.' },
      { t:'match', q:'Empareja cada servicio con su descripción',
        pairs:[['Amazon FSx for Windows File Server','Sistema de archivos SMB para cargas Windows'],
               ['Amazon FSx for Lustre','Sistema de archivos de alto rendimiento para HPC'],
               ['AWS Storage Gateway','Conecta aplicaciones on-premises con almacenamiento en la nube'],
               ['AWS Snowball Edge','Dispositivo físico para migrar decenas de TB']],
        why:'La familia Snow incluye Snowcone, Snowball Edge y Snowmobile según el volumen de datos.' },
      { t:'choice', q:'¿Qué copia de seguridad de un volumen EBS se guarda en Amazon S3?',
        o:['Las instantáneas (snapshots)','Las AMI de terceros','Los grupos de seguridad','Los registros de CloudTrail'],
        a:0, why:'Los snapshots son incrementales y se almacenan de forma duradera en S3 gestionado por AWS.' },
      { t:'choice', q:'¿Qué servicio centraliza y automatiza las copias de seguridad de varios servicios de AWS?',
        o:['AWS Backup','Amazon S3 Glacier','AWS DataSync','AWS Config'],
        a:0, why:'AWS Backup aplica políticas comunes de copia a EBS, RDS, DynamoDB, EFS y más.' }
    ]
  },
  {
    id: 'u5l3', icon: '🗃️', title: 'Bases de datos gestionadas',
    tip: 'RDS es relacional gestionado; DynamoDB es NoSQL sin servidor; Redshift es almacén de datos.',
    ex: [
      { t:'choice', q:'¿Qué servicio ofrece bases de datos relacionales gestionadas con motores como MySQL o PostgreSQL?',
        o:['Amazon RDS','Amazon DynamoDB','Amazon Redshift','Amazon Neptune'],
        a:0, why:'RDS automatiza copias, parches, alta disponibilidad y réplicas de lectura.' },
      { t:'choice', q:'Una aplicación necesita una base NoSQL con latencia de milisegundos y escalado automático sin servidores:',
        o:['Amazon DynamoDB','Amazon RDS','Amazon Redshift','Amazon Aurora provisionada'],
        a:0, why:'DynamoDB es clave-valor y de documentos, totalmente gestionada y sin servidor.' },
      { t:'match', q:'Empareja cada base de datos con su especialidad',
        pairs:[['Amazon Redshift','Almacén de datos y análisis a gran escala'],
               ['Amazon Neptune','Base de datos de grafos'],
               ['Amazon DocumentDB','Compatible con MongoDB'],
               ['Amazon ElastiCache','Caché en memoria con Redis o Memcached']],
        why:'Elegir el motor correcto según el modelo de datos es una pregunta típica de escenario.' },
      { t:'choice', q:'¿Qué motor compatible con MySQL y PostgreSQL ofrece hasta cinco veces el rendimiento de MySQL estándar?',
        o:['Amazon Aurora','Amazon Redshift','Amazon Timestream','Amazon Keyspaces'],
        a:0, why:'Aurora es el motor cloud-native de AWS, con almacenamiento replicado en tres AZ.' },
      { t:'tf', q:'Con Amazon RDS el cliente puede conectarse por SSH al servidor de base de datos subyacente.',
        a:false, why:'RDS es gestionado: no hay acceso al sistema operativo. Si lo necesitas, instala la base de datos en EC2.' },
      { t:'choice', q:'¿Qué opción de RDS mejora el rendimiento de consultas de solo lectura?',
        o:['Réplicas de lectura','Multi-AZ','Instantáneas manuales','Grupos de parámetros'],
        a:0, why:'Multi-AZ da disponibilidad; las réplicas de lectura escalan la carga de lectura.' },
      { t:'choice', q:'¿Qué servicio ayuda a migrar una base de datos on-premises a AWS con mínima interrupción?',
        o:['AWS Database Migration Service','AWS Glue','Amazon Athena','AWS Batch'],
        a:0, why:'DMS mantiene el origen operativo durante la replicación continua.' }
    ]
  },
  {
    id: 'u5l4', icon: '🌐', title: 'Redes en AWS',
    tip: 'Grupos de seguridad: con estado, a nivel de instancia. NACL: sin estado, a nivel de subred.',
    ex: [
      { t:'choice', q:'¿Qué es una Amazon VPC?',
        o:['Una red virtual aislada dentro de AWS','Una cuenta de facturación','Un tipo de instancia','Un servicio de DNS'],
        a:0, why:'La VPC te da control sobre rangos IP, subredes, tablas de rutas y gateways.' },
      { t:'match', q:'Empareja cada componente de red con su función',
        pairs:[['Internet Gateway','Da acceso a internet a una subred pública'],
               ['NAT Gateway','Permite salida a internet desde subredes privadas'],
               ['Tabla de rutas','Define hacia dónde va el tráfico de una subred'],
               ['Amazon Route 53','DNS y registro de dominios']],
        why:'Subred pública = tiene ruta a un Internet Gateway. Privada = no la tiene.' },
      { t:'cat', q:'Clasifica las características de los cortafuegos de VPC',
        buckets:['Grupo de seguridad','Network ACL'],
        items:[['Opera a nivel de instancia',0],['Opera a nivel de subred',1],
               ['Con estado (stateful)',0],['Sin estado (stateless)',1],
               ['Solo reglas de permitir',0],['Permite reglas de denegar',1]],
        why:'Esta comparación aparece casi siempre en el examen.' },
      { t:'choice', q:'¿Qué servicio ofrece una conexión de red privada y dedicada entre el centro de datos y AWS?',
        o:['AWS Direct Connect','AWS Site-to-Site VPN','Amazon CloudFront','AWS Transit Gateway'],
        a:0, why:'Direct Connect no usa internet: ofrece ancho de banda constante y menor latencia; la VPN va cifrada por internet.' },
      { t:'choice', q:'¿Qué red de entrega de contenido cachea archivos cerca de los usuarios finales?',
        o:['Amazon CloudFront','Amazon Route 53','Elastic Load Balancing','AWS Global Accelerator'],
        a:0, why:'CloudFront es la CDN de AWS y también protege el origen combinándose con WAF y Shield.' },
      { t:'choice', q:'¿Qué servicio simplifica conectar cientos de VPC y redes on-premises con un único punto central?',
        o:['AWS Transit Gateway','VPC Peering uno a uno','AWS PrivateLink','Internet Gateway'],
        a:0, why:'Transit Gateway actúa como hub de red; el peering es punto a punto y no escala igual.' },
      { t:'tf', q:'AWS PrivateLink permite acceder a servicios sin que el tráfico salga a internet.',
        a:true, why:'Los endpoints de VPC mantienen el tráfico dentro de la red de AWS.' }
    ]
  },
  {
    id: 'u5l5', icon: '🔗', title: 'Integración, mensajería y analítica',
    tip: 'SQS = colas. SNS = publicación/suscripción. EventBridge = bus de eventos.',
    ex: [
      { t:'choice', q:'¿Qué servicio ofrece colas de mensajes para desacoplar componentes?',
        o:['Amazon SQS','Amazon SNS','AWS Step Functions','Amazon Kinesis'],
        a:0, why:'SQS almacena mensajes hasta que un consumidor los procesa y los elimina.' },
      { t:'choice', q:'¿Qué servicio envía notificaciones a muchos suscriptores a la vez por correo, SMS o HTTP?',
        o:['Amazon SNS','Amazon SQS','Amazon MQ','AWS Batch'],
        a:0, why:'SNS es publicación/suscripción: un mensaje llega a todos los suscriptores del tema.' },
      { t:'match', q:'Empareja cada servicio de datos con su función',
        pairs:[['Amazon Kinesis','Ingesta y análisis de datos en streaming'],
               ['AWS Glue','ETL sin servidor y catálogo de datos'],
               ['Amazon Athena','Consultas SQL directamente sobre datos en S3'],
               ['Amazon QuickSight','Paneles e inteligencia de negocio']],
        why:'Athena no necesita servidores: se paga por datos escaneados.' },
      { t:'choice', q:'¿Qué servicio coordina pasos de un flujo de trabajo con reintentos y control de errores?',
        o:['AWS Step Functions','Amazon EventBridge','Amazon SQS','AWS Lambda'],
        a:0, why:'Step Functions orquesta máquinas de estado visuales entre servicios.' },
      { t:'choice', q:'¿Qué servicio permite crear y publicar APIs REST o WebSocket gestionadas?',
        o:['Amazon API Gateway','Amazon CloudFront','AWS AppSync solo para REST','Elastic Load Balancing'],
        a:0, why:'API Gateway gestiona autorización, límites de uso y versiones de tus APIs.' },
      { t:'tf', q:'Amazon EventBridge permite conectar aplicaciones mediante eventos, incluidos eventos de SaaS de terceros.',
        a:true, why:'EventBridge es un bus de eventos sin servidor con reglas de enrutamiento.' },
      { t:'choice', q:'¿Qué servicio ejecuta frameworks de big data como Apache Spark o Hadoop de forma gestionada?',
        o:['Amazon EMR','Amazon Redshift','AWS Glue DataBrew','Amazon Athena'],
        a:0, why:'EMR aprovisiona clústeres para procesamiento de datos a gran escala.' }
    ]
  },
  {
    id: 'u5l6', icon: '🤖', title: 'IA, desarrollo y gestión',
    tip: 'CloudWatch mide, CloudFormation despliega, Trusted Advisor recomienda.',
    ex: [
      { t:'match', q:'Empareja cada servicio de IA con lo que hace',
        pairs:[['Amazon Rekognition','Analiza imágenes y vídeo'],
               ['Amazon Polly','Convierte texto en voz'],
               ['Amazon Transcribe','Convierte voz en texto'],
               ['Amazon Comprehend','Procesamiento de lenguaje natural']],
        why:'Los servicios de IA de AWS se preguntan por su función concreta, no por su implementación.' },
      { t:'choice', q:'¿Qué servicio permite crear, entrenar y desplegar modelos de machine learning?',
        o:['Amazon SageMaker','Amazon Textract','Amazon Lex','Amazon Kendra'],
        a:0, why:'SageMaker cubre todo el ciclo de vida del machine learning.' },
      { t:'choice', q:'¿Qué servicio despliega infraestructura como código mediante plantillas declarativas?',
        o:['AWS CloudFormation','AWS CodeDeploy','AWS OpsWorks Stacks manual','AWS Systems Manager'],
        a:0, why:'CloudFormation crea pilas de recursos repetibles a partir de plantillas YAML o JSON.' },
      { t:'choice', q:'¿Qué servicio recopila métricas, registros y lanza alarmas sobre los recursos de AWS?',
        o:['Amazon CloudWatch','AWS CloudTrail','AWS Config','AWS X-Ray'],
        a:0, why:'CloudWatch es la plataforma de observabilidad: métricas, logs, alarmas y paneles.' },
      { t:'choice', q:'¿Qué servicio ayuda a depurar y analizar el rendimiento de aplicaciones distribuidas?',
        o:['AWS X-Ray','Amazon CloudWatch Logs Insights','AWS Config','AWS Trusted Advisor'],
        a:0, why:'X-Ray traza las peticiones a través de los microservicios y localiza cuellos de botella.' },
      { t:'match', q:'Empareja cada servicio de desarrollo con su papel',
        pairs:[['AWS CodePipeline','Automatiza el flujo de entrega continua'],
               ['AWS CodeBuild','Compila y ejecuta pruebas'],
               ['AWS CodeDeploy','Despliega la aplicación en los destinos'],
               ['AWS Systems Manager','Gestiona y automatiza operaciones sobre las instancias']],
        why:'La familia Code cubre el ciclo CI/CD completo.' },
      { t:'choice', q:'¿Qué servicio proporciona escritorios virtuales gestionados para empleados?',
        o:['Amazon WorkSpaces','Amazon AppStream 2.0 exclusivamente para escritorios','Amazon Connect','AWS Directory Service'],
        a:0, why:'WorkSpaces entrega escritorios DaaS; AppStream transmite aplicaciones concretas.' }
    ]
  }
  ]
});

/* ============================== UNIDAD 6 ============================== */
CONTENT.units.push({
  id: 'u6', num: 6, icon: '💳', color: '#ff4b8b', colorDark: '#d93d75',
  title: 'Facturación, precios y soporte',
  domain: 'Dominio 4',
  weight: 12,
  intro: 'Modelos de precios, herramientas de coste, cuentas, planes de soporte y recursos.',
  lessons: [
  {
    id: 'u6l1', icon: '🏷️', title: 'Modelos de precios',
    tip: 'Tres fundamentos: pago por uso, ahorra al comprometerte y paga menos al usar más.',
    ex: [
      { t:'choice', q:'¿Cuáles son los tres fundamentos de los precios de AWS?',
        o:['Pago por uso, ahorro por compromiso y menor precio a mayor volumen',
           'Licencias perpetuas, mantenimiento y soporte',
           'Suscripción anual, usuarios y almacenamiento',
           'Pago por CPU física, por rack y por metro cuadrado'],
        a:0, why:'Pay as you go, save when you commit, pay less as AWS grows.' },
      { t:'match', q:'Empareja cada servicio con cómo se factura',
        pairs:[['Amazon EC2 bajo demanda','Por segundo o por hora de ejecución'],
               ['Amazon S3','Por GB almacenado, solicitudes y transferencia de salida'],
               ['AWS Lambda','Por número de solicitudes y duración'],
               ['Amazon RDS','Por horas de instancia y almacenamiento aprovisionado']],
        why:'Conocer la unidad de facturación de los servicios básicos es materia de examen.' },
      { t:'tf', q:'La transferencia de datos de entrada hacia AWS es generalmente gratuita.',
        a:true, why:'El data transfer IN suele ser gratuito; la salida a internet es lo que se cobra.' },
      { t:'choice', q:'¿Qué incluye la capa gratuita de AWS?',
        o:['Ofertas siempre gratis, gratuitas 12 meses y pruebas de corta duración',
           'Todos los servicios gratis durante un año','Solo Amazon S3','Nada, es un descuento del 10 %'],
        a:0, why:'Los tres tipos de oferta del Free Tier son: always free, 12 months free y trials.' },
      { t:'choice', q:'¿Qué herramienta estima el coste de una arquitectura antes de construirla?',
        o:['AWS Pricing Calculator','AWS Cost Explorer','AWS Budgets','AWS Billing Conductor'],
        a:0, why:'La Pricing Calculator hace estimaciones previas; Cost Explorer analiza el gasto ya realizado.' },
      { t:'choice', q:'Un cliente quiere reducir la factura de EC2 con carga estable sin atarse a una familia concreta:',
        o:['Compute Savings Plans','Instancias reservadas convertibles de zona','Spot','Dedicated Hosts'],
        a:0, why:'Los Compute Savings Plans son los más flexibles: aplican a EC2, Fargate y Lambda.' }
    ]
  },
  {
    id: 'u6l2', icon: '📊', title: 'Herramientas de costes',
    tip: 'Cost Explorer analiza el pasado, Budgets avisa del futuro, Cost Anomaly Detection detecta picos raros.',
    ex: [
      { t:'choice', q:'¿Qué servicio visualiza y analiza el gasto histórico con gráficas y previsiones?',
        o:['AWS Cost Explorer','AWS Pricing Calculator','AWS Artifact','AWS Trusted Advisor'],
        a:0, why:'Cost Explorer muestra el gasto por servicio, cuenta o etiqueta hasta 12 meses atrás y hace previsiones.' },
      { t:'choice', q:'¿Qué servicio envía una alerta cuando el gasto supera un umbral definido?',
        o:['AWS Budgets','AWS Cost Explorer','Amazon CloudWatch Logs','AWS Config'],
        a:0, why:'Budgets permite presupuestos de coste, uso, Savings Plans y cobertura de reservas con alertas.' },
      { t:'match', q:'Empareja cada herramienta con su propósito',
        pairs:[['AWS Cost and Usage Report','Datos de facturación más detallados posibles'],
               ['AWS Cost Anomaly Detection','Detecta gastos inusuales con machine learning'],
               ['AWS Billing Conductor','Facturación personalizada para clientes internos'],
               ['Etiquetas de asignación de costes','Repartir el gasto por proyecto o equipo']],
        why:'Las cost allocation tags son la forma estándar de imputar costes por departamento.' },
      { t:'tf', q:'AWS Cost Explorer puede recomendar instancias reservadas y Savings Plans según tu uso.',
        a:true, why:'Ofrece recomendaciones de rightsizing y de compra basadas en el histórico.' },
      { t:'choice', q:'¿Qué mecanismo permite agrupar y filtrar recursos por proyecto, entorno o propietario?',
        o:['Las etiquetas (tags)','Las zonas de disponibilidad','Los grupos de seguridad','Los roles de IAM'],
        a:0, why:'Las etiquetas son pares clave-valor esenciales para gobernanza y control de costes.' },
      { t:'choice', q:'¿Qué comprobación de Trusted Advisor ayuda a reducir la factura?',
        o:['Instancias EC2 infrautilizadas','Instancias detenidas por el usuario','Regiones no usadas por el idioma','Número de usuarios de IAM'],
        a:0, why:'La categoría de optimización de costes detecta recursos ociosos o sobredimensionados.' }
    ]
  },
  {
    id: 'u6l3', icon: '🏦', title: 'Cuentas y AWS Organizations',
    tip: 'Consolidated billing agrega el uso y aplica descuentos por volumen a toda la organización.',
    ex: [
      { t:'choice', q:'¿Qué ventaja principal aporta la facturación consolidada de AWS Organizations?',
        o:['Una sola factura y descuentos por volumen agregados entre cuentas',
           'Duplicar los límites de servicio','Eliminar la necesidad de IAM','Acceso gratuito a soporte Enterprise'],
        a:0, why:'El uso combinado de todas las cuentas alcanza antes los tramos de precio más baratos.' },
      { t:'tf', q:'Las instancias reservadas y los Savings Plans no utilizados en una cuenta pueden aplicarse a otras de la organización.',
        a:true, why:'El reparto de descuentos entre cuentas es otra ventaja de la facturación consolidada.' },
      { t:'choice', q:'¿Qué elemento agrupa cuentas para aplicarles políticas comunes?',
        o:['Las unidades organizativas (OU)','Los grupos de IAM','Las subredes','Las regiones'],
        a:0, why:'Las OU permiten aplicar SCP a conjuntos de cuentas con requisitos similares.' },
      { t:'choice', q:'Una empresa quiere impedir que ninguna cuenta pueda usar Regiones fuera de Europa. ¿Qué usa?',
        o:['Una política de control de servicios (SCP)','Una política de contraseñas','Un grupo de seguridad','Una NACL'],
        a:0, why:'Las SCP restringen a nivel de organización, por encima de los permisos de IAM.' },
      { t:'choice', q:'¿Qué motivos justifican una estrategia multicuenta?',
        o:['Aislar entornos, limitar el radio de impacto y separar la facturación',
           'Reducir el número de Regiones','Evitar el uso de etiquetas','Eliminar la necesidad de copias de seguridad'],
        a:0, why:'Separar producción, desarrollo y pruebas en cuentas distintas es la práctica recomendada.' },
      { t:'tf', q:'AWS Control Tower automatiza la creación de un entorno multicuenta bien gobernado.',
        a:true, why:'Crea la landing zone y aplica guardrails preventivos y de detección.' }
    ]
  },
  {
    id: 'u6l4', icon: '🎧', title: 'Planes de soporte de AWS',
    tip: 'Basic, Developer, Business, Enterprise On-Ramp y Enterprise. El TAM llega con On-Ramp y Enterprise.',
    ex: [
      { t:'choice', q:'¿Qué plan de soporte incluye un Technical Account Manager (TAM) designado?',
        o:['Enterprise (y de forma agrupada en Enterprise On-Ramp)','Developer','Business','Basic'],
        a:0, why:'Enterprise incluye un TAM asignado; On-Ramp da acceso a un grupo de TAM.' },
      { t:'match', q:'Empareja cada plan con una característica distintiva',
        pairs:[['Basic','Solo documentación, foros y comprobaciones básicas de Trusted Advisor'],
               ['Developer','Soporte técnico por correo en horario laboral'],
               ['Business','Soporte 24/7 por teléfono, chat y correo, y Trusted Advisor completo'],
               ['Enterprise','TAM designado y soporte de arquitectura consultiva']],
        why:'Business es el primer plan con soporte 24/7 y todas las comprobaciones de Trusted Advisor.' },
      { t:'choice', q:'Una empresa con cargas de producción necesita soporte 24/7 por teléfono al menor coste posible:',
        o:['Business','Developer','Basic','Enterprise'],
        a:0, why:'Developer no ofrece soporte telefónico ni 24/7; Business sí, y cuesta menos que Enterprise.' },
      { t:'tf', q:'El plan Basic es gratuito para todos los clientes de AWS.',
        a:true, why:'Incluye documentación, whitepapers, foros y soporte de facturación y cuenta.' },
      { t:'choice', q:'¿Qué servicio del plan Enterprise ayuda con preguntas de facturación y administración de cuentas?',
        o:['El AWS Concierge Support','AWS Artifact','AWS Config','El AWS Partner Network'],
        a:0, why:'El equipo Concierge atiende consultas no técnicas de facturación y cuentas.' },
      { t:'choice', q:'¿Qué plan es el mínimo para tener acceso al conjunto completo de comprobaciones de Trusted Advisor?',
        o:['Business','Developer','Basic','Ninguno, siempre están todas'],
        a:0, why:'Basic y Developer solo tienen un subconjunto de comprobaciones.' }
    ]
  },
  {
    id: 'u6l5', icon: '🧰', title: 'Recursos, partners y documentación',
    tip: 'Trusted Advisor optimiza, Health Dashboard informa de incidencias, Marketplace vende software.',
    ex: [
      { t:'choice', q:'¿Qué servicio inspecciona tu cuenta y recomienda mejoras en coste, rendimiento, seguridad, tolerancia a fallos y límites?',
        o:['AWS Trusted Advisor','AWS Config','Amazon Inspector','AWS Artifact'],
        a:0, why:'Son las cinco categorías clásicas de Trusted Advisor.' },
      { t:'choice', q:'¿Dónde consultas si una incidencia de AWS afecta a tus recursos concretos?',
        o:['AWS Health Dashboard','AWS Trusted Advisor','Amazon CloudWatch','AWS Artifact'],
        a:0, why:'El Health Dashboard muestra el estado de los servicios y los eventos que afectan a tu cuenta.' },
      { t:'choice', q:'¿Dónde se compra software de terceros ya preparado para ejecutarse en AWS?',
        o:['AWS Marketplace','AWS Artifact','AWS Partner Network','AWS re:Post'],
        a:0, why:'Marketplace es el catálogo digital con facturación integrada en tu cuenta de AWS.' },
      { t:'match', q:'Empareja cada recurso con su descripción',
        pairs:[['AWS re:Post','Comunidad de preguntas y respuestas'],
               ['AWS Professional Services','Equipo de consultoría de AWS'],
               ['AWS Partner Network','Red de socios de consultoría y tecnología'],
               ['AWS Knowledge Center','Respuestas a las preguntas más frecuentes de soporte']],
        why:'Distinguir Professional Services (AWS) de los partners (terceros) es habitual en el examen.' },
      { t:'choice', q:'¿Qué programa proporciona guía prescriptiva y financiación para migraciones a gran escala?',
        o:['AWS Migration Acceleration Program (MAP)','AWS Activate para startups únicamente','AWS Artifact','AWS Marketplace'],
        a:0, why:'MAP combina metodología, herramientas y créditos para acelerar migraciones.' },
      { t:'tf', q:'Los whitepapers y la documentación técnica de AWS están disponibles gratuitamente para cualquiera.',
        a:true, why:'La documentación, whitepapers y guías de referencia son públicos y gratuitos.' }
    ]
  }
  ]
});

/* ============ Normalización: ids estables por ejercicio ============ */
CONTENT.units.forEach(u => u.lessons.forEach(l => {
  l.unitId = u.id;
  l.ex.forEach((e, i) => { e.id = l.id + '#' + i; e.lessonId = l.id; e.unitId = u.id; });
}));

CONTENT.allLessons = CONTENT.units.flatMap(u => u.lessons);
CONTENT.allExercises = CONTENT.allLessons.flatMap(l => l.ex);
CONTENT.lessonById = id => CONTENT.allLessons.find(l => l.id === id);
CONTENT.unitById = id => CONTENT.units.find(u => u.id === id);
CONTENT.lessonIndex = id => CONTENT.allLessons.findIndex(l => l.id === id);
