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
        name: "SurdoKG",
        image: "https://play-lh.googleusercontent.com/8OrOzW2qYcuJTAAY818pyOj1vlWsQBpdMKan3rDgdsThkcIeq7kNqJOyde28uQ_9ayzq=w480-h960-rw",
        platforms: {
            android: "https://play.google.com/store/apps/details?id=dev.oracle.sudokg",
            ios: "https://apps.apple.com/kg/app/surdokg/id1560636785",
        },
        stack: ["Flutter"],
        description: "SurdoKG - is a mobile application that helps deaf people to communicate with doctors. The application contains a list of doctors, chat, and video call.",
        note: "Developed from scratch in collaboration with backend developer.",
    },
    {
        name: "Ishonch",
        image: ishonch,
        platforms: {
            android: "#"
        },
        stack: ["Flutter"],
        description: "Ishonch - is a mobile application to collect geo data for database. The application contains a map, tasks, and a list of places.",
        note: "Developed from scratch in collaboration with GeoIntellect developers.",
    },
    {
        name: "Cute Virtual Pets",
        image: "https://play-lh.googleusercontent.com/Qufz5glQxppySuUWoSr_b5IAoh_ZR1OIcSmB-U8q1gLgR1d9Qp8iuz9aA2HetpQ-Eiw=w480-h960-rw",
        platforms: {
            android: "https://play.google.com/store/apps/details?id=com.cute.virtual.pets",
        },
        stack: ["Kotlin"],
        description: "Cute Virtual Pets - is a mobile application that allows you to take care of virtual pets. The application contains various pets, mini-games, and daily tasks.",
        note: "Developed from scratch in collaboration with Peacky Group team.",
    },
    {
        name: "My Sketchbook - Learn to Draw",
        image: "https://play-lh.googleusercontent.com/GYgXYmQmPRPotFlXE2HaY0TODOOgi53NSPiVGOtN9M6wu1Jutft88Q995sXhNTPVWg=w480-h960-rw",
        platforms: {
            android: "https://play.google.com/store/apps/details?id=com.dailydiscovers.mysketchbook",
        },
        stack: ["Kotlin", "Swift"],
        description: "My Sketchbook - Learn to Draw - is a mobile application that helps you learn to draw. The application contains various drawing lessons and drawing tools.",
        note: "Updates of tools and lessons.",
    },
    {
        name: "Digital Planner - Task Journal",
        image: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/5d/d6/66/5dd66654-d22f-6279-b078-3343d36b8ae8/AppIcon-1x_U007emarketing-0-10-0-85-220-0.png/350x350.png",
        platforms: {
            android: "https://play.google.com/store/apps/details?id=com.dailydiscovers.mydiary",
        },
        stack: ["Kotlin"],
        description: "Digital Planner - Task Journal - is a mobile application that helps you to plan your day. The application contains a calendar, tasks, and notes.",
        note: "Updates and bug fixes.",
    }
];