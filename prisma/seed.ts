import { PrismaClient } from '@prisma/client';
import { PORTFOLIO_SCHEMA_VERSION } from '../src/modules/portfolio/domain/portfolio-payload.schema';

const prisma = new PrismaClient();

const publishedAt = new Date('2026-06-10T12:00:00.000Z');

const snapshots = [
  {
    locale: 'en',
    payload: {
      schemaVersion: PORTFOLIO_SCHEMA_VERSION,
      siteMeta: {
        lang: 'en',
        title: 'Juan José Rebollo | Engineering Leader',
        shortTitle: 'Juan José Rebollo Barranco',
        description:
          'Engineering Leader with 10+ years in iOS development and 7+ years in technical leadership. Specialising in mobile architecture, distributed teams, and enterprise-grade delivery.',
        cvHref: '/Juan_Rebollo_CV.pdf',
      },
      navigationLinks: [
        { label: 'Skills', href: '/#skills' },
        { label: 'Projects', href: '/#projects' },
        { label: 'Videos', href: '/work' },
        { label: 'Strengths', href: '/#strengths' },
        { label: 'Recommendations', href: '/#recommendations' },
        { label: 'Contact', href: '/#contact' },
      ],
      siteContent: {
        hero: {
          eyebrow: 'Engineering Leader',
          title:
            'Growing engineering teams, raising the architecture bar, and delivering at scale.',
          summary:
            'Engineering Leader with 10+ years in iOS development and 7+ years in technical leadership and architecture roles. Proven track record leading distributed teams across Spain, UK, and India — defining mobile strategy, delivering enterprise-grade apps in highly regulated environments, and crafting architectures that are maintainable, testable, and built to last.',
          primaryAction: { label: 'View featured work', href: '#projects' },
          secondaryAction: { label: 'Get in touch', href: '#contact' },
          metrics: [
            { value: '10+', label: 'Years in iOS development' },
            {
              value: '7+',
              label: 'Years in technical leadership & architecture',
            },
            { value: '13', label: 'Engineers led across distributed teams' },
            { value: '40+', label: 'Markets reached with InControl Remote' },
            { value: '3', label: 'Languages — Spanish, English, Portuguese' },
          ],
        },
        skillGroups: [
          {
            name: 'iOS Engineering',
            summary:
              'Deep expertise in native iOS from low-level integration to modern declarative UI, applied consistently in production at scale.',
            skills: [
              'Swift',
              'SwiftUI',
              'Combine',
              'watchOS',
              'MVVM-C',
              'VIPER',
              'Modular Architecture',
              'Clean Architecture',
              'SOLID',
              'REST API Design',
            ],
          },
          {
            name: 'Delivery & DevOps',
            summary:
              'End-to-end ownership of the delivery workflows and pipelines, from architecture decisions through to release automation and enterprise security.',
            skills: [
              'GitHub Actions',
              'Jenkins',
              'GitLab',
              'Fastlane',
              'TDD / BDD / ATDD',
              'Scrum',
              'Kanban',
              'SAFe',
              'Spotify Model',
              'MDM / MAM / Intune',
            ],
          },
          {
            name: 'Leadership & Strategy',
            summary:
              'Building and scaling engineering teams, establishing technical communities, and aligning mobile capability with business goals.',
            skills: [
              'Chapter Lead',
              'People Management',
              'Mentoring',
              'Career Development',
              'Mobile Strategy',
              'Cross-functional Alignment',
              'Architecture Reviews',
            ],
          },
        ],
        projectHighlights: [
          {
            name: 'Inditex — iOS Chapter Lead & Architect',
            summary:
              'Led iOS capability across the SPAI region (Spain, Portugal, Italy) at Cognizant, mentoring 12 senior engineers while simultaneously leading a 5-engineer team at Inditex, delivering a new app from scratch.',
            impact:
              'Designed a modular MVVM-C architecture in SwiftUI and Combine that improved development velocity through reusable patterns and reduced onboarding time via structured documentation and architecture decision records.',
            stack: [
              'SwiftUI',
              'Combine',
              'MVVM-C',
              'Modular Architecture',
              'GitHub Actions',
              'API-first Design',
              'Azure DevOps',
            ],
          },
          {
            name: 'HSBC — iOS Architect, Mobile Centre of Excellence',
            summary:
              'Joined the Enterprise Mobile CoE at HSBC as the iOS Subject Matter Expert (SME), responsible for architecture governance across multiple teams in a highly regulated banking environment.',
            impact:
              'Designed the enterprise iOS template architecture adopted across teams, eliminating boilerplate and standardising development. Defined mobile security patterns integrated with Intune, Zimperium, and BlackBerry UEM.',
            stack: [
              'MVVM-C',
              'Clean Architecture',
              'SOLID',
              'Intune',
              'BlackBerry UEM',
              'Zimperium',
              'UML',
            ],
          },
          {
            name: 'Jaguar Land Rover — InControl Remote Apps',
            summary:
              'Led the redevelopment of the Land Rover and Jaguar InControl Remote apps from scratch as iOS Technical Leader, managing a distributed team of 8-13 engineers across the United Kingdom, Belarus, and India.',
            impact:
              'Delivered a scalable architecture supporting multi-country releases across 40+ markets. Built CI/CD pipelines, introduced BDD and ATDD practices, and owned end-to-end feature delivery including backend and app integration.',
            stack: [
              'Swift',
              'Objective-C',
              'Jenkins',
              'GitLab',
              'Fastlane',
              'Firebase',
              'WebSockets',
              'SAFe',
              'BDD',
            ],
          },
        ],
        strengths: [
          {
            title: 'Technical Leadership',
            evidence:
              'Led distributed teams of up to 13 engineers across multiple time zones at JLR, and defined the iOS chapter strategy for an entire region at Cognizant — balancing hands-on architecture work with people growth and delivery accountability.',
          },
          {
            title: 'Cross-functional Alignment',
            evidence:
              'Consistently bridged mobile, backend, product, and security disciplines. At HSBC, partnered with the Android architect to ensure parity. At Inditex, facilitated 3 Amigos and Example Mapping sessions to align business and engineering before a line of code was written.',
          },
          {
            title: 'Mentoring & Team Growth',
            evidence:
              'Built structured onboarding processes at JLR, HSBC, Cognizant, and Inditex, defined career paths and growth plans at Cognizant, and established internal iOS communities with technical workshops, knowledge sharing, and architecture reviews.',
          },
        ],
        recommendations: {
          source: 'LinkedIn recommendations',
          sourceUrl:
            'https://www.linkedin.com/in/juan-jose-rebollo-barranco-80655929/?locale=en',
          items: [
            {
              author: 'Elena Becerril',
              headline: 'Head of Digital Engineering Studio Iberia at Cognizant',
              date: 'April 28, 2026',
              quote:
                'Working with Juanjo over these years has been an absolute pleasure, he is one of those professionals who truly leaves a mark on everyone they work with. What sets Juanjo apart is the combination of deep technical expertise and outstanding soft skills. He does not just get the job done; he takes full ownership of everything he touches, anticipates challenges before they arise, and brings the kind of calm, reliable energy that makes teams better around him. If Juanjo is part of a project, success is not a goal, it is a guarantee. I could not recommend him more highly.',
            },
            {
              author: 'Jaihind Patil',
              headline: 'Test Lead at Endava',
              date: 'November 16, 2022',
              quote:
                'I had the pleasure of working with Juan at HSBC Company, collaborating on project teams. His expertise in iOS development and architecture made things smooth in delivering. I was particularly impressed by Juan’s ability to handle even the toughest issues effortlessly. That skill often takes years, but it seemed to come perfectly naturally to him. Juan would be an asset to any team.',
            },
            {
              author: 'Zbigniew Niewiadomski',
              headline: 'Lead Scrum Master | SimCorp',
              date: 'November 8, 2022',
              quote:
                'Very good iOS skills and architecture skills, along with experience in Android, allowed him to lead the team as an Architect and a mentor. Juan is very easy to get along with, resolves conflicts swiftly, while also being good at communicating, either giving praise or raising issues according to situation. I highly recommend Juan, it was a great pleasure to be able to work together.',
            },
            {
              author: 'Marcin Arciszewski',
              headline:
                'Ex-Big 4 | Senior Android Engineer | Kotlin | Jetpack Compose | Android Architecture',
              date: 'January 10, 2022',
              quote:
                'I had a brief pleasure working with Juan. He is an enthusiastic and detail-oriented tech leader, with great people skills and strong technical expertise in iOS development. He is a true SOLID engineer, always advocating for clean architecture, testing, quality, and ready to go the extra mile to automate it. He is very approachable and a good team player. Definitely recommended working with him.',
            },
            {
              author: 'Keith Bauwise',
              headline: 'Software Engineering Manager',
              date: 'July 26, 2021',
              quote:
                'Juan Rebollo is a senior iOS developer, who holds the role of iOS Platform Technical Lead for the development of Jaguar and Land Rover InControl Remote mobile apps. His in-depth knowledge of our products and his comprehensive understanding of the iOS platform has made him an invaluable asset to the organisation. Juan has an extreme eye for detail and is very data-driven in his approach. He has excellent verbal and written communication skills and can communicate effectively at all levels, including senior management. Juan has a true can-do approach which is both inspiring and infectious. Any organisation would benefit from somebody of Juan’s calibre. He always delivers, is totally customer focused, and very dependable.',
            },
          ],
        },
        contact: {
          email: 'jj.rebollo.barranco@gmail.com',
          availability:
            'Open to Head of Mobile, Solutions Architect, Technical Lead, and Principal Engineer roles. Based in Spain — open to remote and hybrid arrangements in Europe and the UK.',
          links: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/juan-jose-rebollo-barranco-80655929',
            },
            { label: 'GitHub', href: 'https://github.com/jjrebollo' },
            {
              label: 'Download CV',
              href: '/Juan_Rebollo_CV.pdf',
              download: true,
            },
          ],
        },
        labels: {
          skills: {
            eyebrow: 'Capabilities',
            title: 'What I bring to the table',
            intro:
              'From native iOS engineering to delivery pipelines and team leadership — skills built and tested in production.',
          },
          projects: {
            eyebrow: 'Selected work',
            title: 'Featured work',
            intro:
              'A selection of roles where I owned both the architecture and the outcome.',
          },
          strengths: {
            eyebrow: 'Soft skills',
            title: 'How I work',
            intro:
              'The behaviours and practices that shape how I lead teams and make technical decisions.',
          },
          recommendations: {
            eyebrow: 'LinkedIn',
            title: 'Recommendations',
            intro:
              'Selected endorsements from colleagues and collaborators on LinkedIn.',
          },
          contact: {
            eyebrow: 'Contact',
            title: 'Let’s talk',
            intro:
              'Whether you are scaling a mobile team, raising the architecture bar, or need someone to own delivery end-to-end — I would be glad to connect.',
          },
          work: {
            eyebrow: 'Work in action',
            title: 'Projects on video',
            intro:
              'Recordings of apps I built or led as Technical Leader — from the JLR InControl suite to the Inditex logistics platform.',
          },
          recommendationsViewProfile: 'View profile',
          recommendationsMore: 'More...',
          recommendationsLess: 'Less...',
          recommendationsEmptyState:
            'LinkedIn blocks public access to recommendations, so this section is ready to display them once they are added to the portfolio data.',
          findMeOn: 'Find me on',
          downloadCv: 'Download CV',
          footerTagline: 'Engineering Leader · iOS · Mobile Architecture',
          footerSource: 'Built with Astro · View source',
        },
        videoGroups: [
          {
            project: 'Inditex — Logistics App',
            description:
              'Internal logistics application delivered for Inditex as iOS Technical Lead, built from scratch with a MVVM-C architecture in SwiftUI.',
            anchor: 'inditex',
            videos: [{ id: 'KhEWEwIBTGQ', title: 'Inditex Logistics App — Demo' }],
          },
          {
            project: 'Jaguar Land Rover — InControl Remote App v2',
            description:
              'The next generation of the InControl Remote app, with a redesigned architecture, expanded feature set, and support for new vehicle platforms.',
            anchor: 'incontrol-v2',
            videos: [
              { id: 'mglk6Jbu23w', title: 'InControl Remote App v2 — Overview' },
              { id: 'iuvHfmDIp-E', title: 'InControl Remote App v2 — Demo' },
            ],
          },
          {
            project: 'Jaguar Land Rover — InControl Remote Watch App',
            description:
              'The companion watchOS app for the InControl Remote platform, built alongside the iOS app.',
            anchor: 'incontrol-watch',
            videos: [
              { id: 'fkoPquBFM9E', title: 'InControl Remote Watch App', isShort: true },
              { id: 'coHJIC9D1pQ', title: 'InControl Remote Watch App — Demo' },
            ],
          },
          {
            project: 'Jaguar Land Rover — InControl Remote App v1',
            description:
              'Demo videos for the first major redevelopment of the Land Rover and Jaguar InControl Remote companion apps, released across 40+ markets.',
            anchor: 'incontrol-v1',
            videos: [
              { id: 'ZzN4pZpO-a8', title: 'InControl Remote App v1 — Overview' },
              { id: 'oy3ufw3dYj8', title: 'InControl Remote App v1 — Demo' },
              { id: '4VhGbQQz2ks', title: 'InControl Remote App v1 — Features' },
              { id: 'FtU6g8TtvgM', title: 'InControl Remote App v1 — Walkthrough' },
            ],
          },
        ],
      },
    },
  },
  {
    locale: 'es',
    payload: {
      schemaVersion: PORTFOLIO_SCHEMA_VERSION,
      siteMeta: {
        lang: 'es',
        title: 'Juan José Rebollo | Líder de Ingeniería',
        shortTitle: 'Juan José Rebollo Barranco',
        description:
          'Líder de Ingeniería con más de 10 años en desarrollo iOS y más de 7 años en liderazgo técnico. Especializado en arquitectura mobile, equipos distribuidos y entrega empresarial.',
        cvHref: '/Juan_Rebollo_CV.pdf',
      },
      navigationLinks: [
        { label: 'Habilidades', href: '/es/#skills' },
        { label: 'Proyectos', href: '/es/#projects' },
        { label: 'Vídeos', href: '/es/work' },
        { label: 'Fortalezas', href: '/es/#strengths' },
        { label: 'Recomendaciones', href: '/es/#recommendations' },
        { label: 'Contacto', href: '/es/#contact' },
      ],
      siteContent: {
        hero: {
          eyebrow: 'Líder de Ingeniería',
          title:
            'Haciendo crecer equipos de ingeniería, elevando el nivel de arquitectura y entregando escaladamente.',
          summary:
            'Líder de Ingeniería con más de 10 años en desarrollo iOS y más de 7 años en roles de liderazgo técnico y arquitectura. Historial probado liderando equipos distribuidos en España, Reino Unido e India — definiendo estrategia mobile, entregando aplicaciones empresariales en entornos altamente regulados y diseñando arquitecturas mantenibles, testeables y construidas para durar.',
          primaryAction: { label: 'Ver proyectos destacados', href: '#projects' },
          secondaryAction: { label: 'Contáctame', href: '#contact' },
          metrics: [
            { value: '10+', label: 'Años en desarrollo iOS' },
            { value: '7+', label: 'Años en liderazgo técnico y arquitectura' },
            { value: '13', label: 'Ingenieros liderados en equipos distribuidos' },
            { value: '40+', label: 'Mercados alcanzados con InControl Remote' },
            { value: '3', label: 'Idiomas — Español, Inglés, Portugués' },
          ],
        },
        skillGroups: [
          {
            name: 'Ingeniería iOS',
            summary:
              'Amplia experiencia en iOS nativo, desde integración de bajo nivel hasta UI declarativa moderna, aplicada consistentemente en producción escalada.',
            skills: [
              'Swift',
              'SwiftUI',
              'Combine',
              'watchOS',
              'MVVM-C',
              'VIPER',
              'Arquitectura Modular',
              'Arquitectura Limpia',
              'SOLID',
              'Diseño REST API',
            ],
          },
          {
            name: 'Entrega y DevOps',
            summary:
              'Responsabilidad end-to-end de workflows y pipelines de entrega, desde decisiones de arquitectura hasta automatización de releases y seguridad empresarial.',
            skills: [
              'GitHub Actions',
              'Jenkins',
              'GitLab',
              'Fastlane',
              'TDD / BDD / ATDD',
              'Scrum',
              'Kanban',
              'SAFe',
              'Modelo Spotify',
              'MDM / MAM / Intune',
            ],
          },
          {
            name: 'Liderazgo y Estrategia',
            summary:
              'Construcción y escalado de equipos de ingeniería, establecimiento de comunidades técnicas y alineación de la capacidad mobile con los objetivos de negocio.',
            skills: [
              'Chapter Lead',
              'Gestión de Personas',
              'Mentoría',
              'Desarrollo de Carrera',
              'Estrategia Mobile',
              'Alineación Interfuncional',
              'Revisiones de Arquitectura',
            ],
          },
        ],
        projectHighlights: [
          {
            name: 'Inditex — iOS Chapter Lead y Arquitecto',
            summary:
              'Lideré la capacidad iOS en la región SPAI (España, Portugal, Italia) en Cognizant, mentorizando a 12 ingenieros senior mientras lideraba simultáneamente un equipo de 5 ingenieros en Inditex, construyendo una nueva app desde cero.',
            impact:
              'Diseñé una arquitectura MVVM-C modular en SwiftUI y Combine que mejoró la velocidad de desarrollo mediante patrones reutilizables y redujo el tiempo de onboarding a través de documentación estructurada y registros de decisiones de arquitectura.',
            stack: [
              'SwiftUI',
              'Combine',
              'MVVM-C',
              'Arquitectura Modular',
              'GitHub Actions',
              'API-first Design',
              'Azure DevOps',
            ],
          },
          {
            name: 'HSBC — Arquitecto iOS, Mobile Centre of Excellence',
            summary:
              'Me incorporé al CoE de Mobile Empresarial de HSBC como Experto en Materia iOS (SME), responsable de la gobernanza de arquitectura en múltiples equipos en un entorno bancario altamente regulado.',
            impact:
              'Diseñé la arquitectura iOS empresarial de plantilla adoptada por todos los equipos, eliminando boilerplate y estandarizando el desarrollo. Definí patrones de seguridad mobile integrados con Intune, Zimperium y BlackBerry UEM.',
            stack: [
              'MVVM-C',
              'Clean Architecture',
              'SOLID',
              'Intune',
              'BlackBerry UEM',
              'Zimperium',
              'UML',
            ],
          },
          {
            name: 'Jaguar Land Rover — Apps InControl Remote',
            summary:
              'Lideré el rediseño de las apps InControl Remote de Land Rover y Jaguar desde cero como Líder Técnico iOS, gestionando un equipo distribuido de 8-13 ingenieros en Reino Unido, Bielorrusia e India.',
            impact:
              'Entregué una arquitectura escalable con soporte para releases en más de 40 mercados. Construí pipelines CI/CD, introduje prácticas BDD y ATDD y lideré la entrega end-to-end incluyendo integración de backend y app.',
            stack: [
              'Swift',
              'Objective-C',
              'Jenkins',
              'GitLab',
              'Fastlane',
              'Firebase',
              'WebSockets',
              'SAFe',
              'BDD',
            ],
          },
        ],
        strengths: [
          {
            title: 'Liderazgo Técnico',
            evidence:
              'Lideré equipos distribuidos de hasta 13 ingenieros en múltiples zonas horarias en JLR, y definí la estrategia del Chapter iOS para toda una región en Cognizant — equilibrando el trabajo de arquitectura hands-on con el crecimiento de personas y la responsabilidad de entrega.',
          },
          {
            title: 'Alineación Interfuncional',
            evidence:
              'Constantemente conecté las disciplinas mobile, backend, producto y seguridad. En HSBC, trabajé con el arquitecto Android para asegurar la paridad. En Inditex, facilité sesiones de 3 Amigos y Example Mapping para alinear negocio e ingeniería antes de escribir una línea de código.',
          },
          {
            title: 'Mentoría y Crecimiento de Equipo',
            evidence:
              'Construí procesos de onboarding estructurados en JLR, HSBC, Cognizant e Inditex, definí planes de carrera y crecimiento en Cognizant, y establecí comunidades iOS internas con talleres técnicos, intercambio de conocimiento y revisiones de arquitectura.',
          },
        ],
        recommendations: {
          source: 'Recomendaciones de LinkedIn',
          sourceUrl:
            'https://www.linkedin.com/in/juan-jose-rebollo-barranco-80655929/?locale=en',
          items: [
            {
              author: 'Elena Becerril',
              headline: 'Responsable del Digital Engineering Studio Iberia en Cognizant',
              date: '28 de abril de 2026',
              quote:
                'Trabajar con Juanjo durante estos años ha sido un auténtico placer. Es de esos profesionales que realmente dejan huella en todas las personas con las que trabajan. Lo que diferencia a Juanjo es la combinación de una profunda experiencia técnica con unas habilidades blandas extraordinarias. No solo cumple con su trabajo: asume plena responsabilidad de todo lo que toca, anticipa los retos antes de que aparezcan y aporta una energía serena y fiable que mejora a los equipos a su alrededor. Si Juanjo forma parte de un proyecto, el éxito no es un objetivo, es una garantía. No podría recomendarlo más.',
            },
            {
              author: 'Jaihind Patil',
              headline: 'Test Lead en Endava',
              date: '16 de noviembre de 2022',
              quote:
                'Tuve el placer de trabajar con Juan en HSBC, colaborando en equipos de proyecto. Su experiencia en desarrollo y arquitectura iOS facilitó mucho la entrega. Me impresionó especialmente su capacidad para afrontar incluso los problemas más complejos con aparente facilidad. Esa habilidad suele requerir años, pero en él parecía completamente natural. Juan sería un gran valor para cualquier equipo.',
            },
            {
              author: 'Zbigniew Niewiadomski',
              headline: 'Lead Scrum Master | SimCorp',
              date: '8 de noviembre de 2022',
              quote:
                'Sus excelentes habilidades en iOS y arquitectura, junto con su experiencia en Android, le permitieron liderar el equipo como arquitecto y mentor. Es muy fácil trabajar con Juan: resuelve conflictos con rapidez y comunica muy bien, tanto al reconocer logros como al señalar problemas cuando corresponde. Recomiendo a Juan totalmente; fue un gran placer trabajar juntos.',
            },
            {
              author: 'Marcin Arciszewski',
              headline:
                'Ex-Big 4 | Ingeniero Android Senior | Kotlin | Jetpack Compose | Arquitectura Android',
              date: '10 de enero de 2022',
              quote:
                'Tuve el placer de trabajar con Juan durante un tiempo. Es un líder técnico entusiasta y orientado al detalle, con grandes habilidades humanas y una sólida experiencia técnica en desarrollo iOS. Es un verdadero ingeniero SOLID, siempre defendiendo arquitectura limpia, testing, calidad y dispuesto a ir un paso más allá para automatizarlo. Es muy cercano y un gran compañero de equipo. Totalmente recomendable trabajar con él.',
            },
            {
              author: 'Keith Bauwise',
              headline: 'Responsable de Ingeniería de Software',
              date: '26 de julio de 2021',
              quote:
                'Juan Rebollo es un desarrollador iOS senior que desempeña el rol de iOS Platform Technical Lead en el desarrollo de las apps móviles InControl Remote de Jaguar y Land Rover. Su conocimiento profundo de nuestros productos y su comprensión integral de la plataforma iOS lo han convertido en un activo de enorme valor para la organización. Juan tiene una atención al detalle excepcional y un enfoque muy orientado a datos. Posee excelentes habilidades de comunicación oral y escrita, y se comunica eficazmente en todos los niveles, incluida la alta dirección. Tiene una actitud de verdadero sí se puede que resulta inspiradora y contagiosa. Cualquier organización se beneficiaría de alguien del nivel de Juan. Siempre cumple, está totalmente centrado en el cliente y es extremadamente fiable.',
            },
          ],
        },
        contact: {
          email: 'jj.rebollo.barranco@gmail.com',
          availability:
            'Abierto a roles de Head of Mobile, Solutions Architect, Technical Lead y Principal Engineer. En España — abierto a trabajo remoto e híbrido en Europa y Reino Unido.',
          links: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/juan-jose-rebollo-barranco-80655929',
            },
            { label: 'GitHub', href: 'https://github.com/jjrebollo' },
            {
              label: 'Descargar CV',
              href: '/Juan_Rebollo_CV.pdf',
              download: true,
            },
          ],
        },
        labels: {
          skills: {
            eyebrow: 'Capacidades',
            title: 'Lo que aporto',
            intro:
              'Desde ingeniería iOS nativa hasta pipelines de entrega y liderazgo de equipos — habilidades construidas y probadas en producción.',
          },
          projects: {
            eyebrow: 'Trabajo seleccionado',
            title: 'Proyectos destacados',
            intro:
              'Una selección de roles en los que fui responsable tanto de la arquitectura como del resultado.',
          },
          strengths: {
            eyebrow: 'Habilidades blandas',
            title: 'Cómo trabajo',
            intro:
              'Los comportamientos y prácticas que definen cómo lidero equipos y tomo decisiones técnicas.',
          },
          recommendations: {
            eyebrow: 'LinkedIn',
            title: 'Recomendaciones',
            intro:
              'Respaldo seleccionado de colegas y colaboradores en LinkedIn.',
          },
          contact: {
            eyebrow: 'Contacto',
            title: 'Hablemos',
            intro:
              'Si estás escalando un equipo de mobile, elevando el nivel de arquitectura o necesitas a alguien que se responsabilice de la entrega end-to-end — estaré encantado de conectar.',
          },
          work: {
            eyebrow: 'Proyectos en acción',
            title: 'Proyectos en vídeo',
            intro:
              'Grabaciones de aplicaciones que construí o lideré como Technical Leader — desde la suite InControl de JLR hasta la plataforma logística de Inditex.',
          },
          recommendationsViewProfile: 'Ver perfil',
          recommendationsMore: 'Más...',
          recommendationsLess: 'Menos...',
          recommendationsEmptyState:
            'LinkedIn bloquea el acceso público a las recomendaciones, así que esta sección está lista para mostrarlas en cuanto se añadan a los datos del portfolio.',
          findMeOn: 'Encuéntrame en',
          downloadCv: 'Descargar CV',
          footerTagline: 'Líder de Ingeniería · iOS · Arquitectura Mobile',
          footerSource: 'Desarrollado con Astro · Ver código',
        },
        videoGroups: [
          {
            project: 'Inditex — App de Logística',
            description:
              'Aplicación logística interna entregada para Inditex como iOS Technical Lead, construida desde cero con arquitectura MVVM-C en SwiftUI.',
            anchor: 'inditex',
            videos: [{ id: 'KhEWEwIBTGQ', title: 'Inditex Logistics App — Demo' }],
          },
          {
            project: 'Jaguar Land Rover — InControl Remote App v2',
            description:
              'La siguiente generación de la app InControl Remote, con arquitectura rediseñada, nuevas funcionalidades y soporte para nuevas plataformas de vehículos.',
            anchor: 'incontrol-v2',
            videos: [
              { id: 'mglk6Jbu23w', title: 'InControl Remote App v2 — Overview' },
              { id: 'iuvHfmDIp-E', title: 'InControl Remote App v2 — Demo' },
            ],
          },
          {
            project: 'Jaguar Land Rover — InControl Remote Watch App',
            description:
              'La app watchOS complementaria para la plataforma InControl Remote, desarrollada junto a la app iOS.',
            anchor: 'incontrol-watch',
            videos: [
              { id: 'fkoPquBFM9E', title: 'InControl Remote Watch App', isShort: true },
              { id: 'coHJIC9D1pQ', title: 'InControl Remote Watch App — Demo' },
            ],
          },
          {
            project: 'Jaguar Land Rover — InControl Remote App v1',
            description:
              'Vídeos de demostración de la primera redeveloper de las apps InControl Remote de Land Rover y Jaguar, lanzadas en más de 40 mercados.',
            anchor: 'incontrol-v1',
            videos: [
              { id: 'ZzN4pZpO-a8', title: 'InControl Remote App v1 — Overview' },
              { id: 'oy3ufw3dYj8', title: 'InControl Remote App v1 — Demo' },
              { id: '4VhGbQQz2ks', title: 'InControl Remote App v1 — Features' },
              { id: 'FtU6g8TtvgM', title: 'InControl Remote App v1 — Walkthrough' },
            ],
          },
        ],
      },
    },
  },
  {
    locale: 'pt',
    payload: {
      schemaVersion: PORTFOLIO_SCHEMA_VERSION,
      siteMeta: {
        lang: 'pt',
        title: 'Juan José Rebollo | Líder de Engenharia',
        shortTitle: 'Juan José Rebollo Barranco',
        description:
          'Líder de Engenharia com mais de 10 anos em desenvolvimento iOS e mais de 7 anos em liderança técnica. Especializado em arquitetura mobile, equipas distribuídas e entrega empresarial.',
        cvHref: '/Juan_Rebollo_CV.pdf',
      },
      navigationLinks: [
        { label: 'Competências', href: '/pt/#skills' },
        { label: 'Projetos', href: '/pt/#projects' },
        { label: 'Vídeos', href: '/pt/work' },
        { label: 'Pontos Fortes', href: '/pt/#strengths' },
        { label: 'Recomendações', href: '/pt/#recommendations' },
        { label: 'Contacto', href: '/pt/#contact' },
      ],
      siteContent: {
        hero: {
          eyebrow: 'Líder de Engenharia',
          title:
            'Desenvolvendo equipas de engenharia, elevando o nível de arquitetura e entregando à escala.',
          summary:
            'Líder de Engenharia com mais de 10 anos em desenvolvimento iOS e mais de 7 anos em funções de liderança técnica e arquitetura. Historial comprovado a liderar equipas distribuídas em Espanha, Reino Unido e Índia — definindo estratégia mobile, entregando aplicações empresariais em ambientes altamente regulados e desenhando arquiteturas mantíveis, testáveis e construídas para durar.',
          primaryAction: { label: 'Ver trabalho em destaque', href: '#projects' },
          secondaryAction: { label: 'Entre em contacto', href: '#contact' },
          metrics: [
            { value: '10+', label: 'Anos em desenvolvimento iOS' },
            { value: '7+', label: 'Anos em liderança técnica e arquitetura' },
            { value: '13', label: 'Engenheiros liderados em equipas distribuídas' },
            { value: '40+', label: 'Mercados alcançados com InControl Remote' },
            { value: '3', label: 'Idiomas — Espanhol, Inglês, Português' },
          ],
        },
        skillGroups: [
          {
            name: 'Engenharia iOS',
            summary:
              'Experiência profunda em iOS nativo, desde integração de baixo nível até UI declarativa moderna, aplicada consistentemente em produção à escala.',
            skills: [
              'Swift',
              'SwiftUI',
              'Combine',
              'watchOS',
              'MVVM-C',
              'VIPER',
              'Arquitetura Modular',
              'Arquitetura Limpa',
              'SOLID',
              'Design REST API',
            ],
          },
          {
            name: 'Entrega e DevOps',
            summary:
              'Responsabilidade end-to-end dos workflows e pipelines de entrega, desde decisões de arquitetura até automação de releases e segurança empresarial.',
            skills: [
              'GitHub Actions',
              'Jenkins',
              'GitLab',
              'Fastlane',
              'TDD / BDD / ATDD',
              'Scrum',
              'Kanban',
              'SAFe',
              'Modelo Spotify',
              'MDM / MAM / Intune',
            ],
          },
          {
            name: 'Liderança e Estratégia',
            summary:
              'Construção e escalabilidade de equipas de engenharia, estabelecimento de comunidades técnicas e alinhamento da capacidade mobile com os objetivos de negócio.',
            skills: [
              'Chapter Lead',
              'Gestão de Pessoas',
              'Mentoria',
              'Desenvolvimento de Carreira',
              'Estratégia Mobile',
              'Alinhamento Interfuncional',
              'Revisões de Arquitetura',
            ],
          },
        ],
        projectHighlights: [
          {
            name: 'Inditex — iOS Chapter Lead e Arquiteto',
            summary:
              'Liderei a capacidade iOS na região SPAI (Espanha, Portugal, Itália) na Cognizant, mentorizando 12 engenheiros sénior enquanto liderava simultaneamente uma equipa de 5 engenheiros na Inditex, a construir uma nova app de raiz.',
            impact:
              'Desenhei uma arquitetura MVVM-C modular em SwiftUI e Combine que melhorou a velocidade de desenvolvimento através de padrões reutilizáveis e reduziu o tempo de onboarding via documentação estruturada e registos de decisões de arquitetura.',
            stack: [
              'SwiftUI',
              'Combine',
              'MVVM-C',
              'Arquitetura Modular',
              'GitHub Actions',
              'API-first Design',
              'Azure DevOps',
            ],
          },
          {
            name: 'HSBC — Arquiteto iOS, Mobile Centre of Excellence',
            summary:
              'Integrei o CoE de Mobile Empresarial da HSBC como Especialista em iOS (SME), responsável pela governança de arquitetura em múltiplas equipas num ambiente bancário altamente regulado.',
            impact:
              'Desenhei a arquitetura iOS empresarial de template adotada por todas as equipas, eliminando boilerplate e padronizando o desenvolvimento. Defini padrões de segurança mobile integrados com Intune, Zimperium e BlackBerry UEM.',
            stack: [
              'MVVM-C',
              'Clean Architecture',
              'SOLID',
              'Intune',
              'BlackBerry UEM',
              'Zimperium',
              'UML',
            ],
          },
          {
            name: 'Jaguar Land Rover — Apps InControl Remote',
            summary:
              'Liderei o redesenho das apps InControl Remote da Land Rover e Jaguar de raiz como Líder Técnico iOS, gerindo uma equipa distribuída de 8-13 engenheiros no Reino Unido, Bielorrússia e Índia.',
            impact:
              'Entreguei uma arquitetura escalável com suporte para releases em mais de 40 mercados. Construí pipelines CI/CD, introduzi práticas BDD e ATDD e assumi a entrega end-to-end incluindo integração de backend e app.',
            stack: [
              'Swift',
              'Objective-C',
              'Jenkins',
              'GitLab',
              'Fastlane',
              'Firebase',
              'WebSockets',
              'SAFe',
              'BDD',
            ],
          },
        ],
        strengths: [
          {
            title: 'Liderança Técnica',
            evidence:
              'Liderei equipas distribuídas de até 13 engenheiros em múltiplos fusos horários na JLR, e defini a estratégia do iOS Chapter para uma região inteira na Cognizant — equilibrando o trabalho de arquitetura hands-on com o crescimento das pessoas e a responsabilidade de entrega.',
          },
          {
            title: 'Alinhamento Interfuncional',
            evidence:
              'Consistentemente liguei as disciplinas mobile, backend, produto e segurança. Na HSBC, trabalhei com o arquiteto Android para garantir paridade. Na Inditex, facilitei sessões de 3 Amigos e Example Mapping para alinhar negócio e engenharia antes de escrever uma linha de código.',
          },
          {
            title: 'Mentoria e Crescimento da Equipa',
            evidence:
              'Construí processos de onboarding estruturados na JLR, HSBC, Cognizant e Inditex, defini planos de carreira e crescimento na Cognizant, e estabeleci comunidades iOS internas com workshops técnicos, partilha de conhecimento e revisões de arquitetura.',
          },
        ],
        recommendations: {
          source: 'Recomendações do LinkedIn',
          sourceUrl:
            'https://www.linkedin.com/in/juan-jose-rebollo-barranco-80655929/?locale=en',
          items: [
            {
              author: 'Elena Becerril',
              headline: 'Responsável pelo Digital Engineering Studio Iberia na Cognizant',
              date: '28 de abril de 2026',
              quote:
                'Trabalhar com o Juanjo ao longo destes anos foi um verdadeiro prazer. Ele é daqueles profissionais que deixam marca em todas as pessoas com quem trabalham. O que distingue o Juanjo é a combinação de profunda competência técnica com excelentes soft skills. Ele não se limita a cumprir tarefas: assume total responsabilidade por tudo em que toca, antecipa desafios antes de surgirem e traz uma energia calma e fiável que melhora as equipas à sua volta. Se o Juanjo faz parte de um projeto, o sucesso não é um objetivo, é uma garantia. Não o poderia recomendar mais.',
            },
            {
              author: 'Jaihind Patil',
              headline: 'Test Lead na Endava',
              date: '16 de novembro de 2022',
              quote:
                'Tive o prazer de trabalhar com o Juan na HSBC, colaborando em equipas de projeto. A sua experiência em desenvolvimento e arquitetura iOS tornou a entrega muito mais fluida. Fiquei particularmente impressionado com a capacidade do Juan para lidar com os problemas mais difíceis com aparente facilidade. Essa competência normalmente leva anos a desenvolver, mas nele parecia algo natural. O Juan seria uma mais-valia para qualquer equipa.',
            },
            {
              author: 'Zbigniew Niewiadomski',
              headline: 'Lead Scrum Master | SimCorp',
              date: '8 de novembro de 2022',
              quote:
                'As suas excelentes competências em iOS e arquitetura, juntamente com experiência em Android, permitiram-lhe liderar a equipa como Arquiteto e mentor. O Juan é muito fácil de trabalhar, resolve conflitos rapidamente e comunica muito bem, tanto para elogiar como para levantar problemas conforme a situação. Recomendo-o fortemente; foi um grande prazer trabalhar com ele.',
            },
            {
              author: 'Marcin Arciszewski',
              headline:
                'Ex-Big 4 | Engenheiro Android Sénior | Kotlin | Jetpack Compose | Arquitetura Android',
              date: '10 de janeiro de 2022',
              quote:
                'Tive o prazer de trabalhar com o Juan durante um período breve. É um líder técnico entusiasta e orientado ao detalhe, com excelentes competências interpessoais e forte experiência técnica em desenvolvimento iOS. É um verdadeiro engenheiro SOLID, sempre a defender arquitetura limpa, testes e qualidade, e disposto a ir mais longe para automatizar. É muito acessível e um ótimo jogador de equipa. Recomendo totalmente trabalhar com ele.',
            },
            {
              author: 'Keith Bauwise',
              headline: 'Gestor de Engenharia de Software',
              date: '26 de julho de 2021',
              quote:
                'Juan Rebollo é um programador iOS sénior, desempenhando o papel de iOS Platform Technical Lead no desenvolvimento das apps móveis InControl Remote da Jaguar e Land Rover. O seu conhecimento profundo dos nossos produtos e a sua compreensão abrangente da plataforma iOS tornaram-no um ativo inestimável para a organização. O Juan tem uma atenção ao detalhe excecional e uma abordagem fortemente orientada por dados. Possui excelentes competências de comunicação oral e escrita, comunicando de forma eficaz a todos os níveis, incluindo gestão de topo. Tem uma verdadeira atitude de fazer acontecer, simultaneamente inspiradora e contagiante. Qualquer organização beneficiaria de alguém com o calibre do Juan. Entrega sempre, é totalmente focado no cliente e extremamente fiável.',
            },
          ],
        },
        contact: {
          email: 'jj.rebollo.barranco@gmail.com',
          availability:
            'Disponível para funções de Head of Mobile, Solutions Architect, Technical Lead e Principal Engineer. Baseado em Espanha — disponível para trabalho remoto e híbrido na Europa e no Reino Unido.',
          links: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/juan-jose-rebollo-barranco-80655929',
            },
            { label: 'GitHub', href: 'https://github.com/jjrebollo' },
            {
              label: 'Descarregar CV',
              href: '/Juan_Rebollo_CV.pdf',
              download: true,
            },
          ],
        },
        labels: {
          skills: {
            eyebrow: 'Capacidades',
            title: 'O que trago para a mesa',
            intro:
              'Da engenharia iOS nativa aos pipelines de entrega e liderança de equipas — competências construídas e testadas em produção.',
          },
          projects: {
            eyebrow: 'Trabalho selecionado',
            title: 'Trabalho em destaque',
            intro:
              'Uma seleção de funções em que fui responsável tanto pela arquitetura como pelo resultado.',
          },
          strengths: {
            eyebrow: 'Habilidades interpessoais',
            title: 'Como trabalho',
            intro:
              'Os comportamentos e práticas que definem como lidero equipas e tomo decisões técnicas.',
          },
          recommendations: {
            eyebrow: 'LinkedIn',
            title: 'Recomendações',
            intro:
              'Endossos selecionados de colegas e colaboradores no LinkedIn.',
          },
          contact: {
            eyebrow: 'Contacto',
            title: 'Vamos conversar',
            intro:
              'Se está a escalar uma equipa de mobile, a elevar o nível de arquitetura ou precisa de alguém que assuma a entrega end-to-end — terei todo o gosto em ligar.',
          },
          work: {
            eyebrow: 'Projetos em ação',
            title: 'Projetos em vídeo',
            intro:
              'Gravações de aplicações que construí ou liderei como Technical Leader — desde a suite InControl da JLR até à plataforma logística da Inditex.',
          },
          recommendationsViewProfile: 'Ver perfil',
          recommendationsMore: 'Mais...',
          recommendationsLess: 'Menos...',
          recommendationsEmptyState:
            'O LinkedIn bloqueia o acesso público às recomendações, por isso esta secção está pronta para as mostrar assim que forem adicionadas aos dados do portefólio.',
          findMeOn: 'Encontre-me em',
          downloadCv: 'Descarregar CV',
          footerTagline: 'Líder de Engenharia · iOS · Arquitetura Mobile',
          footerSource: 'Construído com Astro · Ver código',
        },
        videoGroups: [
          {
            project: 'Inditex — App de Logística',
            description:
              'Aplicação logística interna entregue para a Inditex como iOS Technical Lead, construída de raiz com arquitetura MVVM-C em SwiftUI.',
            anchor: 'inditex',
            videos: [{ id: 'KhEWEwIBTGQ', title: 'Inditex Logistics App — Demo' }],
          },
          {
            project: 'Jaguar Land Rover — InControl Remote App v2',
            description:
              'A próxima geração da app InControl Remote, com arquitetura redesenhada, novas funcionalidades e suporte para novas plataformas de veículos.',
            anchor: 'incontrol-v2',
            videos: [
              { id: 'mglk6Jbu23w', title: 'InControl Remote App v2 — Overview' },
              { id: 'iuvHfmDIp-E', title: 'InControl Remote App v2 — Demo' },
            ],
          },
          {
            project: 'Jaguar Land Rover — InControl Remote Watch App',
            description:
              'A app watchOS complementar para a plataforma InControl Remote, desenvolvida em conjunto com a app iOS.',
            anchor: 'incontrol-watch',
            videos: [
              { id: 'fkoPquBFM9E', title: 'InControl Remote Watch App', isShort: true },
              { id: 'coHJIC9D1pQ', title: 'InControl Remote Watch App — Demo' },
            ],
          },
          {
            project: 'Jaguar Land Rover — InControl Remote App v1',
            description:
              'Vídeos de demonstração do primeiro grande redesenvolvimento das apps InControl Remote da Land Rover e Jaguar, lançadas em mais de 40 mercados.',
            anchor: 'incontrol-v1',
            videos: [
              { id: 'ZzN4pZpO-a8', title: 'InControl Remote App v1 — Overview' },
              { id: 'oy3ufw3dYj8', title: 'InControl Remote App v1 — Demo' },
              { id: '4VhGbQQz2ks', title: 'InControl Remote App v1 — Features' },
              { id: 'FtU6g8TtvgM', title: 'InControl Remote App v1 — Walkthrough' },
            ],
          },
        ],
      },
    },
  },
];

async function main() {
  for (const snapshot of snapshots) {
    await prisma.portfolioSnapshot.upsert({
      where: {
        locale_status: {
          locale: snapshot.locale,
          status: 'PUBLISHED',
        },
      },
      update: {
        payload: snapshot.payload,
        publishedAt,
      },
      create: {
        locale: snapshot.locale,
        status: 'PUBLISHED',
        payload: snapshot.payload,
        publishedAt,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });