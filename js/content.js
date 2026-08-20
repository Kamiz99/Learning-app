/* =====================================================================
   CONTENIDO — AWS Certified Cloud Practitioner (CLF-C02)
   Estructurado siguiendo las secciones del curso en vídeo (slides v44).

   Tipos de ejercicio:
     choice : { t:'choice', q, o:[], a:idx, why }
     multi  : { t:'multi',  q, o:[], a:[idx,...], why }
     tf     : { t:'tf',     q, a:true|false, why }
     match  : { t:'match',  q, pairs:[[izq,der],...], why }
     fill   : { t:'fill',   q, s:'texto con ___', bank:[], a:['respuesta por hueco'], why }
     cat    : { t:'cat',    q, buckets:[], items:[[texto, idxBucket],...], why }
   ===================================================================== */
const CONTENT = { units: [] };
const U = (meta, lessons) => CONTENT.units.push(Object.assign(meta, { lessons }));

/* =========================== 1. La nube y AWS ========================= */
U({ id:'u01', num:1, icon:'☁️', color:'#58cc02', title:'La nube y AWS',
    domain:'Dominio 1', weight:24,
    intro:'Qué es la computación en la nube, sus ventajas, modelos de servicio y de implementación.' }, [
{
  id:'u01l1', icon:'🌤️', title:'Qué es la computación en la nube',
  tip:'La nube es la entrega bajo demanda de recursos de TI por internet con pago por uso.',
  ex:[
    { t:'choice', q:'¿Cuál es la definición de computación en la nube según AWS?',
      o:['La entrega bajo demanda de recursos de TI por internet con precios de pago por uso',
         'Un centro de datos privado gestionado por un proveedor externo',
         'Un servidor físico alquilado con un plazo mínimo de 3 años',
         'Un software instalado localmente que se sincroniza con internet'],
      a:0, why:'La nube entrega cómputo, almacenamiento y bases de datos bajo demanda, sin comprar hardware y pagando solo por lo que usas.' },
    { t:'choice', q:'Una empresa aprovisiona 200 servidores en minutos y los libera por la noche. ¿Qué característica describe esto?',
      o:['Elasticidad','Durabilidad','Latencia','Redundancia geográfica'],
      a:0, why:'La elasticidad es adquirir y liberar recursos automáticamente para ajustarse a la demanda real.' },
    { t:'tf', q:'En la nube pagas por la capacidad que reservas, la uses o no, igual que en un centro de datos propio.',
      a:false, why:'El modelo es de pago por uso. Esa es la diferencia clave frente al CAPEX del centro de datos.' },
    { t:'fill', q:'Completa la frase clave',
      s:'La nube convierte gastos de capital (___) en gastos ___.',
      bank:['CAPEX','variables','OPEX fijos','anuales'], a:['CAPEX','variables'],
      why:'Dejas de invertir por adelantado en centros de datos y pagas un gasto variable según el consumo.' },
    { t:'multi', q:'Selecciona DOS características del autoservicio bajo demanda',
      o:['El usuario aprovisiona recursos sin intervención humana del proveedor',
         'Los recursos están disponibles en minutos',
         'Se requiere firmar un contrato para cada instancia',
         'AWS envía un técnico a instalar el servidor'],
      a:[0,1], why:'Autoservicio bajo demanda: tú aprovisionas por consola, CLI o API y lo tienes en minutos.' },
    { t:'match', q:'Empareja cada término con su significado',
      pairs:[['Escalabilidad','Capacidad de crecer para atender más carga'],
             ['Agilidad','Experimentar e innovar más rápido'],
             ['Alta disponibilidad','El sistema sigue operativo ante fallos'],
             ['Elasticidad','Ajustar recursos hacia arriba y hacia abajo']],
      why:'Escalabilidad es poder crecer; elasticidad es hacerlo automáticamente en ambos sentidos.' },
    { t:'choice', q:'¿Qué problema de los centros de datos tradicionales resuelve la nube?',
      o:['Pagar por capacidad ociosa y tardar semanas en ampliarla',
         'La necesidad de escribir código','La existencia de cortafuegos','El uso de bases de datos relacionales'],
      a:0, why:'On-premises hay que dimensionar para el pico y comprar con meses de antelación.' }
  ]
},
{
  id:'u01l2', icon:'💡', title:'Las 6 ventajas de la nube',
  tip:'Memoriza las 6 ventajas: son preguntas casi seguras en el examen.',
  ex:[
    { t:'choice', q:'Una startup evita comprar servidores y paga solo lo que consume. ¿Qué ventaja es?',
      o:['Cambiar gastos de capital por gastos variables','Aumentar la velocidad y agilidad','Dejar de gastar en centros de datos','Ser global en minutos'],
      a:0, why:'Ventaja 1: trade capital expense for variable expense.' },
    { t:'choice', q:'AWS agrega el consumo de millones de clientes y por eso baja precios. ¿Qué ventaja describe esto?',
      o:['Beneficiarse de enormes economías de escala','Dejar de adivinar la capacidad','Ser global en minutos','Aumentar la agilidad'],
      a:0, why:'Ventaja 2: economías de escala. El uso agregado permite precios más bajos.' },
    { t:'choice', q:'Ya no hay que estimar cuántos servidores comprar por adelantado. ¿Qué ventaja es?',
      o:['Dejar de adivinar la capacidad','Economías de escala','Agilidad','Gastos variables'],
      a:0, why:'Ventaja 3: stop guessing capacity. Escalas según necesites.' },
    { t:'multi', q:'¿Cuáles SON ventajas oficiales de la nube según AWS? (elige DOS)',
      o:['Ser global en minutos','Aumentar la velocidad y la agilidad','Eliminar la necesidad de seguridad','Garantizar el 100 % de disponibilidad'],
      a:[0,1], why:'Las seis: gasto variable, economías de escala, no adivinar capacidad, velocidad y agilidad, no gastar en centros de datos y globalizarse en minutos.' },
    { t:'tf', q:'Dejar de gastar en operar y mantener centros de datos es una de las seis ventajas.',
      a:true, why:'Te centras en tus clientes en lugar del racking, stacking y alimentación de servidores.' },
    { t:'fill', q:'Completa la ventaja',
      s:'Con AWS puedes desplegar tu aplicación en varias ___ del mundo en ___ y ofrecer menor latencia.',
      bank:['regiones','minutos','cuentas','semanas'], a:['regiones','minutos'],
      why:'Ventaja 6: go global in minutes desplegando en múltiples Regiones.' }
  ]
},
{
  id:'u01l3', icon:'🧱', title:'IaaS, PaaS y SaaS',
  tip:'IaaS = tú gestionas el SO. PaaS = gestionas tu código. SaaS = solo usas la app.',
  ex:[
    { t:'choice', q:'Amazon EC2 es el ejemplo clásico de:',
      o:['IaaS','PaaS','SaaS','Colocation'],
      a:0, why:'EC2 entrega infraestructura y tú gestionas el sistema operativo.' },
    { t:'choice', q:'Un modelo donde no gestionas la infraestructura y solo despliegas tu código es:',
      o:['PaaS','IaaS','SaaS','On-premises'],
      a:0, why:'PaaS, por ejemplo AWS Elastic Beanstalk, abstrae el SO y el aprovisionamiento.' },
    { t:'choice', q:'Gmail o Amazon WorkMail, usados desde el navegador sin instalar nada, son:',
      o:['SaaS','PaaS','IaaS','Nube privada'],
      a:0, why:'SaaS es un producto terminado, gestionado y ejecutado por el proveedor.' },
    { t:'cat', q:'Clasifica cada servicio por su modelo',
      buckets:['IaaS','PaaS','SaaS'],
      items:[['Amazon EC2',0],['Amazon VPC',0],['AWS Elastic Beanstalk',1],['AWS Lambda',1],['Amazon Chime',2],['Amazon Rekognition',2]],
      why:'EC2 y VPC son infraestructura; Beanstalk y Lambda abstraen la plataforma; Chime y Rekognition son software listo para usar.' },
    { t:'tf', q:'En SaaS el cliente es responsable de parchear el sistema operativo del servidor.',
      a:false, why:'En SaaS el proveedor gestiona todo el stack; el cliente solo gestiona sus datos y accesos.' },
    { t:'match', q:'Empareja el modelo con lo que gestiona el CLIENTE',
      pairs:[['IaaS','Sistema operativo, red virtual y aplicaciones'],
             ['PaaS','Solo la aplicación y los datos'],
             ['SaaS','Únicamente sus datos y usuarios']],
      why:'Cuanto más gestionado es el servicio, menos responsabilidad operativa tiene el cliente.' }
  ]
},
{
  id:'u01l4', icon:'🏢', title:'Modelos de implementación',
  tip:'Nube, híbrido y on-premises (nube privada). Híbrido = conectar tu centro de datos con AWS.',
  ex:[
    { t:'choice', q:'Una empresa mantiene su mainframe en local y lo conecta con AWS por Direct Connect. ¿Qué modelo usa?',
      o:['Híbrido','Nube pública pura','On-premises puro','Multi-tenant'],
      a:0, why:'El modelo híbrido conecta recursos locales con recursos en la nube.' },
    { t:'choice', q:'Una aplicación creada íntegramente con servicios gestionados de AWS es un despliegue:',
      o:['Basado en la nube (cloud-native)','Híbrido','On-premises','De colocation'],
      a:0, why:'Cloud-native: todo el sistema vive en la nube y aprovecha sus servicios gestionados.' },
    { t:'tf', q:'Ejecutar virtualización y gestión de recursos en el propio centro de datos se llama nube privada.',
      a:true, why:'Es el modelo on-premises o private cloud, con recursos dedicados a una sola organización.' },
    { t:'choice', q:'¿Qué servicio ejecuta infraestructura de AWS dentro de tu propio centro de datos?',
      o:['AWS Outposts','AWS Direct Connect','Amazon EC2','AWS Snowball'],
      a:0, why:'Outposts lleva hardware y servicios de AWS a tus instalaciones: el caso híbrido por excelencia.' },
    { t:'multi', q:'Motivos habituales para elegir un modelo híbrido (elige DOS)',
      o:['Requisitos de residencia de datos o normativa local','Sistemas heredados difíciles de migrar',
         'Reducir el número de Regiones disponibles','Evitar el uso de cifrado'],
      a:[0,1], why:'Latencia, normativa y sistemas legacy son las razones típicas.' },
    { t:'fill', q:'Completa',
      s:'El modelo ___ combina recursos on-premises con recursos en la ___.',
      bank:['híbrido','nube','privado','sucursal'], a:['híbrido','nube'],
      why:'Definición directa de despliegue híbrido.' }
  ]
},
{
  id:'u01l5', icon:'🌍', title:'Infraestructura global de AWS',
  tip:'Región = varias AZ. AZ = uno o más centros de datos aislados. Edge = caché cercana al usuario.',
  ex:[
    { t:'choice', q:'¿Qué es una zona de disponibilidad (AZ)?',
      o:['Uno o más centros de datos aislados dentro de una Región','Un continente entero','Un servidor físico','Una cuenta de AWS'],
      a:0, why:'Cada AZ tiene energía, refrigeración y red independientes, unidas por baja latencia.' },
    { t:'multi', q:'Factores para elegir una Región de AWS (elige DOS)',
      o:['Cumplimiento y soberanía de datos','Proximidad a los usuarios para reducir latencia','El idioma de la consola','El color del logotipo'],
      a:[0,1], why:'Los cuatro factores: cumplimiento, latencia, precio y disponibilidad del servicio.' },
    { t:'choice', q:'Las ubicaciones de borde (edge locations) sirven principalmente para:',
      o:['Entregar contenido en caché cerca del usuario con Amazon CloudFront','Ejecutar bases de datos relacionales','Archivar copias a largo plazo','Sustituir a las Regiones'],
      a:0, why:'CloudFront cachea contenido en cientos de edge locations para reducir latencia.' },
    { t:'match', q:'Empareja cada elemento de la infraestructura con su propósito',
      pairs:[['AWS Local Zones','Acercar cómputo a grandes ciudades para latencia muy baja'],
             ['AWS Outposts','Ejecutar infraestructura de AWS en tu centro de datos'],
             ['AWS Wavelength','Desplegar en redes 5G de operadores'],
             ['Región de AWS','Área geográfica con varias zonas de disponibilidad']],
      why:'Estas extensiones aparecen a menudo en preguntas de escenario.' },
    { t:'tf', q:'Una arquitectura desplegada en una sola zona de disponibilidad se considera de alta disponibilidad.',
      a:false, why:'Se necesitan al menos dos AZ para tolerar el fallo de una de ellas.' },
    { t:'choice', q:'¿Qué servicios son globales y no están ligados a una Región?',
      o:['IAM, Route 53, CloudFront y WAF','EC2, S3 y RDS','VPC y Lambda','EBS y EFS'],
      a:0, why:'IAM, Route 53, CloudFront y WAF son globales; la mayoría de servicios son regionales.' }
  ]
},
{
  id:'u01l6', icon:'🤝', title:'Modelo de responsabilidad compartida',
  tip:'AWS es responsable de la seguridad DE la nube; el cliente, de la seguridad EN la nube.',
  ex:[
    { t:'choice', q:'¿De qué es responsable AWS en el modelo de responsabilidad compartida?',
      o:['De la seguridad de la nube: hardware, software, red e instalaciones',
         'De cifrar los datos del cliente en S3','De configurar los grupos de seguridad del cliente','De gestionar los usuarios de IAM del cliente'],
      a:0, why:'AWS protege la infraestructura global: regiones, AZ, hardware y el software de los servicios gestionados.' },
    { t:'cat', q:'Clasifica cada tarea según quién es responsable',
      buckets:['AWS','Cliente'],
      items:[['Seguridad física de los centros de datos',0],['Parchear el sistema operativo invitado de EC2',1],
             ['Configurar grupos de seguridad',1],['Retirar de forma segura los discos averiados',0],
             ['Gestionar usuarios y permisos de IAM',1],['Mantener la infraestructura de virtualización',0]],
      why:'Regla práctica: si puedes tocarlo desde la consola, es tu responsabilidad.' },
    { t:'tf', q:'El cliente siempre es responsable de la clasificación de sus datos.',
      a:true, why:'Los datos del cliente son responsabilidad del cliente en cualquier servicio.' },
    { t:'choice', q:'Con Amazon RDS, ¿quién aplica los parches del motor de base de datos?',
      o:['AWS, porque es un servicio gestionado','El cliente, conectándose por SSH','Nadie, no se parchea','Un partner obligatorio'],
      a:0, why:'En servicios gestionados AWS asume el parcheo; el cliente configura y protege los datos.' },
    { t:'choice', q:'En Amazon EC2, ¿quién instala las actualizaciones de seguridad del sistema operativo?',
      o:['El cliente','AWS','El fabricante del hardware','El proveedor de red'],
      a:0, why:'EC2 es IaaS: el SO invitado, sus parches y su firewall corresponden al cliente.' },
    { t:'fill', q:'Completa la frase del modelo',
      s:'AWS es responsable de la seguridad ___ la nube y el cliente de la seguridad ___ la nube.',
      bank:['de','en','sobre','bajo'], a:['de','en'],
      why:'Security OF the cloud (AWS) frente a security IN the cloud (cliente).' }
  ]
}
]);

