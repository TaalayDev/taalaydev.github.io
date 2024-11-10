import ishonch from "../assets/ishonch.png"

export const skils = [
    { name: "Android", langs: ["Java", "Kotlin"], percent: 85 },
    { name: "Flutter", langs: ["Dart"], percent: 95 },
    { name: "Backend", langs: ["PHP", "Laravel"], percent: 70 },
    { name: "Web", langs: ["Javasript", "React", "Vue"], percent: 60 },
    { name: "iOS, MacOS", langs: ["Swift"], percent: 40 },
];

export const projects = [
    {
        name: "Pixel Verse",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a5/b8/2b/a5b82b51-ea09-28b7-3370-3b331ee98b9f/AppIcon-0-0-1x_U007emarketing-0-10-0-0-85-220.png/340x340bb.png",
        platforms: {
            ios: "https://apps.apple.com/us/app/pixel-verse/id6736886514",
            macos: "https://apps.apple.com/us/app/pixel-verse/id6736886514",
            web: "https://taalaydev.github.io/pixelverse/",
            sourcecode: "https://github.com/TaalayDev/PixelVerse",
        },
        stack: ["Flutter"],
        description: "A Feature-Rich Pixel Art Creation Tool",
        note: [
            "Intuitive Drawing Tools: Pencil, brush, eraser, and more for precise pixel manipulation.",
            "Advanced Shape Tools: Easily create lines, rectangles, and circles.",
            "Color Management: Use the eyedropper tool and custom color palettes for perfect color selection.",
            "Layer Support: Create complex artwork with multiple layers.",
            "Selection and Transform: Select, move, and transform parts of your artwork.",
            "Mirror Drawing: Create symmetrical art effortlessly.",
            "Undo/Redo: Easily correct mistakes or revert changes.",
            "Zoom and Pan: Get up close and personal with your artwork.",
            "Animation Support: Create simple animations with frame management.",
            "Export Options: Save your work in various formats, including image and project files."
        ],
    },
    {
        name: "JSMaster",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/85/e8/14/85e8149c-27f8-f5c8-e9f3-1563813ffca6/AppIcon-0-0-1x_U007emarketing-0-10-0-0-85-220.png/340x340bb.png",
        platforms: {
            ios: "https://apps.apple.com/us/app/js-master/id6736955510",
            macos: "https://apps.apple.com/us/app/js-master/id6736955510",
            sourcecode: "https://github.com/TaalayDev/JSMaster",
        },
        stack: ["Flutter"],
        description: "Interactive JavaScript learning app built with Flutter. Features real-time code execution, progress tracking, and offline lessons.",
        note: [
            "Interactive JavaScript lessons",
            "Real-time code execution",
            "Progress tracking",
            "Offline access to lessons",
            "Quizzes to test your knowledge",
        ],
    },
    {
        name: "Doodle Verse",
        image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*_L4ml17sYGI_JW7P3NJH_Q.png",
        platforms: {
            web: "https://taalaydev.github.io/doodleverse/",
            sourcecode: "https://github.com/TaalayDev/DoodleVerse-ComposeMultiplatform",
        },
        stack: ["Kotlin Multiplatform", "Jetpack Compose"],
        description: "Cross-platform digital drawing application built with Kotlin Multiplatform and Jetpack Compose. Features include various brush types, layer support, shape tools, and a color picker. Create art on Android, iOS, Web, and Desktop with a unified, intuitive interface.",
        note: [
            "Cross-platform support: Runs on Android, iOS, Web, and Desktop.",
            "Multiple brush types: Including pencil, marker, watercolor, and various creative brushes.",
            "Shape tools: Rectangle, circle, line, arrow, ellipse, and polygon.",
            "Layer support: Create, manage, and organize your artwork in layers.",
            "Color picker: Advanced color selection with opacity control.",
            "Undo/Redo functionality: Easily correct mistakes or revisit previous states.",
            "Project management: Create, save, and edit multiple projects.",
            "Customizable canvas size: Choose from preset sizes or create custom dimensions."
        ],
    },
    {
        name: "Doodle Verse",
        image: "https://images.ctfassets.net/23aumh6u8s0i/4TsG2mTRrLFhlQ9G1m19sC/4c9f98d56165a0bdd71cbe7b9c2e2484/flutter",
        platforms: {
            sourcecode: "https://github.com/TaalayDev/doodle_verse",
        },
        stack: ["Flutter"],
        description: "Feature-rich digital drawing and painting application built with Flutter.",
        note: [
            "Cross-platform support: Runs on Android, iOS, Web, and Desktop.",
            "Multiple brush types: Including pencil, marker, watercolor, and various creative brushes.",
            "Shape tools: Rectangle, circle, line, arrow, ellipse, and polygon.",
            "Layer support: Create, manage, and organize your artwork in layers.",
            "Color picker: Advanced color selection with opacity control.",
            "Undo/Redo functionality: Easily correct mistakes or revisit previous states.",
            "Project management: Create, save, and edit multiple projects.",
        ],
    }
];