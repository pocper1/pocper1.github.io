import type { ResumeData } from "@/lib/types";

export const RESUME_DATA: ResumeData = {
    name: "HUANG CHENG JIUN",
    initials: "JH",
    location: "Taipei, Taiwan",
    locationLink: "https://www.google.com/maps/place/Taipei",
    about: "Software Engineer with expertise in backend development, infrastructure, and DevOps. Passionate about building reliable systems.",
    summary: <>Software Engineer specializing in backend development with Django and RESTful APIs, infrastructure management with Kubernetes and Proxmox VE, and system observability using ELK Stack, Grafana, and APM. Experienced in CI/CD pipeline automation and penetration testing.</>,
    avatarUrl: "https://avatars.githubusercontent.com/u/76590438?v=4",
    personalWebsiteUrl: "https://jimmyhuang.vercel.app",
    contact: {
        email: "pocper1@gmail.com",
        tel: "+886905984091",
        social: [
            {
                name: "GitHub",
                url: "https://github.com/pocper1",
                icon: "github",
            },
            {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/jimmy-cj-huang",
                icon: "linkedin",
            },
        ],
    },
    education: [
        {
            school: "National Taiwan University (NTU)",
            degree: "MBA iN INFORMATiON MANAGEMENT",
            start: "2023",
            end: "2025",
        },
        {
            school: "National Central University (NCU)",
            degree: "BBA iN INFORMATiON MANAGEMENT, MiNOR iN COMPUTER SCiENCE & INFORMATiON ENGiNEERiNG",
            start: "2019",
            end: "2023",
        },
    ],
    work: [
        {
            company: "Appier",
            link: "https://www.appier.com/",
            badges: ["Django", "APM", "Docker", "RESTful APIs"],
            title: "Backend Engineer Intern - AiQUA",
            start: "Oct. 2024",
            end: "Mar. 2025",
            description: (
                <>
                    <ul className="list-inside list-disc">
                        <li>Built monitoring for backend services using ELK Stack and APM, improving system visibility and log analysis</li>
                        <li>Designed and implemented RESTful APIs in Django for product search by tags, enabling dynamic tag-based filtering and seamless integration across internal services</li>
                        <li>Optimized Dockerfile structure, layer handling, and caching strategies, reducing container build time by 80% and final image size by 40%</li>
                    </ul>
                </>
            ),
        },
        {
            company: "NTU CTLD",
            link: "https://ctld.ntu.edu.tw/",
            badges: ["Proxmox VE", "Infra"],
            title: "Infrastructure Engineer Intern - NTU COOL",
            start: "Jul. 2023",
            end: "Dec. 2024",
            description: (
                <>
                    <ul className="list-inside list-disc">
                        <li>Maintained Proxmox VE infrastructure across multiple datacenters and dozens of servers, ensuring high availability and performance</li>
                        <li>Configured Grafana and Prometheus for real-time metrics and log monitoring; analyzed logs and implemented remediation strategies</li>
                        <li>Ensured rapid recovery by restoring service within 4 hours for a campus of over 30,000 students when issues occurred, demonstrating strong problem-solving and responsibility</li>
                    </ul>
                </>
            ),
        },
        {
            company: "NYCU HCRC",
            link: "https://www.nycu.edu.tw/",
            badges: ["Penetration Testing", "Security"],
            title: "Cyber Security Penetration Tester",
            start: "Jun. 2022",
            end: "Oct. 2023",
            description: (
                <>
                    <ul className="list-inside list-disc">
                        <li>Conducted penetration tests on at least five organizations, uncovering and remediating critical vulnerabilities</li>
                        <li>Leveraged Metasploit, Nmap, and Burp Suite to conduct vulnerability discovery and exploit security weaknesses</li>
                        <li>Generated and delivered comprehensive vulnerability reports to stakeholders, guiding remediation efforts and improving security posture</li>
                    </ul>
                </>
            ),
        },
        {
            company: "LINE Taiwan Limited",
            link: "https://linecorp.com/",
            badges: ["Kafka", "ELK Stack", "Kubernetes", "CI/CD"],
            title: "Software Engineer Intern - Central Dev",
            start: "Jul. 2022",
            end: "Jun. 2023",
            description: (
                <>
                    <ul className="list-inside list-disc">
                        <li>Presented "Tackle the Infodemic of Misinformation from LINE" at LINE Taiwan headquarters to over 30 GDSC members on March 27, 2023</li>
                        <li>Provisioned a full-stack observability system using Kafka and ELK Stack (Logstash, Elasticsearch, Kibana) to monitor microservices</li>
                        <li>Developed CI/CD pipelines in DroneCI and managed Kubernetes deployments with Kustomize and ArgoCD, streamlining infrastructure updates</li>
                    </ul>
                </>
            ),
        },
    ],
    skills: ["Python", "Java", "C++", "Assembly", "Docker", "Kubernetes", "Proxmox VE", "Grafana", "ELK Stack", "CI/CD", "Kafka", "Git", "DroneCI", "ArgoCD", "RESTful APIs", "Django", "Elastic APM", "Network Architecture", "Operating Systems", "System Administration"],
    projects: [
        {
            title: "Visual Volume",
            techStack: ["Python", "JavaScript", "GLSL", "HTML", "CSS"],
            description: "Visual Volume visualizes volumetric data using Three.js and WebGL, rendering 3D data from sources like CT scans.",
            link: {
                label: "github.com/pocper1/visual-volume",
                href: "https://visual-volume.vercel.app",
            },
        },
    ],
} as const;