/* =============================== 2. IAM ============================== */
U({ id:'u02', num:2, icon:'🔑', color:'#ff9600', title:'IAM: identidad y accesos',
    domain:'Dominio 2', weight:30,
    intro:'Usuarios, grupos, políticas, roles, MFA y herramientas de seguridad de IAM.' }, [
{
  id:'u02l1', icon:'👥', title:'Usuarios, grupos y políticas',
  tip:'IAM es global. Aplica siempre el principio de mínimo privilegio.',
  ex:[
    { t:'choice', q:'¿Qué elemento de IAM agrupa usuarios para aplicarles los mismos permisos?',
      o:['Grupo de IAM','Rol de IAM','Política de confianza','Unidad organizativa'],
      a:0, why:'Los grupos simplifican la gestión: se adjuntan políticas al grupo y los usuarios las heredan.' },
    { t:'tf', q:'Un grupo de IAM puede contener a otros grupos.',
      a:false, why:'Los grupos solo contienen usuarios, nunca otros grupos.' },
    { t:'tf', q:'IAM es un servicio global: los usuarios no se crean por Región.',
      a:true, why:'IAM, Route 53, CloudFront y WAF son globales.' },
    { t:'choice', q:'Las políticas de IAM se escriben en:',
      o:['JSON, con Effect, Action y Resource','YAML, con Version y Outputs','XML, con Header y Body','Texto plano separado por comas'],
      a:0, why:'Una política define explícitamente qué acciones se permiten o deniegan sobre qué recursos.' },
    { t:'choice', q:'Si una política permite una acción y otra la deniega explícitamente, ¿qué ocurre?',
      o:['Se deniega: el deny explícito siempre gana','Se permite: el allow es prioritario','Depende del orden alfabético','Se pide confirmación al usuario'],
      a:0, why:'IAM evalúa: deny explícito > allow explícito > deny implícito por defecto.' },
    { t:'match', q:'Empareja cada parte de una política con su función',
      pairs:[['Effect','Allow o Deny'],['Action','Las llamadas a la API afectadas'],
             ['Resource','Los recursos sobre los que aplica'],['Condition','Cuándo se aplica la política']],
      why:'Conocer la estructura de una política es materia habitual del examen.' }
  ]
},
{
  id:'u02l2', icon:'🎭', title:'Roles y credenciales',
  tip:'Los roles dan credenciales temporales: nunca incrustes claves de acceso en el código.',
  ex:[
    { t:'choice', q:'Una instancia EC2 necesita leer un bucket de S3. ¿Cuál es la práctica recomendada?',
      o:['Asignar un rol de IAM a la instancia','Guardar las claves de acceso en el código','Usar las credenciales del usuario root','Hacer el bucket público'],
      a:0, why:'Los roles entregan credenciales temporales rotadas automáticamente.' },
    { t:'match', q:'Empareja cada elemento con su uso principal',
      pairs:[['Usuario de IAM','Identidad permanente para una persona'],
             ['Rol de IAM','Identidad asumible con credenciales temporales'],
             ['Política de IAM','Documento JSON que define permisos'],
             ['Clave de acceso','Credencial para la CLI y los SDK']],
      why:'La consola usa usuario y contraseña; la CLI y los SDK usan claves de acceso.' },
    { t:'choice', q:'¿Qué formas existen de acceder a AWS?',
      o:['Consola de gestión, CLI y SDK','Solo la consola web','Solo por SSH','Solo mediante CloudFormation'],
      a:0, why:'Las tres vías de acceso son la consola, la AWS CLI y los SDK (además de la API directa).' },
    { t:'tf', q:'AWS CloudShell es un terminal con la CLI ya configurada disponible en el navegador.',
      a:true, why:'CloudShell evita instalar la CLI y usa las credenciales del usuario conectado.' },
    { t:'choice', q:'¿Qué servicio permite a servicios de AWS actuar en tu nombre sobre otros servicios?',
      o:['Los roles de servicio de IAM','Los grupos de IAM','Las claves de acceso compartidas','Las políticas de contraseña'],
      a:0, why:'Por ejemplo, un rol que permite a Lambda escribir en DynamoDB.' },
    { t:'choice', q:'Un desarrollador subió por error una clave de acceso a un repositorio público. ¿Qué hace primero?',
      o:['Desactivar y eliminar esa clave de inmediato','Cambiar la Región de la cuenta','Abrir un caso de facturación','Detener todas las instancias EC2'],
      a:0, why:'Revocar la credencial expuesta es la acción inmediata; después se revisa CloudTrail.' }
  ]
},
{
  id:'u02l3', icon:'🛡️', title:'MFA, root y buenas prácticas',
  tip:'El usuario root solo para lo imprescindible, con MFA y sin claves de acceso.',
  ex:[
    { t:'multi', q:'Buenas prácticas con el usuario root (elige DOS)',
      o:['Activar MFA','Usarlo solo para las tareas que lo requieren',
         'Compartir sus credenciales con operaciones','Crear claves de acceso del root para automatizar'],
      a:[0,1], why:'El root debe tener MFA, no usarse a diario y no tener claves de acceso activas.' },
    { t:'choice', q:'¿Qué aporta la autenticación multifactor (MFA)?',
      o:['Un segundo factor además de la contraseña','Cifrado del disco','Un cortafuegos de red','Copias de seguridad automáticas'],
      a:0, why:'MFA exige algo que sabes y algo que tienes, reduciendo el riesgo de credenciales robadas.' },
    { t:'match', q:'Empareja cada dispositivo MFA con su tipo',
      pairs:[['Aplicación de autenticación virtual','Google Authenticator o Authy en el móvil'],
             ['Llave de seguridad U2F','Dispositivo físico USB como YubiKey'],
             ['Token de hardware','Llavero con código que cambia cada minuto']],
      why:'AWS admite MFA virtual, llaves U2F y tokens de hardware.' },
    { t:'choice', q:'¿Qué herramienta de IAM lista qué usuarios tienen contraseña, MFA y claves activas?',
      o:['El informe de credenciales (credential report)','El Access Advisor','AWS Config','AWS Artifact'],
      a:0, why:'El credential report se descarga a nivel de cuenta; Access Advisor muestra los permisos realmente usados.' },
    { t:'choice', q:'¿Qué política puede configurarse a nivel de cuenta en IAM?',
      o:['Longitud mínima, complejidad y caducidad de contraseñas','El color del portal de acceso','El número de instancias EC2','La Región por defecto'],
      a:0, why:'La password policy define requisitos de complejidad, caducidad y reutilización.' },
    { t:'choice', q:'¿Qué herramienta identifica recursos compartidos con entidades externas a la cuenta?',
      o:['IAM Access Analyzer','AWS Shield','AWS CloudHSM','Amazon GuardDuty'],
      a:0, why:'Access Analyzer detecta buckets, roles o claves accesibles desde fuera de tu zona de confianza.' }
  ]
}
]);

/* ============================= 3. Amazon EC2 ========================== */
U({ id:'u03', num:3, icon:'🖥️', color:'#ce82ff', title:'Amazon EC2',
    domain:'Dominio 3', weight:34,
    intro:'Instancias, tipos, grupos de seguridad y opciones de compra.' }, [
{
  id:'u03l1', icon:'⚙️', title:'Fundamentos de EC2',
  tip:'La AMI define el software inicial; el tipo de instancia define CPU, memoria y red.',
  ex:[
    { t:'choice', q:'¿Qué es una AMI en Amazon EC2?',
      o:['Una plantilla con el sistema operativo y el software para lanzar instancias','Un tipo de almacenamiento en bloque','Un plan de facturación','Una red virtual'],
      a:0, why:'Amazon Machine Image es la imagen base desde la que se lanza cada instancia.' },
    { t:'choice', q:'¿Qué opción ejecuta un script al arrancar por primera vez una instancia?',
      o:['User data','Metadata de facturación','Placement group','Security group'],
      a:0, why:'El EC2 user data automatiza la instalación de paquetes y la configuración inicial.' },
    { t:'match', q:'Empareja cada familia de instancias con su caso de uso',
      pairs:[['Uso general (T, M)','Servidores web y cargas equilibradas'],
             ['Optimizadas para cómputo (C)','Procesamiento por lotes y alto rendimiento'],
             ['Optimizadas para memoria (R, X)','Bases de datos en memoria y análisis grandes'],
             ['Optimizadas para almacenamiento (I, D)','Cargas con mucha E/S local']],
      why:'La letra inicial del tipo de instancia indica su familia y su caso de uso.' },
    { t:'choice', q:'En el nombre m5.2xlarge, ¿qué indica el 5?',
      o:['La generación de la instancia','El número de vCPU','Los GB de memoria','El número de AZ'],
      a:0, why:'m = familia, 5 = generación, 2xlarge = tamaño dentro de la familia.' },
    { t:'tf', q:'Con Amazon EC2 el cliente controla el sistema operativo y puede instalar el software que quiera.',
      a:true, why:'EC2 es infraestructura como servicio: control total sobre el SO invitado.' },
    { t:'choice', q:'Una instancia detenida (stopped) bajo demanda:',
      o:['No genera coste de cómputo, pero sí del volumen EBS asociado','Sigue costando lo mismo','Se elimina automáticamente','No conserva sus datos'],
      a:0, why:'Al detenerla dejas de pagar el cómputo; el almacenamiento EBS se sigue facturando.' }
  ]
},
{
  id:'u03l2', icon:'🚧', title:'Grupos de seguridad',
  tip:'Los grupos de seguridad son con estado y solo tienen reglas de permitir.',
  ex:[
    { t:'choice', q:'¿Qué actúa como cortafuegos virtual a nivel de instancia EC2?',
      o:['El grupo de seguridad','La NACL','La tabla de rutas','El Internet Gateway'],
      a:0, why:'Los grupos de seguridad controlan el tráfico de entrada y salida de la instancia.' },
    { t:'tf', q:'Los grupos de seguridad solo admiten reglas de permitir (allow), nunca de denegar.',
      a:true, why:'Todo lo que no se permite explícitamente queda bloqueado. Las NACL sí admiten deny.' },
    { t:'choice', q:'Un grupo de seguridad puede referenciar como origen:',
      o:['Un rango CIDR o incluso otro grupo de seguridad','Solo direcciones IP públicas','Solo nombres DNS','Solo IDs de instancia'],
      a:0, why:'Referenciar otro security group es un patrón habitual entre capas de la aplicación.' },
    { t:'match', q:'Empareja cada puerto con su servicio',
      pairs:[['22','SSH'],['80','HTTP'],['443','HTTPS'],['3389','RDP']],
      why:'Los puertos 22, 80, 443 y 3389 aparecen con frecuencia en el examen.' },
    { t:'choice', q:'Un intento de conexión SSH queda en timeout. La causa más probable es:',
      o:['Un grupo de seguridad que no permite el puerto 22','Una contraseña incorrecta','Un disco lleno','Una AMI caducada'],
      a:0, why:'Timeout apunta casi siempre al security group; connection refused apunta al servicio caído.' },
    { t:'tf', q:'Un mismo grupo de seguridad puede asociarse a varias instancias.',
      a:true, why:'La relación entre grupos de seguridad e instancias es de muchos a muchos.' }
  ]
},
{
  id:'u03l3', icon:'💰', title:'Opciones de compra de EC2',
  tip:'Spot hasta 90 % de descuento pero interrumpible; Reserved y Savings Plans hasta 72 % con compromiso.',
  ex:[
    { t:'choice', q:'Una carga por lotes tolera interrupciones y busca el menor coste posible. ¿Qué elegir?',
      o:['Instancias Spot','Instancias bajo demanda','Hosts dedicados','Instancias reservadas de 3 años'],
      a:0, why:'Spot usa capacidad sobrante con hasta un 90 % de descuento, pero AWS puede reclamarla.' },
    { t:'choice', q:'Una base de datos debe funcionar 24/7 durante 3 años. ¿Qué opción minimiza el coste?',
      o:['Instancias reservadas o Savings Plans a 3 años','Instancias Spot','Bajo demanda','Instancias dedicadas por hora'],
      a:0, why:'Con carga estable y previsible, el compromiso a 1 o 3 años ahorra hasta un 72 %.' },
    { t:'choice', q:'Una normativa exige un servidor físico dedicado con visibilidad de sockets para licencias. ¿Qué usar?',
      o:['Dedicated Hosts','Dedicated Instances','Spot','Savings Plans'],
      a:0, why:'Dedicated Hosts dan el servidor físico completo y visibilidad de sockets y cores para BYOL.' },
    { t:'cat', q:'Clasifica según requiera o no compromiso previo',
      buckets:['Con compromiso','Sin compromiso'],
      items:[['Instancias reservadas',0],['Savings Plans',0],['Bajo demanda',1],['Spot',1]],
      why:'Reserved y Savings Plans implican comprometer uso o gasto por 1 o 3 años.' },
    { t:'choice', q:'¿Qué diferencia tiene un Compute Savings Plan frente a una instancia reservada estándar?',
      o:['Es más flexible: aplica a EC2, Fargate y Lambda con cualquier familia o Región','No ofrece descuento','Solo dura un mes','Solo aplica a bases de datos'],
      a:0, why:'El Compute Savings Plan compromete un gasto por hora aplicable a varios servicios.' },
    { t:'choice', q:'¿Qué opción reserva capacidad en una AZ concreta sin compromiso de plazo?',
      o:['Capacity Reservations','Spot Block','Savings Plans','Dedicated Instances'],
      a:0, why:'On-Demand Capacity Reservations garantizan capacidad, pero se pagan aunque no se usen.' },
    { t:'tf', q:'AWS puede interrumpir una instancia Spot cuando necesita recuperar esa capacidad.',
      a:true, why:'Por eso Spot solo debe usarse en cargas tolerantes a interrupciones y sin estado.' }
  ]
}
]);

/* ==================== 4. Almacenamiento de instancia =================== */
U({ id:'u04', num:4, icon:'💾', color:'#1cb0f6', title:'Almacenamiento de EC2',
    domain:'Dominio 3', weight:34,
    intro:'EBS, snapshots, AMI, Instance Store, EFS y FSx.' }, [
{
  id:'u04l1', icon:'📀', title:'Volúmenes EBS y snapshots',
  tip:'Un volumen EBS es un disco de red ligado a una AZ concreta.',
  ex:[
    { t:'choice', q:'¿Qué es Amazon EBS?',
      o:['Un volumen de almacenamiento en bloque que se adjunta a una instancia EC2','Un almacén de objetos','Un sistema de archivos compartido','Un servicio de copias en cinta'],
      a:0, why:'EBS se comporta como un disco duro de red persistente para una instancia.' },
    { t:'tf', q:'Un volumen EBS está ligado a una zona de disponibilidad concreta.',
      a:true, why:'Para moverlo a otra AZ hay que crear un snapshot y restaurarlo allí.' },
    { t:'choice', q:'¿Dónde se almacenan las instantáneas (snapshots) de EBS?',
      o:['En Amazon S3 gestionado por AWS','En el disco local de la instancia','En Amazon EFS','En una AMI de terceros'],
      a:0, why:'Los snapshots son incrementales y se guardan de forma duradera fuera de la AZ.' },
    { t:'choice', q:'¿Qué ocurre por defecto con el volumen raíz al terminar una instancia?',
      o:['Se elimina, salvo que se desactive la opción de borrado','Se conserva siempre','Se convierte en AMI','Se mueve a Glacier'],
      a:0, why:'El atributo Delete on Termination viene activado para el volumen raíz.' },
    { t:'match', q:'Empareja cada tipo de volumen con su uso',
      pairs:[['gp3 (SSD de uso general)','Cargas equilibradas y arranque del sistema'],
             ['io2 (SSD de IOPS provisionadas)','Bases de datos críticas con mucha E/S'],
             ['st1 (HDD optimizado)','Big data y procesamiento secuencial'],
             ['sc1 (HDD frío)','Datos de acceso poco frecuente al menor coste']],
      why:'Solo los volúmenes SSD (gp y io) pueden usarse como volumen de arranque.' },
    { t:'choice', q:'¿Qué servicio automatiza la creación y retención de snapshots?',
      o:['Amazon Data Lifecycle Manager o AWS Backup','AWS Config','Amazon Inspector','AWS Batch'],
      a:0, why:'Ambos permiten políticas programadas de copias de seguridad.' }
  ]
},
{
  id:'u04l2', icon:'🖼️', title:'AMI e Instance Store',
  tip:'Instance Store es disco físico del host: muy rápido pero efímero.',
  ex:[
    { t:'choice', q:'¿Qué ventaja tiene crear una AMI personalizada?',
      o:['Arranques más rápidos con el software ya preinstalado','Reducir el coste de red','Cifrar el tráfico HTTP','Aumentar el número de AZ'],
      a:0, why:'Se evita instalar y configurar todo con user data en cada arranque.' },
    { t:'tf', q:'Una AMI creada en una Región puede usarse directamente en otra Región sin copiarla.',
      a:false, why:'Las AMI son regionales: hay que copiarlas a la Región destino.' },
    { t:'choice', q:'¿Qué caracteriza al almacén de instancia (instance store)?',
      o:['Es efímero: los datos se pierden al detener la instancia','Se replica en tres AZ','Es el más barato para archivar','Se comparte entre instancias'],
      a:0, why:'Está físicamente adjunto al host: muy alto rendimiento pero sin persistencia.' },
    { t:'choice', q:'¿Qué servicio automatiza la creación, prueba y distribución de AMI?',
      o:['EC2 Image Builder','AWS CodeBuild','AWS Systems Manager Patch Manager','Amazon Inspector'],
      a:0, why:'Image Builder construye imágenes de forma programada y las valida automáticamente.' },
    { t:'cat', q:'Clasifica cada característica',
      buckets:['Amazon EBS','Instance Store'],
      items:[['Persistente tras detener la instancia',0],['Se pierde al detener la instancia',1],
             ['Se puede respaldar con snapshots',0],['Máximo rendimiento de E/S local',1]],
      why:'EBS es red y persistente; instance store es local y efímero.' },
    { t:'tf', q:'Un volumen EBS puede adjuntarse a varias instancias a la vez con EBS Multi-Attach en volúmenes io1 e io2.',
      a:true, why:'Multi-Attach permite compartir un volumen entre instancias en la misma AZ.' }
  ]
},
{
  id:'u04l3', icon:'📂', title:'Amazon EFS y FSx',
  tip:'EFS = NFS compartido, multi-AZ y elástico. FSx = sistemas de archivos de terceros gestionados.',
  ex:[
    { t:'choice', q:'Varias instancias Linux necesitan un sistema de archivos compartido que crezca solo:',
      o:['Amazon EFS','Amazon EBS','Instance Store','Amazon S3 Glacier'],
      a:0, why:'EFS es NFS gestionado, elástico y accesible desde muchas instancias y varias AZ.' },
    { t:'tf', q:'Amazon EFS funciona con instancias Windows.',
      a:false, why:'EFS es solo para Linux (NFS). Para Windows se usa FSx for Windows File Server.' },
    { t:'match', q:'Empareja cada servicio con su descripción',
      pairs:[['Amazon FSx for Windows File Server','Sistema de archivos SMB para cargas Windows'],
             ['Amazon FSx for Lustre','Sistema de archivos de alto rendimiento para HPC'],
             ['Amazon FSx for NetApp ONTAP','Compatibilidad con ONTAP y multiprotocolo'],
             ['Amazon EFS','NFS elástico para Linux']],
      why:'FSx da acceso gestionado a sistemas de archivos de terceros.' },
    { t:'choice', q:'¿Qué clase de EFS reduce el coste de los archivos poco usados?',
      o:['EFS Infrequent Access con políticas de ciclo de vida','EFS Provisioned','EFS Multi-Attach','EFS Glacier'],
      a:0, why:'EFS-IA aplica el mismo concepto de niveles que S3.' },
    { t:'choice', q:'¿Qué opción de EFS reduce coste si no se necesita resiliencia multi-AZ?',
      o:['EFS One Zone','EFS Standard','EFS Elastic Throughput','EFS Bursting'],
      a:0, why:'One Zone guarda los datos en una sola AZ a menor precio.' },
    { t:'cat', q:'Clasifica cada almacenamiento por su tipo',
      buckets:['Bloque','Archivos','Objetos'],
      items:[['Amazon EBS',0],['Instance Store',0],['Amazon EFS',1],['Amazon FSx',1],['Amazon S3',2]],
      why:'Distinguir bloque, archivos y objetos es una pregunta recurrente.' }
  ]
}
]);

/* ======================= 5. ELB y Auto Scaling ======================== */
U({ id:'u05', num:5, icon:'⚖️', color:'#00b8a9', title:'ELB y Auto Scaling',
    domain:'Dominio 3', weight:34,
    intro:'Escalabilidad, elasticidad, balanceadores de carga y grupos de Auto Scaling.' }, [
{
  id:'u05l1', icon:'📈', title:'Escalabilidad y alta disponibilidad',
  tip:'Escalado vertical = instancia más grande. Horizontal = más instancias.',
  ex:[
    { t:'choice', q:'Añadir más instancias EC2 detrás de un balanceador es:',
      o:['Escalado horizontal','Escalado vertical','Failover','Caching'],
      a:0, why:'Escalado horizontal (scale out) añade nodos; vertical (scale up) aumenta el tamaño de uno.' },
    { t:'choice', q:'Pasar de una instancia t2.micro a una t2.large es un ejemplo de:',
      o:['Escalado vertical','Escalado horizontal','Elasticidad automática','Alta disponibilidad'],
      a:0, why:'Se aumenta el tamaño del mismo nodo; es habitual en bases de datos no distribuidas.' },
    { t:'tf', q:'Escalabilidad y elasticidad son sinónimos exactos.',
      a:false, why:'Escalabilidad es poder crecer; elasticidad es ajustar la capacidad automáticamente en ambos sentidos.' },
    { t:'choice', q:'Para lograr alta disponibilidad dentro de una Región, la práctica recomendada es:',
      o:['Desplegar en varias zonas de disponibilidad','Usar una sola AZ con instancias grandes','Usar solo instancias Spot','Desactivar el balanceador'],
      a:0, why:'Las AZ están aisladas físicamente y conectadas por baja latencia.' },
    { t:'fill', q:'Completa la arquitectura típica',
      s:'Los usuarios llegan a un ___ que reparte el tráfico entre las instancias de un ___.',
      bank:['balanceador de carga','grupo de Auto Scaling','bucket de S3','rol de IAM'],
      a:['balanceador de carga','grupo de Auto Scaling'],
      why:'ELB + Auto Scaling en varias AZ es el patrón web de referencia.' },
    { t:'choice', q:'¿Qué define el RTO de una aplicación?',
      o:['El tiempo máximo aceptable de interrupción','Los datos que se pueden perder','El coste mensual','El número de usuarios'],
      a:0, why:'RTO es el objetivo de tiempo de recuperación; RPO el de punto de recuperación.' }
  ]
},
{
  id:'u05l2', icon:'🔀', title:'Elastic Load Balancing',
  tip:'ALB en capa 7 (HTTP), NLB en capa 4 (TCP/UDP), GWLB para appliances.',
  ex:[
    { t:'match', q:'Empareja cada balanceador con su uso',
      pairs:[['Application Load Balancer','HTTP y HTTPS con enrutamiento por ruta o host'],
             ['Network Load Balancer','TCP y UDP de altísimo rendimiento y latencia ultrabaja'],
             ['Gateway Load Balancer','Desplegar appliances de seguridad de terceros']],
      why:'ALB trabaja en capa 7, NLB en capa 4 y GWLB en capa 3.' },
    { t:'choice', q:'¿Qué comprobación retira del servicio a una instancia caída?',
      o:['Los health checks','Los security groups','Las route tables','Los placement groups'],
      a:0, why:'Las comprobaciones de estado dejan de enviar tráfico a los destinos que no responden.' },
    { t:'tf', q:'Un balanceador de carga puede repartir tráfico entre instancias de varias zonas de disponibilidad.',
      a:true, why:'Es la base del patrón de alta disponibilidad dentro de una Región.' },
    { t:'choice', q:'¿Qué balanceador conviene si se necesita una IP estática por AZ?',
      o:['Network Load Balancer','Application Load Balancer','Gateway Load Balancer','Classic Load Balancer'],
      a:0, why:'El NLB expone una IP elástica estática por zona de disponibilidad.' },
    { t:'choice', q:'ELB es un servicio gestionado, lo que significa que:',
      o:['AWS se encarga de su disponibilidad y su escalado','El cliente debe parchearlo','Solo funciona en una AZ','Requiere instalar software en EC2'],
      a:0, why:'Es más económico y fiable que montar tu propio balanceador en EC2.' },
    { t:'choice', q:'¿Qué servicio termina las conexiones HTTPS usando certificados de ACM?',
      o:['El Application Load Balancer','El Internet Gateway','Amazon Route 53','AWS WAF'],
      a:0, why:'ALB y CloudFront se integran con AWS Certificate Manager.' }
  ]
},
{
  id:'u05l3', icon:'🔄', title:'Auto Scaling Groups',
  tip:'Un ASG define capacidad mínima, deseada y máxima, y reemplaza instancias no sanas.',
  ex:[
    { t:'choice', q:'¿Qué servicio añade o elimina instancias EC2 automáticamente según la demanda?',
      o:['Amazon EC2 Auto Scaling','Elastic Load Balancing','Amazon CloudFront','AWS Config'],
      a:0, why:'Auto Scaling mantiene la capacidad deseada y escala según métricas como el uso de CPU.' },
    { t:'match', q:'Empareja cada parámetro del ASG con su significado',
      pairs:[['Capacidad mínima','Número de instancias que nunca baja'],
             ['Capacidad deseada','Número de instancias que intenta mantener'],
             ['Capacidad máxima','Techo de instancias que puede lanzar'],
             ['Launch template','Plantilla con AMI, tipo y configuración']],
      why:'El ASG usa una plantilla de lanzamiento para crear cada nueva instancia.' },
    { t:'tf', q:'Un Auto Scaling Group reemplaza automáticamente una instancia que falla la comprobación de estado.',
      a:true, why:'Esa auto-recuperación es una de sus ventajas principales.' },
    { t:'choice', q:'Escalar cuando el uso medio de CPU supera el 70 % es un ejemplo de:',
      o:['Escalado dinámico basado en métricas','Escalado programado','Escalado predictivo','Escalado manual'],
      a:0, why:'El target tracking es la política dinámica más habitual.' },
    { t:'choice', q:'Aumentar la capacidad todos los viernes a las 18:00 porque se sabe que habrá pico es:',
      o:['Escalado programado','Escalado dinámico','Escalado predictivo','Failover'],
      a:0, why:'El scheduled scaling responde a patrones conocidos de antemano.' },
    { t:'tf', q:'Usar Auto Scaling no tiene coste adicional: solo pagas los recursos que lanza.',
      a:true, why:'EC2 Auto Scaling es gratuito; pagas las instancias creadas.' }
  ]
}
]);

/* ============================= 6. Amazon S3 =========================== */
U({ id:'u06', num:6, icon:'🪣', color:'#ff4b8b', title:'Amazon S3',
    domain:'Dominio 3', weight:34,
    intro:'Buckets, seguridad, versionado, clases de almacenamiento y migración de datos.' }, [
{
  id:'u06l1', icon:'📦', title:'Buckets y objetos',
  tip:'El nombre del bucket es único a nivel mundial y el bucket vive en una Región.',
  ex:[
    { t:'choice', q:'¿Qué tipo de almacenamiento es Amazon S3?',
      o:['De objetos','De bloque','De archivos NFS','De cintas'],
      a:0, why:'S3 guarda objetos en buckets, cada uno con datos, metadatos y una clave única.' },
    { t:'tf', q:'El nombre de un bucket de S3 debe ser único a nivel global en todo AWS.',
      a:true, why:'Aunque el bucket se crea en una Región, su nombre es único mundialmente.' },
    { t:'choice', q:'¿Cuál es el tamaño máximo de un objeto en S3?',
      o:['5 TB, subiendo por partes si supera 5 GB','5 GB','500 GB','Sin límite'],
      a:0, why:'Por encima de 5 GB hay que usar multi-part upload.' },
    { t:'choice', q:'¿Qué función protege frente a borrados accidentales guardando copias anteriores?',
      o:['El versionado','El bloqueo de acceso público','La transferencia acelerada','El cifrado SSE-KMS'],
      a:0, why:'Con versionado activado, cada sobrescritura o borrado conserva las versiones previas.' },
    { t:'choice', q:'¿Qué casos de uso son típicos de Amazon S3?',
      o:['Copias de seguridad, data lakes, alojamiento de sitios estáticos y archivo','Ejecutar contenedores','Servir como disco de arranque','Sustituir a una VPC'],
      a:0, why:'S3 es el almacén central de datos de la mayoría de arquitecturas en AWS.' },
    { t:'tf', q:'Amazon S3 permite alojar un sitio web estático accesible por HTTP.',
      a:true, why:'Basta activar static website hosting y permitir la lectura pública de los objetos.' }
  ]
},
{
  id:'u06l2', icon:'🔒', title:'Seguridad y cifrado en S3',
  tip:'Bloqueo de acceso público activado por defecto; cifrado en reposo también por defecto.',
  ex:[
    { t:'choice', q:'¿Qué mecanismo define permisos a nivel de bucket mediante JSON?',
      o:['La bucket policy','El grupo de seguridad','La NACL','La tabla de rutas'],
      a:0, why:'Las políticas de bucket permiten o deniegan acciones sobre los objetos.' },
    { t:'tf', q:'Amazon S3 cifra en reposo los objetos nuevos de forma predeterminada.',
      a:true, why:'Desde 2023 se aplica SSE-S3 por defecto; el cliente puede elegir SSE-KMS o cifrado en el cliente.' },
    { t:'match', q:'Empareja cada opción de cifrado con su descripción',
      pairs:[['SSE-S3','Claves gestionadas y propiedad de Amazon S3'],
             ['SSE-KMS','Claves gestionadas en AWS KMS con auditoría'],
             ['SSE-C','Claves proporcionadas por el cliente en cada petición'],
             ['Cifrado del lado del cliente','El cliente cifra antes de subir el objeto']],
      why:'Distinguir SSE-S3 de SSE-KMS es una pregunta típica.' },
    { t:'choice', q:'¿Qué ajuste evita exponer datos por error a internet?',
      o:['S3 Block Public Access','S3 Transfer Acceleration','S3 Select','S3 Replication'],
      a:0, why:'Está activado por defecto y puede aplicarse a la cuenta entera.' },
    { t:'choice', q:'Se necesita conservar registros de forma inmutable por requisitos legales:',
      o:['S3 Object Lock en modo WORM','S3 Transfer Acceleration','S3 Select','Amazon CloudFront'],
      a:0, why:'Object Lock impide borrar o modificar objetos durante un periodo de retención.' },
    { t:'choice', q:'¿Qué servicio ayuda a descubrir datos personales almacenados en S3?',
      o:['Amazon Macie','Amazon GuardDuty','AWS Artifact','AWS Config'],
      a:0, why:'Macie clasifica datos sensibles mediante machine learning.' }
  ]
},
{
  id:'u06l3', icon:'🗃️', title:'Clases de almacenamiento y ciclo de vida',
  tip:'Cuanto más frío el nivel, más barato guardar y más caro (o lento) recuperar.',
  ex:[
    { t:'match', q:'Empareja cada clase de S3 con su caso de uso',
      pairs:[['S3 Standard','Datos de acceso frecuente'],
             ['S3 Intelligent-Tiering','Patrón de acceso desconocido o cambiante'],
             ['S3 Glacier Flexible Retrieval','Archivo con recuperación en minutos u horas'],
             ['S3 Glacier Deep Archive','Archivo a muy largo plazo, el más barato']],
      why:'Intelligent-Tiering mueve objetos entre niveles automáticamente por una pequeña tarifa.' },
    { t:'choice', q:'¿Qué mecanismo mueve objetos a clases más baratas con el tiempo?',
      o:['Las políticas de ciclo de vida','El versionado','La replicación entre regiones','El cifrado'],
      a:0, why:'Las lifecycle rules aplican transiciones y expiraciones según la antigüedad.' },
    { t:'tf', q:'Amazon S3 ofrece una durabilidad del 99,999999999 % (once nueves).',
      a:true, why:'S3 replica los objetos en varias AZ dentro de la Región.' },
    { t:'choice', q:'Datos de acceso poco frecuente pero que deben recuperarse al instante:',
      o:['S3 Standard-IA','S3 Glacier Deep Archive','S3 Standard','S3 Glacier Instant Retrieval solo tras 180 días'],
      a:0, why:'Standard-IA tiene menor coste de almacenamiento y una tarifa por recuperación.' },
    { t:'choice', q:'¿Qué clase guarda los datos en una sola AZ a menor precio?',
      o:['S3 One Zone-IA','S3 Standard','S3 Intelligent-Tiering','S3 Glacier Flexible Retrieval'],
      a:0, why:'One Zone-IA es adecuada para datos reproducibles: se pierden si falla esa AZ.' },
    { t:'choice', q:'¿Qué opción acelera cargas de usuarios lejanos usando la red de borde?',
      o:['S3 Transfer Acceleration','S3 Standard-IA','AWS Snowcone','Amazon EFS'],
      a:0, why:'Transfer Acceleration usa las edge locations de CloudFront como entrada.' }
  ]
},
{
  id:'u06l4', icon:'🚚', title:'Snow Family y Storage Gateway',
  tip:'Si mover los datos por red tarda más de una semana, usa la familia Snow.',
  ex:[
    { t:'choice', q:'Hay que transferir 80 TB desde una ubicación con poca conectividad:',
      o:['AWS Snowball Edge','Cargar por internet a S3','AWS Direct Connect en una hora','Amazon EFS'],
      a:0, why:'La familia Snow transporta grandes volúmenes físicamente cuando la red no es viable.' },
    { t:'match', q:'Empareja cada dispositivo con su capacidad aproximada',
      pairs:[['AWS Snowcone','Pequeño y portátil, hasta 8-14 TB'],
             ['AWS Snowball Edge','Decenas de TB por dispositivo'],
             ['AWS Snowmobile','Camión para exabytes de datos']],
      why:'La elección depende del volumen y del entorno físico.' },
    { t:'choice', q:'¿Qué servicio conecta aplicaciones on-premises con almacenamiento en la nube?',
      o:['AWS Storage Gateway','AWS DataSync','AWS Transfer Family','Amazon FSx'],
      a:0, why:'Storage Gateway es el puente híbrido hacia S3, Glacier y EBS.' },
    { t:'choice', q:'¿Qué servicio automatiza la transferencia de grandes volúmenes de ficheros por red?',
      o:['AWS DataSync','AWS Snowmobile','Amazon S3 Glacier','AWS Batch'],
      a:0, why:'DataSync acelera y programa la transferencia hacia S3, EFS o FSx.' },
    { t:'tf', q:'Los dispositivos Snow pueden ejecutar cómputo local (edge computing) además de transportar datos.',
      a:true, why:'Snowball Edge Compute Optimized ejecuta instancias EC2 y Lambda en el borde.' },
    { t:'choice', q:'¿Qué servicio transfiere ficheros hacia S3 mediante FTP, FTPS o SFTP?',
      o:['AWS Transfer Family','AWS DataSync','AWS Storage Gateway','Amazon Kinesis'],
      a:0, why:'Transfer Family mantiene los protocolos clásicos sobre almacenamiento en AWS.' }
  ]
}
]);

