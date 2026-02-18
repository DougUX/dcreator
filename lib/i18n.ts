export type Locale = "en" | "fr" | "ar";

export const locales: Locale[] = ["en", "fr", "ar"];

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

type Messages = Record<string, string>;

const messages: Record<Locale, Messages> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.why": "Why Me",
    "nav.services": "Service",
    "nav.work": "Work",
    "nav.contact": "Contact",

    "header.letsTalk": "Let’s Talk",

    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "menu.closeButton": "Close",

    "hero.h1.l1": "INTELLIGENT",
    "hero.h1.l2": "DESIGN",
    "hero.h1.l3": "WHERE CREATIVITY",
    "hero.h1.l4": "MEETS AI ✦",
    "hero.cta.work": "View Work",
    "hero.cta.talk": "Let’s Talk",
    "hero.blurb1": "Award-winning Luxury Product, Brand & AI Experience Designer based in the United Kingdom.",
    "hero.blurb2": "I design intelligent products across screen and form — blending creativity, engineering logic, and AI-driven thinking to craft experiences that are both beautifully designed and purposefully built.",

    "about.title": "About Me",
    "about.intro.name": "I'm Douglas Herbert",
    "about.intro.p1": "I am an award-winning Digital and Physical Product Designer based in the United Kingdom, with over 25 years of experience in the design industry.",
    "about.intro.p2": "Throughout my career, I have worked across a wide spectrum of disciplines, from fashion and brand design to complex digital ecosystems, AI-powered applications, websites, and thoughtfully engineered physical products. My work spans both creative and highly technical environments, allowing me to bridge aesthetic excellence with functional precision.",
    "about.intro.p3": "I have designed products that sit on prestigious shelves around the world, while also architecting sophisticated SaaS platforms for corporate sectors including aviation, maritime, telecommunications, and IT. These projects required strategic thinking, deep systems understanding, and the ability to translate complex requirements into intuitive, scalable user experiences.",
    "about.intro.p4": "My journey has been shaped by both opportunity and challenge. I have navigated industry shifts, technological transformation, complex enterprise systems, and high-performance environments. Each experience has strengthened my strategic thinking, refined my craft, and reinforced my commitment to continuous growth. I consistently invest in upgrading my skills to remain relevant in a world increasingly defined by artificial intelligence and evolving user expectations.",
    "about.intro.p5": "Today, I work at the intersection of creativity and intelligence, designing scalable digital systems, AI-driven experiences, applications, websites, and physical products with equal precision. Whether developing enterprise SaaS platforms or crafting tangible consumer products, I focus on clarity, usability, refinement, and purposeful design.",
    "about.more": "View more",
    "about.less": "View less",
    "about.cta": "Contact Me",
    "about.more.p1": "My philosophy is simple.",
    "about.more.p2": "If you trust me, I give my soul, and you will see that reflected in the product.",
    "about.more.p3": "For me, design is more than execution. It is responsibility, ownership, and care. Every detail matters, and every product carries the integrity of the work behind it.",
    "about.more.p4": "I do not simply design products. I design with commitment, intelligence, and purpose.",

    "services.kicker": "Services",
    "services.title": "Designed with Soul. Powered by Intelligence.",
    "services.sub": "I don’t just design products. I design clarity, systems, and impact.",

    "services.items.digital-product-design.title": "Digital Product Design",
    "services.items.digital-product-design.caption": "Enterprise-grade thinking. Human-centred execution.",
    "services.items.digital-product-design.description":
      "I design complex digital products that feel simple. From AI-native platforms to SaaS ecosystems, internal tools to customer-facing applications — I bring structure to complexity.",
    "services.items.digital-product-design.bullets.0": "UX strategy & product architecture",
    "services.items.digital-product-design.bullets.1": "Design systems (scalable, token-driven)",
    "services.items.digital-product-design.bullets.2": "AI-integrated interfaces",
    "services.items.digital-product-design.bullets.3": "Web & mobile product design",
    "services.items.digital-product-design.bullets.4": "Cross-platform experiences",
    "services.items.digital-product-design.bullets.5": "Rapid prototyping & validation",

    "services.items.physical-luxury-product-design.title": "Physical Luxury Product Design",
    "services.items.physical-luxury-product-design.caption": "Where aesthetics meet precision.",
    "services.items.physical-luxury-product-design.description":
      "Luxury is not decoration. It is discipline. From perfume bottles to packaging systems, I craft physical products with material intelligence, proportion control, and premium finish direction.",
    "services.items.physical-luxury-product-design.bullets.0": "Material intelligence & finish direction",
    "services.items.physical-luxury-product-design.bullets.1": "Proportion & form refinement",
    "services.items.physical-luxury-product-design.bullets.2": "Packaging systems & unboxing",
    "services.items.physical-luxury-product-design.bullets.3": "Manufacturing-ready detailing",
    "services.items.physical-luxury-product-design.bullets.4": "Premium visual language",

    "services.items.ai-product-strategy.title": "AI Product Strategy",
    "services.items.ai-product-strategy.caption": "Designing for intelligence, not just interface.",
    "services.items.ai-product-strategy.description":
      "AI is not a feature. It’s a behavioural layer. I help brands integrate AI meaningfully — with strategy before screens, and logic before layout.",
    "services.items.ai-product-strategy.bullets.0": "Conversational UX architecture",
    "services.items.ai-product-strategy.bullets.1": "AI workflow integration",
    "services.items.ai-product-strategy.bullets.2": "Personalisation systems",
    "services.items.ai-product-strategy.bullets.3": "Automation logic design",
    "services.items.ai-product-strategy.bullets.4": "Human–AI interaction models",

    "services.items.visiontyping.title": "Visiontyping™",
    "services.items.visiontyping.caption": "From idea to visual reality — fast.",
    "services.items.visiontyping.description":
      "Turn strategy and concept into a premium visual language in days — not months. Ideal for pitches, investor decks, and early product brand systems.",
    "services.items.visiontyping.bullets.0": "Rapid brand prototyping",
    "services.items.visiontyping.bullets.1": "Pitch-ready visuals",
    "services.items.visiontyping.bullets.2": "Identity direction",
    "services.items.visiontyping.bullets.3": "Future-state prototyping",
    "services.items.visiontyping.bullets.4": "Brand tone articulation",

    "services.items.ux-surgery.title": "UX Surgery™",
    "services.items.ux-surgery.caption": "Precision intervention. Measured improvement.",
    "services.items.ux-surgery.description":
      "I audit and refactor existing UX for clarity, conversion, and trust. This is for products that have grown fast — and now need refinement.",
    "services.items.ux-surgery.bullets.0": "UX audits & diagnostics",
    "services.items.ux-surgery.bullets.1": "Flow optimisation",
    "services.items.ux-surgery.bullets.2": "Trust & credibility upgrades",
    "services.items.ux-surgery.bullets.3": "Design system repair",
    "services.items.ux-surgery.bullets.4": "Conversion optimisation",

    "services.items.design-systems.title": "Design Systems",
    "services.items.design-systems.caption": "Token-driven. Component-led. Built to last.",
    "services.items.design-systems.description":
      "I create scalable design systems that unify product teams and speed delivery — without sacrificing craft.",
    "services.items.design-systems.bullets.0": "Token architecture",
    "services.items.design-systems.bullets.1": "Component libraries",
    "services.items.design-systems.bullets.2": "Documentation & governance",
    "services.items.design-systems.bullets.3": "Multi-brand harmonisation",
    "services.items.design-systems.bullets.4": "Post-acquisition alignment",

    "services.items.ux-leadership.title": "UX Leadership",
    "services.items.ux-leadership.caption": "Principal-level thinking. Hands-on delivery.",
    "services.items.ux-leadership.description":
      "Senior product design leadership to help teams ship better work — faster. Ideal for startups and scale-ups needing immediate momentum.",
    "services.items.ux-leadership.bullets.0": "Design direction",
    "services.items.ux-leadership.bullets.1": "Team scaling support",
    "services.items.ux-leadership.bullets.2": "Workshop facilitation",
    "services.items.ux-leadership.bullets.3": "Mentoring & coaching",
    "services.items.ux-leadership.bullets.4": "Delivery leadership",

    "services.items.brand-direction.title": "Brand Direction",
    "services.items.brand-direction.caption": "Elegance with intelligence.",
    "services.items.brand-direction.description":
      "I help brands define their visual identity and product presence — blending editorial calm with modern systems thinking.",
    "services.items.brand-direction.bullets.0": "Brand identity systems",
    "services.items.brand-direction.bullets.1": "Editorial art direction",
    "services.items.brand-direction.bullets.2": "Visual design systems",
    "services.items.brand-direction.bullets.3": "High-end visual direction",
    "services.items.brand-direction.bullets.4": "AI-enhanced brand ecosystems",

    "services.items.transformation-packages.title": "Transformation Packages",
    "services.items.transformation-packages.caption": "Transformation, without drama.",
    "services.items.transformation-packages.description":
      "A bundled engagement combining strategy, UX, and visual refinement — designed to reposition your product and elevate perception.",
    "services.items.transformation-packages.bullets.0": "Strategy + UX + design",
    "services.items.transformation-packages.bullets.1": "Roadmap-ready system",
    "services.items.transformation-packages.bullets.2": "Brand + product alignment",
    "services.items.transformation-packages.bullets.3": "UX simplification",
    "services.items.transformation-packages.bullets.4": "Roadmap-ready outputs",

    "work.kicker": "Featured Work",
    "work.title": "Excellency in creative designs",
    "work.viewAll": "View All Work",

    "stats.title": "Proven — By Craft",
    "stats.sub": "",

    "clients.kicker": "Client",
    "clients.title": "Brands we’ve helped",
    "clients.sub": "A great team of creatives with strong capabilities.",

    "contact.kicker": "Let’s Work",
    "contact.title": "If you trust me, I give my soul, and you will see that reflected in the product.",
    "contact.sub": "Contact me, and together we’ll create work that makes history.",
    "contact.email": "Email: hello@d.creator",
    "contact.book": "Book a call",
    "contact.subscribe": "Subscribe",
    "contact.subscribeNote": "By subscribing you agree with our Privacy Policy.",
    "contact.emailPlaceholder": "Email address",
    "contact.signup": "Sign up",
    "contact.office": "Office",

    "footer.rights": "All rights reserved."
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.why": "Pourquoi moi",
    "nav.services": "Services",
    "nav.work": "Réalisations",
    "nav.contact": "Contact",

    "header.letsTalk": "Parlons-en",

    "menu.open": "Ouvrir le menu",
    "menu.close": "Fermer le menu",
    "menu.closeButton": "Fermer",

    "hero.h1.l1": "DESIGN",
    "hero.h1.l2": "INTELLIGENT",
    "hero.h1.l3": "OÙ LA CRÉATIVITÉ",
    "hero.h1.l4": "RENCONTRE L’IA ✦",
    "hero.cta.work": "Voir les projets",
    "hero.cta.talk": "Parlons-en",
    "hero.blurb1": "Designer primé en produits de luxe, marque et expériences IA, basé au Royaume-Uni.",
    "hero.blurb2": "Je conçois des produits intelligents à l’écran comme dans la matière — en mêlant créativité, logique d’ingénierie et pensée orientée IA pour créer des expériences à la fois belles et utiles.",

    "about.title": "À propos",
    "about.intro.name": "Je suis Douglas Herbert",
    "about.intro.p1": "Je suis un designer de produits numériques et physiques primé, basé au Royaume-Uni, avec plus de 25 ans d’expérience dans l’industrie du design.",
    "about.intro.p2": "Tout au long de ma carrière, j’ai travaillé dans un large éventail de disciplines, de la mode et de l’identité de marque à des écosystèmes numériques complexes, des applications alimentées par l’IA, des sites web et des produits physiques conçus avec précision. Je fais le lien entre excellence esthétique et performance fonctionnelle.",
    "about.intro.p3": "J’ai conçu des produits présents sur des étagères prestigieuses dans le monde entier, tout en architecturant des plateformes SaaS sophistiquées pour des secteurs tels que l’aviation, le maritime, les télécommunications et l’IT. Ces projets exigent une pensée stratégique et la capacité de transformer des contraintes complexes en expériences intuitives et évolutives.",
    "about.intro.p4": "Mon parcours a été façonné par des opportunités et des défis. J’ai traversé des mutations sectorielles, des transformations technologiques, des systèmes d’entreprise complexes et des environnements à haute exigence. Chaque expérience a affiné ma pratique et renforcé mon engagement pour une amélioration continue.",
    "about.intro.p5": "Aujourd’hui, je travaille à l’intersection de la créativité et de l’intelligence, en concevant des systèmes numériques évolutifs, des expériences pilotées par l’IA, des applications, des sites web et des produits physiques avec la même rigueur. Je me concentre sur la clarté, l’utilisabilité, le raffinement et un design intentionnel.",
    "about.more": "Voir plus",
    "about.less": "Voir moins",
    "about.cta": "Me contacter",
    "about.more.p1": "Ma philosophie est simple.",
    "about.more.p2": "Si vous me faites confiance, je donne mon âme, et vous le verrez dans le produit.",
    "about.more.p3": "Pour moi, le design est plus que l’exécution. C’est une responsabilité, une appropriation et du soin. Chaque détail compte.",
    "about.more.p4": "Je ne conçois pas simplement des produits. Je conçois avec engagement, intelligence et intention.",

    "services.kicker": "Services",
    "services.title": "Conçu avec âme. Propulsé par l’intelligence.",
    "services.sub": "Je ne conçois pas seulement des produits. Je conçois la clarté, les systèmes et l’impact.",

    "services.items.digital-product-design.title": "Design de produit digital",
    "services.items.digital-product-design.caption": "Pensée niveau entreprise. Exécution centrée sur l’humain.",
    "services.items.digital-product-design.description":
      "Je conçois des produits numériques complexes qui paraissent simples. Des plateformes nativement IA aux écosystèmes SaaS, des outils internes aux applications orientées client — j’apporte de la structure à la complexité.",
    "services.items.digital-product-design.bullets.0": "Stratégie UX & architecture produit",
    "services.items.digital-product-design.bullets.1": "Design systems (scalables, basés sur des tokens)",
    "services.items.digital-product-design.bullets.2": "Interfaces intégrant l’IA",
    "services.items.digital-product-design.bullets.3": "Design produit web & mobile",
    "services.items.digital-product-design.bullets.4": "Expériences multiplateformes",
    "services.items.digital-product-design.bullets.5": "Prototypage rapide & validation",

    "services.items.physical-luxury-product-design.title": "Design de produit physique (luxe)",
    "services.items.physical-luxury-product-design.caption": "Quand l’esthétique rencontre la précision.",
    "services.items.physical-luxury-product-design.description":
      "Le luxe n’est pas une décoration. C’est une discipline. Du flacon de parfum aux systèmes de packaging, je conçois des objets avec intelligence matière, contrôle des proportions et direction des finitions premium.",
    "services.items.physical-luxury-product-design.bullets.0": "Intelligence matière & direction des finitions",
    "services.items.physical-luxury-product-design.bullets.1": "Proportions & affinage des formes",
    "services.items.physical-luxury-product-design.bullets.2": "Packaging & expérience d’unboxing",
    "services.items.physical-luxury-product-design.bullets.3": "Détails prêts pour la fabrication",
    "services.items.physical-luxury-product-design.bullets.4": "Langage visuel premium",

    "services.items.ai-product-strategy.title": "Stratégie produit IA",
    "services.items.ai-product-strategy.caption": "Concevoir l’intelligence, pas seulement l’interface.",
    "services.items.ai-product-strategy.description":
      "L’IA n’est pas une fonctionnalité. C’est une couche comportementale. J’aide les marques à intégrer l’IA de façon pertinente — avec la stratégie avant les écrans et la logique avant la mise en page.",
    "services.items.ai-product-strategy.bullets.0": "Architecture UX conversationnelle",
    "services.items.ai-product-strategy.bullets.1": "Intégration des workflows IA",
    "services.items.ai-product-strategy.bullets.2": "Systèmes de personnalisation",
    "services.items.ai-product-strategy.bullets.3": "Conception de la logique d’automatisation",
    "services.items.ai-product-strategy.bullets.4": "Modèles d’interaction humain–IA",

    "services.items.visiontyping.title": "Visiontyping™",
    "services.items.visiontyping.caption": "De l’idée à la réalité visuelle — rapidement.",
    "services.items.visiontyping.description":
      "Transformer une stratégie et un concept en langage visuel premium en quelques jours — pas en mois. Idéal pour des pitchs, decks investisseurs et systèmes de marque en phase précoce.",
    "services.items.visiontyping.bullets.0": "Prototypage de marque rapide",
    "services.items.visiontyping.bullets.1": "Visuels prêts pour le pitch",
    "services.items.visiontyping.bullets.2": "Direction d’identité",
    "services.items.visiontyping.bullets.3": "Prototypage “future-state”",
    "services.items.visiontyping.bullets.4": "Expression du ton de marque",

    "services.items.ux-surgery.title": "UX Surgery™",
    "services.items.ux-surgery.caption": "Intervention précise. Amélioration mesurée.",
    "services.items.ux-surgery.description":
      "J’audite et je refonds une UX existante pour plus de clarté, conversion et confiance. Pour les produits qui ont grandi vite — et qui ont maintenant besoin de raffinement.",
    "services.items.ux-surgery.bullets.0": "Audits UX & diagnostics",
    "services.items.ux-surgery.bullets.1": "Optimisation des parcours",
    "services.items.ux-surgery.bullets.2": "Améliorations confiance & crédibilité",
    "services.items.ux-surgery.bullets.3": "Réparation du design system",
    "services.items.ux-surgery.bullets.4": "Optimisation de conversion",

    "services.items.design-systems.title": "Design systems",
    "services.items.design-systems.caption": "Basé sur des tokens. Orienté composants. Durable.",
    "services.items.design-systems.description":
      "Je crée des design systems scalables qui unifient les équipes produit et accélèrent la livraison — sans sacrifier la qualité.",
    "services.items.design-systems.bullets.0": "Architecture de tokens",
    "services.items.design-systems.bullets.1": "Bibliothèques de composants",
    "services.items.design-systems.bullets.2": "Documentation & gouvernance",
    "services.items.design-systems.bullets.3": "Harmonisation multi-marques",
    "services.items.design-systems.bullets.4": "Alignement post-acquisition",

    "services.items.ux-leadership.title": "Leadership UX",
    "services.items.ux-leadership.caption": "Vision de niveau principal. Livraison concrète.",
    "services.items.ux-leadership.description":
      "Leadership senior en design produit pour aider les équipes à livrer un meilleur travail — plus vite. Idéal pour startups et scale-ups qui ont besoin d’un élan immédiat.",
    "services.items.ux-leadership.bullets.0": "Direction design",
    "services.items.ux-leadership.bullets.1": "Soutien à la montée en équipe",
    "services.items.ux-leadership.bullets.2": "Animation d’ateliers",
    "services.items.ux-leadership.bullets.3": "Mentorat & coaching",
    "services.items.ux-leadership.bullets.4": "Leadership de delivery",

    "services.items.brand-direction.title": "Direction de marque",
    "services.items.brand-direction.caption": "Élégance et intelligence.",
    "services.items.brand-direction.description":
      "J’aide les marques à définir leur identité visuelle et leur présence produit — en mêlant calme éditorial et pensée systémique moderne.",
    "services.items.brand-direction.bullets.0": "Systèmes d’identité de marque",
    "services.items.brand-direction.bullets.1": "Direction artistique éditoriale",
    "services.items.brand-direction.bullets.2": "Systèmes de design visuel",
    "services.items.brand-direction.bullets.3": "Direction visuelle haut de gamme",
    "services.items.brand-direction.bullets.4": "Écosystèmes de marque augmentés par l’IA",

    "services.items.transformation-packages.title": "Forfaits de transformation",
    "services.items.transformation-packages.caption": "Transformer, sans drama.",
    "services.items.transformation-packages.description":
      "Un engagement packagé combinant stratégie, UX et raffinement visuel — conçu pour repositionner votre produit et élever la perception.",
    "services.items.transformation-packages.bullets.0": "Stratégie + UX + design",
    "services.items.transformation-packages.bullets.1": "Système prêt pour la roadmap",
    "services.items.transformation-packages.bullets.2": "Alignement marque + produit",
    "services.items.transformation-packages.bullets.3": "Simplification UX",
    "services.items.transformation-packages.bullets.4": "Livrables prêts pour la roadmap",

    "work.kicker": "Projets",
    "work.title": "Excellence en design créatif",
    "work.viewAll": "Voir tous les projets",

    "stats.title": "Activité — en chiffres",
    "stats.sub": "Aider les marques à grandir et à partager leurs réussites avec le monde.",

    "clients.kicker": "Clients",
    "clients.title": "Marques accompagnées",
    "clients.sub": "Une équipe créative avec de fortes compétences.",

    "contact.kicker": "Travaillons ensemble",
    "contact.title": "Si vous me faites confiance, je donne mon âme, et vous le verrez dans le produit.",
    "contact.sub": "Contactez-moi et créons ensemble un travail qui marque l’histoire.",
    "contact.email": "Email : hello@d.creator",
    "contact.book": "Réserver un appel",
    "contact.subscribe": "S’abonner",
    "contact.subscribeNote": "En vous abonnant, vous acceptez notre politique de confidentialité.",
    "contact.emailPlaceholder": "Adresse email",
    "contact.signup": "S’inscrire",
    "contact.office": "Bureau",

    "footer.rights": "Tous droits réservés."
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.about": "نبذة عني",
    "nav.why": "لماذا أنا",
    "nav.services": "الخدمات",
    "nav.work": "الأعمال",
    "nav.contact": "تواصل",

    "header.letsTalk": "لنتحدث",

    "menu.open": "فتح القائمة",
    "menu.close": "إغلاق القائمة",
    "menu.closeButton": "إغلاق",

    "hero.h1.l1": "تصميم",
    "hero.h1.l2": "ذكي",
    "hero.h1.l3": "حيث يلتقي الإبداع",
    "hero.h1.l4": "بالذكاء الاصطناعي ✦",
    "hero.cta.work": "عرض الأعمال",
    "hero.cta.talk": "لنتحدث",
    "hero.blurb1": "مصمم خبرات ومنتجات فاخرة وهوية وعلاقات ذكاء اصطناعي حائز على جوائز ومقيم في المملكة المتحدة.",
    "hero.blurb2": "أصمم منتجات ذكية عبر الشاشة والواقع — أمزج الإبداع مع منطق الهندسة والتفكير المدعوم بالذكاء الاصطناعي لصناعة تجارب جميلة وهادفة.",

    "about.title": "من أنا",
    "about.intro.name": "أنا دوغلاس هيربرت",
    "about.intro.p1": "أنا مصمم منتجات رقمية ومادية حائز على جوائز ومقيم في المملكة المتحدة، ولدي أكثر من 25 عامًا من الخبرة في صناعة التصميم.",
    "about.intro.p2": "على مدار مسيرتي عملت ضمن طيف واسع من التخصصات، من الموضة وهوية العلامة إلى الأنظمة الرقمية المعقدة وتطبيقات الذكاء الاصطناعي والمواقع والمنتجات المادية المصممة بعناية. أجمع بين الجمال والوظيفة بدقة.",
    "about.intro.p3": "صممت منتجات تتواجد على رفوف مرموقة حول العالم، وفي الوقت نفسه قمت بهندسة منصات SaaS متقدمة لقطاعات مثل الطيران والبحرية والاتصالات وتقنية المعلومات. هذه المشاريع تتطلب تفكيرًا استراتيجيًا وفهمًا عميقًا للأنظمة وتحويل التعقيد إلى تجربة سلسة قابلة للتوسع.",
    "about.intro.p4": "تشكلت رحلتي من فرص وتحديات. تعاملت مع تحولات الصناعة والتغير التقني وأنظمة المؤسسات المعقدة وبيئات عالية الأداء. كل تجربة صقلت مهاراتي ورسخت التزامي بالتطور المستمر.",
    "about.intro.p5": "اليوم أعمل عند تقاطع الإبداع والذكاء، وأصمم أنظمة رقمية قابلة للتوسع وتجارب مدفوعة بالذكاء الاصطناعي وتطبيقات ومواقع ومنتجات مادية بالقدر نفسه من الدقة. أركز على الوضوح وسهولة الاستخدام والصقل والتصميم الهادف.",
    "about.more": "عرض المزيد",
    "about.less": "عرض أقل",
    "about.cta": "تواصل معي",
    "about.more.p1": "فلسفتي بسيطة.",
    "about.more.p2": "إذا وثقت بي، سأضع روحي في العمل وسترى ذلك منعكسًا في المنتج.",
    "about.more.p3": "بالنسبة لي، التصميم أكثر من تنفيذ. إنه مسؤولية وملكية واهتمام. كل تفصيل مهم.",
    "about.more.p4": "أنا لا أصمم منتجات فحسب. أنا أصمم بالتزام وذكاء وهدف.",

    "services.kicker": "الخدمات",
    "services.title": "مصمم بروح. ومدعوم بالذكاء.",
    "services.sub": "لا أصمم منتجات فقط. أصمم وضوحًا وأنظمة وتأثيرًا.",

    "services.items.digital-product-design.title": "تصميم المنتجات الرقمية",
    "services.items.digital-product-design.caption": "تفكير على مستوى المؤسسات. تنفيذ متمحور حول الإنسان.",
    "services.items.digital-product-design.description":
      "أصمم منتجات رقمية معقدة تبدو بسيطة. من منصات مدعومة بالذكاء الاصطناعي إلى أنظمة SaaS، ومن أدوات داخلية إلى تطبيقات موجهة للعملاء — أُدخل النظام إلى التعقيد.",
    "services.items.digital-product-design.bullets.0": "استراتيجية UX وعمارة المنتج",
    "services.items.digital-product-design.bullets.1": "أنظمة تصميم قابلة للتوسع (Tokens)",
    "services.items.digital-product-design.bullets.2": "واجهات مدمجة بالذكاء الاصطناعي",
    "services.items.digital-product-design.bullets.3": "تصميم منتجات الويب والموبايل",
    "services.items.digital-product-design.bullets.4": "تجارب متعددة المنصات",
    "services.items.digital-product-design.bullets.5": "نماذج سريعة والتحقق",

    "services.items.physical-luxury-product-design.title": "تصميم المنتجات الفاخرة المادية",
    "services.items.physical-luxury-product-design.caption": "حيث يلتقي الجمال بالدقة.",
    "services.items.physical-luxury-product-design.description":
      "الفخامة ليست زينة. إنها انضباط. من زجاجات العطور إلى أنظمة التغليف، أصمم منتجات مادية بذكاء المواد وضبط النِسب وتوجيه تشطيبات فاخرة.",
    "services.items.physical-luxury-product-design.bullets.0": "ذكاء المواد وتوجيه التشطيبات",
    "services.items.physical-luxury-product-design.bullets.1": "تنقيح الشكل والنِسب",
    "services.items.physical-luxury-product-design.bullets.2": "أنظمة التغليف وتجربة فتح العلبة",
    "services.items.physical-luxury-product-design.bullets.3": "تفاصيل جاهزة للتصنيع",
    "services.items.physical-luxury-product-design.bullets.4": "لغة بصرية فاخرة",

    "services.items.ai-product-strategy.title": "استراتيجية المنتج بالذكاء الاصطناعي",
    "services.items.ai-product-strategy.caption": "تصميم الذكاء، وليس الواجهة فقط.",
    "services.items.ai-product-strategy.description":
      "الذكاء الاصطناعي ليس ميزة. إنه طبقة سلوكية. أساعد العلامات على دمجه بشكل هادف — بالاستراتيجية قبل الشاشات والمنطق قبل التخطيط.",
    "services.items.ai-product-strategy.bullets.0": "عمارة UX للمحادثات",
    "services.items.ai-product-strategy.bullets.1": "دمج سير العمل بالذكاء الاصطناعي",
    "services.items.ai-product-strategy.bullets.2": "أنظمة التخصيص",
    "services.items.ai-product-strategy.bullets.3": "تصميم منطق الأتمتة",
    "services.items.ai-product-strategy.bullets.4": "نماذج تفاعل إنسان–آلة",

    "services.items.visiontyping.title": "Visiontyping™",
    "services.items.visiontyping.caption": "من الفكرة إلى واقع بصري — بسرعة.",
    "services.items.visiontyping.description":
      "حوّل الاستراتيجية والمفهوم إلى لغة بصرية فاخرة خلال أيام — لا أشهر. مناسب للعروض التقديمية ومواد المستثمرين وأنظمة العلامة في المراحل المبكرة.",
    "services.items.visiontyping.bullets.0": "نمذجة سريعة للعلامة",
    "services.items.visiontyping.bullets.1": "مرئيات جاهزة للعرض",
    "services.items.visiontyping.bullets.2": "توجيه الهوية",
    "services.items.visiontyping.bullets.3": "نماذج مستقبلية",
    "services.items.visiontyping.bullets.4": "صياغة نبرة العلامة",

    "services.items.ux-surgery.title": "UX Surgery™",
    "services.items.ux-surgery.caption": "تدخل دقيق. تحسين قابل للقياس.",
    "services.items.ux-surgery.description":
      "أراجع وأعيد بناء تجربة المستخدم الحالية لزيادة الوضوح والتحويل والثقة. مناسب للمنتجات التي نمت بسرعة وتحتاج الآن إلى صقل.",
    "services.items.ux-surgery.bullets.0": "تدقيق UX وتشخيص",
    "services.items.ux-surgery.bullets.1": "تحسين المسارات",
    "services.items.ux-surgery.bullets.2": "تعزيز الثقة والمصداقية",
    "services.items.ux-surgery.bullets.3": "إصلاح نظام التصميم",
    "services.items.ux-surgery.bullets.4": "تحسين التحويل",

    "services.items.design-systems.title": "أنظمة التصميم",
    "services.items.design-systems.caption": "مبنية على Tokens. مدفوعة بالمكونات. طويلة الأمد.",
    "services.items.design-systems.description":
      "أبني أنظمة تصميم قابلة للتوسع توحّد فرق المنتج وتسرّع التسليم — دون التضحية بالحِرفة.",
    "services.items.design-systems.bullets.0": "عمارة Tokens",
    "services.items.design-systems.bullets.1": "مكتبات المكونات",
    "services.items.design-systems.bullets.2": "توثيق وحوكمة",
    "services.items.design-systems.bullets.3": "مواءمة متعددة العلامات",
    "services.items.design-systems.bullets.4": "مواءمة ما بعد الاستحواذ",

    "services.items.ux-leadership.title": "قيادة UX",
    "services.items.ux-leadership.caption": "تفكير بمستوى رئيسي. تنفيذ عملي.",
    "services.items.ux-leadership.description":
      "قيادة تصميم منتجات على مستوى Senior لمساعدة الفرق على تسليم عمل أفضل — أسرع. مناسب للشركات الناشئة والمتوسعة التي تحتاج إلى زخم فوري.",
    "services.items.ux-leadership.bullets.0": "توجيه التصميم",
    "services.items.ux-leadership.bullets.1": "دعم توسيع الفريق",
    "services.items.ux-leadership.bullets.2": "تيسير ورش العمل",
    "services.items.ux-leadership.bullets.3": "إرشاد وتدريب",
    "services.items.ux-leadership.bullets.4": "قيادة التسليم",

    "services.items.brand-direction.title": "توجيه العلامة",
    "services.items.brand-direction.caption": "أناقة مع ذكاء.",
    "services.items.brand-direction.description":
      "أساعد العلامات على تحديد هويتها البصرية وحضورها المنتج — بمزج هدوء تحريري مع تفكير أنظمة حديث.",
    "services.items.brand-direction.bullets.0": "أنظمة هوية العلامة",
    "services.items.brand-direction.bullets.1": "توجيه فني تحريري",
    "services.items.brand-direction.bullets.2": "أنظمة تصميم بصري",
    "services.items.brand-direction.bullets.3": "توجيه بصري فاخر",
    "services.items.brand-direction.bullets.4": "أنظمة علامة مدعومة بالذكاء الاصطناعي",

    "services.items.transformation-packages.title": "حزم التحول",
    "services.items.transformation-packages.caption": "تحول بدون ضجيج.",
    "services.items.transformation-packages.description":
      "تعاون مُجمّع يجمع الاستراتيجية وUX والصقل البصري — لإعادة تموضع منتجك ورفع الانطباع.",
    "services.items.transformation-packages.bullets.0": "استراتيجية + UX + تصميم",
    "services.items.transformation-packages.bullets.1": "نظام جاهز للـRoadmap",
    "services.items.transformation-packages.bullets.2": "مواءمة العلامة والمنتج",
    "services.items.transformation-packages.bullets.3": "تبسيط UX",
    "services.items.transformation-packages.bullets.4": "مخرجات جاهزة للـRoadmap",

    "work.kicker": "الأعمال المختارة",
    "work.title": "تميّز في التصميم الإبداعي",
    "work.viewAll": "عرض كل الأعمال",

    "stats.title": "أرقام — ونشاط",
    "stats.sub": "نساعد العلامات على النمو ومشاركة قصص نجاحها مع العالم.",

    "clients.kicker": "العملاء",
    "clients.title": "علامات وثقت بنا",
    "clients.sub": "فريق إبداعي بقدرات قوية.",

    "contact.kicker": "لنعمل معًا",
    "contact.title": "إذا وثقت بي، سأضع روحي في العمل وسترى ذلك منعكسًا في المنتج.",
    "contact.sub": "تواصل معي ولنصنع معًا عملًا يترك أثرًا في التاريخ.",
    "contact.email": "البريد: hello@d.creator",
    "contact.book": "حجز مكالمة",
    "contact.subscribe": "اشترك",
    "contact.subscribeNote": "بالاشتراك أنت توافق على سياسة الخصوصية.",
    "contact.emailPlaceholder": "البريد الإلكتروني",
    "contact.signup": "تسجيل",
    "contact.office": "المكتب",

    "footer.rights": "جميع الحقوق محفوظة."
  }
};

export function t(locale: Locale, key: string): string {
  return messages[locale]?.[key] ?? messages.en[key] ?? key;
}

export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
