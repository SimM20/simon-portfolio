/* =====================================================================
   TU CV — editá este archivo para mantener la web actualizada.
   Cada texto que tiene { es: ..., en: ... } se muestra según el idioma.
   Guardá, hacé commit + push, y GitHub Pages se actualiza solo.
   ===================================================================== */

window.CV = {
  // Fecha de la última actualización (se muestra en el footer)
  updated: "2026-10",

  name: "Simón Morales Lozano",
  shortName: "Simón",
  photo: "assets/img/simon.png",

  contact: {
    email: "simon.moraleslozano@live.com",
    phone: "+54 2966 641728",      // dejalo vacío ("") para ocultarlo
    whatsapp: "542966641728",      // sólo números, para el link de WhatsApp
    github: "https://github.com/SimM20",
    linkedin: "",                  // pegá acá la URL de tu LinkedIn
    location: { es: "Argentina", en: "Argentina" }
  },

  cv: {
    es: "assets/SimonMoralesLozano-CV-Eng.pdf",
    en: "assets/SimonMoralesLozano-CV-Eng.pdf"
  },

  // Frases que se van "tipeando" en la portada
  roles: {
    es: ["Software Developer", "Desarrollador C++", "Game Developer", "Unreal Engine & Unity", "Diseño UI/UX"],
    en: ["Software Developer", "C++ Developer", "Game Developer", "Unreal Engine & Unity", "UI/UX Design"]
  },

  headline: {
    es: "Construyo software, juegos y experiencias interactivas.",
    en: "I build software, games and interactive experiences."
  },

  summary: {
    es: "Software Developer especializado en C++ y desarrollo de videojuegos, con experiencia práctica en sistemas AAA, entornos de realidad virtual y lógica de alto rendimiento. Tengo base en Ingeniería en Computación, diseño UI/UX y manejo de memoria. Me apasiona construir software, experiencias interactivas e interfaces intuitivas.",
    en: "Software Developer specialized in C++ and game development, with hands-on experience in AAA systems, VR environments, and high-performance logic. Strong background in Computer Engineering foundations, UI/UX design, and memory management. Passionate about building software, interactive experiences, and intuitive user interfaces."
  },

  // Datos destacados que aparecen en "Sobre mí"
  highlights: [
    { icon: "bi-cpu",          value: "C++",    label: { es: "Lenguaje principal", en: "Main language" } },
    { icon: "bi-controller",   value: "AAA",    label: { es: "Sistemas de gameplay", en: "Gameplay systems" } },
    { icon: "bi-headset-vr",   value: "VR",     label: { es: "Experiencias inmersivas", en: "Immersive experiences" } },
    { icon: "bi-palette2",     value: "UI/UX",  label: { es: "Interfaces intuitivas", en: "Intuitive interfaces" } }
  ],

  // Experiencia — la más reciente primero
  experience: [
    {
      period: "2026",
      title: { es: "Game Developer", en: "Game Developer" },
      company: "Globant",
      bullets: {
        es: [
          "<strong>Implementé componentes de UI y lógica de gameplay</strong> con un sistema propietario de scripting visual basado en nodos, alineado a las especificaciones de diseño.",
          "Capacitación en teoría del color y experiencia de usuario aplicada al <strong>desarrollo UI/UX</strong>, creando interfaces intuitivas y visualmente cohesivas.",
          "<strong>Cursos avanzados de Unreal Engine y C++</strong>, con foco en arquitectura de sistemas y manejo robusto de memoria.",
          "<strong>Configuré agentes de IA especializados</strong> en una plataforma propietaria como asistentes de desarrollo en C++, agilizando tareas y el aprendizaje técnico."
        ],
        en: [
          "<strong>Implemented UI components and Gameplay logic</strong> using a proprietary node-based visual scripting system, ensuring functional alignment with design specifications.",
          "Applied targeted training in color theory and user experience to <strong>UI/UX development</strong>, creating highly intuitive and visually cohesive interfaces.",
          "<strong>Completed advanced coursework in Unreal Engine and C++</strong>, strongly emphasizing system architecture and robust memory management techniques.",
          "<strong>Configured specialized AI agents</strong> using a proprietary platform to act as C++ development assistants, streamlining coding tasks and accelerating technical learning."
        ]
      },
      tags: ["Unreal Engine", "C++", "UI/UX", "Visual Scripting", "AI Agents"]
    },
    {
      period: "2025",
      title: { es: "Unity / VR Developer", en: "Unity / VR Developer" },
      company: "",
      bullets: {
        es: ["<strong>Desarrollé una experiencia inmersiva de realidad virtual</strong> ambientada en un yacimiento petrolero, con foco en el diseño de UI y un flujo de juego intuitivo y accesible para usuarios casuales."],
        en: ["<strong>Developed an immersive virtual reality experience</strong> set in an oilfield environment, focusing on UI design and creating an intuitive, accessible gameplay flow for casual users."]
      },
      tags: ["Unity", "C#", "VR", "UI Design"]
    },
    {
      period: "2024 — 2025",
      title: { es: "Web Developer", en: "Web Developer" },
      company: "",
      bullets: {
        es: ["<strong>Mantuve y optimicé sitios web corporativos</strong>, asegurando consistencia funcional e implementando actualizaciones de diseño visual."],
        en: ["<strong>Maintained and optimized corporate websites</strong>, ensuring functional consistency and implementing visual design updates."]
      },
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      period: "2024 — 2025",
      title: { es: "Community Manager", en: "Community Manager" },
      company: "",
      bullets: {
        es: ["<strong>Gestioné plataformas de redes sociales</strong> y creé estrategias de contenido visual para la comunicación corporativa."],
        en: ["<strong>Managed social media platforms</strong> and created visual content strategies for corporate communication."]
      },
      tags: ["Social Media", "Adobe CC", "Content"]
    }
  ],

  education: [
    {
      period: { es: "2022 — Actualidad", en: "2022 — Present" },
      title: { es: "Licenciatura en Desarrollo de Videojuegos", en: "Bachelor's Degree in Game Development" },
      school: "Universidad Argentina de la Empresa (UADE)",
      icon: "bi-joystick",
      current: true,
      text: {
        es: "Diseño y desarrollo de videojuegos, producción, narrativa interactiva, arte digital, game design, gestión de proyectos y trabajo en equipo.",
        en: "Design and development of video games, production, interactive storytelling, digital art, game design, project management and team work."
      }
    },
    {
      period: { es: "2020 — 2022", en: "2020 — 2022" },
      title: { es: "Ingeniería en Computación", en: "Computer Engineering" },
      school: "Universidad Católica Argentina (UCA)",
      icon: "bi-motherboard",
      text: {
        es: "Fundamentos de programación, estructuras de datos, algoritmos, lógica y bases de datos.",
        en: "Foundations of programming, data structures, algorithms, logic and databases."
      }
    },
    {
      period: { es: "2020 — 2021", en: "2020 — 2021" },
      title: { es: "Curso Avanzado de Python", en: "Advanced Python Course" },
      school: "Instituto Tecnológico de Buenos Aires (ITBA)",
      icon: "bi-filetype-py",
      text: {
        es: "Manejo de librerías, scripting y automatización de tareas.",
        en: "Libraries management, scripting and task automation."
      }
    }
  ],

  skills: [
    { icon: "bi-controller",      title: { es: "Game Development", en: "Game Development" },
      items: ["Unreal Engine", "Unity", "Level Design", "Gameplay Balancing"] },
    { icon: "bi-code-slash",      title: { es: "Programación", en: "Programming" },
      items: ["C++", "C#", "Python", "JavaScript", "HTML", "CSS"] },
    { icon: "bi-brush",           title: { es: "Diseño & Arte", en: "Design & Art" },
      items: ["Blender", "Adobe Creative Cloud", "UI/UX Design"] },
    { icon: "bi-tools",           title: { es: "Herramientas", en: "Dev Tools" },
      items: ["GitHub / GitLab", "Visual Studio", "Trello / Notion"] },
    { icon: "bi-people",          title: { es: "Comunicación", en: "Communication" },
      items: { es: ["Gestión de redes sociales", "Community Management"], en: ["Social Media Management", "Community Management"] } },
    { icon: "bi-lightbulb",       title: { es: "Soft Skills", en: "Soft Skills" },
      items: { es: ["Resolución de problemas", "Autoaprendizaje", "Comunicación"], en: ["Problem Solving", "Self-Learning", "Communication"] } }
  ],

  languages: [
    { name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" }, value: 100 },
    { name: { es: "Inglés", en: "English" },  level: { es: "Avanzado", en: "Advanced" }, value: 85 }
  ],

  /* Proyectos — agregá los tuyos acá. Si la lista está vacía, la sección se oculta.
     Ejemplo:
     {
       title: "Mi Juego",
       type: { es: "Juego en Unity", en: "Unity game" },
       description: { es: "Descripción corta.", en: "Short description." },
       image: "assets/img/mi-juego.jpg",    // opcional
       tags: ["Unity", "C#"],
       links: [ { label: "itch.io", url: "https://..." }, { label: "GitHub", url: "https://..." } ]
     }
  */
  projects: []
};