/* ==================== 7. Bases de datos y analítica ==================== */
U({ id:'u07', num:7, icon:'🗄️', color:'#7b61ff', title:'Bases de datos y analítica',
    domain:'Dominio 3', weight:34,
    intro:'RDS, Aurora, DynamoDB, Redshift, ElastiCache y los servicios de análisis de datos.' }, [
{
  id:'u07l1', icon:'🐬', title:'Amazon RDS y Aurora',
  tip:'Multi-AZ = disponibilidad. Réplicas de lectura = rendimiento de lectura.',
  ex:[
    { t:'choice', q:'¿Qué ofrece Amazon RDS?',
      o:['Bases de datos relacionales gestionadas con motores como MySQL o PostgreSQL','Una base NoSQL','Un almacén de objetos','Un servicio de colas'],
      a:0, why:'RDS automatiza copias, parches, alta disponibilidad y réplicas.' },
    { t:'tf', q:'Con Amazon RDS el cliente puede conectarse por SSH al servidor subyacente.',
      a:false, why:'RDS es gestionado: no hay acceso al SO. Si lo necesitas, instala la base de datos en EC2.' },
    { t:'choice', q:'¿Qué opción de RDS proporciona alta disponibilidad con conmutación automática?',
      o:['Multi-AZ','Réplicas de lectura','Instantáneas manuales','Grupos de parámetros'],
      a:0, why:'Multi-AZ mantiene una réplica en espera síncrona en otra AZ.' },
    { t:'choice', q:'¿Qué opción escala la carga de solo lectura de una base de datos?',
      o:['Réplicas de lectura','Multi-AZ','Backups automáticos','Enhanced Monitoring'],
      a:0, why:'Las read replicas son asíncronas y pueden estar en otra Región.' },
    { t:'choice', q:'¿Qué motor compatible con MySQL y PostgreSQL ofrece mucho mayor rendimiento y almacenamiento replicado en 3 AZ?',
      o:['Amazon Aurora','Amazon Redshift','Amazon Timestream','Amazon Keyspaces'],
      a:0, why:'Aurora es el motor cloud-native de AWS, con hasta 5 veces el rendimiento de MySQL.' },
    { t:'choice', q:'¿Qué opción de Aurora escala automáticamente y es ideal para cargas intermitentes?',
      o:['Aurora Serverless','Aurora Global Database','Aurora Multi-Master','Aurora Backtrack'],
      a:0, why:'Aurora Serverless ajusta la capacidad sin gestionar instancias.' },
    { t:'match', q:'Empareja cada motor de RDS con su carácter',
      pairs:[['Amazon Aurora','Motor propio de AWS compatible con MySQL y PostgreSQL'],
             ['Microsoft SQL Server','Motor comercial soportado por RDS'],
             ['MariaDB','Bifurcación open source de MySQL'],
             ['Oracle','Motor comercial con licencia BYOL o incluida']],
      why:'RDS soporta MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Db2 y Aurora.' }
  ]
},
{
  id:'u07l2', icon:'⚡', title:'DynamoDB y ElastiCache',
  tip:'DynamoDB es NoSQL sin servidor; ElastiCache es caché en memoria.',
  ex:[
    { t:'choice', q:'Una app necesita NoSQL con latencia de milisegundos y escalado automático sin servidores:',
      o:['Amazon DynamoDB','Amazon RDS','Amazon Redshift','Amazon Neptune'],
      a:0, why:'DynamoDB es clave-valor y de documentos, totalmente gestionada y sin servidor.' },
    { t:'choice', q:'¿Qué añade DynamoDB Accelerator (DAX)?',
      o:['Una caché en memoria que baja la latencia a microsegundos','Consultas SQL complejas','Replicación a S3','Cifrado del lado del cliente'],
      a:0, why:'DAX es una caché específica y transparente para DynamoDB.' },
    { t:'choice', q:'¿Qué función replica una tabla de DynamoDB en varias Regiones?',
      o:['Global Tables','Streams','Point-in-time recovery','On-Demand Capacity'],
      a:0, why:'Las Global Tables ofrecen lectura y escritura de baja latencia en varias Regiones.' },
    { t:'choice', q:'¿Qué servicio ofrece caché gestionada compatible con Redis y Memcached?',
      o:['Amazon ElastiCache','Amazon DynamoDB','Amazon MemoryDB solo con Memcached','Amazon Neptune'],
      a:0, why:'ElastiCache reduce la carga de la base de datos guardando resultados frecuentes.' },
    { t:'tf', q:'Usar una caché delante de la base de datos ayuda a que la aplicación sea sin estado.',
      a:true, why:'Guardar sesiones en ElastiCache permite reemplazar instancias sin perder al usuario.' },
    { t:'choice', q:'¿Qué modelo de capacidad de DynamoDB conviene con tráfico impredecible?',
      o:['On-demand','Provisioned con Auto Scaling desactivado','Reserved capacity','Provisioned fijo'],
      a:0, why:'On-demand cobra por petición sin planificar capacidad.' }
  ]
},
{
  id:'u07l3', icon:'📊', title:'Analítica y almacenes de datos',
  tip:'Redshift = data warehouse. Athena = SQL sobre S3. Glue = ETL sin servidor.',
  ex:[
    { t:'choice', q:'¿Qué servicio es un almacén de datos para análisis con SQL a gran escala?',
      o:['Amazon Redshift','Amazon DynamoDB','Amazon ElastiCache','Amazon Neptune'],
      a:0, why:'Redshift es el data warehouse columnar de AWS, orientado a OLAP.' },
    { t:'choice', q:'¿Qué servicio consulta con SQL datos directamente en Amazon S3, sin servidores?',
      o:['Amazon Athena','Amazon Redshift','AWS Glue','Amazon EMR'],
      a:0, why:'Athena se factura por datos escaneados; usar formatos columnares reduce el coste.' },
    { t:'match', q:'Empareja cada servicio de datos con su función',
      pairs:[['AWS Glue','ETL sin servidor y catálogo de datos'],
             ['Amazon EMR','Clústeres gestionados de Hadoop y Spark'],
             ['Amazon QuickSight','Paneles e inteligencia de negocio'],
             ['Amazon Kinesis','Ingesta y análisis de datos en streaming']],
      why:'Glue prepara los datos, EMR los procesa, Athena los consulta y QuickSight los visualiza.' },
    { t:'choice', q:'¿Qué servicio migra bases de datos a AWS con mínima interrupción?',
      o:['AWS Database Migration Service (DMS)','AWS DataSync','AWS Glue','Amazon Athena'],
      a:0, why:'DMS replica mientras el origen sigue operativo y admite cambio de motor con SCT.' },
    { t:'match', q:'Empareja cada base de datos especializada con su modelo',
      pairs:[['Amazon Neptune','Grafos'],['Amazon DocumentDB','Documentos compatible con MongoDB'],
             ['Amazon Timestream','Series temporales'],['Amazon QLDB','Libro mayor inmutable']],
      why:'Elegir el motor correcto según el modelo de datos es una pregunta típica de escenario.' },
    { t:'choice', q:'¿Qué servicio crea redes de blockchain gestionadas con Hyperledger Fabric o Ethereum?',
      o:['Amazon Managed Blockchain','Amazon QLDB','Amazon Neptune','AWS Glue'],
      a:0, why:'QLDB es un libro mayor centralizado; Managed Blockchain es descentralizado.' }
  ]
}
]);

/* ==================== 8. Otros servicios de cómputo ==================== */
U({ id:'u08', num:8, icon:'📦', color:'#ff6b35', title:'Contenedores y serverless',
    domain:'Dominio 3', weight:34,
    intro:'ECS, Fargate, ECR, Lambda, Batch y Lightsail.' }, [
{
  id:'u08l1', icon:'🐳', title:'Contenedores en AWS',
  tip:'ECS y EKS orquestan; Fargate ejecuta sin servidores; ECR guarda las imágenes.',
  ex:[
    { t:'match', q:'Empareja cada servicio de contenedores con su descripción',
      pairs:[['Amazon ECS','Orquestador de contenedores propio de AWS'],
             ['Amazon EKS','Kubernetes gestionado'],
             ['AWS Fargate','Motor de cómputo sin servidor para contenedores'],
             ['Amazon ECR','Registro de imágenes de contenedor']],
      why:'Con ECS sobre EC2 gestionas las instancias; con Fargate no.' },
    { t:'choice', q:'¿Qué diferencia hay entre ECS con EC2 y ECS con Fargate?',
      o:['Con Fargate no gestionas ni aprovisionas instancias','Con Fargate no puedes usar contenedores','EC2 es serverless','Fargate solo funciona con Kubernetes'],
      a:0, why:'Fargate elimina la gestión de servidores: solo defines CPU y memoria por tarea.' },
    { t:'tf', q:'Amazon EKS permite ejecutar Kubernetes sin gestionar el plano de control.',
      a:true, why:'AWS opera el control plane; tú despliegas tus cargas.' },
    { t:'choice', q:'¿Qué ventaja principal aportan los contenedores?',
      o:['Empaquetar la aplicación con sus dependencias para que se ejecute igual en cualquier lugar','Eliminar la necesidad de red','Cifrar automáticamente los datos','Sustituir a las bases de datos'],
      a:0, why:'Portabilidad y densidad son las ventajas clave frente a las máquinas virtuales.' },
    { t:'choice', q:'¿Dónde se almacenan las imágenes Docker privadas en AWS?',
      o:['Amazon ECR','Amazon S3 Glacier','AWS Artifact','AWS CodeCommit'],
      a:0, why:'Elastic Container Registry se integra con ECS, EKS y los permisos de IAM.' },
    { t:'choice', q:'¿Qué servicio despliega aplicaciones en contenedor desde el código fuente sin configurar infraestructura?',
      o:['AWS App Runner','AWS Batch','Amazon Lightsail','AWS OpsWorks'],
      a:0, why:'App Runner construye, despliega, balancea y escala automáticamente.' }
  ]
},
{
  id:'u08l2', icon:'λ', title:'AWS Lambda y serverless',
  tip:'Serverless no significa sin servidores, sino que tú no los gestionas.',
  ex:[
    { t:'choice', q:'¿Qué servicio ejecuta código en respuesta a eventos sin aprovisionar servidores?',
      o:['AWS Lambda','Amazon EC2','Amazon Lightsail','AWS Batch'],
      a:0, why:'Lambda factura por número de solicitudes y por tiempo de ejecución.' },
    { t:'tf', q:'Con AWS Lambda pagas también por el tiempo en el que la función no se ejecuta.',
      a:false, why:'Sin invocaciones no hay coste; ese es su gran atractivo.' },
    { t:'choice', q:'¿Cuál es el tiempo máximo de ejecución de una función Lambda?',
      o:['15 minutos','30 segundos','1 hora','Sin límite'],
      a:0, why:'Para procesos más largos se usan contenedores, Batch o Step Functions.' },
    { t:'multi', q:'¿Qué servicios se consideran serverless? (elige DOS)',
      o:['AWS Lambda','Amazon DynamoDB','Amazon EC2','Amazon RDS con instancias provisionadas'],
      a:[0,1], why:'S3, DynamoDB, Lambda, Fargate, SQS, SNS y API Gateway son serverless.' },
    { t:'choice', q:'¿Qué servicio crea y publica APIs REST o WebSocket gestionadas?',
      o:['Amazon API Gateway','Amazon CloudFront','Elastic Load Balancing','AWS AppSync solo para REST'],
      a:0, why:'API Gateway gestiona autorización, límites de uso y versiones, y suele invocar a Lambda.' },
    { t:'choice', q:'¿Qué servicio ejecuta trabajos por lotes gestionando la capacidad de cómputo?',
      o:['AWS Batch','AWS Step Functions','Amazon EventBridge','AWS Glue DataBrew'],
      a:0, why:'Batch planifica y aprovisiona el cómputo necesario, sin el límite de 15 minutos de Lambda.' }
  ]
},
{
  id:'u08l3', icon:'🌱', title:'Lightsail y comparativa de cómputo',
  tip:'Lightsail es la opción sencilla y de precio fijo para proyectos pequeños.',
  ex:[
    { t:'choice', q:'¿Qué servicio ofrece servidores virtuales sencillos a precio mensual fijo?',
      o:['Amazon Lightsail','Amazon EC2 Spot','AWS Outposts','AWS Fargate'],
      a:0, why:'Lightsail agrupa cómputo, almacenamiento y red en planes predecibles.' },
    { t:'cat', q:'Clasifica cada servicio según su nivel de gestión',
      buckets:['Tú gestionas el servidor','AWS gestiona el servidor'],
      items:[['Amazon EC2',0],['ECS sobre EC2',0],['AWS Lambda',1],['AWS Fargate',1]],
      why:'Cuanto más a la derecha, menos carga operativa y menos control de bajo nivel.' },
    { t:'choice', q:'Un equipo quiere subir una app web y que AWS gestione capacidad, balanceo y escalado:',
      o:['AWS Elastic Beanstalk','Amazon EC2 manual','Amazon S3','AWS Batch'],
      a:0, why:'Beanstalk es la opción PaaS: subes el código y se encarga del resto.' },
    { t:'tf', q:'Amazon Lightsail incluye la opción de desplegar bases de datos y balanceadores sencillos.',
      a:true, why:'Ofrece un catálogo simplificado ideal para usuarios sin experiencia en la nube.' },
    { t:'choice', q:'Para una carga con picos impredecibles y muy corta duración, lo más económico suele ser:',
      o:['AWS Lambda','Una instancia reservada de 3 años','Un Dedicated Host','Un clúster EMR permanente'],
      a:0, why:'Sin uso no hay coste; encaja con eventos esporádicos.' },
    { t:'choice', q:'¿Qué servicio es adecuado para migrar un servidor existente sin cambiar nada (lift and shift)?',
      o:['Amazon EC2','AWS Lambda','Amazon S3','Amazon Athena'],
      a:0, why:'EC2 da control total sobre el sistema operativo, como una VM tradicional.' }
  ]
}
]);

/* =============== 9. Despliegue e infraestructura como código ============ */
U({ id:'u09', num:9, icon:'🛠️', color:'#009688', title:'Despliegue y automatización',
    domain:'Dominio 3', weight:34,
    intro:'CloudFormation, CDK, Beanstalk, la familia Code y Systems Manager.' }, [
{
  id:'u09l1', icon:'📄', title:'CloudFormation y CDK',
  tip:'Infraestructura como código: plantillas versionadas y repetibles.',
  ex:[
    { t:'choice', q:'¿Qué servicio despliega recursos a partir de plantillas declarativas?',
      o:['AWS CloudFormation','AWS CodeDeploy','AWS Systems Manager','Amazon Inspector'],
      a:0, why:'CloudFormation crea pilas (stacks) repetibles a partir de YAML o JSON.' },
    { t:'multi', q:'Ventajas de la infraestructura como código (elige DOS)',
      o:['Los entornos se recrean de forma idéntica','El código se versiona y se revisa','Elimina la necesidad de permisos','Reduce a cero el coste de los recursos'],
      a:[0,1], why:'IaC aporta repetibilidad, trazabilidad y estimación de costes.' },
    { t:'choice', q:'¿Qué permite AWS CDK?',
      o:['Definir infraestructura con lenguajes de programación como Python o TypeScript','Solo escribir YAML','Monitorizar métricas','Cifrar volúmenes'],
      a:0, why:'El CDK sintetiza plantillas de CloudFormation a partir de código.' },
    { t:'tf', q:'CloudFormation puede desplegar la misma plantilla en varias Regiones y cuentas con StackSets.',
      a:true, why:'Los StackSets replican pilas de forma centralizada en una organización.' },
    { t:'choice', q:'¿Qué ocurre al eliminar una pila de CloudFormation?',
      o:['Se eliminan los recursos que creó, salvo los protegidos','No pasa nada','Se detienen sin borrarse','Se copian a otra Región'],
      a:0, why:'La pila gestiona el ciclo de vida completo de sus recursos.' },
    { t:'choice', q:'¿Qué servicio ofrece un catálogo de productos aprobados que los equipos pueden desplegar por sí mismos?',
      o:['AWS Service Catalog','AWS Marketplace','AWS Config','AWS Artifact'],
      a:0, why:'Service Catalog publica plantillas preaprobadas por el equipo de gobierno interno.' }
  ]
},
{
  id:'u09l2', icon:'🚀', title:'Beanstalk y la familia Code',
  tip:'Beanstalk despliega la app; la familia Code cubre el ciclo CI/CD.',
  ex:[
    { t:'choice', q:'¿Qué caracteriza a AWS Elastic Beanstalk?',
      o:['Despliega y escala tu aplicación gestionando la infraestructura por ti','Es una base de datos','Es un servicio de red','Es un almacén de objetos'],
      a:0, why:'Beanstalk es PaaS: mantienes el control de los recursos pero no los gestionas.' },
    { t:'match', q:'Empareja cada servicio con su papel en CI/CD',
      pairs:[['AWS CodeCommit','Repositorio de código Git gestionado'],
             ['AWS CodeBuild','Compila y ejecuta pruebas'],
             ['AWS CodeDeploy','Despliega la aplicación en los destinos'],
             ['AWS CodePipeline','Orquesta el flujo completo de entrega']],
      why:'La familia Code cubre desde el repositorio hasta el despliegue.' },
    { t:'choice', q:'¿Qué servicio almacena y comparte dependencias y paquetes de software?',
      o:['AWS CodeArtifact','AWS CodeCommit','Amazon ECR','AWS Artifact'],
      a:0, why:'Ojo: AWS Artifact son informes de cumplimiento, CodeArtifact son paquetes.' },
    { t:'tf', q:'AWS Cloud9 es un entorno de desarrollo integrado en el navegador.',
      a:true, why:'Permite escribir, ejecutar y depurar código sin instalar nada en local.' },
    { t:'choice', q:'¿Qué opción de despliegue de Beanstalk evita tiempo de inactividad creando un entorno paralelo?',
      o:['Blue/Green','All at once','Rolling con lote adicional únicamente','Immutable solo en Lambda'],
      a:0, why:'Blue/Green cambia el tráfico al nuevo entorno cuando está listo.' },
    { t:'choice', q:'¿Qué servicio gestiona configuración y parches de flotas de instancias, incluso on-premises?',
      o:['AWS Systems Manager','AWS Config','AWS CloudTrail','AWS OpsWorks solo en la nube'],
      a:0, why:'Systems Manager incluye Session Manager, Patch Manager y Parameter Store.' }
  ]
},
{
  id:'u09l3', icon:'🔧', title:'Systems Manager y operaciones',
  tip:'Session Manager permite entrar en una instancia sin SSH ni puerto 22 abierto.',
  ex:[
    { t:'choice', q:'¿Qué función de Systems Manager abre una sesión segura sin abrir el puerto 22?',
      o:['Session Manager','Patch Manager','Parameter Store','Automation'],
      a:0, why:'Se conecta mediante el agente SSM y registra la sesión, sin bastión ni claves SSH.' },
    { t:'match', q:'Empareja cada capacidad de Systems Manager con su función',
      pairs:[['Patch Manager','Aplica parches de forma automatizada'],
             ['Parameter Store','Guarda configuración y secretos sencillos'],
             ['Run Command','Ejecuta comandos en muchas instancias a la vez'],
             ['Inventory','Recoge el inventario de software instalado']],
      why:'SSM es la navaja suiza de las operaciones sobre flotas de servidores.' },
    { t:'tf', q:'AWS Systems Manager puede gestionar servidores on-premises además de instancias EC2.',
      a:true, why:'Basta instalar el agente SSM en el servidor.' },
    { t:'choice', q:'¿Qué servicio usa Chef y Puppet gestionados?',
      o:['AWS OpsWorks','AWS CodeDeploy','AWS Batch','AWS Config'],
      a:0, why:'OpsWorks es la opción para quien ya usa Chef o Puppet.' },
    { t:'choice', q:'¿Dónde se guardan secretos sencillos con cifrado y jerarquía de rutas, sin coste adicional?',
      o:['SSM Parameter Store','AWS Secrets Manager','Amazon S3','AWS KMS'],
      a:0, why:'Secrets Manager añade rotación automática, pero es de pago.' },
    { t:'choice', q:'¿Qué servicio prueba la resiliencia inyectando fallos controlados?',
      o:['AWS Fault Injection Simulator','AWS Config','Amazon Inspector','AWS Trusted Advisor'],
      a:0, why:'FIS aplica ingeniería del caos sobre cargas reales.' }
  ]
}
]);

/* ==================== 10. Arquitectura global ========================= */
U({ id:'u10', num:10, icon:'🌐', color:'#1cb0f6', title:'Arquitectura global',
    domain:'Dominio 3', weight:34,
    intro:'Route 53, CloudFront, Global Accelerator y las extensiones de la infraestructura.' }, [
{
  id:'u10l1', icon:'🧭', title:'Amazon Route 53',
  tip:'Route 53 es DNS gestionado, registrador de dominios y comprobador de estado.',
  ex:[
    { t:'choice', q:'¿Qué servicio proporciona DNS gestionado y registro de dominios?',
      o:['Amazon Route 53','Amazon CloudFront','AWS Direct Connect','Elastic Load Balancing'],
      a:0, why:'Route 53 resuelve nombres y admite políticas de enrutamiento avanzadas.' },
    { t:'match', q:'Empareja cada política de enrutamiento con su objetivo',
      pairs:[['Simple','Devuelve siempre el mismo destino'],
             ['Latencia','Envía al recurso con menor latencia'],
             ['Failover','Redirige al recurso de respaldo si el principal cae'],
             ['Geolocalización','Responde según el país del usuario']],
      why:'También existen ponderada (weighted) y multivalor.' },
    { t:'tf', q:'Route 53 puede comprobar el estado de los recursos y dejar de enviarles tráfico.',
      a:true, why:'Los health checks son la base del enrutamiento de conmutación por error.' },
    { t:'choice', q:'¿Qué tipo de registro apunta un nombre a una dirección IPv4?',
      o:['A','CNAME','MX','TXT'],
      a:0, why:'A para IPv4, AAAA para IPv6, CNAME para alias a otro nombre.' },
    { t:'choice', q:'¿Qué permite un registro de tipo Alias en Route 53?',
      o:['Apuntar al dominio raíz hacia recursos de AWS sin coste de consulta','Cifrar el tráfico DNS','Registrar dominios .es','Crear subredes'],
      a:0, why:'Un CNAME no puede usarse en el dominio raíz; el Alias sí.' },
    { t:'choice', q:'Route 53 es un servicio:',
      o:['Global','Regional','De una sola AZ','Solo on-premises'],
      a:0, why:'Como IAM, CloudFront y WAF, Route 53 no se selecciona por Región.' }
  ]
},
{
  id:'u10l2', icon:'🚀', title:'CloudFront y Global Accelerator',
  tip:'CloudFront cachea contenido; Global Accelerator mejora la ruta de red sin cachear.',
  ex:[
    { t:'choice', q:'¿Qué servicio entrega contenido en caché desde ubicaciones de borde?',
      o:['Amazon CloudFront','Amazon Route 53','AWS Global Accelerator','Elastic Load Balancing'],
      a:0, why:'CloudFront es la red de entrega de contenido (CDN) de AWS.' },
    { t:'choice', q:'¿Cuál es la diferencia principal entre CloudFront y Global Accelerator?',
      o:['CloudFront cachea el contenido; Global Accelerator solo optimiza la ruta de red','Son idénticos','Global Accelerator es una CDN','CloudFront solo funciona con S3'],
      a:0, why:'Global Accelerator sirve para TCP y UDP y da IP estáticas anycast.' },
    { t:'tf', q:'CloudFront puede usarse junto a AWS WAF y AWS Shield para proteger el origen.',
      a:true, why:'Es el patrón habitual de protección frente a DDoS y ataques de capa 7.' },
    { t:'choice', q:'¿Qué mecanismo de CloudFront impide acceder directamente al bucket de S3 saltándose la CDN?',
      o:['Origin Access Control','Bucket versioning','Transfer Acceleration','Route 53 Alias'],
      a:0, why:'OAC (antes OAI) obliga a que el acceso pase por CloudFront.' },
    { t:'match', q:'Empareja cada servicio con su caso',
      pairs:[['Amazon CloudFront','Distribuir vídeo e imágenes con caché global'],
             ['AWS Global Accelerator','Mejorar latencia de una app TCP/UDP sin caché'],
             ['S3 Transfer Acceleration','Acelerar subidas a un bucket desde lejos']],
      why:'Los tres usan la red de borde de AWS, pero con propósitos distintos.' },
    { t:'choice', q:'¿Qué son los orígenes válidos de una distribución de CloudFront?',
      o:['S3, ALB, EC2 o incluso un servidor externo','Solo buckets de S3','Solo Lambda','Solo DynamoDB'],
      a:0, why:'CloudFront admite orígenes en AWS y fuera de AWS.' }
  ]
},
{
  id:'u10l3', icon:'📡', title:'Extensiones de la infraestructura',
  tip:'Outposts en tu centro de datos, Local Zones cerca de la ciudad, Wavelength en redes 5G.',
  ex:[
    { t:'choice', q:'Una app de juegos necesita latencia de un dígito en milisegundos sobre 5G:',
      o:['AWS Wavelength','AWS Outposts','AWS Local Zones','Amazon CloudFront'],
      a:0, why:'Wavelength despliega en el borde de las redes de operadores móviles.' },
    { t:'choice', q:'Una empresa necesita cumplir con datos que no pueden salir de su edificio:',
      o:['AWS Outposts','Amazon CloudFront','AWS Global Accelerator','AWS Local Zones'],
      a:0, why:'Outposts ejecuta servicios de AWS sobre hardware instalado en sus instalaciones.' },
    { t:'choice', q:'¿Qué acerca servicios de AWS a grandes áreas metropolitanas sin una Región completa?',
      o:['AWS Local Zones','AWS Outposts','Edge locations','Zonas de disponibilidad'],
      a:0, why:'Las Local Zones extienden una Región para cargas muy sensibles a la latencia.' },
    { t:'tf', q:'Una arquitectura multirregión mejora la latencia global y la recuperación ante desastres.',
      a:true, why:'Es el argumento principal para replicar la aplicación en varias Regiones.' },
    { t:'match', q:'Empareja cada estrategia de recuperación con su característica',
      pairs:[['Backup y restauración','La más barata y la más lenta de recuperar'],
             ['Pilot light','Núcleo mínimo siempre encendido'],
             ['Warm standby','Copia reducida pero funcional siempre activa'],
             ['Multi-site activo-activo','La más cara y con RTO casi cero']],
      why:'A mayor coste, menor RTO y RPO.' },
    { t:'choice', q:'¿Qué servicio comunica con satélites sin desplegar antenas propias?',
      o:['AWS Ground Station','AWS Wavelength','AWS Outposts','AWS Direct Connect'],
      a:0, why:'Ground Station ofrece antenas como servicio para descargar datos de satélites.' }
  ]
}
]);

/* ================= 11. Integración y mensajería ======================= */
U({ id:'u11', num:11, icon:'🔗', color:'#ce82ff', title:'Integración y mensajería',
    domain:'Dominio 3', weight:34,
    intro:'SQS, SNS, Kinesis, Amazon MQ y Step Functions.' }, [
{
  id:'u11l1', icon:'📬', title:'SQS, SNS y desacoplamiento',
  tip:'SQS = colas (uno a uno). SNS = publicación/suscripción (uno a muchos).',
  ex:[
    { t:'choice', q:'¿Qué servicio ofrece colas de mensajes para desacoplar componentes?',
      o:['Amazon SQS','Amazon SNS','AWS Step Functions','Amazon Kinesis'],
      a:0, why:'SQS almacena mensajes hasta que un consumidor los procesa y los elimina.' },
    { t:'choice', q:'¿Qué servicio envía un mismo mensaje a muchos suscriptores a la vez?',
      o:['Amazon SNS','Amazon SQS','Amazon MQ','AWS Batch'],
      a:0, why:'SNS es publicación/suscripción: un mensaje llega a todos los suscriptores del tema.' },
    { t:'choice', q:'Sustituir llamadas directas entre servicios por una cola es un ejemplo de:',
      o:['Desacoplamiento de componentes','Escalado vertical','Consistencia fuerte','Lift and shift'],
      a:0, why:'Si un componente falla o se satura, el otro sigue funcionando.' },
    { t:'match', q:'Empareja cada servicio con su patrón',
      pairs:[['Amazon SQS','Cola: un consumidor procesa cada mensaje'],
             ['Amazon SNS','Tema: muchos suscriptores reciben el mensaje'],
             ['Amazon Kinesis','Streaming en tiempo real de grandes volúmenes'],
             ['Amazon MQ','Protocolos clásicos como MQTT o AMQP']],
      why:'Amazon MQ es la opción al migrar un broker existente sin reescribir la aplicación.' },
    { t:'tf', q:'Amazon SQS puede escalar automáticamente a cualquier número de mensajes.',
      a:true, why:'Es totalmente gestionado y sin límite práctico de escala.' },
    { t:'choice', q:'¿Qué servicio conecta aplicaciones mediante eventos, incluidos eventos de SaaS de terceros?',
      o:['Amazon EventBridge','Amazon SQS','AWS Batch','Amazon Athena'],
      a:0, why:'EventBridge es un bus de eventos sin servidor con reglas de enrutamiento.' }
  ]
},
{
  id:'u11l2', icon:'🌊', title:'Kinesis y orquestación',
  tip:'Kinesis para streaming en tiempo real; Step Functions para orquestar flujos.',
  ex:[
    { t:'choice', q:'¿Qué servicio ingiere y analiza datos en streaming en tiempo real?',
      o:['Amazon Kinesis','Amazon Athena','AWS Glue','Amazon Redshift'],
      a:0, why:'Kinesis procesa logs, telemetría, clics y datos de IoT según llegan.' },
    { t:'match', q:'Empareja cada componente de Kinesis con su función',
      pairs:[['Kinesis Data Streams','Ingesta de datos en tiempo real'],
             ['Kinesis Data Firehose','Entrega los datos a S3, Redshift u OpenSearch'],
             ['Kinesis Video Streams','Transmisión de vídeo para análisis']],
      why:'Firehose es la vía más sencilla para volcar el streaming a un destino.' },
    { t:'choice', q:'¿Qué servicio coordina pasos de un flujo de trabajo con reintentos y control de errores?',
      o:['AWS Step Functions','Amazon EventBridge','Amazon SQS','AWS Lambda'],
      a:0, why:'Step Functions orquesta máquinas de estado visuales entre servicios.' },
    { t:'choice', q:'¿Qué servicio permite crear centros de contacto (call centers) en la nube?',
      o:['Amazon Connect','Amazon Chime','Amazon Pinpoint','Amazon SES'],
      a:0, why:'Connect es un contact center virtual sin infraestructura de telefonía propia.' },
    { t:'match', q:'Empareja cada servicio de comunicaciones con su uso',
      pairs:[['Amazon SES','Envío de correo electrónico transaccional'],
             ['Amazon Pinpoint','Campañas de mensajería multicanal'],
             ['Amazon Chime','Reuniones y videollamadas'],
             ['Amazon SNS','Notificaciones a suscriptores y otros servicios']],
      why:'SES y Pinpoint se confunden a menudo: Pinpoint añade segmentación y campañas.' },
    { t:'tf', q:'AWS AppSync permite crear APIs GraphQL gestionadas.',
      a:true, why:'AppSync sincroniza datos en tiempo real para aplicaciones móviles y web.' }
  ]
}
]);

/* ================= 12. Monitorización y auditoría ===================== */
U({ id:'u12', num:12, icon:'📈', color:'#ff9600', title:'Monitorización y auditoría',
    domain:'Dominio 2', weight:30,
    intro:'CloudWatch, CloudTrail, X-Ray, EventBridge y los paneles de estado.' }, [
{
  id:'u12l1', icon:'📊', title:'Amazon CloudWatch',
  tip:'CloudWatch responde a cómo se comporta el sistema: métricas, logs y alarmas.',
  ex:[
    { t:'choice', q:'¿Qué servicio recopila métricas y activa alarmas sobre los recursos de AWS?',
      o:['Amazon CloudWatch','AWS CloudTrail','AWS Config','AWS X-Ray'],
      a:0, why:'CloudWatch es la plataforma de observabilidad: métricas, logs, alarmas y paneles.' },
    { t:'tf', q:'La métrica de uso de memoria de una instancia EC2 requiere instalar el agente de CloudWatch.',
      a:true, why:'CPU, red y disco vienen por defecto; memoria y espacio en disco necesitan el agente.' },
    { t:'choice', q:'¿Qué puede hacer una alarma de CloudWatch?',
      o:['Notificar por SNS, escalar un ASG o detener una instancia','Solo enviar correos','Solo escribir logs','Nada, solo mostrar gráficas'],
      a:0, why:'Las alarmas disparan acciones automáticas además de notificar.' },
    { t:'match', q:'Empareja cada elemento de CloudWatch con su función',
      pairs:[['Métricas','Valores numéricos a lo largo del tiempo'],
             ['Logs','Registros de aplicaciones y servicios'],
             ['Alarmas','Disparan acciones al cruzar un umbral'],
             ['Dashboards','Paneles visuales personalizados']],
      why:'CloudWatch Logs Insights permite consultar los registros con un lenguaje propio.' },
    { t:'choice', q:'¿Qué servicio programa acciones según eventos o de forma periódica (cron)?',
      o:['Amazon EventBridge','AWS Config','AWS X-Ray','Amazon Inspector'],
      a:0, why:'EventBridge (antes CloudWatch Events) reacciona a eventos y a horarios.' },
    { t:'choice', q:'¿Qué servicio ayuda a analizar el rendimiento de aplicaciones distribuidas rastreando peticiones?',
      o:['AWS X-Ray','Amazon CloudWatch Metrics','AWS Config','AWS CloudTrail'],
      a:0, why:'X-Ray traza extremo a extremo la petición y localiza cuellos de botella.' }
  ]
},
{
  id:'u12l2', icon:'🔍', title:'CloudTrail, Config y estado del servicio',
  tip:'CloudTrail = quién hizo qué. Config = está bien configurado. CloudWatch = cómo se comporta.',
  ex:[
    { t:'choice', q:'¿Qué servicio registra quién hizo cada llamada a la API, cuándo y desde dónde?',
      o:['AWS CloudTrail','Amazon CloudWatch','AWS Config','Amazon Inspector'],
      a:0, why:'CloudTrail es el registro de auditoría de la actividad de la cuenta.' },
    { t:'choice', q:'¿Qué servicio evalúa de forma continua si la configuración de los recursos cumple unas reglas?',
      o:['AWS Config','AWS CloudTrail','AWS Systems Manager','AWS Organizations'],
      a:0, why:'Config guarda el historial de configuración y comprueba conformidad.' },
    { t:'match', q:'Empareja el servicio con la pregunta que responde',
      pairs:[['AWS CloudTrail','Quién hizo esta acción'],
             ['Amazon CloudWatch','Cómo se está comportando mi sistema'],
             ['AWS Config','Está mi recurso configurado como debe'],
             ['AWS X-Ray','Dónde se ralentiza mi aplicación']],
      why:'Esta comparación aparece con mucha frecuencia en el examen.' },
    { t:'tf', q:'Los eventos de CloudTrail se conservan 90 días en el historial y pueden enviarse a S3 para más tiempo.',
      a:true, why:'Para retención larga se crea un trail que entrega los registros a un bucket.' },
    { t:'choice', q:'¿Dónde se comprueba si una incidencia de AWS afecta a tus recursos concretos?',
      o:['AWS Health Dashboard','AWS Trusted Advisor','Amazon CloudWatch','AWS Artifact'],
      a:0, why:'El Health Dashboard muestra el estado general y los eventos que afectan a tu cuenta.' },
    { t:'choice', q:'Se necesita saber quién eliminó un bucket de S3 la semana pasada. ¿Qué se consulta?',
      o:['AWS CloudTrail','Amazon CloudWatch Metrics','AWS Budgets','AWS Artifact'],
      a:0, why:'Es un caso de auditoría, no de monitorización.' }
  ]
}
]);

/* ======================== 13. VPC y redes ============================= */
U({ id:'u13', num:13, icon:'🕸️', color:'#00b8a9', title:'VPC y redes',
    domain:'Dominio 3', weight:34,
    intro:'Subredes, gateways, NACL y grupos de seguridad, VPN, Direct Connect y endpoints.' }, [
{
  id:'u13l1', icon:'🏗️', title:'Componentes de una VPC',
  tip:'Subred pública = tiene ruta a un Internet Gateway. Privada = no la tiene.',
  ex:[
    { t:'choice', q:'¿Qué es una Amazon VPC?',
      o:['Una red virtual privada y aislada dentro de AWS','Una cuenta de facturación','Un tipo de instancia','Un servicio de DNS'],
      a:0, why:'La VPC da control sobre rangos IP, subredes, tablas de rutas y gateways.' },
    { t:'match', q:'Empareja cada componente de red con su función',
      pairs:[['Internet Gateway','Da acceso a internet a una subred pública'],
             ['NAT Gateway','Permite salida a internet desde subredes privadas'],
             ['Tabla de rutas','Define hacia dónde va el tráfico de una subred'],
             ['Subred','Rango de IP dentro de una zona de disponibilidad']],
      why:'El NAT Gateway permite salir pero no recibir conexiones entrantes.' },
    { t:'tf', q:'Una subred pertenece a una única zona de disponibilidad.',
      a:true, why:'Para alta disponibilidad se crean subredes en varias AZ.' },
    { t:'choice', q:'¿Dónde se colocan normalmente las bases de datos en una arquitectura de tres capas?',
      o:['En subredes privadas','En subredes públicas','Fuera de la VPC','En una edge location'],
      a:0, why:'Solo lo que necesita ser accesible desde internet va en subredes públicas.' },
    { t:'choice', q:'¿Qué registra los flujos de tráfico IP de una VPC para depuración y seguridad?',
      o:['VPC Flow Logs','CloudTrail','AWS Config','Amazon Inspector'],
      a:0, why:'Los Flow Logs capturan metadatos del tráfico aceptado y rechazado.' },
    { t:'choice', q:'¿Qué son las Elastic IP?',
      o:['Direcciones IPv4 públicas fijas asociadas a una cuenta','Direcciones privadas de subred','Un tipo de balanceador','Un tipo de volumen'],
      a:0, why:'Se cobran si están reservadas y no asociadas a una instancia en ejecución.' }
  ]
},
{
  id:'u13l2', icon:'🚦', title:'Grupos de seguridad frente a NACL',
  tip:'SG: instancia, con estado, solo allow. NACL: subred, sin estado, allow y deny.',
  ex:[
    { t:'cat', q:'Clasifica las características de los cortafuegos de VPC',
      buckets:['Grupo de seguridad','Network ACL'],
      items:[['Opera a nivel de instancia',0],['Opera a nivel de subred',1],
             ['Con estado (stateful)',0],['Sin estado (stateless)',1],
             ['Solo reglas de permitir',0],['Permite reglas de denegar',1]],
      why:'Esta comparación aparece casi siempre en el examen.' },
    { t:'choice', q:'Se necesita bloquear una dirección IP concreta que está atacando la red:',
      o:['Una regla de denegar en la NACL','Una regla en el grupo de seguridad','Una tabla de rutas','Un rol de IAM'],
      a:0, why:'Los grupos de seguridad no admiten reglas de denegar; las NACL sí.' },
    { t:'tf', q:'Al ser stateful, un grupo de seguridad permite automáticamente el tráfico de respuesta.',
      a:true, why:'Si permites la entrada, la respuesta sale aunque no haya regla de salida.' },
    { t:'choice', q:'¿Qué servicio es un cortafuegos gestionado a nivel de toda la VPC?',
      o:['AWS Network Firewall','AWS WAF','AWS Shield','Security Group'],
      a:0, why:'Network Firewall protege el perímetro de la VPC con inspección profunda.' },
    { t:'choice', q:'¿Qué servicio gestiona reglas de WAF y de cortafuegos de forma centralizada en una organización?',
      o:['AWS Firewall Manager','AWS Config','AWS Control Tower','Amazon GuardDuty'],
      a:0, why:'Firewall Manager aplica políticas comunes a todas las cuentas.' },
    { t:'choice', q:'La NACL predeterminada de una VPC nueva:',
      o:['Permite todo el tráfico de entrada y de salida','Bloquea todo','Solo permite HTTPS','No existe'],
      a:0, why:'La NACL por defecto es permisiva; las creadas manualmente deniegan todo al principio.' }
  ]
},
{
  id:'u13l3', icon:'🔌', title:'Conectividad híbrida y endpoints',
  tip:'VPN va por internet cifrada; Direct Connect es una línea privada dedicada.',
  ex:[
    { t:'choice', q:'¿Qué servicio da una conexión de red privada y dedicada entre el centro de datos y AWS?',
      o:['AWS Direct Connect','AWS Site-to-Site VPN','Amazon CloudFront','AWS Transit Gateway'],
      a:0, why:'Direct Connect no usa internet: ofrece ancho de banda constante y menor latencia.' },
    { t:'choice', q:'Se necesita conectar la oficina con AWS de forma rápida y económica, aceptando pasar por internet:',
      o:['Site-to-Site VPN','Direct Connect','VPC Peering','Transit Gateway'],
      a:0, why:'La VPN se monta en horas; Direct Connect tarda semanas en aprovisionarse.' },
    { t:'choice', q:'¿Qué servicio simplifica conectar cientos de VPC y redes on-premises desde un punto central?',
      o:['AWS Transit Gateway','VPC Peering uno a uno','AWS PrivateLink','Internet Gateway'],
      a:0, why:'Transit Gateway actúa como hub; el peering es punto a punto y no escala igual.' },
    { t:'tf', q:'Los VPC endpoints permiten acceder a servicios de AWS sin que el tráfico salga a internet.',
      a:true, why:'Los gateway endpoints sirven para S3 y DynamoDB; los interface endpoints usan PrivateLink.' },
    { t:'match', q:'Empareja cada opción de conectividad con su característica',
      pairs:[['Site-to-Site VPN','Cifrada sobre internet, rápida de montar'],
             ['Direct Connect','Línea física dedicada, ancho de banda estable'],
             ['VPC Peering','Conexión directa entre dos VPC'],
             ['AWS PrivateLink','Exponer un servicio de forma privada a otras VPC']],
      why:'PrivateLink evita el peering y no expone toda la red.' },
    { t:'choice', q:'¿Qué servicio permite a usuarios remotos conectarse a la VPC con un cliente VPN?',
      o:['AWS Client VPN','AWS Site-to-Site VPN','AWS Direct Connect','Amazon WorkSpaces'],
      a:0, why:'Client VPN conecta ordenadores individuales, no redes enteras.' }
  ]
}
]);

/* ================= 14. Seguridad y cumplimiento ======================= */
U({ id:'u14', num:14, icon:'🛡️', color:'#ff4b4b', title:'Seguridad y cumplimiento',
    domain:'Dominio 2', weight:30,
    intro:'Protección DDoS, cifrado, detección de amenazas y cumplimiento normativo.' }, [
{
  id:'u14l1', icon:'⚔️', title:'Protección frente a ataques',
  tip:'Shield para DDoS (capas 3-4), WAF para la capa 7.',
  ex:[
    { t:'choice', q:'¿Qué protección frente a DDoS está incluida sin coste para todos los clientes?',
      o:['AWS Shield Standard','AWS Shield Advanced','AWS WAF','AWS Firewall Manager'],
      a:0, why:'Shield Standard protege automáticamente frente a los ataques más comunes.' },
    { t:'choice', q:'¿Qué añade AWS Shield Advanced?',
      o:['Protección ante ataques mayores, equipo de respuesta y protección del coste','Cifrado de datos','Gestión de identidades','Copias de seguridad'],
      a:0, why:'Incluye el DDoS Response Team y reembolso del escalado provocado por un ataque.' },
    { t:'choice', q:'¿Qué servicio filtra inyección SQL y cross-site scripting en aplicaciones web?',
      o:['AWS WAF','AWS Shield Standard','Amazon Inspector','AWS KMS'],
      a:0, why:'WAF actúa en capa 7 sobre CloudFront, ALB y API Gateway.' },
    { t:'tf', q:'AWS permite realizar pruebas de penetración sobre una lista de servicios propios sin aprobación previa.',
      a:true, why:'Deben seguirse las condiciones de la política de pruebas de AWS.' },
    { t:'choice', q:'¿Qué debe hacerse si se detecta que una instancia EC2 está siendo usada para atacar a terceros?',
      o:['Contactar con AWS Abuse y aislar la instancia','Ignorarlo','Aumentar su tamaño','Cambiarla de Región'],
      a:0, why:'El equipo de AWS Trust and Safety gestiona los casos de abuso.' },
    { t:'choice', q:'¿Qué combinación protege un sitio web frente a DDoS y ataques de aplicación?',
      o:['CloudFront + AWS Shield + AWS WAF','EC2 + EBS','S3 + Glacier','RDS + ElastiCache'],
      a:0, why:'Es la arquitectura de referencia de protección perimetral en AWS.' }
  ]
},
{
  id:'u14l2', icon:'🔐', title:'Cifrado y gestión de claves',
  tip:'KMS para claves gestionadas, CloudHSM para módulos dedicados, ACM para certificados.',
  ex:[
    { t:'choice', q:'¿Qué servicio crea y controla las claves de cifrado usadas por la mayoría de servicios de AWS?',
      o:['AWS KMS','AWS Artifact','AWS WAF','Amazon Inspector'],
      a:0, why:'KMS se integra con S3, EBS, RDS y muchos más para el cifrado en reposo.' },
    { t:'choice', q:'Una normativa exige módulos de hardware dedicados con control exclusivo de las claves:',
      o:['AWS CloudHSM','AWS KMS con claves gestionadas por AWS','AWS Secrets Manager','AWS Certificate Manager'],
      a:0, why:'CloudHSM ofrece HSM dedicados; AWS no puede acceder a esas claves.' },
    { t:'choice', q:'¿Qué servicio aprovisiona y renueva certificados TLS gratuitos para ELB y CloudFront?',
      o:['AWS Certificate Manager (ACM)','AWS KMS','Amazon Route 53','AWS Shield'],
      a:0, why:'ACM emite y renueva automáticamente certificados públicos.' },
    { t:'match', q:'Empareja cada concepto de cifrado con su ejemplo',
      pairs:[['Cifrado en reposo','Cifrado de un volumen de Amazon EBS'],
             ['Cifrado en tránsito','HTTPS entre el navegador y el balanceador'],
             ['Cifrado del lado del cliente','El cliente cifra el objeto antes de subirlo']],
      why:'El examen distingue claramente en reposo, en tránsito y del lado del cliente.' },
    { t:'choice', q:'¿Qué servicio almacena secretos y los rota automáticamente?',
      o:['AWS Secrets Manager','SSM Parameter Store sin cifrado','AWS KMS','Amazon Macie'],
      a:0, why:'Secrets Manager cifra con KMS y admite rotación programada de credenciales.' },
    { t:'match', q:'Empareja cada tipo de clave de KMS con su descripción',
      pairs:[['Clave gestionada por AWS','Creada y gestionada por el servicio, sin coste'],
             ['Clave gestionada por el cliente','Creada por ti, con rotación y políticas propias'],
             ['Material de clave importado','Generado fuera de AWS e importado a KMS']],
      why:'Las claves gestionadas por el cliente permiten auditar y controlar el acceso.' }
  ]
},
{
  id:'u14l3', icon:'🚨', title:'Detección de amenazas',
  tip:'GuardDuty detecta, Inspector escanea vulnerabilidades, Macie protege datos sensibles.',
  ex:[
    { t:'choice', q:'¿Qué servicio detecta actividad maliciosa analizando CloudTrail, VPC Flow Logs y registros DNS?',
      o:['Amazon GuardDuty','Amazon Inspector','AWS Config','AWS Trusted Advisor'],
      a:0, why:'GuardDuty es el servicio de detección de amenazas con machine learning.' },
    { t:'choice', q:'¿Qué servicio analiza instancias EC2 y contenedores en busca de vulnerabilidades conocidas?',
      o:['Amazon Inspector','Amazon Macie','AWS Shield','AWS Artifact'],
      a:0, why:'Inspector evalúa CVEs y exposición de red de forma continua.' },
    { t:'choice', q:'¿Qué servicio descubre y clasifica datos sensibles en Amazon S3?',
      o:['Amazon Macie','Amazon GuardDuty','Amazon Detective','AWS Firewall Manager'],
      a:0, why:'Macie localiza información personal identificable (PII).' },
    { t:'choice', q:'¿Qué servicio agrega hallazgos de GuardDuty, Inspector y Macie en un panel central?',
      o:['AWS Security Hub','AWS Config','Amazon Detective','AWS Firewall Manager'],
      a:0, why:'Security Hub centraliza hallazgos y comprobaciones de cumplimiento.' },
    { t:'choice', q:'¿Qué servicio investiga la causa raíz de un incidente correlacionando eventos?',
      o:['Amazon Detective','AWS Config','Amazon CloudWatch Logs','AWS Budgets'],
      a:0, why:'Detective construye gráficos de comportamiento a partir de los datos de la cuenta.' },
    { t:'match', q:'Empareja cada servicio con su especialidad',
      pairs:[['Amazon GuardDuty','Detección continua de amenazas'],
             ['Amazon Inspector','Vulnerabilidades en cargas de trabajo'],
             ['Amazon Macie','Datos sensibles en S3'],
             ['Amazon Detective','Investigación de incidentes']],
      why:'Distinguir estos cuatro servicios es materia frecuente del examen.' }
  ]
},
{
  id:'u14l4', icon:'📜', title:'Cumplimiento y gobernanza',
  tip:'Artifact para informes, Config para conformidad, Organizations y SCP para límites.',
  ex:[
    { t:'choice', q:'¿Dónde se descargan los informes de cumplimiento de AWS como SOC 2 o ISO 27001?',
      o:['AWS Artifact','AWS Config','AWS Trusted Advisor','AWS Security Hub'],
      a:0, why:'Artifact es el portal de autoservicio con informes de auditoría y acuerdos como el BAA.' },
    { t:'choice', q:'¿Qué permite aplicar límites de permisos a todas las cuentas de una unidad organizativa?',
      o:['Las políticas de control de servicios (SCP) de AWS Organizations','Las políticas de IAM de cada usuario','Los grupos de seguridad','Las NACL'],
      a:0, why:'Las SCP definen el máximo de permisos disponibles, aunque IAM permita más.' },
    { t:'choice', q:'¿Qué servicio despliega un entorno multicuenta seguro con barreras predefinidas?',
      o:['AWS Control Tower','AWS CloudFormation StackSets únicamente','AWS Systems Manager','AWS Directory Service'],
      a:0, why:'Control Tower crea una landing zone con Organizations, IAM Identity Center y guardrails.' },
    { t:'tf', q:'AWS decide qué normativas debe cumplir el cliente y configura sus controles por él.',
      a:false, why:'AWS ofrece infraestructura certificada e informes; el cumplimiento de las cargas del cliente es del cliente.' },
    { t:'choice', q:'¿Qué servicio ayuda a preparar auditorías recopilando evidencias automáticamente?',
      o:['AWS Audit Manager','AWS Artifact','AWS Config','AWS CloudTrail'],
      a:0, why:'Audit Manager mapea evidencias a marcos como PCI DSS o GDPR.' },
    { t:'choice', q:'¿Qué es AWS Config Rules?',
      o:['Reglas que evalúan si un recurso cumple una configuración deseada','Reglas de cortafuegos','Reglas de facturación','Reglas de enrutamiento DNS'],
      a:0, why:'Por ejemplo, comprobar que todos los volúmenes EBS están cifrados.' }
  ]
}
]);

/* ================= 15. Machine Learning e IA ========================== */
U({ id:'u15', num:15, icon:'🤖', color:'#7b61ff', title:'Machine Learning e IA',
    domain:'Dominio 3', weight:34,
    intro:'Los servicios de inteligencia artificial gestionados de AWS.' }, [
{
  id:'u15l1', icon:'👁️', title:'Visión, voz y lenguaje',
  tip:'Aprende qué hace cada servicio: es lo único que pregunta el examen.',
  ex:[
    { t:'match', q:'Empareja cada servicio de IA con lo que hace',
      pairs:[['Amazon Rekognition','Analiza imágenes y vídeo'],
             ['Amazon Polly','Convierte texto en voz'],
             ['Amazon Transcribe','Convierte voz en texto'],
             ['Amazon Translate','Traduce texto entre idiomas']],
      why:'Polly habla, Transcribe escucha: es la confusión más común.' },
    { t:'choice', q:'¿Qué servicio extrae texto y datos de documentos escaneados y formularios?',
      o:['Amazon Textract','Amazon Rekognition','Amazon Comprehend','Amazon Kendra'],
      a:0, why:'Textract hace OCR inteligente sobre PDF e imágenes de documentos.' },
    { t:'choice', q:'¿Qué servicio de procesamiento de lenguaje natural detecta entidades y sentimiento en un texto?',
      o:['Amazon Comprehend','Amazon Polly','Amazon Translate','Amazon Lex'],
      a:0, why:'Comprehend analiza el texto para extraer temas, entidades y sentimiento.' },
    { t:'choice', q:'¿Qué servicio construye chatbots conversacionales con voz y texto?',
      o:['Amazon Lex','Amazon Connect','Amazon Polly','Amazon Personalize'],
      a:0, why:'Lex es la tecnología detrás de Alexa y se combina con Connect para call centers.' },
    { t:'choice', q:'Una empresa quiere moderar automáticamente imágenes subidas por usuarios:',
      o:['Amazon Rekognition','Amazon Textract','Amazon Forecast','Amazon Comprehend'],
      a:0, why:'Rekognition detecta contenido inapropiado, caras y objetos.' },
    { t:'tf', q:'Amazon Kendra es un servicio de búsqueda inteligente sobre documentos internos.',
      a:true, why:'Responde preguntas en lenguaje natural sobre repositorios de la empresa.' }
  ]
},
{
  id:'u15l2', icon:'🧪', title:'SageMaker y predicción',
  tip:'SageMaker cubre todo el ciclo del machine learning: crear, entrenar y desplegar.',
  ex:[
    { t:'choice', q:'¿Qué servicio permite crear, entrenar y desplegar modelos de machine learning propios?',
      o:['Amazon SageMaker','Amazon Rekognition','Amazon Kendra','Amazon Comprehend'],
      a:0, why:'SageMaker es la plataforma completa para científicos de datos.' },
    { t:'choice', q:'¿Qué servicio genera previsiones de demanda a partir de datos históricos?',
      o:['Amazon Forecast','Amazon Personalize','Amazon Textract','Amazon Polly'],
      a:0, why:'Forecast aplica series temporales para predecir ventas, inventario o tráfico.' },
    { t:'choice', q:'¿Qué servicio crea recomendaciones personalizadas para los usuarios de una tienda online?',
      o:['Amazon Personalize','Amazon Forecast','Amazon Kendra','Amazon Comprehend'],
      a:0, why:'Personalize usa la misma tecnología de recomendación que Amazon.com.' },
    { t:'match', q:'Empareja cada servicio con su caso de uso',
      pairs:[['Amazon Fraud Detector','Detectar fraude en pagos y registros'],
             ['Amazon Forecast','Predecir la demanda futura'],
             ['Amazon Personalize','Recomendar productos'],
             ['Amazon SageMaker','Construir un modelo propio a medida']],
      why:'Los servicios de IA de AWS se preguntan por su función concreta.' },
    { t:'tf', q:'Usar Amazon Rekognition requiere conocimientos de machine learning.',
      a:false, why:'Los servicios de IA de alto nivel se consumen por API sin saber de modelos.' },
    { t:'choice', q:'¿Qué servicio traduce automáticamente el contenido de un sitio web a varios idiomas?',
      o:['Amazon Translate','Amazon Transcribe','Amazon Polly','Amazon Lex'],
      a:0, why:'Translate ofrece traducción automática neuronal.' }
  ]
}
]);

/* ============ 16. Cuentas, facturación y soporte ====================== */
U({ id:'u16', num:16, icon:'💳', color:'#ff4b8b', title:'Cuentas, facturación y soporte',
    domain:'Dominio 4', weight:12,
    intro:'Organizations, modelos de precios, herramientas de coste y planes de soporte.' }, [
{
  id:'u16l1', icon:'🏦', title:'AWS Organizations y multicuenta',
  tip:'Facturación consolidada: una factura y descuentos por volumen agregados.',
  ex:[
    { t:'choice', q:'¿Qué ventaja principal aporta la facturación consolidada de AWS Organizations?',
      o:['Una sola factura y descuentos por volumen agregados entre cuentas','Duplicar los límites de servicio','Eliminar la necesidad de IAM','Soporte Enterprise gratuito'],
      a:0, why:'El uso combinado alcanza antes los tramos de precio más baratos.' },
    { t:'tf', q:'Las instancias reservadas y los Savings Plans no usados en una cuenta pueden aplicarse a otras de la organización.',
      a:true, why:'El reparto de descuentos entre cuentas es otra ventaja de la facturación consolidada.' },
    { t:'choice', q:'¿Qué elemento agrupa cuentas para aplicarles políticas comunes?',
      o:['Las unidades organizativas (OU)','Los grupos de IAM','Las subredes','Las Regiones'],
      a:0, why:'Las OU permiten aplicar SCP a conjuntos de cuentas con requisitos similares.' },
    { t:'choice', q:'Una empresa quiere impedir que ninguna cuenta use Regiones fuera de Europa:',
      o:['Una política de control de servicios (SCP)','Una política de contraseñas','Un grupo de seguridad','Una NACL'],
      a:0, why:'Las SCP restringen a nivel de organización, por encima de los permisos de IAM.' },
    { t:'choice', q:'¿Qué servicio comparte recursos como subredes entre cuentas de la organización?',
      o:['AWS Resource Access Manager (RAM)','AWS Organizations SCP','AWS Control Tower','AWS Config'],
      a:0, why:'RAM evita duplicar recursos en cada cuenta.' },
    { t:'choice', q:'¿Por qué usar una estrategia multicuenta?',
      o:['Aislar entornos, limitar el radio de impacto y separar la facturación','Reducir el número de Regiones','Evitar el uso de etiquetas','Eliminar las copias de seguridad'],
      a:0, why:'Separar producción, desarrollo y pruebas en cuentas distintas es la práctica recomendada.' }
  ]
},
{
  id:'u16l2', icon:'🏷️', title:'Modelos de precios',
  tip:'Tres fundamentos: pago por uso, ahorra al comprometerte y paga menos al usar más.',
  ex:[
    { t:'choice', q:'¿Cuáles son los tres fundamentos de los precios de AWS?',
      o:['Pago por uso, ahorro por compromiso y menor precio a mayor volumen',
         'Licencias perpetuas, mantenimiento y soporte','Suscripción anual, usuarios y almacenamiento','Pago por CPU física, por rack y por metro cuadrado'],
      a:0, why:'Pay as you go, save when you commit, pay less as AWS grows.' },
    { t:'match', q:'Empareja cada servicio con cómo se factura',
      pairs:[['Amazon EC2 bajo demanda','Por segundo o por hora de ejecución'],
             ['Amazon S3','Por GB almacenado, solicitudes y salida de datos'],
             ['AWS Lambda','Por número de solicitudes y duración'],
             ['Amazon RDS','Por horas de instancia y almacenamiento aprovisionado']],
      why:'Conocer la unidad de facturación de los servicios básicos es materia de examen.' },
    { t:'tf', q:'La transferencia de datos de entrada hacia AWS es generalmente gratuita.',
      a:true, why:'El data transfer IN suele ser gratuito; la salida a internet es lo que se cobra.' },
    { t:'choice', q:'¿Qué incluye la capa gratuita de AWS?',
      o:['Ofertas siempre gratis, gratuitas 12 meses y pruebas de corta duración','Todos los servicios gratis un año','Solo Amazon S3','Un descuento del 10 %'],
      a:0, why:'Las tres modalidades del Free Tier: always free, 12 months free y trials.' },
    { t:'choice', q:'¿Qué herramienta estima el coste de una arquitectura antes de construirla?',
      o:['AWS Pricing Calculator','AWS Cost Explorer','AWS Budgets','AWS Billing Conductor'],
      a:0, why:'La calculadora hace estimaciones previas; Cost Explorer analiza el gasto ya realizado.' },
    { t:'choice', q:'¿Qué concepto compara todos los costes de on-premises frente a la nube, incluidos energía y personal?',
      o:['TCO','SLA','RPO','MTBF'],
      a:0, why:'El coste total de propiedad sustenta el caso de negocio de una migración.' }
  ]
},
{
  id:'u16l3', icon:'📉', title:'Herramientas de costes',
  tip:'Cost Explorer analiza el pasado, Budgets avisa del futuro, Anomaly Detection detecta picos.',
  ex:[
    { t:'choice', q:'¿Qué servicio visualiza y analiza el gasto histórico con gráficas y previsiones?',
      o:['AWS Cost Explorer','AWS Pricing Calculator','AWS Artifact','AWS Trusted Advisor'],
      a:0, why:'Cost Explorer muestra el gasto por servicio, cuenta o etiqueta y hace previsiones.' },
    { t:'choice', q:'¿Qué servicio envía una alerta cuando el gasto supera un umbral?',
      o:['AWS Budgets','AWS Cost Explorer','Amazon CloudWatch Logs','AWS Config'],
      a:0, why:'Budgets permite presupuestos de coste, uso, Savings Plans y cobertura de reservas.' },
    { t:'match', q:'Empareja cada herramienta con su propósito',
      pairs:[['AWS Cost and Usage Report','Los datos de facturación más detallados'],
             ['AWS Cost Anomaly Detection','Detecta gastos inusuales con machine learning'],
             ['AWS Compute Optimizer','Recomienda el tamaño óptimo de los recursos'],
             ['Etiquetas de asignación de costes','Repartir el gasto por proyecto o equipo']],
      why:'Las cost allocation tags son la forma estándar de imputar costes por departamento.' },
    { t:'choice', q:'¿Qué servicio muestra y permite solicitar aumentos de los límites de servicio?',
      o:['Service Quotas','AWS Budgets','AWS Config','AWS Health Dashboard'],
      a:0, why:'Antes se pedían por caso de soporte; ahora se gestionan en Service Quotas.' },
    { t:'tf', q:'AWS Cost Explorer puede recomendar instancias reservadas y Savings Plans según tu uso.',
      a:true, why:'Ofrece recomendaciones de rightsizing y de compra basadas en el histórico.' },
    { t:'choice', q:'¿Qué mecanismo permite agrupar y filtrar recursos por proyecto o entorno?',
      o:['Las etiquetas (tags)','Las zonas de disponibilidad','Los grupos de seguridad','Los roles de IAM'],
      a:0, why:'Las etiquetas son pares clave-valor esenciales para gobernanza y control de costes.' }
  ]
},
{
  id:'u16l4', icon:'🎧', title:'Planes de soporte',
  tip:'Basic, Developer, Business, Enterprise On-Ramp y Enterprise. El TAM llega con On-Ramp.',
  ex:[
    { t:'choice', q:'¿Qué plan de soporte incluye un Technical Account Manager designado?',
      o:['Enterprise','Developer','Business','Basic'],
      a:0, why:'Enterprise asigna un TAM; Enterprise On-Ramp da acceso a un grupo de TAM.' },
    { t:'match', q:'Empareja cada plan con una característica distintiva',
      pairs:[['Basic','Documentación, foros y comprobaciones básicas de Trusted Advisor'],
             ['Developer','Soporte técnico por correo en horario laboral'],
             ['Business','Soporte 24/7 por teléfono, chat y correo, y Trusted Advisor completo'],
             ['Enterprise','TAM designado y revisiones de arquitectura']],
      why:'Business es el primer plan con soporte 24/7 y todas las comprobaciones de Trusted Advisor.' },
    { t:'choice', q:'Una empresa con producción necesita soporte 24/7 por teléfono al menor coste posible:',
      o:['Business','Developer','Basic','Enterprise'],
      a:0, why:'Developer no ofrece soporte telefónico ni 24/7; Business sí y cuesta menos que Enterprise.' },
    { t:'tf', q:'El plan Basic es gratuito para todos los clientes de AWS.',
      a:true, why:'Incluye documentación, whitepapers, foros y soporte de facturación y cuenta.' },
    { t:'choice', q:'¿Qué servicio del plan Enterprise atiende consultas de facturación y administración?',
      o:['AWS Concierge Support','AWS Artifact','AWS Config','AWS Partner Network'],
      a:0, why:'El equipo Concierge resuelve dudas no técnicas de facturación y cuentas.' },
    { t:'choice', q:'¿Cuál es el plan mínimo para tener todas las comprobaciones de Trusted Advisor?',
      o:['Business','Developer','Basic','Ninguno, siempre están todas'],
      a:0, why:'Basic y Developer solo incluyen un subconjunto de comprobaciones.' }
  ]
}
]);

/* ================= 17. Identidad avanzada ============================= */
U({ id:'u17', num:17, icon:'🪪', color:'#009688', title:'Identidad avanzada',
    domain:'Dominio 2', weight:30,
    intro:'IAM Identity Center, Cognito, Directory Service y federación.' }, [
{
  id:'u17l1', icon:'🔗', title:'Federación y directorios',
  tip:'IAM Identity Center para empleados; Cognito para usuarios de tus aplicaciones.',
  ex:[
    { t:'choice', q:'¿Qué servicio da acceso con inicio de sesión único a varias cuentas de AWS y aplicaciones?',
      o:['AWS IAM Identity Center','Amazon Cognito','AWS KMS','AWS Config'],
      a:0, why:'IAM Identity Center (antes AWS SSO) centraliza el acceso federado.' },
    { t:'choice', q:'¿Qué servicio gestiona la identidad de los usuarios finales de una app web o móvil?',
      o:['Amazon Cognito','AWS IAM Identity Center','AWS Directory Service','AWS Organizations'],
      a:0, why:'Cognito da user pools e identidades federadas para clientes externos.' },
    { t:'match', q:'Empareja cada opción de directorio con su descripción',
      pairs:[['AWS Managed Microsoft AD','Directorio Active Directory gestionado en AWS'],
             ['AD Connector','Redirige la autenticación al AD on-premises'],
             ['Simple AD','Directorio ligero compatible con AD para cargas sencillas']],
      why:'AD Connector no almacena usuarios: solo hace de proxy hacia el directorio local.' },
    { t:'tf', q:'La federación de identidades evita crear un usuario de IAM por cada empleado.',
      a:true, why:'Los usuarios se autentican en el proveedor corporativo y asumen roles en AWS.' },
    { t:'choice', q:'¿Qué estándar se usa habitualmente para la federación empresarial con AWS?',
      o:['SAML 2.0','SMTP','FTP','SNMP'],
      a:0, why:'SAML 2.0 y OpenID Connect son los estándares admitidos.' },
    { t:'choice', q:'Una empresa quiere que sus empleados usen sus credenciales de Active Directory para entrar en AWS:',
      o:['Federar el directorio con IAM Identity Center','Crear un usuario de IAM por empleado','Compartir el usuario root','Usar claves de acceso comunes'],
      a:0, why:'Es la práctica recomendada para organizaciones con directorio corporativo.' }
  ]
}
]);

/* ================= 18. Otros servicios ================================ */
U({ id:'u18', num:18, icon:'🧰', color:'#ff6b35', title:'Otros servicios de AWS',
    domain:'Dominio 3', weight:34,
    intro:'Escritorios virtuales, desarrollo móvil, copias de seguridad y más.' }, [
{
  id:'u18l1', icon:'🖱️', title:'Escritorios y aplicaciones',
  tip:'WorkSpaces entrega escritorios; AppStream transmite aplicaciones concretas.',
  ex:[
    { t:'choice', q:'¿Qué servicio proporciona escritorios virtuales gestionados para empleados?',
      o:['Amazon WorkSpaces','Amazon AppStream 2.0','Amazon Connect','AWS Directory Service'],
      a:0, why:'WorkSpaces es Desktop as a Service; AppStream transmite aplicaciones sueltas.' },
    { t:'choice', q:'¿Qué servicio transmite una aplicación concreta al navegador sin instalarla?',
      o:['Amazon AppStream 2.0','Amazon WorkSpaces','AWS Cloud9','Amazon Lightsail'],
      a:0, why:'AppStream 2.0 hace streaming de aplicaciones de escritorio.' },
    { t:'choice', q:'¿Qué servicio desarrolla y aloja aplicaciones web y móviles full-stack con backend gestionado?',
      o:['AWS Amplify','AWS AppSync solamente','Amazon Lightsail','AWS Cloud9'],
      a:0, why:'Amplify integra autenticación, API, almacenamiento y hosting con CI/CD.' },
    { t:'choice', q:'¿Qué servicio prueba una aplicación móvil en dispositivos reales en la nube?',
      o:['AWS Device Farm','Amazon AppStream 2.0','AWS Amplify','Amazon Pinpoint'],
      a:0, why:'Device Farm ejecuta pruebas en móviles y navegadores reales.' },
    { t:'tf', q:'Amazon WorkDocs es un servicio de almacenamiento y colaboración de documentos.',
      a:true, why:'Junto con WorkMail forma la suite de productividad de AWS.' },
    { t:'choice', q:'¿Qué servicio convierte archivos multimedia a formatos aptos para distintos dispositivos?',
      o:['AWS Elemental MediaConvert','Amazon Kinesis Video Streams','Amazon Rekognition','AWS Batch'],
      a:0, why:'La familia Elemental cubre la transcodificación y la entrega de vídeo.' }
  ]
},
{
  id:'u18l2', icon:'🗂️', title:'Copias de seguridad y utilidades',
  tip:'AWS Backup centraliza copias de muchos servicios con una sola política.',
  ex:[
    { t:'choice', q:'¿Qué servicio centraliza y automatiza las copias de seguridad de varios servicios de AWS?',
      o:['AWS Backup','Amazon S3 Glacier','AWS DataSync','AWS Config'],
      a:0, why:'AWS Backup aplica políticas comunes a EBS, RDS, DynamoDB, EFS y más.' },
    { t:'tf', q:'AWS Backup permite copias entre Regiones y entre cuentas.',
      a:true, why:'Es clave para las estrategias de recuperación ante desastres.' },
    { t:'choice', q:'¿Qué servicio ejecuta contenedores o funciones en dispositivos de IoT en el borde?',
      o:['AWS IoT Greengrass','AWS Outposts','AWS Wavelength','AWS Batch'],
      a:0, why:'Greengrass lleva la lógica de la nube a dispositivos con conectividad intermitente.' },
    { t:'choice', q:'¿Qué servicio ayuda a analizar y visualizar datos de negocio en paneles interactivos?',
      o:['Amazon QuickSight','Amazon Athena','AWS Glue','Amazon EMR'],
      a:0, why:'QuickSight es la herramienta de BI sin servidor de AWS.' },
    { t:'match', q:'Empareja cada servicio con su función',
      pairs:[['AWS Fault Injection Simulator','Ingeniería del caos y pruebas de resiliencia'],
             ['AWS Ground Station','Comunicación con satélites'],
             ['Amazon Connect','Centro de contacto en la nube'],
             ['AWS Amplify','Aplicaciones web y móviles full-stack']],
      why:'El examen puede preguntar por servicios poco habituales solo a nivel de definición.' },
    { t:'choice', q:'¿Qué servicio simplifica el envío de correo electrónico transaccional a gran escala?',
      o:['Amazon SES','Amazon SNS','Amazon Chime','Amazon WorkMail'],
      a:0, why:'Simple Email Service se usa para confirmaciones, facturas y notificaciones por correo.' }
  ]
}
]);

/* ============ 19. Arquitectura y ecosistema de AWS ==================== */
U({ id:'u19', num:19, icon:'🏛️', color:'#58cc02', title:'Arquitectura y ecosistema',
    domain:'Dominio 1', weight:24,
    intro:'Well-Architected Framework, principios de diseño, Trusted Advisor y recursos de AWS.' }, [
{
  id:'u19l1', icon:'🏗️', title:'Los 6 pilares Well-Architected',
  tip:'Excelencia operativa, Seguridad, Fiabilidad, Eficiencia, Costes y Sostenibilidad.',
  ex:[
    { t:'multi', q:'Selecciona DOS pilares del AWS Well-Architected Framework',
      o:['Fiabilidad','Sostenibilidad','Escalabilidad','Portabilidad'],
      a:[0,1], why:'Los seis: excelencia operativa, seguridad, fiabilidad, eficiencia del rendimiento, optimización de costos y sostenibilidad.' },
    { t:'match', q:'Empareja cada pilar con su objetivo',
      pairs:[['Excelencia operativa','Ejecutar y monitorizar sistemas y mejorar procesos'],
             ['Seguridad','Proteger datos, sistemas y activos'],
             ['Eficiencia del rendimiento','Usar los recursos de forma eficiente al cambiar la demanda'],
             ['Optimización de costos','Evitar costes innecesarios y medir el gasto']],
      why:'Cada pilar tiene principios de diseño y preguntas en la Well-Architected Tool.' },
    { t:'choice', q:'Un equipo quiere reducir el impacto ambiental de sus cargas. ¿Qué pilar aplica?',
      o:['Sostenibilidad','Fiabilidad','Seguridad','Excelencia operativa'],
      a:0, why:'El pilar de sostenibilidad se añadió en 2021.' },
    { t:'choice', q:'¿Qué herramienta gratuita revisa tus cargas frente a las mejores prácticas del framework?',
      o:['AWS Well-Architected Tool','AWS Trusted Advisor','AWS Config','AWS Artifact'],
      a:0, why:'Está en la consola y genera un plan de mejora tras un cuestionario.' },
    { t:'choice', q:'Diseñar para recuperarse de un fallo de una AZ corresponde al pilar de:',
      o:['Fiabilidad','Eficiencia del rendimiento','Optimización de costos','Seguridad'],
      a:0, why:'Fiabilidad cubre la recuperación ante fallos y la escalabilidad horizontal.' },
    { t:'tf', q:'Mantener instancias sobredimensionadas durante meses afecta al pilar de optimización de costos.',
      a:true, why:'El right sizing es una práctica central de ese pilar.' }
  ]
},
{
  id:'u19l2', icon:'🧩', title:'Principios de diseño en la nube',
  tip:'Desacopla, diseña para el fallo, automatiza y usa servicios gestionados.',
  ex:[
    { t:'tf', q:'Diseñar para el fallo significa asumir que cualquier componente puede caer y prever redundancia.',
      a:true, why:'Everything fails all the time: se diseña con redundancia entre varias AZ.' },
    { t:'multi', q:'¿Qué prácticas mejoran la elasticidad de una aplicación? (elige DOS)',
      o:['Usar Auto Scaling groups','Usar servicios serverless como AWS Lambda',
         'Aprovisionar el pico anual todo el año','Guardar la sesión en el disco local de cada servidor'],
      a:[0,1], why:'Guardar estado local impide reemplazar instancias libremente.' },
    { t:'fill', q:'Completa el principio',
      s:'Las instancias deben ser ___ para poder reemplazarlas sin perder datos; el estado se guarda ___.',
      bank:['sin estado','fuera de la instancia','permanentes','en disco local'], a:['sin estado','fuera de la instancia'],
      why:'Servidores stateless con estado en DynamoDB, ElastiCache o S3.' },
    { t:'choice', q:'¿Qué principio describe tratar la infraestructura como código versionado y repetible?',
      o:['Automatización con infraestructura como código','Consistencia eventual','Conectividad híbrida','Federación de identidades'],
      a:0, why:'CloudFormation y el CDK permiten infraestructura declarativa y reproducible.' },
    { t:'choice', q:'¿Qué servicio inspecciona tu cuenta y recomienda mejoras en cinco categorías?',
      o:['AWS Trusted Advisor','AWS Config','Amazon Inspector','AWS Artifact'],
      a:0, why:'Coste, rendimiento, seguridad, tolerancia a fallos y límites de servicio.' },
    { t:'choice', q:'¿Qué comprobación de Trusted Advisor ayuda a reducir la factura?',
      o:['Instancias EC2 infrautilizadas','Instancias detenidas por el usuario','Regiones no usadas','Número de usuarios de IAM'],
      a:0, why:'La categoría de optimización de costes detecta recursos ociosos o sobredimensionados.' }
  ]
},
{
  id:'u19l3', icon:'🤝', title:'Ecosistema, partners y recursos',
  tip:'Marketplace vende software; APN son los socios; Professional Services es AWS.',
  ex:[
    { t:'choice', q:'¿Dónde se compra software de terceros con facturación integrada en tu cuenta de AWS?',
      o:['AWS Marketplace','AWS Artifact','AWS Partner Network','AWS re:Post'],
      a:0, why:'Marketplace es el catálogo digital de soluciones de terceros.' },
    { t:'match', q:'Empareja cada recurso con su descripción',
      pairs:[['AWS re:Post','Comunidad de preguntas y respuestas'],
             ['AWS Professional Services','Equipo de consultoría del propio AWS'],
             ['AWS Partner Network','Red de socios de consultoría y tecnología'],
             ['AWS Knowledge Center','Respuestas a las preguntas frecuentes de soporte']],
      why:'Distinguir Professional Services (AWS) de los partners (terceros) es habitual.' },
    { t:'choice', q:'¿Qué programa aporta guía y financiación para migraciones a gran escala?',
      o:['AWS Migration Acceleration Program (MAP)','AWS Activate','AWS Artifact','AWS Marketplace'],
      a:0, why:'MAP combina metodología, herramientas y créditos.' },
    { t:'tf', q:'Los whitepapers y la documentación técnica de AWS son gratuitos y públicos.',
      a:true, why:'Documentación, whitepapers y guías de referencia están disponibles para cualquiera.' },
    { t:'choice', q:'¿Qué programa apoya a startups con créditos y asesoramiento?',
      o:['AWS Activate','AWS MAP','AWS Artifact','AWS Config'],
      a:0, why:'Activate ofrece créditos, formación y soporte a startups.' },
    { t:'choice', q:'¿Qué servicio ofrece cursos oficiales y rutas de certificación?',
      o:['AWS Skill Builder y AWS Training and Certification','AWS Artifact','AWS re:Post','AWS Marketplace'],
      a:0, why:'Skill Builder es la plataforma de formación digital de AWS.' }
  ]
}
]);

/* ================= 20. Preparación del examen ========================= */
U({ id:'u20', num:20, icon:'🎯', color:'#ffc800', title:'Preparación del examen',
    domain:'Repaso', weight:100,
    intro:'Repaso de los servicios que más se confunden y estrategia para el día del examen.' }, [
{
  id:'u20l1', icon:'🔀', title:'Servicios que se confunden',
  tip:'La mayoría de fallos vienen de confundir pares de servicios parecidos.',
  ex:[
    { t:'match', q:'Empareja cada servicio con la pregunta que responde',
      pairs:[['AWS CloudTrail','Quién hizo esta llamada a la API'],
             ['Amazon CloudWatch','Qué rendimiento tiene mi sistema'],
             ['AWS Config','Cumple mi recurso la configuración esperada'],
             ['AWS Trusted Advisor','Qué puedo mejorar en coste y seguridad']],
      why:'Es la comparación más repetida del examen.' },
    { t:'match', q:'Empareja el servicio correcto',
      pairs:[['AWS Artifact','Informes de cumplimiento y auditoría'],
             ['AWS CodeArtifact','Repositorio de paquetes y dependencias'],
             ['Amazon ECR','Registro de imágenes de contenedor'],
             ['AWS Marketplace','Comprar software de terceros']],
      why:'Artifact y CodeArtifact son totalmente distintos pese al nombre.' },
    { t:'choice', q:'¿Cuál es la diferencia entre AWS Shield y AWS WAF?',
      o:['Shield protege frente a DDoS; WAF filtra tráfico web en capa 7','Son lo mismo','WAF protege frente a DDoS','Shield gestiona certificados'],
      a:0, why:'Suelen usarse juntos delante de CloudFront o de un ALB.' },
    { t:'match', q:'Empareja cada pareja confusa',
      pairs:[['Amazon Polly','Texto a voz'],['Amazon Transcribe','Voz a texto'],
             ['Amazon Comprehend','Análisis de lenguaje natural'],['Amazon Translate','Traducción entre idiomas']],
      why:'Polly habla, Transcribe escucha.' },
    { t:'choice', q:'¿Diferencia entre Amazon Inspector y Amazon GuardDuty?',
      o:['Inspector busca vulnerabilidades en cargas; GuardDuty detecta actividad maliciosa en la cuenta','Son iguales','GuardDuty escanea EC2 en busca de CVE','Inspector analiza registros DNS'],
      a:0, why:'Inspector es análisis de vulnerabilidades; GuardDuty es detección de amenazas.' },
    { t:'choice', q:'¿Diferencia entre Amazon EFS y Amazon EBS?',
      o:['EFS es un sistema de archivos compartido multi-AZ; EBS es un disco de una sola AZ','Son idénticos','EBS es compartido','EFS solo funciona en Windows'],
      a:0, why:'EFS se monta desde muchas instancias; EBS se adjunta normalmente a una.' }
  ]
},
{
  id:'u20l2', icon:'✅', title:'Estrategia para el examen',
  tip:'65 preguntas, 90 minutos, se aprueba con 700/1000. Sin penalización por fallar.',
  ex:[
    { t:'choice', q:'¿Cuántas preguntas tiene el examen CLF-C02 y cuánto dura?',
      o:['65 preguntas en 90 minutos','50 preguntas en 60 minutos','80 preguntas en 120 minutos','100 preguntas en 180 minutos'],
      a:0, why:'De esas 65, 15 son preguntas no puntuadas de prueba.' },
    { t:'choice', q:'¿Cuál es la puntuación mínima para aprobar?',
      o:['700 sobre 1000','600 sobre 1000','800 sobre 1000','No hay mínimo'],
      a:0, why:'La escala va de 100 a 1000 y el aprobado está en 700.' },
    { t:'tf', q:'Dejar una pregunta en blanco es mejor que responder al azar.',
      a:false, why:'No hay penalización por error: responde siempre, aunque sea descartando.' },
    { t:'cat', q:'Clasifica cada dominio por su peso en el examen',
      buckets:['Más del 25 %','Menos del 25 %'],
      items:[['Seguridad y cumplimiento (30 %)',0],['Tecnología y servicios (34 %)',0],
             ['Conceptos de la nube (24 %)',1],['Facturación y soporte (12 %)',1]],
      why:'Seguridad y Tecnología suman casi dos tercios del examen.' },
    { t:'choice', q:'Una pregunta menciona el menor coste posible y tolerancia a interrupciones. La respuesta suele ser:',
      o:['Instancias Spot','Instancias reservadas','Dedicated Hosts','Bajo demanda'],
      a:0, why:'Identificar las palabras clave del enunciado acelera mucho la respuesta.' },
    { t:'choice', q:'Si la pregunta habla de la mínima carga operativa (least operational overhead), la respuesta suele ser:',
      o:['Un servicio gestionado o serverless','Instalar software en EC2','Un servidor on-premises','Un host dedicado'],
      a:0, why:'AWS premia siempre la opción con menos gestión por parte del cliente.' }
  ]
}
]);

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
